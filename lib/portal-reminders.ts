import { crmDb, isCrmConfigured } from './crm';
import { cleanSnapshot } from './portal';
import { sendClientAlert } from './portal-push';

/**
 * Follow-up nudges for the CLIENT's team. NODE RUNTIME ONLY.
 *
 * Once a day, any client whose portal has leads still sitting on "New" past a
 * few hours gets one push: "X leads abhi tak call nahi kiye". Deduped per
 * client per day via `reminderLog` so it never nags more than once a day.
 */

const LOG = 'reminderLog';
const STALE_HOURS = 3;

function dayKeyIST(ms: number): string {
  // IST = UTC + 5:30
  return new Date(ms + 5.5 * 3600_000).toISOString().slice(0, 10);
}

async function claim(id: string): Promise<boolean> {
  try {
    await crmDb().collection(LOG).doc(id).create({ at: Date.now() });
    return true;
  } catch (error) {
    if ((error as { code?: number }).code === 6) return false; // ALREADY_EXISTS
    throw error;
  }
}

export type PortalReminderResult = { checked: number; sent: number };

export async function runPortalLeadReminders(nowMs = Date.now()): Promise<PortalReminderResult> {
  if (!isCrmConfigured()) return { checked: 0, sent: 0 };
  const dayKey = dayKeyIST(nowMs);
  const staleBefore = nowMs - STALE_HOURS * 3600_000;

  // Only clients who actually turned on alerts are worth checking.
  const subsSnap = await crmDb().collection('portalPush').get();
  const clientIds = [...new Set(subsSnap.docs.map((d) => String(d.get('clientId') || '')).filter(Boolean))];
  let sent = 0;

  await Promise.all(
    clientIds.map(async (clientId) => {
      try {
        const doc = await crmDb().collection('portals').doc(clientId).get();
        if (!doc.exists || !doc.get('enabled')) return;
        const snap = cleanSnapshot(doc.get('snapshot'));
        const stale = snap.leads.filter((l) => l.status === 'New' && l.at && new Date(l.at).getTime() <= staleBefore);
        if (stale.length === 0) return;
        if (!(await claim(`plead-remind-${clientId}-${dayKey}`))) return; // already nudged today
        const n = stale.length;
        const ok = await sendClientAlert(
          clientId,
          `⏰ ${n} lead${n > 1 ? 's' : ''} ko call karna baaki hai`,
          'Kuch leads abhi tak contact nahi hue. Portal kholein aur call karein!',
          `remind-${dayKey}`,
        );
        if (ok) sent++;
      } catch (error) {
        console.error('[portal-reminders] client failed:', clientId, error);
      }
    }),
  );

  return { checked: clientIds.length, sent };
}
