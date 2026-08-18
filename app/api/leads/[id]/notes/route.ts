import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb, isDbConfigured } from '../../../../../lib/db';
import { leadNotes } from '../../../../../lib/db/schema';
import { SESSION_COOKIE, readSession } from '../../../../../lib/auth';
import { clean } from '../../../../../lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST — admin only. Notes are append-only; there is no PATCH or DELETE. */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const leadId = Number((await params).id);
  if (!Number.isInteger(leadId) || leadId <= 0) {
    return NextResponse.json({ ok: false, error: 'invalid id' }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as { body?: unknown } | null;
  const noteBody = clean(body?.body, 5000);
  if (!noteBody) {
    return NextResponse.json({ ok: false, error: 'note body is required' }, { status: 400 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: 'database is not configured' }, { status: 503 });
  }

  try {
    const inserted = await getDb().insert(leadNotes).values({ leadId, body: noteBody }).returning();
    return NextResponse.json({ ok: true, note: inserted[0] });
  } catch (error) {
    console.error('[leads] note insert failed:', error);
    return NextResponse.json({ ok: false, error: 'insert failed' }, { status: 500 });
  }
}
