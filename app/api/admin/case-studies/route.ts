import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, readSession } from '../../../../lib/auth';
import { isDbConfigured } from '../../../../lib/firestore';
import {
  deleteCaseStudy,
  getAllCaseStudies,
  revalidateCaseStudies,
  saveCaseStudy,
} from '../../../../lib/content';
import { normaliseCaseStudy } from '../../../../lib/content-schema';

/**
 * Case study CRUD. Admin only.
 *
 * Every write revalidates the case-studies tag and /case-studies, which is
 * what makes a publish visible without a deploy. Note that publishing and
 * unpublishing are the same operation as any other save: the `published` flag
 * is a field, and the public read filters on it.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PUBLIC_PATHS = ['/case-studies'];

async function requireSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(await readSession(cookieStore.get(SESSION_COOKIE)?.value));
}

const UNAUTHORIZED = { ok: false, error: 'unauthorized' } as const;
const NOT_CONFIGURED = {
  ok: false,
  error: 'Firestore is not configured, so there is nowhere to save.',
} as const;

/** GET — every study, drafts included. Admin only; the public site never calls this. */
export async function GET() {
  if (!(await requireSession())) return NextResponse.json(UNAUTHORIZED, { status: 401 });
  try {
    return NextResponse.json({ ok: true, studies: await getAllCaseStudies() });
  } catch (error) {
    console.error('[content] case study read failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not read case studies.' }, { status: 500 });
  }
}

/** PUT { id?, study } — create when id is absent, update when present. */
export async function PUT(request: Request) {
  if (!(await requireSession())) return NextResponse.json(UNAUTHORIZED, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json(NOT_CONFIGURED, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    id?: unknown;
    study?: unknown;
  } | null;
  if (!body) return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });

  const id = typeof body.id === 'string' && body.id ? body.id : null;
  // Normalised before storage, exactly like page copy: an unpublished flag of
  // the wrong type becomes false, never true.
  const study = normaliseCaseStudy(body.study, id ?? undefined);

  try {
    const savedId = await saveCaseStudy(id, study);
    revalidateCaseStudies(PUBLIC_PATHS);
    return NextResponse.json({ ok: true, id: savedId, study: { ...study, id: savedId } });
  } catch (error) {
    console.error('[content] case study save failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not save.' }, { status: 500 });
  }
}

/** DELETE ?id= — removes one study and refreshes the public list. */
export async function DELETE(request: Request) {
  if (!(await requireSession())) return NextResponse.json(UNAUTHORIZED, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json(NOT_CONFIGURED, { status: 503 });

  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, error: 'missing id' }, { status: 400 });

  try {
    await deleteCaseStudy(id);
    revalidateCaseStudies(PUBLIC_PATHS);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[content] case study delete failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not delete.' }, { status: 500 });
  }
}
