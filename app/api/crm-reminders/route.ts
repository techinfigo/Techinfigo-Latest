import { NextResponse } from 'next/server';
import { runReminders } from '../../../lib/crm-reminders';
import { runPortalLeadReminders } from '../../../lib/portal-reminders';
import { clientKey, rateLimit } from '../../../lib/rate-limit';

/**
 * Sends due CRM reminders (follow-ups, tasks, 9 AM summary) to the owner's phone.
 * Called every ~15 min by the GitHub timer (.github/workflows/crm-reminders.yml)
 * and once a day by Vercel cron (vercel.json).
 *
 * If CRON_SECRET is set (Vercel env + GitHub secret), callers must send
 * "Authorization: Bearer <CRON_SECRET>". Without it the endpoint stays open, which
 * is safe: it only sends reminders that are actually due, each one only once,
 * and replies with counts, never with CRM data.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

async function handle(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const limit = rateLimit(`crm-reminders:${clientKey(request)}`, 12, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429 });

  try {
    const result = await runReminders();
    // Also nudge clients' teams about leads they haven't called (deduped per day).
    const portal = await runPortalLeadReminders().catch((e) => {
      console.error('[portal-reminders] failed:', e);
      return { checked: 0, sent: 0 };
    });
    return NextResponse.json({ ok: true, ...result, portalReminders: portal });
  } catch (error) {
    console.error('[crm-reminders] failed:', error);
    return NextResponse.json({ ok: false, error: 'Reminder run failed.' }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
