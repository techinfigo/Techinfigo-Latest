import { createHash } from 'node:crypto';
import {
  BRAND_MAX_BYTES,
  type BrandAssetMeta,
  type BrandMimeType,
} from './settings-schema';

/**
 * NODE RUNTIME ONLY. Imports node:crypto, so the same rule that keeps
 * lib/auth-node.ts and lib/firestore.ts out of middleware.ts applies here: a
 * single node: specifier in that module graph breaks the Edge bundle. Only the
 * /api/brand/* and /api/admin/settings route handlers import this.
 *
 * Firebase Storage is deliberately not used. It would mean another console
 * setup step for whoever runs this site, so a logo and a favicon — two small
 * files that change perhaps twice a year — are stored base64 inside the
 * settings document instead. That is why the size cap below is not optional:
 * a Firestore document caps at 1MB total, and base64 costs a further ~33%.
 */

/** What is actually stored in Firestore alongside the metadata. */
export type StoredBrandAsset = BrandAssetMeta & { data: string };

/**
 * The complementary `?: undefined` members are what make this narrow under this
 * project's non-strict tsconfig, the same reason ParsedLead is shaped this way.
 * `reason` is a discriminator so a caller can map a refusal to a status code
 * without pattern-matching the human-readable message.
 */
export type BrandValidation =
  | { ok: true; asset: StoredBrandAsset; error?: undefined; reason?: undefined }
  | {
      ok: false;
      asset?: undefined;
      error: string;
      reason: 'empty' | 'too-large' | 'unsupported-format';
    };

/** Sizes are reported to a human in the admin panel, so KB beats raw bytes. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function startsWith(bytes: Uint8Array, signature: readonly number[]): boolean {
  if (bytes.length < signature.length) return false;
  return signature.every((byte, i) => bytes[i] === byte);
}

const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] as const;
const JPEG = [0xff, 0xd8, 0xff] as const;
const RIFF = [0x52, 0x49, 0x46, 0x46] as const; // "RIFF"
const WEBP = [0x57, 0x45, 0x42, 0x50] as const; // "WEBP", at offset 8

/**
 * Identify the format from the bytes themselves.
 *
 * The filename and the browser-supplied Content-Type are both attacker-chosen
 * — renaming `payload.html` to `logo.png` is one keystroke — so neither is
 * consulted. Returns null for anything that is not one of the four accepted
 * formats, which is also what rejects a corrupt or truncated upload.
 */
export function sniffImageMime(bytes: Uint8Array): BrandMimeType | null {
  if (startsWith(bytes, PNG)) return 'image/png';
  if (startsWith(bytes, JPEG)) return 'image/jpeg';
  if (startsWith(bytes, RIFF) && bytes.length >= 12) {
    const tag = bytes.subarray(8, 12);
    if (WEBP.every((byte, i) => tag[i] === byte)) return 'image/webp';
    return null;
  }
  // SVG is text, so there is no magic number — but it is still a structural
  // check, not a filename one: the payload has to actually open an <svg> root
  // after nothing but whitespace, an XML declaration, a doctype or comments.
  if (isSvg(bytes)) return 'image/svg+xml';
  return null;
}

function isSvg(bytes: Uint8Array): boolean {
  // A UTF-8 BOM is legal in front of an XML declaration; skip it before decoding.
  const start = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ? 3 : 0;
  // 1KB is far more than any prologue needs and bounds the work on a large file.
  const head = Buffer.from(bytes.subarray(start, start + 1024)).toString('utf8');
  const stripped = head
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trimStart();
  return /^<svg[\s>]/i.test(stripped);
}

/**
 * Bytes → a storable asset, or a message explaining the refusal.
 *
 * `label` is the human name of the slot ("Logo" / "Favicon") so the error the
 * admin reads names the thing they were uploading.
 */
export function validateBrandUpload(bytes: Uint8Array, label: string): BrandValidation {
  if (bytes.length === 0) {
    return { ok: false, reason: 'empty', error: `${label} file is empty.` };
  }

  // Checked before the format sniff so an oversized file gets the size error,
  // which is the actionable one, rather than a format complaint.
  if (bytes.length > BRAND_MAX_BYTES) {
    return {
      ok: false,
      reason: 'too-large',
      error:
        `${label} is ${formatBytes(bytes.length)} — over the ${formatBytes(BRAND_MAX_BYTES)} limit. ` +
        `Images are stored inside a Firestore document, which caps at 1 MB total. ` +
        `Compress it or export it at a smaller size and try again.`,
    };
  }

  const mime = sniffImageMime(bytes);
  if (!mime) {
    return {
      ok: false,
      reason: 'unsupported-format',
      error: `${label} is not a PNG, JPEG, SVG or WebP image. The file's contents were checked, not its name — re-export it in one of those formats.`,
    };
  }

  const data = Buffer.from(bytes).toString('base64');
  return {
    ok: true,
    asset: {
      data,
      mime,
      size: bytes.length,
      // Hashing the raw bytes, not the base64, so the same image always yields
      // the same ETag regardless of how it was encoded on the way in.
      hash: createHash('sha256').update(bytes).digest('hex'),
      uploadedAt: new Date().toISOString(),
    },
  };
}
