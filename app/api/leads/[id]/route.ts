import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import { getDb, isDbConfigured } from '../../../../lib/db';
import { leads, LEAD_STATUSES, type LeadStatus } from '../../../../lib/db/schema';
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

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) {
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
    const updated = await getDb()
      .update(leads)
      .set({ status: status as LeadStatus, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, lead: updated[0] });
  } catch (error) {
    console.error('[leads] status update failed:', error);
    return NextResponse.json({ ok: false, error: 'update failed' }, { status: 500 });
  }
}
