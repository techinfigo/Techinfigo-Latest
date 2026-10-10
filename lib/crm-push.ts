import { createHash } from 'node:crypto';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';
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
function allowedEmails(): string[] {
  return (process.env.CRM_ALERT_EMAILS || 'sachin.kumar.zone@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function tokenId(token: string): string {
  return createHash('sha256').update(token).digest('hex').slice(0, 40);
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

type Alert = { title: string; body: string; path: string; tag: string };

/** Sends one alert to the given devices (all registered devices if none given). */
async function send(alert: Alert, only?: string[]): Promise<number> {
  const snap = await crmDb().collection(PUSH_TOKENS).get();
  const devices = snap.docs
    .map((d) => ({ ref: d.ref, token: d.get('token') as string, origin: (d.get('origin') as string) || process.env.CRM_APP_URL || '' }))
    .filter((d) => d.token && (!only || only.includes(d.token)));
  if (devices.length === 0) return 0;

  const messaging = getMessaging(crmApp());
  let sent = 0;
  await Promise.all(
    devices.map(async (d) => {
      try {
        await messaging.send({
          token: d.token,
          // Data-only: the CRM's service worker shows the notification itself.
          data: {
            title: alert.title,
            body: alert.body,
            tag: alert.tag,
            link: d.origin ? `${d.origin}${alert.path}` : alert.path,
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
export async function sendTest(token: string): Promise<number> {
  return send({ title: 'Test alert from Techinfigo', body: 'Phone alerts are working. New enquiries will show like this.', path: '/?view=LEADS', tag: 'test' }, [token]);
}
