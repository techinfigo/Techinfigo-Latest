import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, readSession } from '../../../../lib/auth';
import { isDbConfigured } from '../../../../lib/firestore';
import { revalidateSiteSettings } from '../../../../lib/settings';
import { isPhotoSlot } from '../../../../lib/settings-schema';
import { deletePhoto, processPhoto, savePhoto } from '../../../../lib/site-photos';

/**
 * Website photos. Admin only (cookie session, like /api/admin/settings).
 *  POST multipart { slot, file } → shrink to WebP, store, return its metadata
 *  DELETE ?slot=<slot>          → remove; that spot goes back to how it looked before
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function signedIn(): Promise<boolean> {
  const jar = await cookies();
  return Boolean(await readSession(jar.get(SESSION_COOKIE)?.value));
}

export async function POST(request: Request) {
  if (!(await signedIn())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ ok: false, error: 'The database is not set up.' }, { status: 503 });
  const form = await request.formData().catch(() => null);
  const slot = form?.get('slot');
  const file = form?.get('file');
  if (!isPhotoSlot(slot)) return NextResponse.json({ ok: false, error: 'Unknown photo spot.' }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: 'No photo was attached.' }, { status: 400 });

  const result = await processPhoto(new Uint8Array(await file.arrayBuffer()));
  if (result.ok === false) return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  try {
    const meta = await savePhoto(slot, result.photo);
    revalidateSiteSettings();
    return NextResponse.json({ ok: true, meta });
  } catch (error) {
    console.error('[photos] save failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not save the photo. Try again.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await signedIn())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ ok: false, error: 'The database is not set up.' }, { status: 503 });
  const slot = new URL(request.url).searchParams.get('slot');
  if (!isPhotoSlot(slot)) return NextResponse.json({ ok: false, error: 'Unknown photo spot.' }, { status: 400 });
  try {
    await deletePhoto(slot);
    revalidateSiteSettings();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[photos] delete failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not remove the photo.' }, { status: 500 });
  }
}
