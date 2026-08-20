/**
 * Shapes, defaults and validation for the editable site settings.
 *
 * CLIENT-SAFE by design, exactly like lib/leads-schema.ts. This module has no
 * Firestore import, so a client component can hold a SiteSettings value and
 * import DEFAULT_SETTINGS without dragging firebase-admin — and node:crypto
 * with it — into the browser bundle. The storage half lives in lib/settings.ts.
 *
 * config/site.ts stays the source of the defaults below. Every value here is
 * either what an admin saved or what config/site.ts already said, never a
 * placeholder invented in this file.
 */
import { CAPACITY, CONTACT, PROOF_MODE, TARGETS, site } from '../config/site';

export const PROOF_MODES = ['benchmark', 'client'] as const;
export type ProofMode = (typeof PROOF_MODES)[number];

export const BRAND_ASSET_KINDS = ['logo', 'favicon'] as const;
export type BrandAssetKind = (typeof BRAND_ASSET_KINDS)[number];

/** Uploads above this are rejected: the bytes live inside a Firestore document, capped at 1MB. */
export const BRAND_MAX_BYTES = 200 * 1024;

/** Accepted image types, keyed by the MIME type stored alongside the bytes. */
export const BRAND_MIME_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'] as const;
export type BrandMimeType = (typeof BRAND_MIME_TYPES)[number];

/**
 * What the site knows about an uploaded asset without carrying its bytes.
 *
 * The base64 payload is deliberately absent. This metadata is serialised into
 * every prerendered page — the logo and favicon URLs are built from `hash` —
 * and a few hundred kilobytes of base64 in each page payload would be a
 * self-inflicted performance bug. The bytes are read only by /api/brand/*.
 */
export type BrandAssetMeta = {
  mime: BrandMimeType;
  /** Size of the uploaded file in bytes, before base64 expansion. */
  size: number;
  /** sha256 of the stored bytes. Doubles as the ETag and the ?v= cache buster. */
  hash: string;
  /** ISO-8601. Shown in the admin panel so it is clear which upload is live. */
  uploadedAt: string;
};

export type SiteSettings = {
  founder: { name: string; role: string; linkedin: string };
  contact: { email: string; phone: string };
  icpBand: string;
  capacity: { showScarcity: boolean; slotsOpen: number };
  proofMode: ProofMode;
  targets: { blendedMer: number; netProfit: number; contributionLift: number };
  brand: { logo: BrandAssetMeta | null; favicon: BrandAssetMeta | null };
};

/**
 * The fallback the public site renders when Firestore has no settings document,
 * has an empty one, or is unreachable. Read straight out of config/site.ts so
 * there is exactly one place any default is written down.
 */
export const DEFAULT_SETTINGS: SiteSettings = {
  founder: {
    name: site.founder.name,
    role: site.founder.role,
    linkedin: site.founder.linkedin,
  },
  contact: { email: CONTACT.email, phone: CONTACT.phone },
  icpBand: site.icpBand,
  capacity: { showScarcity: CAPACITY.showScarcity, slotsOpen: CAPACITY.slotsOpen },
  proofMode: PROOF_MODE,
  targets: {
    blendedMer: TARGETS.blendedMer,
    netProfit: TARGETS.netProfit,
    contributionLift: TARGETS.contributionLift,
  },
  brand: { logo: null, favicon: null },
};

// --- field-level normalisation ---------------------------------------------
//
// Every helper below takes `unknown` and returns a usable value. They are the
// single validation path: a stored document is run through the same functions
// as a fresh save, so a value hand-edited in the Firebase console cannot reach
// the public site if the admin form would have rejected it.

/** Per-field caps. Long enough for any real value, short enough to bound the document. */
export const SETTINGS_LIMITS = {
  founderName: 120,
  founderRole: 120,
  linkedin: 300,
  email: 320,
  phone: 50,
  icpBand: 60,
  slotsOpen: 99,
  /** Targets are multiples ("4.8x") and a percentage; nothing real exceeds this. */
  target: 1000,
} as const;

function text(value: unknown, max: number, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim().replace(/\s+/g, ' ');
  return trimmed ? trimmed.slice(0, max) : fallback;
}

/**
 * Only http(s) survives. An admin pasting a `javascript:` URL into the LinkedIn
 * field would otherwise get it rendered as an href on the public homepage.
 */
function httpUrl(value: unknown, max: number): string {
  const raw = text(value, max);
  if (!raw) return '';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return url.toString().slice(0, max);
  } catch {
    return '';
  }
}

/** Permissive on purpose, matching lib/leads.ts: rejecting a real address costs more than a typo. */
function emailAddress(value: unknown): string {
  const raw = text(value, SETTINGS_LIMITS.email);
  if (!raw) return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : '';
}

function bool(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  // The form posts JSON, but a document hand-edited in the console may hold a string.
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function clampNumber(value: unknown, max: number, fallback: number, decimals: number): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  const clamped = Math.min(Math.max(n, 0), max);
  const factor = 10 ** decimals;
  return Math.round(clamped * factor) / factor;
}

