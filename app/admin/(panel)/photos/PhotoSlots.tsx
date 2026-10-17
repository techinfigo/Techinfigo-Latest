'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PHOTO_SLOTS, photoUrl, type PhotoMeta, type PhotoSlotId, type SiteSettings } from '../../../../lib/settings-schema';

/**
 * One card per photo spot: preview, upload, remove.
 * Phone photos are often 5-10 MB, so the browser first shrinks them to 2000px
 * (a JPEG of a few hundred KB) before sending; the server then makes the final
 * WebP. Nothing is sent until you pick a file.
 */

async function shrink(file: File): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 900 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.88));
    return blob || file;
  } catch {
    return file;
  }
}

const SHAPE: Record<string, string> = { portrait: 'aspect-[4/5]', landscape: 'aspect-[4/3]', wide: 'aspect-[16/9]', square: 'aspect-square' };

function Slot({ slot, meta, configured, onChange }: { slot: (typeof PHOTO_SLOTS)[number]; meta?: PhotoMeta; configured: boolean; onChange: (m: PhotoMeta | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<{ busy?: string; error?: string; done?: string }>({});

  async function upload(file: File) {
    setState({ busy: 'Uploading…' });
    const body = new FormData();
    body.set('slot', slot.id);
    body.set('file', await shrink(file), 'photo');
    const res = await fetch('/api/admin/photos', { method: 'POST', body }).catch(() => null);
    const data = (await res?.json().catch(() => null)) as { ok?: boolean; error?: string; meta?: PhotoMeta } | null;
    if (!res || !res.ok || !data?.ok || !data.meta) return setState({ error: data?.error || 'Upload failed. Check your connection.' });
    onChange(data.meta);
    setState({ done: 'Uploaded. Live on the site now.' });
  }

  async function remove() {
    if (!window.confirm(`Remove "${slot.label}"? That part of the site goes back to how it looked before.`)) return;
    setState({ busy: 'Removing…' });
    const res = await fetch(`/api/admin/photos?slot=${slot.id}`, { method: 'DELETE' }).catch(() => null);
    const data = (await res?.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res || !res.ok || !data?.ok) return setState({ error: data?.error || 'Could not remove.' });
    onChange(null);
    setState({ done: 'Removed.' });
  }

  return (
    <div className="border border-white/10 rounded-2xl p-4 space-y-3 bg-white/[0.02]">
      <div className={`${SHAPE[slot.shape]} w-full rounded-xl overflow-hidden bg-white/5 flex items-center justify-center`}>
        {meta ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl(slot.id as PhotoSlotId, meta)} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">No photo yet</span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-black text-white">{slot.label}</p>
        <p className="text-[11px] text-brandYellow font-bold">Shows on: {slot.where}</p>
        <p className="text-xs text-white/50 leading-relaxed">{slot.hint}</p>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (f) upload(f);
        }}
      />
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!configured || !!state.busy}
          onClick={() => input.current?.click()}
          className="flex-1 px-3 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] bg-brandYellow text-brandDark disabled:opacity-50"
        >
          {state.busy || (meta ? 'Replace' : 'Upload')}
        </button>
        {meta && (
          <button type="button" disabled={!!state.busy} onClick={remove} className="px-3 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] bg-white/8 text-white/70 hover:bg-white/15">
            Remove
          </button>
        )}
      </div>
      {state.error && <p className="text-red-400 text-xs font-medium">{state.error}</p>}
      {state.done && <p className="text-emerald-400 text-xs font-medium">{state.done}</p>}
    </div>
  );
}

export function PhotoSlots({ initial, configured }: { initial: SiteSettings['photos']; configured: boolean }) {
  const router = useRouter();
  const [photos, setPhotos] = useState(initial);
  const groups: { title: string; ids: string[] }[] = [
    { title: 'You and your office', ids: ['founder', 'office', 'team', 'behind'] },
    { title: 'Your work (service pages)', ids: PHOTO_SLOTS.filter((s) => s.id.startsWith('work-')).map((s) => s.id) },
    { title: 'Industries (Who We Fit)', ids: PHOTO_SLOTS.filter((s) => s.id.startsWith('fit-')).map((s) => s.id) },
  ];
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <section key={g.title} className="space-y-4">
          <h2 className="text-lg font-black uppercase tracking-tighter">{g.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHOTO_SLOTS.filter((s) => g.ids.includes(s.id)).map((slot) => (
              <Slot
                key={slot.id}
                slot={slot}
                meta={photos[slot.id as PhotoSlotId]}
                configured={configured}
                onChange={(m) => {
                  setPhotos((p) => {
                    const next = { ...p };
                    if (m) next[slot.id as PhotoSlotId] = m;
                    else delete next[slot.id as PhotoSlotId];
                    return next;
                  });
                  router.refresh();
                }}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
