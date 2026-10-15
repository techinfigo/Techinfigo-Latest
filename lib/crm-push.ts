import { createHash } from 'node:crypto';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';
import webpush, { type PushSubscription } from 'web-push';
import { FieldValue } from 'firebase-admin/firestore';
import { crmApp, crmDb, isCrmConfigured } from './crm';

/**
 * Phone alerts for the Techinfigo CRM. NODE RUNTIME ONLY.
 *
 * The CRM (a separate app) asks each phone/computer for a Firebase Cloud
 * Messaging token and registers it here through /api/crm-push, proving who is
 * asking with the signed-in user's Firebase ID token. Tokens live in the CRM
 * project's `pushTokens` collection, which only this server can read or write
 * (no Firestore rule allows browsers in). Every new, non-spam enquiry then
 * sends a notification to each registered device.
 */

export const PUSH_TOKENS = 'pushTokens';

/** Accounts allowed to receive alerts — same list as the CRM's Firestore rules. */
export function allowedEmails(): string[] {
  return (process.env.CRM_ALERT_EMAILS || 'sachin.kumar.zone@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function tokenId(token: string): string {
  return createHash('sha256').update(token).digest('hex').slice(0, 40);
}

/**
 * Web Push keys. Created by this server the first time they are needed and
 * kept in the CRM project's `pushConfig/vapid` document, which only this
 * server can read (no Firestore rule lets browsers in). The public half is
 * handed to the CRM app; the private half never leaves the server.
 */
let vapidCache: { publicKey: string; privateKey: string } | null = null;

export async function getVapidKeys(): Promise<{ publicKey: string; privateKey: string }> {
  if (vapidCache) return vapidCache;
  const ref = crmDb().collection('pushConfig').doc('vapid');
  const existing = await ref.get();
  if (existing.exists && existing.get('publicKey') && existing.get('privateKey')) {
    vapidCache = { publicKey: existing.get('publicKey'), privateKey: existing.get('privateKey') };
    return vapidCache;
  }
  const keys = webpush.generateVAPIDKeys();
  try {
    await ref.create({ ...keys, createdAt: FieldValue.serverTimestamp() });
    vapidCache = keys;
  } catch {
    // Another request created them at the same moment: use those.
    const again = await ref.get();
    vapidCache = { publicKey: again.get('publicKey'), privateKey: again.get('privateKey') };
  }
  return vapidCache;
}

/** Verifies the CRM user. Returns their email, or null if not allowed. */
export async function verifyCrmUser(idToken: unknown): Promise<string | null> {
  if (!isCrmConfigured() || typeof idToken !== 'string' || idToken.length > 5000) return null;
  try {
    const decoded = await getAuth(crmApp()).verifyIdToken(idToken);
    const email = (decoded.email || '').toLowerCase();
    return email && allowedEmails().includes(email) ? email : null;
  } catch {
    return null;
  }
}

function validToken(token: unknown): token is string {
  return typeof token === 'string' && token.length > 20 && token.length < 4096 && !/\s/.test(token);
}

function cleanOrigin(origin: unknown): string | null {
  if (typeof origin !== 'string') return null;
  try {
    const u = new URL(origin);
    return u.protocol === 'https:' || u.hostname === 'localhost' ? u.origin : null;
  } catch {
    return null;
  }
}

export async function saveDevice(email: string, token: unknown, origin: unknown, device: unknown): Promise<boolean> {
  if (!validToken(token)) return false;
  await crmDb()
    .collection(PUSH_TOKENS)
    .doc(tokenId(token))
    .set(
      {
        token,
        email,
        origin: cleanOrigin(origin),
        device: typeof device === 'string' ? device.slice(0, 200) : null,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  return true;
}

export async function removeDevice(token: unknown): Promise<void> {
  if (!validToken(token)) return;
  await crmDb().collection(PUSH_TOKENS).doc(tokenId(token)).delete();
}

export type Alert = { title: string; body: string; path: string; tag: string };

/** Sends one alert to the given devices (all registered devices if none given). */
export async function send(alert: Alert, only?: string[], report?: string[]): Promise<number> {
  const snap = await crmDb().collection(PUSH_TOKENS).get();
  const devices = snap.docs
    .map((d) => ({ ref: d.ref, token: d.get('token') as string, origin: (d.get('origin') as string) || process.env.CRM_APP_URL || '' }))
    .filter((d) => d.token && (!only || only.includes(d.token)));
  if (devices.length === 0) return 0;

  const messaging = getMessaging(crmApp());
  const vapid = devices.some((d) => d.token.startsWith('{')) ? await getVapidKeys() : null;
  let sent = 0;
  await Promise.all(
    devices.map(async (d) => {
      const link = d.origin ? `${d.origin}${alert.path}` : alert.path;
      // Standard Web Push subscription (what the CRM app uses now).
      if (d.token.startsWith('{') && vapid) {
        try {
          const sub = JSON.parse(d.token) as PushSubscription;
          await webpush.sendNotification(
            sub,
            JSON.stringify({ data: { title: alert.title, body: alert.body, tag: alert.tag, link } }),
            {
              TTL: 60 * 60 * 24,
              urgency: 'high',
              vapidDetails: { subject: 'mailto:contact@techinfigo.com', publicKey: vapid.publicKey, privateKey: vapid.privateKey },
            },
          );
          sent++;
          report?.push('accepted');
        } catch (error) {
          const status = (error as { statusCode?: number }).statusCode;
          const body = String((error as { body?: string }).body || (error as Error).message || '').slice(0, 160);
          report?.push(`push service answered ${status ?? 'no response'}${body ? `: ${body}` : ''}`);
          // 404/410: the phone turned alerts off or uninstalled the app.
          if (status === 404 || status === 410 || error instanceof SyntaxError) {
            await d.ref.delete().catch(() => {});
          } else {
            console.error('[crm-push] web push failed:', status || error);
          }
        }
        return;
      }
      try {
        await messaging.send({
          token: d.token,
          // Data-only: the CRM's service worker shows the notification itself.
          data: {
            title: alert.title,
            body: alert.body,
            tag: alert.tag,
            link,
          },
          webpush: { headers: { Urgency: 'high', TTL: String(60 * 60 * 24) } },
        });
        sent++;
      } catch (error) {
        const code = (error as { code?: string }).code || '';
        // The phone uninstalled the app or turned alerts off: forget it.
        if (code.includes('registration-token-not-registered') || code.includes('invalid-registration-token') || code.includes('invalid-argument')) {
          await d.ref.delete().catch(() => {});
        } else {
          console.error('[crm-push] send failed:', code || error);
        }
      }
    }),
  );
  return sent;
}

/** Called for every new (non-spam) enquiry. Never throws. */
export async function notifyNewEnquiry(e: { id: string; name: string; businessName?: string | null; source: string }): Promise<void> {
  if (!isCrmConfigured()) return;
  try {
    const who = [e.name, e.businessName].filter(Boolean).join(', ');
    await Promise.race([
      send({ title: `New enquiry: ${who}`.slice(0, 100), body: `From ${e.source}. Tap to open.`, path: '/?view=LEADS', tag: `enquiry-${e.id}` }),
      new Promise((resolve) => setTimeout(resolve, 4000)),
    ]);
  } catch (error) {
    console.error('[crm-push] alert failed:', error);
  }
}

/** "Send test" from the CRM: only to the device that asked. */
export async function sendTest(token: string): Promise<{ sent: number; detail: string }> {
  const report: string[] = [];
  const sent = await send(
    { title: 'Test alert from Techinfigo', body: 'Phone alerts are working. New enquiries will show like this.', path: '/?view=LEADS', tag: 'test' },
    [token],
    report,
  );
  return { sent, detail: report.join('; ') || 'this phone is not registered on the server, tap Turn off then Turn on' };
}
