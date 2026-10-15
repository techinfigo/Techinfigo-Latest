import { crmDb, isCrmConfigured } from './crm';
import { PUSH_TOKENS, send, type Alert } from './crm-push';

/**
 * Follow-up and task reminders for the CRM owner's phone. NODE RUNTIME ONLY.
 *
 * Runs every ~15 minutes (a GitHub Actions timer calls /api/crm-reminders, and
 * a daily Vercel cron is a backup for the morning summary). Each run reads the
 * owner's CRM data (Firestore users/{uid}/appData/{key} → { value }) and sends:
 *   - at 9 AM India time: "Today: 3 follow-ups, 1 overdue · 2 tasks due"
 *   - shortly before each follow-up time set on a lead
 *   - shortly before each task that has a due time
 *   - shortly before each client shoot / meeting (client Calendar tab) with a time
 * Every alert is written to `reminderLog` first, so it is never sent twice,
 * however often (or late) the timer fires.
 */

const LOG = 'reminderLog';
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const AHEAD_MS = 20 * 60 * 1000; // remind up to 20 min before
const LATE_MS = 60 * 60 * 1000; // still remind if the timer ran up to 1 h late
const SUMMARY_FROM_HOUR = 9; // 9 AM IST
const SUMMARY_UNTIL_HOUR = 13; // don't send a "morning" summary after 1 PM

type Lead = {
  id: string;
  name?: string;
  companyName?: string;
  phone?: string;
  status?: string;
  nextFollowUpDateTime?: string | null;
};
type Task = { id: string; title?: string; dueDate?: string | null; status?: string; completed?: boolean };
type Project = { id: string; name?: string; tasks?: Task[] };
type Opportunity = { id: string; clientId: string; service?: string; amount?: number; stage?: string; followUpDate?: string | null };
type ClientLite = { id: string; name?: string; companyName?: string; phone?: string };
type PlanItem = { id: string; clientId: string; date?: string; time?: string; kind?: string; title?: string; status?: string };

/** Client calendar kinds that ring the phone before their time; posts/reels/ads only count in the morning summary. */
const PLAN_ALERT_KINDS = new Set(['Shoot', 'Meeting', 'Other']);
const PLAN_CONTENT_KINDS = new Set(['Post', 'Reel', 'Story', 'Ad']);

/** Plan date + time are saved as India-time text ("2026-10-16", "11:00"). */
function planAt(p: PlanItem): number | null {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(p.date || '');
  const t = /^(\d{1,2}):(\d{2})$/.exec(p.time || '');
  if (!d || !t) return null;
  return Date.UTC(+d[1], +d[2] - 1, +d[3], +t[1], +t[2]) - IST_OFFSET_MS;
}

const CLOSED_LEAD = new Set(['Closed Won', 'Closed Lost']);

/** The app saves lists either as a plain array or as { state: [...] } (undo history). */
function unwrap<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object' && Array.isArray((value as { state?: unknown }).state)) {
    return (value as { state: T[] }).state;
  }
  return [];
}

/** YYYY-MM-DD and hour of a moment, in India time. */
function istParts(ms: number): { day: string; hour: number } {
  const d = new Date(ms + IST_OFFSET_MS);
  return { day: d.toISOString().slice(0, 10), hour: d.getUTCHours() };
}

function timeIST(ms: number): string {
  return new Date(ms).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
}

/** A due date with no real time (just a day) is treated as "sometime that day". */
function hasTime(iso: string): boolean {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const ist = new Date(d.getTime() + IST_OFFSET_MS);
  const utcMidnight = d.getUTCHours() === 0 && d.getUTCMinutes() === 0;
  const istMidnight = ist.getUTCHours() === 0 && ist.getUTCMinutes() === 0;
  return !utcMidnight && !istMidnight;
}

function taskDay(iso: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? null : istParts(t).day;
}

function isOpenTask(t: Task): boolean {
  return !t.completed && t.status !== 'Done';
}

