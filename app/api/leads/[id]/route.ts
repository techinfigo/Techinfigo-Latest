import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  LEAD_STATUSES,
  isDbConfigured,
  isValidLeadId,
  updateLeadStatus,
  type LeadStatus,
} from '../../../../lib/firestore';
import { SESSION_COOKIE, readSession } from '../../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** PATCH — admin only. Moves a lead along the pipeline. */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // Firestore document ids are opaque strings, not serial integers.
  const id = (await params).id;
  if (!isValidLeadId(id)) {
    return NextResponse.json({ ok: false, error: 'invalid id' }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as { status?: unknown } | null;
  const status = typeof body?.status === 'string' ? body.status : '';
  if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ ok: false, error: 'invalid status' }, { status: 400 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: 'database is not configured' }, { status: 503 });
  }

  try {
    const updated = await updateLeadStatus(id, status as LeadStatus);

    if (!updated) {
      return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, lead: updated });
  } catch (error) {
    console.error('[leads] status update failed:', error);
    return NextResponse.json({ ok: false, error: 'update failed' }, { status: 500 });
  }
}
