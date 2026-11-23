import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rateLimit } from '../../../../lib/rate-limit';
import { PORTAL_COOKIE, clientAction, clientLeadAction, readPortal } from '../../../../lib/portal';

/** Signed-in client approves a post, or asks for a change. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const H = { 'Cache-Control': 'no-store' };
  const session = await readPortal((await cookies()).get(PORTAL_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: false, error: 'Dobara login karein.' }, { status: 401, headers: H });
  if (!rateLimit(`portalact:${session.clientId}`, 120, 60 * 60 * 1000).allowed) return NextResponse.json({ ok: false, error: 'Thodi der baad try karein.' }, { status: 429, headers: H });
  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  // Lead update (status / note) — kept separate from calendar actions.
  if (raw && typeof raw.leadId === 'string') {
    const leadId = raw.leadId.slice(0, 80);
    const status = typeof raw.status === 'string' ? raw.status : '';
    const note = typeof raw.note === 'string' ? raw.note.trim().slice(0, 500) : '';
    if (!['New', 'Contacted', 'Converted', 'Lost'].includes(status) && !note) {
      return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers: H });
    }
    const lr = await clientLeadAction(session.clientId, leadId, status, note).catch((e) => {
      console.error('[portal lead act]', e);
      return 'bad' as const;
    });
    return lr === 'ok' ? NextResponse.json({ ok: true }, { headers: H }) : NextResponse.json({ ok: false, error: 'Ye abhi nahi ho paya. Refresh karke try karein.' }, { status: 409, headers: H });
  }

  const body = raw as { planId?: unknown; action?: unknown; comment?: unknown } | null;
  const planId = typeof body?.planId === 'string' ? body.planId.slice(0, 80) : '';
  const action = body?.action === 'change' ? 'change' : body?.action === 'approve' ? 'approve' : null;
  const comment = typeof body?.comment === 'string' ? body.comment.trim().slice(0, 500) : '';
  if (!planId || !action) return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers: H });
  if (action === 'change' && !comment) return NextResponse.json({ ok: false, error: 'Kya change chahiye, likhiye.' }, { status: 400, headers: H });
  const r = await clientAction(session.clientId, planId, action, comment).catch((e) => {
    console.error('[portal act]', e);
    return 'bad' as const;
  });
  return r === 'ok' ? NextResponse.json({ ok: true }, { headers: H }) : NextResponse.json({ ok: false, error: 'Ye abhi nahi ho paya. Page refresh karke try karein.' }, { status: 409, headers: H });
}
