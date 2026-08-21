import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, readSession } from '../../../../lib/auth';
import { isDbConfigured } from '../../../../lib/firestore';
import {
  getPageContentUncached,
  revalidatePageContent,
  savePageContent,
} from '../../../../lib/content';
import { PAGE_IDS, normalisePage, type PageId } from '../../../../lib/content-schema';
import { PAGE_SPECS } from '../../../../lib/content-fields';

/**
 * Read and write editable page copy. Admin only.
 *
 * The auth check is the same shape as the settings and leads routes — a cookie
 * session, 401 without one — rather than middleware, which matches
 * `/admin/:path*` and deliberately does not reach into /api because it runs on
 * the Edge and must not touch anything Node-only.
 *
 * Nothing the client sends is trusted. Every payload goes through
 * normalisePage(), the same function that sanitises a document read back out
 * of Firestore, so an over-length paragraph or a field of the wrong type is
 * clamped or replaced with its default here rather than reaching a page.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function requireSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(await readSession(cookieStore.get(SESSION_COOKIE)?.value));
}

const UNAUTHORIZED = { ok: false, error: 'unauthorized' } as const;
const NOT_CONFIGURED = {
  ok: false,
  error:
    'Firestore is not configured, so there is nowhere to save. Set FIREBASE_PROJECT_ID, ' +
    'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY, then restart the server.',
} as const;

function isPageId(value: unknown): value is PageId {
  return (PAGE_IDS as readonly string[]).includes(value as string);
}

/** GET ?page=home — the stored copy, uncached, so the form shows what is really saved. */
export async function GET(request: Request) {
  if (!(await requireSession())) return NextResponse.json(UNAUTHORIZED, { status: 401 });

  const page = new URL(request.url).searchParams.get('page');
  if (!isPageId(page)) {
    return NextResponse.json({ ok: false, error: 'unknown page' }, { status: 400 });
  }

  if (!isDbConfigured()) {
    // Not an error: the form is still usable, it just shows the copy it would
    // be editing once a database exists.
    return NextResponse.json({ ok: true, configured: false, content: normalisePage(page, null) });
  }

  try {
    return NextResponse.json({
      ok: true,
      configured: true,
      content: await getPageContentUncached(page),
    });
  } catch (error) {
    console.error('[content] read failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not read the saved copy.' }, { status: 500 });
  }
}

/** PUT { page, content } — save, then drop that page's cache tag so it regenerates. */
export async function PUT(request: Request) {
  if (!(await requireSession())) return NextResponse.json(UNAUTHORIZED, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json(NOT_CONFIGURED, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    page?: unknown;
    content?: unknown;
  } | null;

  if (!body || !isPageId(body.page)) {
    return NextResponse.json({ ok: false, error: 'unknown page' }, { status: 400 });
  }

  const page = body.page;
  const content = normalisePage(page, body.content);

  try {
    await savePageContent(page, content);
  } catch (error) {
    console.error('[content] save failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not save.' }, { status: 500 });
  }

  // Only this page's tag and route. An FAQ edit must not throw away the
  // homepage's cache — see the note on revalidatePageContent().
  revalidatePageContent(page, [PAGE_SPECS[page].route]);

  return NextResponse.json({ ok: true, content });
}
