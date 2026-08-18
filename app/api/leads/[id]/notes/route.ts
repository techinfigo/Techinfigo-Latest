import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { addNote, isDbConfigured, isValidLeadId } from '../../../../../lib/firestore';
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

  // Firestore document ids are opaque strings, not serial integers.
  const leadId = (await params).id;
  if (!isValidLeadId(leadId)) {
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
    const note = await addNote(leadId, noteBody);

    // A subcollection write under a missing parent would otherwise succeed
    // silently — the foreign key used to make this a constraint violation.
    if (!note) {
      return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, note });
  } catch (error) {
    console.error('[leads] note insert failed:', error);
    return NextResponse.json({ ok: false, error: 'insert failed' }, { status: 500 });
  }
}
