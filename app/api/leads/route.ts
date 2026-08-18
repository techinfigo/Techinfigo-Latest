import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { and, desc, eq, gte } from 'drizzle-orm';
import { getDb, isDbConfigured } from '../../../lib/db';
import { leads, LEAD_STATUSES, type LeadStatus } from '../../../lib/db/schema';
import { mirrorToInbox, parseLead } from '../../../lib/leads';
import { SESSION_COOKIE, readSession } from '../../../lib/auth';

// scrypt/pg both need Node; and this route must never be cached.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST — public form endpoint.
 *
 * Contract: if validation passes, the caller gets ok:true. A database outage
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
      await getDb().insert(leads).values(parsed.lead);
      stored = true;
    } catch (error) {
      // Swallowed on purpose: the lead is already in the inbox.
      console.error('[leads] database insert failed:', error);
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
  const status = params.get('status');
  const source = params.get('source');
  const days = Number(params.get('days'));

  const filters = [];
  if (status && (LEAD_STATUSES as readonly string[]).includes(status)) {
    filters.push(eq(leads.status, status as LeadStatus));
  }
  if (source) {
    filters.push(eq(leads.sourceForm, source));
  }
  if (Number.isFinite(days) && days > 0) {
    filters.push(gte(leads.createdAt, new Date(Date.now() - days * 86_400_000)));
  }

  try {
    const rows = await getDb()
      .select()
      .from(leads)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(leads.createdAt))
      .limit(500);

    return NextResponse.json({ ok: true, dbConfigured: true, leads: rows });
  } catch (error) {
    console.error('[leads] query failed:', error);
    return NextResponse.json({ ok: false, error: 'query failed' }, { status: 500 });
  }
}
