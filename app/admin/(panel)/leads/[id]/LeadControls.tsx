'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LEAD_STATUSES, type LeadStatus } from '../../../../../lib/leads-schema';

// leadId is a Firestore document id — an opaque string, not a serial integer.
export function LeadControls({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useState<LeadStatus>(status);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function changeStatus(next: LeadStatus) {
    if (next === current) return;
    const previous = current;
    setCurrent(next);
    setError(null);

    const response = await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    }).catch(() => null);

    if (!response || !response.ok) {
      // Roll the optimistic update back rather than showing a state the
      // database does not actually hold.
      setCurrent(previous);
      setError('Could not update status.');
      return;
    }
    startTransition(() => router.refresh());
  }

  async function addNote(event: React.FormEvent) {
    event.preventDefault();
    const body = note.trim();
    if (!body) return;

    setSaving(true);
    setError(null);

    const response = await fetch(`/api/leads/${leadId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    }).catch(() => null);

    setSaving(false);

    if (!response || !response.ok) {
      setError('Could not save note.');
      return;
    }

    setNote('');
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">Status</p>
        <div className="flex flex-wrap gap-2">
          {LEAD_STATUSES.map((option) => (
            <button
              key={option}
              onClick={() => changeStatus(option)}
              disabled={pending}
              className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-colors disabled:opacity-50 ${
                option === current
                  ? 'bg-brandYellow text-brandDark'
                  : 'bg-white/8 text-white/60 hover:bg-white/15'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={addNote} className="space-y-3">
        <label
          htmlFor="note"
          className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/55"
        >
          Add note
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
          maxLength={5000}
          placeholder="What happened on this call?"
          className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brandYellow/50 transition-colors resize-y"
        />
        <button
          type="submit"
          disabled={saving || !note.trim()}
          className="px-5 py-3 bg-brandYellow text-brandDark font-black text-[10px] uppercase tracking-[0.3em] rounded-xl disabled:opacity-40 transition-opacity"
        >
          {saving ? 'Saving…' : 'Save note'}
        </button>
      </form>

      {error ? (
        <p role="alert" className="text-red-400 text-sm font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}
