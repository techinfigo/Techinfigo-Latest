import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createLead, isDbConfigured, queryLeads } from '../../../lib/firestore';
import { mirrorToInbox, parseLead } from '../../../lib/leads';
import { SESSION_COOKIE, readSession } from '../../../lib/auth';

// scrypt and firebase-admin both need Node; and this route must never be cached.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST — public form endpoint.
 *
 * Contract: if validation passes, the caller gets ok:true. A Firestore outage
 * changes `stored`, never `ok`. Losing a prospect to a connection timeout is
 * not an acceptable failure mode, so the inbox mirror runs regardless.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'invalid JSON body' }, { status: 400 });
  }

  // Honeypot. Bots fill every field they find; humans never see this one.
  // Returning a plain success keeps the bot from learning it was caught.
  if (typeof body._gotcha === 'string' && body._gotcha.trim() !== '') {
    return NextResponse.json({ ok: true, stored: false });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const mirrored = await mirrorToInbox(parsed.lead);

  let stored = false;
  if (isDbConfigured()) {
    try {
      await createLead(parsed.lead);
      stored = true;
    } catch (error) {
      // Swallowed on purpose: the lead is already in the inbox.
      console.error('[leads] firestore write failed:', error);
    }
  }

  return NextResponse.json({ ok: true, stored, mirrored });
}

/** GET — admin only. Filters: ?status=&source=&days= */
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ ok: true, dbConfigured: false, leads: [] });
  }

  const params = new URL(request.url).searchParams;

  try {
    const leads = await queryLeads(
      {
        status: params.get('status'),
        source: params.get('source'),
        days: Number(params.get('days')),
      },
      500,
    );

    return NextResponse.json({ ok: true, dbConfigured: true, leads });
  } catch (error) {
    console.error('[leads] query failed:', error);
    return NextResponse.json({ ok: false, error: 'query failed' }, { status: 500 });
  }
}
