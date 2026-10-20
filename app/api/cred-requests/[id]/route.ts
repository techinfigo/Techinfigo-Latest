import { NextResponse } from 'next/server';
import { isCrmConfigured } from '../../../../lib/crm';
import { clientKey, rateLimit } from '../../../../lib/rate-limit';
import { isCredRequestId, submitAnswers } from '../../../../lib/cred-requests';

/** Public: the client submits their logins once, from www.techinfigo.com/c/<id>. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const H = { 'Cache-Control': 'no-store' };

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isCredRequestId(id) || !isCrmConfigured()) return NextResponse.json({ ok: false, error: 'Link not found.' }, { status: 404, headers: H });
  const limit = rateLimit(`credsubmit:${clientKey(request)}`, 10, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ ok: false, error: 'Too many tries. Please WhatsApp us.' }, { status: 429, headers: H });

  const text = await request.text().catch(() => '');
  if (!text || text.length > 30_000) return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers: H });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers: H });
  }

  try {
    const result = await submitAnswers(id, body.answers);
    if (result === 'gone') return NextResponse.json({ ok: false, error: 'Ye link ab kaam nahi karta (already bhara ja chuka hai ya expire ho gaya). Naya link maangiye.' }, { status: 410, headers: H });
    if (result === 'bad') return NextResponse.json({ ok: false, error: 'Kam se kam ek cheez bhariye.' }, { status: 400, headers: H });
    return NextResponse.json({ ok: true }, { headers: H });
  } catch (error) {
    console.error('[cred-requests] submit failed:', error);
    return NextResponse.json({ ok: false, error: 'Save nahi ho paya. Dobara try karein.' }, { status: 500, headers: H });
  }
}