/** Records the alert; returns false if it was already sent. */
async function claim(id: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    await crmDb().collection(LOG).doc(id).create({ ...data, at: Date.now() });
    return true;
  } catch (error) {
    if ((error as { code?: number }).code === 6) return false; // ALREADY_EXISTS
    throw error;
  }
}

async function readList<T>(uid: string, key: string): Promise<T[]> {
  const snap = await crmDb().collection('users').doc(uid).collection('appData').doc(key).get();
  return snap.exists ? unwrap<T>(snap.get('value')) : [];
}

export type ReminderResult = { checked: number; sent: number; skipped?: string };

export async function runReminders(nowMs = Date.now()): Promise<ReminderResult> {
  if (!isCrmConfigured()) return { checked: 0, sent: 0, skipped: 'CRM not configured' };

  let checked = 0;
  let sent = 0;
  const alerts: { id: string; alert: Alert }[] = [];
  const today = istParts(nowMs);

  // Whose CRM to check: the accounts that turned on alerts on a device.
  const devices = await crmDb().collection(PUSH_TOKENS).get();
  const uids = Array.from(new Set(devices.docs.map((d) => d.get('uid') as string | undefined).filter((u): u is string => !!u)));
  if (uids.length === 0) return { checked: 0, sent: 0, skipped: 'no phone has alerts turned on' };

  for (const uid of uids) {
    const [leads, globalTasks, projects, opportunities, clients, plans] = await Promise.all([
      readList<Lead>(uid, 'crm_leads'),
      readList<Task>(uid, 'crm_tasks'),
      readList<Project>(uid, 'crm_projects'),
      readList<Opportunity>(uid, 'crm_opportunities'),
      readList<ClientLite>(uid, 'crm_clients'),
      readList<PlanItem>(uid, 'crm_client_plans'),
    ]);
    const tasks = [...globalTasks, ...projects.flatMap((p) => p.tasks || [])].filter(isOpenTask);
    checked += leads.length + tasks.length;

    // 1. Follow-ups at their time.
    let followUpsToday = 0;
    let overdue = 0;
    for (const lead of leads) {
      if (!lead.nextFollowUpDateTime || CLOSED_LEAD.has(lead.status || '')) continue;
      const at = new Date(lead.nextFollowUpDateTime).getTime();
      if (Number.isNaN(at)) continue;
      const day = istParts(at).day;
      if (day === today.day) followUpsToday++;
      else if (day < today.day) overdue++;
      if (at <= nowMs + AHEAD_MS && at > nowMs - LATE_MS) {
        const who = [lead.name, lead.companyName].filter(Boolean).join(', ') || 'a lead';
        alerts.push({
          id: `fu_${uid}_${lead.id}_${at}`,
          alert: {
            title: `Follow up at ${timeIST(at)}: ${who}`.slice(0, 100),
            body: lead.phone ? `Call ${lead.phone}. Tap to open the lead.` : 'Tap to open the lead.',
            path: '/?view=LEADS',
            tag: `fu-${lead.id}`,
          },
        });
      }
    }

    // 1b. Follow-ups on extra services existing clients are interested in.
    for (const o of opportunities) {
      if (!o.followUpDate || (o.stage !== 'Interested' && o.stage !== 'Quote sent')) continue;
      const at = new Date(o.followUpDate).getTime();
      if (Number.isNaN(at)) continue;
      const day = istParts(at).day;
      if (day === today.day) followUpsToday++;
      else if (day < today.day) overdue++;
      if (at <= nowMs + AHEAD_MS && at > nowMs - LATE_MS) {
        const c = clients.find((x) => x.id === o.clientId);
        const who = c ? c.companyName || c.name || 'client' : 'client';
        alerts.push({
          id: `opp_${uid}_${o.id}_${at}`,
          alert: {
            title: `Follow up at ${timeIST(at)}: ${who} (${o.service || 'new service'})`.slice(0, 100),
            body: c?.phone ? `Existing client, interested in ${o.service}. Call ${c.phone}.` : `Existing client, interested in ${o.service}.`,
            path: '/?view=CLIENTS',
            tag: `opp-${o.id}`,
          },
        });
      }
    }

    // 2. Tasks with a due time.
    let tasksToday = 0;
    for (const task of tasks) {
      if (!task.dueDate) continue;
      if (taskDay(task.dueDate) === today.day) tasksToday++;
      if (!hasTime(task.dueDate)) continue;
      const at = new Date(task.dueDate).getTime();
      if (at <= nowMs + AHEAD_MS && at > nowMs - LATE_MS) {
        alerts.push({
          id: `task_${uid}_${task.id}_${at}`,
          alert: {
            title: `Task due at ${timeIST(at)}`,
            body: (task.title || 'Open task').slice(0, 120),
            path: '/?view=MY_TASKS',
            tag: `task-${task.id}`,
          },
        });
      }
    }

    // 2b. Client calendar: shoots / meetings ring before their time; everything counts in the summary.
    let eventsToday = 0;
    let postsToday = 0;
    for (const p of plans) {
      if (p.status === 'Done' || !p.date) continue;
      if (p.date === today.day) {
        if (PLAN_CONTENT_KINDS.has(p.kind || '')) postsToday++;
        else eventsToday++;
      }
      if (!PLAN_ALERT_KINDS.has(p.kind || 'Other')) continue;
      const at = planAt(p);
      if (at === null) continue;
      checked++;
      if (at <= nowMs + AHEAD_MS && at > nowMs - LATE_MS) {
        const c = clients.find((x) => x.id === p.clientId);
        const who = c ? c.companyName || c.name || 'client' : 'client';
        alerts.push({
          id: `plan_${uid}_${p.id}_${at}`,
          alert: {
            title: `${p.kind || 'Plan'} at ${timeIST(at)}: ${who}`.slice(0, 100),
            body: `${p.title || ''}${c?.phone ? ` · ${c.phone}` : ''}`.slice(0, 120) || 'Tap to open the client.',
            path: '/?view=CLIENTS',
            tag: `plan-${p.id}`,
          },
        });
      }
    }

    // 3. Morning summary, once a day.
    if (today.hour >= SUMMARY_FROM_HOUR && today.hour < SUMMARY_UNTIL_HOUR && followUpsToday + overdue + tasksToday + eventsToday + postsToday > 0) {
      const parts = [
        followUpsToday ? `${followUpsToday} follow-up${followUpsToday > 1 ? 's' : ''}` : '',
        overdue ? `${overdue} overdue` : '',
        tasksToday ? `${tasksToday} task${tasksToday > 1 ? 's' : ''} due` : '',
        eventsToday ? `${eventsToday} ${eventsToday > 1 ? "shoots/meetings" : "shoot/meeting"}` : '',
        postsToday ? `${postsToday} post${postsToday > 1 ? 's' : ''} to publish` : '',
      ].filter(Boolean);
      alerts.push({
        id: `summary_${uid}_${today.day}`,
        alert: {
          title: `Good morning! Today: ${parts.join(', ')}`,
          body: 'Tap to see your follow-ups.',
          path: '/?view=LEADS',
          tag: `summary-${today.day}`,
        },
      });
    }
  }

  for (const { id, alert } of alerts) {
    if (await claim(id, { title: alert.title })) {
      sent += (await send(alert)) > 0 ? 1 : 0;
    }
  }

  // Keep the log small: forget alerts older than 3 days (once a day is enough).
  if (today.hour === SUMMARY_FROM_HOUR) {
    const old = await crmDb().collection(LOG).where('at', '<', nowMs - 3 * 24 * 60 * 60 * 1000).limit(200).get();
    await Promise.all(old.docs.map((d) => d.ref.delete()));
  }

  return { checked, sent };
}