function toProofMode(value: unknown): ProofMode {
  return (PROOF_MODES as readonly string[]).includes(value as string)
    ? (value as ProofMode)
    : DEFAULT_SETTINGS.proofMode;
}

function brandMeta(value: unknown): BrandAssetMeta | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  const mime = (BRAND_MIME_TYPES as readonly string[]).includes(v.mime as string)
    ? (v.mime as BrandMimeType)
    : null;
  const size = Number(v.size);
  const hash = typeof v.hash === 'string' ? v.hash.replace(/[^a-f0-9]/gi, '').slice(0, 64) : '';
  // Any one of these missing means the record is not trustworthy enough to
  // build a cache-busting URL from, so treat it as "nothing uploaded".
  if (!mime || !hash || !Number.isFinite(size) || size <= 0) return null;
  const uploadedAt = typeof v.uploadedAt === 'string' ? v.uploadedAt : '';
  return { mime, size, hash, uploadedAt };
}

/**
 * Anything → a complete, safe SiteSettings.
 *
 * Never throws and never returns a partial object: a field that is missing, the
 * wrong type or out of range falls back to its config/site.ts default field by
 * field, so a half-filled document degrades only where it is actually broken
 * rather than discarding the values that were fine.
 */
export function normalizeSettings(input: unknown): SiteSettings {
  const d = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const founder = (d.founder ?? {}) as Record<string, unknown>;
  const contact = (d.contact ?? {}) as Record<string, unknown>;
  const capacity = (d.capacity ?? {}) as Record<string, unknown>;
  const targets = (d.targets ?? {}) as Record<string, unknown>;
  const brand = (d.brand ?? {}) as Record<string, unknown>;

  return {
    founder: {
      name: text(founder.name, SETTINGS_LIMITS.founderName, DEFAULT_SETTINGS.founder.name),
      role: text(founder.role, SETTINGS_LIMITS.founderRole, DEFAULT_SETTINGS.founder.role),
      linkedin: httpUrl(founder.linkedin, SETTINGS_LIMITS.linkedin),
    },
    contact: {
      email: emailAddress(contact.email) || DEFAULT_SETTINGS.contact.email,
      phone: text(contact.phone, SETTINGS_LIMITS.phone, DEFAULT_SETTINGS.contact.phone),
    },
    // Reads mid-sentence ("brands doing X/mo"), so an empty value would leave a
    // hole in the copy. Falls back rather than rendering the gap.
    icpBand: text(d.icpBand, SETTINGS_LIMITS.icpBand, DEFAULT_SETTINGS.icpBand),
    capacity: {
      showScarcity: bool(capacity.showScarcity, DEFAULT_SETTINGS.capacity.showScarcity),
      slotsOpen: clampNumber(
        capacity.slotsOpen,
        SETTINGS_LIMITS.slotsOpen,
        DEFAULT_SETTINGS.capacity.slotsOpen,
        0,
      ),
    },
    proofMode: toProofMode(d.proofMode),
    targets: {
      blendedMer: clampNumber(
        targets.blendedMer,
        SETTINGS_LIMITS.target,
        DEFAULT_SETTINGS.targets.blendedMer,
        1,
      ),
      netProfit: clampNumber(
        targets.netProfit,
        SETTINGS_LIMITS.target,
        DEFAULT_SETTINGS.targets.netProfit,
        1,
      ),
      contributionLift: clampNumber(
        targets.contributionLift,
        SETTINGS_LIMITS.target,
        DEFAULT_SETTINGS.targets.contributionLift,
        0,
      ),
    },
    brand: { logo: brandMeta(brand.logo), favicon: brandMeta(brand.favicon) },
  };
}

/** The bundled image each slot falls back to when nothing has been uploaded. */
export function bundledBrandAsset(kind: BrandAssetKind): string {
  return kind === 'logo' ? '/logo.png' : '/favicon.png';
}

/**
 * The /api/brand/* address for a slot, always.
 *
 * The `?v=` is the content hash, and that is what lets the route answer with a
 * year-long immutable cache header: a new upload changes the hash, so it is a
 * different URL and no browser can keep serving the previous image from cache.
 * Without an upload the route redirects to the bundled file.
 *
 * Used for the favicon, which browsers cache harder than anything else on a
 * page and which therefore wants one durable address rather than a URL that
 * moves between the route and public/ depending on what is stored.
 */
export function brandRouteUrl(kind: BrandAssetKind, meta: BrandAssetMeta | null): string {
  const base = `/api/brand/${kind}`;
  return meta ? `${base}?v=${meta.hash.slice(0, 16)}` : base;
}

/**
 * Same, but pointing straight at the bundled file when nothing is uploaded, so
 * the common case costs no redirect. Used for the logo, which appears in the
 * footer of every page.
 */
export function brandAssetUrl(kind: BrandAssetKind, meta: BrandAssetMeta | null): string {
  return meta ? brandRouteUrl(kind, meta) : bundledBrandAsset(kind);
}
