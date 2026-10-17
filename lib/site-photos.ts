import { createHash } from 'node:crypto';
import { unstable_cache } from 'next/cache';
import sharp from 'sharp';
import { getDb, isDbConfigured } from './firestore';
import { SITE_SETTINGS_TAG } from './settings';
import type { PhotoMeta, PhotoSlotId } from './settings-schema';

/**
 * NODE RUNTIME ONLY. Website photos (admin → Website photos).
 *
 * Like the logo, photos live in Firestore rather than Firebase Storage (no
 * extra console setup). Each photo is its own document in `sitePhotos/<slot>`,
 * shrunk on upload to a WebP no wider than 1600px and under ~700KB, so it fits
 * a 1MB document. The settings document holds only the small metadata pages
 * need (hash, width, height); the bytes are read only by /api/photo/<slot>.
 */

const COLLECTION = 'sitePhotos';
const MAX_SIDE = 1600;
const MAX_STORED = 700 * 1024;
export const PHOTO_MAX_UPLOAD = 4 * 1024 * 1024;

type StoredPhoto = PhotoMeta & { data: string; mime: 'image/webp' };

export type PhotoResult = { ok: true; photo: StoredPhoto } | { ok: false; error: string };

/** Any phone photo (JPEG/PNG/WebP/HEIC that sharp can read) → a compact WebP. */
export async function processPhoto(bytes: Uint8Array): Promise<PhotoResult> {
  if (!bytes.length) return { ok: false, error: 'The file is empty.' };
  if (bytes.length > PHOTO_MAX_UPLOAD) return { ok: false, error: 'The photo is too large. Please pick one under 4 MB.' };
  let meta;
  try {
    meta = await sharp(bytes).metadata();
  } catch {
    return { ok: false, error: 'This file is not a photo we can read. Use a JPG, PNG or WebP.' };
  }
  if (!meta.format || !['jpeg', 'png', 'webp', 'heif', 'avif', 'tiff'].includes(meta.format)) {
    return { ok: false, error: 'This file is not a photo we can read. Use a JPG, PNG or WebP.' };
  }
  for (const quality of [80, 70, 60, 50]) {
    const { data, info } = await sharp(bytes)
      .rotate() // respect the phone's orientation
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toBuffer({ resolveWithObject: true });
    if (data.length <= MAX_STORED || quality === 50) {
      return {
        ok: true,
        photo: {
          data: data.toString('base64'),
          mime: 'image/webp',
          hash: createHash('sha256').update(data).digest('hex'),
          width: info.width,
          height: info.height,
          uploadedAt: new Date().toISOString(),
        },
      };
    }
  }
  return { ok: false, error: 'Could not shrink this photo.' };
}

export async function savePhoto(slot: PhotoSlotId, photo: StoredPhoto): Promise<PhotoMeta> {
  const db = getDb();
  await db.collection(COLLECTION).doc(slot).set(photo);
  const meta: PhotoMeta = { hash: photo.hash, width: photo.width, height: photo.height, uploadedAt: photo.uploadedAt };
  await db.collection('settings').doc('site').set({ photos: { [slot]: meta } }, { merge: true });
  return meta;
}

export async function deletePhoto(slot: PhotoSlotId): Promise<void> {
  const db = getDb();
  await db.collection('settings').doc('site').set({ photos: { [slot]: null } }, { merge: true });
  await db.collection(COLLECTION).doc(slot).delete();
}

const readCachedPhoto = unstable_cache(
  async (slot: string): Promise<{ data: string; hash: string } | null> => {
    if (!isDbConfigured()) return null;
    const snap = await getDb().collection(COLLECTION).doc(slot).get();
    if (!snap.exists) return null;
    const data = snap.get('data');
    const hash = snap.get('hash');
    return typeof data === 'string' && typeof hash === 'string' ? { data, hash } : null;
  },
  ['site-photo-v1'],
  { tags: [SITE_SETTINGS_TAG] },
);

export async function getPhoto(slot: PhotoSlotId): Promise<{ data: string; hash: string } | null> {
  try {
    return await readCachedPhoto(slot);
  } catch (error) {
    console.error(`[photos] read failed for ${slot}:`, error);
    return null;
  }
}
