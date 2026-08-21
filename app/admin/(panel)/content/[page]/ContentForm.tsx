'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  PAGE_SPECS,
  getPath,
  setPath,
  type FieldSpec,
  type ListSpec,
} from '../../../../../lib/content-fields';
import { PAGE_LABELS, type PageId, type SiteContent } from '../../../../../lib/content-schema';

/**
 * The editor for one page's copy.
 *
 * Renders from PAGE_SPECS rather than hand-built markup, so a field cannot be
 * added to the content model without a label and a "where it appears" line
 * turning up here with it.
 *
 * Client component, but it holds only plain data: the content arrives as a
 * prop from the server page, and saving goes through /api/admin/content. No
 * Firestore module is reachable from this file.
 */

const INPUT =
  'w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brandYellow/50 transition-colors disabled:opacity-40';

export function ContentForm({
  page,
  initial,
  configured,
}: {
  page: PageId;
  initial: SiteContent[PageId];
  configured: boolean;
}) {
  const spec = PAGE_SPECS[page];
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  function update(path: string, value: unknown) {
    setContent((current) => setPath(current, path, value));
    setMessage(null);
  }

  function updateListItem(listPath: string, index: number, key: string, value: string) {
    const rows = [...((getPath(content, listPath) as unknown as Record<string, unknown>[]) ?? [])];
    rows[index] = { ...rows[index], [key]: value };
    update(listPath, rows);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, content }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setMessage({ ok: false, text: data.error ?? 'Could not save.' });
      } else {
        // Show what was actually stored, not what was typed — the server
        // trims and clamps, and the form should not pretend otherwise.
        setContent(data.content);
        setMessage({ ok: true, text: 'Saved. The page is already updated — no deploy needed.' });
      }
    } catch {
      setMessage({ ok: false, text: 'Could not reach the server.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {spec.fields.length > 0 ? (
        <section className="border border-white/15 rounded-2xl p-6 space-y-5">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
            {PAGE_LABELS[page]}
          </h2>
          {spec.fields.map((field) => (
            <Field
              key={field.path}
              field={field}
              value={getPath(content, field.path) ?? ''}
              disabled={saving}
              onChange={(v) => update(field.path, v)}
            />
          ))}
        </section>
      ) : null}

      {spec.lists.map((list) => (
        <ListEditor
          key={list.path}
          list={list}
          rows={(getPath(content, list.path) as unknown as Record<string, string>[]) ?? []}
          disabled={saving}
          onChange={(index, key, value) => updateListItem(list.path, index, key, value)}
        />
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={save}
          disabled={saving || !configured}
          className="px-6 py-3 bg-brandYellow text-brandDark rounded-xl text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-40 transition-opacity"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <Link
          href={spec.route}
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
    </div>
  );
}

function Field({
  field,
  value,
  disabled,
  onChange,
}: {
  field: FieldSpec;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const id = `field-${field.path.replace(/\./g, '-')}`;
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/55"
      >
        {field.label}
      </label>
      {/* Where it appears, in plain language. A label alone does not tell an
          editor what they are about to change on a live site. */}
      <p className="text-white/55 text-xs font-medium leading-relaxed">{field.where}</p>
      {field.kind === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          maxLength={field.max}
          disabled={disabled}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          maxLength={field.max}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT}
        />
      )}
    </div>
  );
}

function ListEditor({
  list,
  rows,
  disabled,
  onChange,
}: {
  list: ListSpec;
  rows: Record<string, string>[];
  disabled: boolean;
  onChange: (index: number, key: string, value: string) => void;
}) {
  return (
    <section className="border border-white/15 rounded-2xl p-6 space-y-5">
      <div className="space-y-1">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          {list.label}
        </h2>
        <p className="text-white/55 text-xs font-medium leading-relaxed">{list.where}</p>
      </div>

      {rows.map((row, index) => (
        <div key={index} className="border border-white/15 rounded-xl p-4 space-y-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
            Item {index + 1} of {rows.length}
          </p>
          {list.fields.map((f) => {
            const id = `${list.path}-${index}-${f.key}`;
            return (
              <div key={f.key} className="space-y-2">
                <label
                  htmlFor={id}
                  className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/55"
                >
                  {f.label}
                </label>
                {f.kind === 'textarea' ? (
                  <textarea
                    id={id}
                    value={row[f.key] ?? ''}
                    maxLength={f.max}
                    disabled={disabled}
                    rows={2}
                    onChange={(e) => onChange(index, f.key, e.target.value)}
                    className={INPUT}
                  />
                ) : (
                  <input
                    id={id}
                    type="text"
                    value={row[f.key] ?? ''}
                    maxLength={f.max}
                    disabled={disabled}
                    onChange={(e) => onChange(index, f.key, e.target.value)}
                    className={INPUT}
                  />
                )}
              </div>
            );
          })}
          {list.readOnlyKeys?.map((ro) => (
            <p key={ro.key} className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
              {ro.label}: <span className="text-white/80">{row[ro.key] ?? '—'}</span> · {ro.note}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
