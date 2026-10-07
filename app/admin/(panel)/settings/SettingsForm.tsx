'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  MAX_CLIENT_VIDEOS,
  PROOF_MODES,
  SETTINGS_LIMITS,
  youtubeId,
  type SiteSettings,
} from '../../../../lib/settings-schema';

/**
 * The editable half of the settings page.
 *
 * Every field carries a one-line note saying where the value shows up on the
 * public site, because the person editing this has never seen the code and
 * "ICP band" on its own means nothing.
 *
 * Values arrive as a prop from the server component — nothing here imports
 * lib/settings.ts, which would drag firebase-admin into the browser bundle.
 */

type SaveState =
  | { status: 'idle' }
  | { status: 'saving' }
  | { status: 'saved' }
  | { status: 'error'; message: string };

export function SettingsForm({
  initial,
  configured,
}: {
  initial: SiteSettings;
  configured: boolean;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [form, setForm] = useState(initial);
  const [save, setSave] = useState<SaveState>({ status: 'idle' });

  // Nested one level deep at most, so two small setters beat a reducer here.
  function setField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSave({ status: 'idle' });
  }

  function setGroup<G extends 'founder' | 'contact' | 'capacity' | 'targets'>(
    group: G,
    patch: Partial<SiteSettings[G]>,
  ) {
    setForm((current) => ({ ...current, [group]: { ...current[group], ...patch } }));
    setSave({ status: 'idle' });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSave({ status: 'saving' });

    const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(() => null);

    if (!response) {
      setSave({ status: 'error', message: 'Could not reach the server. Check your connection.' });
      return;
    }

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string; settings?: SiteSettings }
      | null;

    if (!response.ok || !data?.ok) {
      setSave({
        status: 'error',
        message: data?.error ?? `Save failed (${response.status}).`,
      });
      return;
    }

    // Show what was actually stored, not what was typed: the server clamps
    // out-of-range numbers and drops a LinkedIn URL it will not render.
    if (data.settings) setForm(data.settings);
    setSave({ status: 'saved' });
    startTransition(() => router.refresh());
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <Group
        title="Founder"
        note="The card partway down the homepage introducing who runs the agency."
      >
        <Field
          label="Name"
          help="The large name on the founder card. Left blank, the name line is hidden entirely."
        >
          <TextInput
            value={form.founder.name}
            maxLength={SETTINGS_LIMITS.founderName}
            placeholder="Not set — the name line stays hidden"
            onChange={(name) => setGroup('founder', { name })}
          />
        </Field>
        <Field label="Role" help="The small yellow line printed under the name.">
          <TextInput
            value={form.founder.role}
            maxLength={SETTINGS_LIMITS.founderRole}
            onChange={(role) => setGroup('founder', { role })}
          />
        </Field>
        <Field
          label="LinkedIn URL"
          help="The round LinkedIn button on the card appears only once this is filled in. Must start with https://."
        >
          <TextInput
            value={form.founder.linkedin}
            type="url"
            maxLength={SETTINGS_LIMITS.linkedin}
            placeholder="https://www.linkedin.com/in/…"
            onChange={(linkedin) => setGroup('founder', { linkedin })}
          />
        </Field>
      </Group>

      <Group title="Contact" note="Published on the site and to search engines.">
        <Field
          label="Email"
          help="The address in the footer of every page, and in the business listing search engines read."
        >
          <TextInput
            value={form.contact.email}
            type="email"
            maxLength={SETTINGS_LIMITS.email}
            onChange={(email) => setGroup('contact', { email })}
          />
        </Field>
        <Field
          label="Phone"
          help="Added to the business listing for Google's local results. Blank means no phone number is published at all."
        >
          <TextInput
            value={form.contact.phone}
            type="tel"
            maxLength={SETTINGS_LIMITS.phone}
            placeholder="Not set — no number is published"
            onChange={(phone) => setGroup('contact', { phone })}
          />
        </Field>
      </Group>

      <Group title="Positioning" note="Who the site says it is for, and how it frames its numbers.">
        <Field
          label="Customer revenue band"
          help='Fills the blank in "for D2C brands doing ___/mo" — in the footer, the About page and the site description Google shows.'
        >
          <TextInput
            value={form.icpBand}
            maxLength={SETTINGS_LIMITS.icpBand}
            placeholder="₹20L–₹2Cr"
            onChange={(icpBand) => setField('icpBand', icpBand)}
          />
        </Field>
        <Field
          label="Headline figures are"
          help="Targets prints a disclaimer under the hero numbers calling them industry benchmarks. Client results removes it — only switch once a real, nameable client is behind those numbers."
        >
          <div className="flex flex-wrap gap-2">
            {PROOF_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setField('proofMode', mode)}
                className={`px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                  form.proofMode === mode
                    ? 'bg-brandYellow text-brandDark'
                    : 'bg-white/8 text-white/60 hover:bg-white/15'
                }`}
              >
                {mode === 'benchmark' ? 'Targets' : 'Client results'}
              </button>
            ))}
          </div>
        </Field>
      </Group>

      <Group
        title="Headline figures"
        note="The three numbers in the before/after panel at the top of the homepage."
      >
        <Field label="Blended MER" help="The big yellow number, top right of the homepage panel.">
          <NumberInput
            value={form.targets.blendedMer}
            step={0.1}
            suffix="x"
            onChange={(blendedMer) => setGroup('targets', { blendedMer })}
          />
        </Field>
        <Field label="Net profit" help="The white number directly beneath it.">
          <NumberInput
            value={form.targets.netProfit}
            step={0.1}
            suffix="x"
            onChange={(netProfit) => setGroup('targets', { netProfit })}
          />
        </Field>
        <Field
          label="Contribution lift"
          help='The small yellow badge floating on the corner of that panel: "+40% Contribution".'
        >
          <NumberInput
            value={form.targets.contributionLift}
            step={1}
            suffix="%"
            onChange={(contributionLift) => setGroup('targets', { contributionLift })}
          />
        </Field>
      </Group>

      <Group title="Availability" note="Controls every claim about limited spots.">
        <Field
          label="Show scarcity"
          help="On: the homepage ticker, the qualification page counter and the protocol banner all say how many spots are left. Off: they say the same thing without a number — leave it off until there is a real waitlist."
        >
          <Toggle
            checked={form.capacity.showScarcity}
            onChange={(showScarcity) => setGroup('capacity', { showScarcity })}
            onLabel="Spots shown"
            offLabel="Spots hidden"
          />
        </Field>
        <Field
          label="Spots open"
          help="The number those three places show. Ignored entirely while the switch above is off."
        >
          <NumberInput
            value={form.capacity.slotsOpen}
            step={1}
            max={SETTINGS_LIMITS.slotsOpen}
            disabled={!form.capacity.showScarcity}
            onChange={(slotsOpen) => setGroup('capacity', { slotsOpen })}
          />
        </Field>
      </Group>

      <Group
        title="Client videos"
        note="The video section on the Agra page, right after the Google reviews. Paste YouTube links (normal videos or Shorts). Each card shows only the video's YouTube thumbnail, so set the thumbnail on YouTube. The section is hidden while this list is empty."
      >
        <VideoListEditor value={form.videos} onChange={(videos) => setField('videos', videos)} />
      </Group>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={save.status === 'saving' || !configured}
          className="px-6 py-3.5 bg-brandYellow text-brandDark font-black text-[10px] uppercase tracking-[0.3em] rounded-xl disabled:opacity-40 transition-opacity"
        >
          {save.status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>

        {save.status === 'saved' ? (
          <p role="status" className="text-emerald-300 text-sm font-medium">
            Saved. The public site updates on its next visit — no rebuild needed.
          </p>
        ) : null}

        {save.status === 'error' ? (
          <p role="alert" className="text-red-400 text-sm font-medium max-w-md">
            {save.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

// --- presentation ----------------------------------------------------------

function Group({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-white/15 rounded-2xl p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          {title}
        </h2>
        <p className="text-white/55 text-sm font-medium">{note}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  help,
  children,
}: {
  label: string;
  help: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-6 md:items-start">
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{label}</p>
        <p className="text-white/55 text-xs font-medium leading-relaxed">{help}</p>
      </div>
      <div className="pt-0.5">{children}</div>
    </div>
  );
}

const INPUT_CLASS =
  'w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brandYellow/50 transition-colors disabled:opacity-40';

function TextInput({
  value,
  onChange,
  type = 'text',
  maxLength,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={INPUT_CLASS}
    />
  );
}

/**
 * Keeps the raw text while typing, so clearing the box or typing "4." does not
 * snap back to a number mid-keystroke, and reports upwards only once the text
 * parses.
 *
 * `reported` is what this input last told the parent. When `value` differs from
 * it the change came from somewhere else — the server clamping 2000 down to
 * 1000 on save — and the draft is resynced. When they match, the parent is only
 * echoing this input's own keystroke and the draft is left alone.
 */
function NumberInput({
  value,
  onChange,
  step,
  max,
  suffix,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  step: number;
  max?: number;
  suffix?: string;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState(String(value));
  const [reported, setReported] = useState(value);

  if (value !== reported) {
    setReported(value);
    setDraft(String(value));
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        inputMode="decimal"
        value={draft}
        step={step}
        min={0}
        max={max}
        disabled={disabled}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          const parsed = Number(next);
          if (next !== '' && Number.isFinite(parsed)) {
            setReported(parsed);
            onChange(parsed);
          }
        }}
        // An emptied box has nothing to report, so restore the live value.
        onBlur={() => setDraft(String(value))}
        className={`${INPUT_CLASS} max-w-[10rem]`}
      />
      {suffix ? (
        <span className="text-white/55 text-sm font-black uppercase tracking-widest">{suffix}</span>
      ) : null}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  onLabel,
  offLabel,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 group"
    >
      <span
        className={`w-11 h-6 rounded-full p-1 transition-colors ${
          checked ? 'bg-brandYellow' : 'bg-white/15'
        }`}
      >
        <span
          className={`block w-4 h-4 rounded-full bg-brandDark transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
        {checked ? onLabel : offLabel}
      </span>
    </button>
  );
}

/**
 * Add, edit, reorder and remove YouTube links. A link that is not a YouTube
 * video is flagged here and dropped by the server on save.
 */
function VideoListEditor({
  value,
  onChange,
}: {
  value: SiteSettings['videos'];
  onChange: (value: SiteSettings['videos']) => void;
}) {
  const update = (i: number, patch: Partial<SiteSettings['videos'][number]>) =>
    onChange(value.map((v, j) => (j === i ? { ...v, ...patch } : v)));
  const move = (i: number, by: -1 | 1) => {
    const j = i + by;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <p className="text-white/55 text-sm">No videos yet. Add your first one below.</p>
      ) : null}

      {value.map((video, i) => {
        const id = video.url ? youtubeId(video.url) : null;
        const invalid = video.url.trim() !== '' && !id;
        return (
          <div key={i} className="flex gap-4 items-start border border-white/10 rounded-xl p-4">
            <div className="w-28 shrink-0 aspect-video rounded-lg overflow-hidden bg-white/8 flex items-center justify-center">
              {id ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">No video</span>
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <TextInput
                value={video.url}
                type="url"
                maxLength={SETTINGS_LIMITS.videoUrl}
                placeholder="https://www.youtube.com/watch?v=…  or  https://youtube.com/shorts/…"
                onChange={(url) => update(i, { url })}
              />
              <TextInput
                value={video.title}
                maxLength={SETTINGS_LIMITS.videoTitle}
                placeholder="Short description (not shown on the card, helps Google and screen readers)"
                onChange={(title) => update(i, { title })}
              />
              {invalid ? (
                <p className="text-red-400 text-xs font-medium">
                  This is not a YouTube video link. It will be removed when you save.
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <IconButton label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                ↑
              </IconButton>
              <IconButton label="Move down" disabled={i === value.length - 1} onClick={() => move(i, 1)}>
                ↓
              </IconButton>
              <IconButton label="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))}>
                ✕
              </IconButton>
            </div>
          </div>
        );
      })}

      {value.length < MAX_CLIENT_VIDEOS ? (
        <button
          type="button"
          onClick={() => onChange([...value, { title: '', url: '' }])}
          className="px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] bg-white/8 text-white/80 hover:bg-white/15 transition-colors"
        >
          + Add video
        </button>
      ) : (
        <p className="text-white/55 text-xs">Maximum {MAX_CLIENT_VIDEOS} videos.</p>
      )}
      <p className="text-white/55 text-xs">Remember to press “Save changes” below.</p>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="w-8 h-8 rounded-lg bg-white/8 text-white/70 text-sm hover:bg-white/15 disabled:opacity-30 transition-colors"
    >
      {children}
    </button>
  );
}
