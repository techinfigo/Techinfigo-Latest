'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DEFAULT_CASE_STUDY_LIST, type CaseStudy } from '../../../../../lib/content-schema';

/**
 * Create, edit, publish and order case studies.
 *
 * Client component holding plain data only: the list arrives as a prop from
 * the server page and every write goes through /api/admin/case-studies. No
 * Firestore module is reachable from here.
 *
 * Publishing is the loudest control on the screen on purpose — it is the one
 * action with a public consequence.
 */

const INPUT =
  'w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brandYellow/50 transition-colors disabled:opacity-40';

function blankStudy(order: number): CaseStudy {
  // Shaped from the shipped example so every nested field exists — a partial
  // object would fail normalisation into the defaults and confuse the editor.
  const template = DEFAULT_CASE_STUDY_LIST[0];
  return {
    ...structuredClone(template),
    slug: '',
    brand: '',
    published: false,
    order,
  };
}

export function CaseStudyManager({
  initial,
  configured,
}: {
  initial: CaseStudy[];
  configured: boolean;
}) {
  const [studies, setStudies] = useState(initial);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function refresh() {
    const response = await fetch('/api/admin/case-studies');
    const data = await response.json();
    if (data.ok) setStudies(data.studies);
  }

  async function save(study: CaseStudy) {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/case-studies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: study.id ?? null, study }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setMessage({ ok: false, text: data.error ?? 'Could not save.' });
        return;
      }
      await refresh();
      setEditing(null);
      setMessage({
        ok: true,
        text: study.published
          ? 'Saved and published — it is live on /case-studies now.'
          : 'Saved as a draft. It is not on the public site.',
      });
    } catch {
      setMessage({ ok: false, text: 'Could not reach the server.' });
    } finally {
      setBusy(false);
    }
  }

  async function togglePublished(study: CaseStudy) {
    await save({ ...study, published: !study.published });
  }

  async function remove(study: CaseStudy) {
    if (!study.id) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/case-studies?id=${encodeURIComponent(study.id)}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.ok) {
        setMessage({ ok: false, text: data.error ?? 'Could not delete.' });
        return;
      }
      await refresh();
      setMessage({ ok: true, text: `Deleted “${study.brand}”.` });
    } finally {
      setBusy(false);
    }
  }

  async function move(study: CaseStudy, direction: -1 | 1) {
    const ordered = [...studies].sort((a, b) => a.order - b.order);
    const index = ordered.findIndex((s) => s.id === study.id);
    const swapWith = ordered[index + direction];
    if (!swapWith) return;
    setBusy(true);
    try {
      // Two writes rather than a transaction: ordering is cosmetic, and a
      // half-applied swap is visible and trivially fixed by pressing again.
      await fetch('/api/admin/case-studies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: study.id, study: { ...study, order: swapWith.order } }),
      });
      await fetch('/api/admin/case-studies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: swapWith.id, study: { ...swapWith, order: study.order } }),
      });
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <StudyEditor
        study={editing}
        busy={busy}
        message={message}
        onCancel={() => {
          setEditing(null);
          setMessage(null);
        }}
        onSave={save}
      />
    );
  }

  const ordered = [...studies].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setEditing(blankStudy(ordered.length))}
          disabled={busy || !configured}
          className="px-6 py-3 bg-brandYellow text-brandDark rounded-xl text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-40"
        >
          New case study
        </button>
        <Link
          href="/case-studies"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55 hover:text-white transition-colors"
        >
          View page ↗<span className="sr-only"> (opens in a new tab)</span>
        </Link>
        {message ? (
          <p
            className={`text-sm font-medium ${message.ok ? 'text-brandYellow' : 'text-red-300'}`}
            role="status"
          >
            {message.text}
          </p>
        ) : null}
      </div>

      {ordered.length === 0 ? (
        <p className="text-white/55 text-sm font-medium py-12 text-center border border-white/15 rounded-2xl">
          No case studies yet. The public page falls back to the two benchmark examples that ship
          with the site until you add one.
        </p>
      ) : (
        <div className="space-y-3">
          {ordered.map((study, index) => (
            <div
              key={study.id ?? study.slug}
              className="border border-white/15 rounded-xl p-4 flex flex-wrap items-center gap-4"
            >
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-bold text-sm truncate">{study.brand || '(untitled)'}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                  {study.category} · position {index + 1}
                </p>
              </div>

              <span
                className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                  study.published
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'bg-brandYellow/15 text-brandYellow'
                }`}
              >
                {study.published ? 'Live' : 'Draft'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => move(study, -1)}
                  disabled={busy || index === 0}
                  aria-label={`Move ${study.brand} up`}
                  className="px-2 py-2 rounded-lg border border-white/15 text-white/55 hover:text-white disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(study, 1)}
                  disabled={busy || index === ordered.length - 1}
                  aria-label={`Move ${study.brand} down`}
                  className="px-2 py-2 rounded-lg border border-white/15 text-white/55 hover:text-white disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => setEditing(study)}
                  disabled={busy}
                  className="px-4 py-2 rounded-lg border border-white/15 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 hover:border-white/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublished(study)}
                  disabled={busy}
                  className="px-4 py-2 rounded-lg border border-white/15 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 hover:border-brandYellow/50"
                >
                  {study.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => remove(study)}
                  disabled={busy}
                  className="px-4 py-2 rounded-lg border border-red-500/30 text-[10px] font-black uppercase tracking-[0.2em] text-red-300 hover:border-red-500/60"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StudyEditor({
  study,
  busy,
  message,
  onCancel,
  onSave,
}: {
  study: CaseStudy;
  busy: boolean;
  message: { ok: boolean; text: string } | null;
  onCancel: () => void;
  onSave: (study: CaseStudy) => void;
}) {
  const [draft, setDraft] = useState(study);
  const set = (patch: Partial<CaseStudy>) => setDraft((d) => ({ ...d, ...patch }));
  const setBefore = (patch: Partial<CaseStudy['before']>) =>
    setDraft((d) => ({ ...d, before: { ...d.before, ...patch } }));
  const setAfter = (patch: Partial<CaseStudy['after']>) =>
    setDraft((d) => ({ ...d, after: { ...d.after, ...patch } }));

  const field = (
    id: string,
    label: string,
    where: string,
    value: string,
    onChange: (v: string) => void,
    textarea = false,
  ) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/55">
        {label}
      </label>
      <p className="text-white/55 text-xs font-medium leading-relaxed">{where}</p>
      {textarea ? (
        <textarea id={id} rows={2} value={value} disabled={busy} onChange={(e) => onChange(e.target.value)} className={INPUT} />
      ) : (
        <input id={id} type="text" value={value} disabled={busy} onChange={(e) => onChange(e.target.value)} className={INPUT} />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="border border-white/15 rounded-2xl p-6 space-y-5">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Case study
        </h2>
        {field('cs-brand', 'Brand name', 'The heading on the card and in the detail panel.', draft.brand, (v) => set({ brand: v }))}
        {field('cs-slug', 'Reference', 'A short internal id. Lower case, no spaces.', draft.slug, (v) => set({ slug: v }))}
        {field('cs-category', 'Category', 'Used by the filter chips on /case-studies.', draft.category, (v) => set({ category: v }))}
        {field('cs-highlight', 'Headline result', 'The single bold claim shown across the top of the card.', draft.highlight, (v) => set({ highlight: v }), true)}
      </section>

      <section className="border border-white/15 rounded-2xl p-6 space-y-5">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">Before</h2>
        {field('cs-b-spend', 'Ad spend', 'Shown in the "before" column.', draft.before.spend, (v) => setBefore({ spend: v }))}
        {field('cs-b-roas', 'ROAS', 'Shown in the "before" column.', draft.before.roas, (v) => setBefore({ roas: v }))}
        {field('cs-b-profit', 'Profit', 'Shown in the "before" column.', draft.before.profit, (v) => setBefore({ profit: v }))}
        {field('cs-b-pain', 'The problem', 'One line describing what was wrong.', draft.before.pain, (v) => setBefore({ pain: v }), true)}
      </section>

      <section className="border border-white/15 rounded-2xl p-6 space-y-5">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">After</h2>
        {field('cs-a-spend', 'Ad spend', 'Shown in the "after" column.', draft.after.spend, (v) => setAfter({ spend: v }))}
        {field('cs-a-profit', 'Profit', 'Shown in the "after" column.', draft.after.profit, (v) => setAfter({ profit: v }))}
        {field('cs-a-cac', 'CAC reduction', 'Shown in the "after" column.', draft.after.cacReduction, (v) => setAfter({ cacReduction: v }))}
        {field('cs-a-gain', 'Outcome label', 'The short state description under the after figures.', draft.after.gain, (v) => setAfter({ gain: v }))}
      </section>

      <section className="border border-white/15 rounded-2xl p-6 space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Publishing
        </h2>
        <p className="text-white/55 text-xs font-medium leading-relaxed">
          A draft is saved but never appears on the public site. Publishing puts it on
          /case-studies immediately.
        </p>
        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
          <input
            type="checkbox"
            checked={draft.published}
            disabled={busy}
            onChange={(e) => set({ published: e.target.checked })}
            className="w-4 h-4 accent-brandYellow"
          />
          Published — visible on the public site
        </label>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => onSave(draft)}
          disabled={busy}
          className="px-6 py-3 bg-brandYellow text-brandDark rounded-xl text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-40"
        >
          {busy ? 'Saving…' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          disabled={busy}
          className="px-6 py-3 border border-white/15 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white/80 hover:border-white/30"
        >
          Cancel
        </button>
        {message ? (
          <p className={`text-sm font-medium ${message.ok ? 'text-brandYellow' : 'text-red-300'}`} role="status">
            {message.text}
          </p>
        ) : null}
      </div>
    </div>
  );
}
