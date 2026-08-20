'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  BRAND_MAX_BYTES,
  brandAssetUrl,
  type BrandAssetKind,
  type BrandAssetMeta,
} from '../../../../lib/settings-schema';

/**
 * Upload control for one brand image.
 *
 * The file goes up as multipart form-data, not base64 JSON, so the server sees
 * the real bytes and can identify the format from them. The size is checked
 * here too — purely so an obviously oversized file fails instantly instead of
 * after a slow upload. The server repeats every check; this one is a courtesy,
 * not the enforcement.
 */

const COPY: Record<BrandAssetKind, { title: string; where: string; hint: string }> = {
  logo: {
    title: 'Logo',
    where: 'Shown in the footer of every page.',
    hint: 'A wide, transparent PNG or SVG works best — it is rendered white on the dark footer.',
  },
  favicon: {
    title: 'Favicon',
    where: 'The small icon in the browser tab and in bookmarks.',
    hint: 'A square PNG, 32×32 or larger. Browsers cache these hard, so allow a few minutes.',
  },
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(kb < 10 ? 1 : 0)} KB` : `${(kb / 1024).toFixed(2)} MB`;
}

type UploadState =
  | { status: 'idle' }
  | { status: 'busy'; verb: string }
  | { status: 'done'; message: string }
  | { status: 'error'; message: string };

export function BrandUpload({
  kind,
  meta,
  configured,
}: {
  kind: BrandAssetKind;
  meta: BrandAssetMeta | null;
  configured: boolean;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [state, setState] = useState<UploadState>({ status: 'idle' });
  const input = useRef<HTMLInputElement>(null);
  const copy = COPY[kind];

  async function upload(file: File) {
    if (file.size > BRAND_MAX_BYTES) {
      setState({
        status: 'error',
        message: `${copy.title} is ${formatBytes(file.size)} — over the ${formatBytes(
          BRAND_MAX_BYTES,
        )} limit. Compress it or export it smaller and try again.`,
      });
      return;
    }

    setState({ status: 'busy', verb: 'Uploading…' });

    const body = new FormData();
    body.set('kind', kind);
    body.set('file', file);

    const response = await fetch('/api/admin/settings', { method: 'POST', body }).catch(() => null);
    if (!response) {
      setState({ status: 'error', message: 'Could not reach the server. Check your connection.' });
      return;
    }

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok || !data?.ok) {
      setState({ status: 'error', message: data?.error ?? `Upload failed (${response.status}).` });
      return;
    }

    setState({ status: 'done', message: 'Uploaded. The site picks it up on its next visit.' });
    startTransition(() => router.refresh());
  }

  async function remove() {
    setState({ status: 'busy', verb: 'Removing…' });

    const response = await fetch(`/api/admin/settings?kind=${kind}`, { method: 'DELETE' }).catch(
      () => null,
    );
    const data = (await response?.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response || !response.ok || !data?.ok) {
      setState({ status: 'error', message: data?.error ?? 'Could not remove the image.' });
      return;
    }

    setState({ status: 'done', message: 'Removed — back to the image that ships with the site.' });
    startTransition(() => router.refresh());
  }

  const busy = state.status === 'busy';
  // Cache-busted by the content hash, so the preview never shows the old image.
  const preview = brandAssetUrl(kind, meta);

  return (
    <div className="border border-white/10 rounded-2xl p-6 space-y-5">
      <div className="space-y-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          {copy.title}
        </h3>
        <p className="text-white/40 text-sm font-medium">{copy.where}</p>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <div className="w-28 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- the source is
              a database-backed route with a content-hashed URL, already the
              cache strategy next/image would add, and it may be an SVG. */}
          <img src={preview} alt={`Current ${copy.title.toLowerCase()}`} className="max-w-full max-h-full object-contain" />
        </div>

        <div className="space-y-1 text-xs font-medium">
          {meta ? (
            <>
              <p className="text-white/70">
                {meta.mime.replace('image/', '').replace('svg+xml', 'svg').toUpperCase()} ·{' '}
                {formatBytes(meta.size)}
              </p>
              <p className="text-white/35">
                Uploaded {meta.uploadedAt ? meta.uploadedAt.slice(0, 16).replace('T', ' ') : '—'}
              </p>
            </>
          ) : (
            <p className="text-white/35 max-w-xs leading-relaxed">
              Nothing uploaded — the site is using the {kind === 'logo' ? 'logo.png' : 'favicon.png'}{' '}
              that ships with it.
            </p>
          )}
          <p className="text-white/25 max-w-xs leading-relaxed pt-1">{copy.hint}</p>
        </div>
      </div>

      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          // Reset first, so re-picking the same file after a failure still fires.
          event.target.value = '';
          if (file) void upload(file);
        }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={busy || !configured}
          onClick={() => input.current?.click()}
          className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white/80 disabled:opacity-40 transition-colors"
        >
          {busy ? state.verb : meta ? `Replace ${copy.title.toLowerCase()}` : `Upload ${copy.title.toLowerCase()}`}
        </button>

        {meta ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void remove()}
            className="px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white/80 disabled:opacity-40 transition-colors"
          >
            Remove
          </button>
        ) : null}

        <span className="text-white/25 text-xs font-medium">
          PNG, JPEG, SVG or WebP · up to {formatBytes(BRAND_MAX_BYTES)}
        </span>
      </div>

      {state.status === 'done' ? (
        <p role="status" className="text-emerald-300 text-sm font-medium">
          {state.message}
        </p>
      ) : null}

      {state.status === 'error' ? (
        <p role="alert" className="text-red-400 text-sm font-medium leading-relaxed">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
