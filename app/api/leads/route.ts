import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createLead, isDbConfigured, queryLeads } from '../../../lib/firestore';
import { mirrorToInbox, parseLead } from '../../../lib/leads';
import { SESSION_COOKIE, readSession } from '../../../lib/auth';
import { clientKey, rateLimit } from '../../../lib/rate-limit';
import { screen } from '../../../lib/spam';
import { isCrmConfigured, sendToCrm } from '../../../lib/crm';

/** At most this many enquiries per connection per hour. */
const MAX_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

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

  const ip = clientKey(request);
  const limit = rateLimit(`lead:${ip}`, MAX_PER_HOUR, HOUR_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'too many enquiries, please WhatsApp us instead' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const lead = parsed.lead;

  const check = await screen(body, ip, {
    name: lead.name,
    phone: lead.phone,
    businessName: lead.brandName,
    message: lead.message,
  });

  // A certain bot: store nothing, but answer "ok" so it learns nothing.
  if (check.verdict === 'reject') {
    return NextResponse.json({ ok: true, stored: false });
  }

  const isRealEnquiry = check.verdict === 'ok';
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((n): n is string => typeof n === 'string').slice(0, 10)
    : [];

  // 1. The CRM inbox (job applications are not sales enquiries).
  let crm = false;
  if (isCrmConfigured() && lead.sourceForm !== 'careers') {
    try {
      await sendToCrm(lead, {
        status: isRealEnquiry ? 'new' : 'spam',
        spamReasons: check.reasons,
        needs,
      });
      crm = true;
    } catch (error) {
      console.error('[leads] CRM write failed:', error);
    }
  }

  // 2. Email alert and the website's own lead store: real enquiries only.
  let mirrored = false;
  let stored = false;
  if (isRealEnquiry) {
    mirrored = await mirrorToInbox(lead);
    if (isDbConfigured()) {
      try {
        await createLead(lead);
        stored = true;
      } catch (error) {
        // Swallowed on purpose: the lead is already in the inbox.
        console.error('[leads] firestore write failed:', error);
      }
    }
  }

  return NextResponse.json({ ok: true, stored: stored || crm, mirrored });
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
