import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PORTAL_COOKIE, readPortal } from '../../../../lib/portal';
import { getVapidKeys } from '../../../../lib/crm-push';
import { saveClientPush, removeClientPush } from '../../../../lib/portal-push';
import { rateLimit } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const H = { 'Cache-Control': 'no-store' };

/** GET: the public VAPID key the browser needs to subscribe. */
export async function GET() {
  try {
    const { publicKey } = await getVapidKeys();
    return NextResponse.json({ ok: true, publicKey }, { headers: H });
  } catch {
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 500, headers: H });
  }
}

/** POST: save this client device's subscription. DELETE-style via {remove:true}. */
export async function POST(request: Request) {
  const session = await readPortal((await cookies()).get(PORTAL_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: false, error: 'Dobara login karein.' }, { status: 401, headers: H });
  if (!rateLimit(`portalpush:${session.clientId}`, 60, 60 * 60 * 1000).allowed) return NextResponse.json({ ok: false, error: 'Thodi der baad.' }, { status: 429, headers: H });
  const body = (await request.json().catch(() => null)) as { sub?: unknown; remove?: boolean } | null;
  if (!body?.sub) return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers: H });
  if (body.remove) {
    await removeClientPush(body.sub).catch(() => 0);
    return NextResponse.json({ ok: true }, { headers: H });
  }
  const ok = await saveClientPush(session.clientId, body.sub).catch(() => false);
  return ok ? NextResponse.json({ ok: true }, { headers: H }) : NextResponse.json({ ok: false, error: 'Save nahi hua.' }, { status: 400, headers: H });
}
