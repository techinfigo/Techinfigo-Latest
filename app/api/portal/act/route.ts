import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rateLimit } from '../../../../lib/rate-limit';
import { PORTAL_COOKIE, clientAction, readPortal } from '../../../../lib/portal';

/** Signed-in client approves a post, or asks for a change. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const H = { 'Cache-Control': 'no-store' };
  const session = await readPortal((await cookies()).get(PORTAL_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: false, error: 'Dobara login karein.' }, { status: 401, headers: H });
  if (!rateLimit(`portalact:${session.clientId}`, 120, 60 * 60 * 1000).allowed) return NextResponse.json({ ok: false, error: 'Thodi der baad try karein.' }, { status: 429, headers: H });
  const body = (await request.json().catch(() => null)) as { planId?: unknown; action?: unknown; comment?: unknown } | null;
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
