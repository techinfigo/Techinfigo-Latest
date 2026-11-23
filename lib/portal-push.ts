import { createHash } from 'node:crypto';
import webpush, { type PushSubscription } from 'web-push';
import { FieldValue } from 'firebase-admin/firestore';
import { crmDb, isCrmConfigured } from './crm';
import { getVapidKeys } from './crm-push';

/**
 * Web Push for the CLIENT portal. NODE RUNTIME ONLY.
 *
 * A client's team turns on alerts in their portal; the browser subscription is
 * stored in the CRM project's `portalPush` collection, tagged with the client
 * id. When a lead arrives for that client, their devices get a notification.
 * Reuses the same VAPID keys as the owner's CRM alerts (lib/crm-push.ts).
 */

const PORTAL_PUSH = 'portalPush';

function subId(sub: PushSubscription): string {
  return createHash('sha256').update(sub.endpoint).digest('hex').slice(0, 40);
}

function isSub(v: unknown): v is PushSubscription {
  const s = v as PushSubscription | undefined;
  return !!s && typeof s.endpoint === 'string' && s.endpoint.startsWith('https://') && !!s.keys && typeof s.keys.p256dh === 'string' && typeof s.keys.auth === 'string';
}

/** Store (or refresh) one client device's push subscription. */
export async function saveClientPush(clientId: string, sub: unknown): Promise<boolean> {
  if (!isCrmConfigured() || !isSub(sub)) return false;
  await crmDb()
    .collection(PORTAL_PUSH)
    .doc(subId(sub))
    .set({ clientId, sub: JSON.stringify(sub), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return true;
}

/** Forget one subscription (client turned alerts off). */
export async function removeClientPush(sub: unknown): Promise<void> {
  if (!isCrmConfigured() || !isSub(sub)) return;
  await crmDb().collection(PORTAL_PUSH).doc(subId(sub)).delete().catch(() => {});
}

/** Send a notification to all of a client's devices. Never throws. */
export async function sendClientAlert(clientId: string, title: string, body: string, tag = 'lead'): Promise<number> {
  if (!isCrmConfigured()) return 0;
  try {
    const snap = await crmDb().collection(PORTAL_PUSH).where('clientId', '==', clientId).get();
    if (snap.empty) return 0;
    const vapid = await getVapidKeys();
    let sent = 0;
    await Promise.all(
      snap.docs.map(async (d) => {
        try {
          const sub = JSON.parse(d.get('sub') as string) as PushSubscription;
          await webpush.sendNotification(
            sub,
            JSON.stringify({ data: { title, body, tag, link: '/portal' } }),
            { TTL: 60 * 60 * 24, urgency: 'high', vapidDetails: { subject: 'mailto:info@techinfigo.com', publicKey: vapid.publicKey, privateKey: vapid.privateKey } },
          );
          sent++;
        } catch (error) {
          const status = (error as { statusCode?: number }).statusCode;
          if (status === 404 || status === 410 || error instanceof SyntaxError) await d.ref.delete().catch(() => {});
          else console.error('[portal-push] send failed:', status || error);
        }
      }),
    );
    return sent;
  } catch (error) {
    console.error('[portal-push] alert failed:', error);
    return 0;
  }
}
