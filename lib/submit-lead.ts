import { captureAttribution } from './attribution';
import { trackLead } from './track';
import { getTurnstileToken } from './turnstile-client';

/** Name of the hidden trap field rendered by <HoneypotField /> in each form. */
export const HONEYPOT_NAME = 'company_url';

function honeypotValue(): string {
  if (typeof document === 'undefined') return '';
  const field = document.querySelector<HTMLInputElement>(`input[name="${HONEYPOT_NAME}"]`);
  return field?.value ?? '';
}

/**
 * Client-side submit helper shared by every public form.
 *
 * Forms post here instead of straight to formsubmit.co; the API route mirrors
 * to the inbox itself, so the team keeps the delivery path they already watch
 * while the lead also gets stored with its attribution.
 */
export type SubmitLeadInput = {
  sourceForm: string;
  name: string;
  /** Optional when a phone number is given; the server needs one or the other. */
  email?: string;
  phone?: string;
  brandName?: string;
  website?: string;
  monthlyRevenue?: string;
  adSpend?: string;
  message?: string;
  /**
   * Everything the form asked that has no dedicated column. Flattened into the
   * message so a bespoke questionnaire never silently loses answers.
   */
  extra?: Record<string, unknown>;
};

export type SubmitLeadResult = {
  ok: boolean;
  stored: boolean;
};

function formatExtra(extra: Record<string, unknown>): string {
  return Object.entries(extra)
    .filter(([, value]) => {
      if (value == null) return false;
      if (Array.isArray(value)) return value.length > 0;
      return String(value).trim() !== '';
    })
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
      return `${label}: ${Array.isArray(value) ? value.join(', ') : String(value)}`;
    })
    .join('\n');
}

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const { extra, message, ...rest } = input;

  const extraText = extra ? formatExtra(extra) : '';
  const combinedMessage = [message?.trim(), extraText].filter(Boolean).join('\n\n');

  const turnstile = await getTurnstileToken();
  const needs = extra && Array.isArray(extra.needs) ? extra.needs : undefined;

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...rest,
        message: combinedMessage || undefined,
        ...captureAttribution(),
        needs,
        // Spam checks (lib/spam.ts): the hidden trap field, how long the page
        // was open, and the invisible Cloudflare token.
        _gotcha: honeypotValue(),
        _elapsedMs: Math.round(performance.now()),
        _turnstile: turnstile,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; stored?: boolean };
    const ok = response.ok && data.ok !== false;
    if (ok) trackLead(input.sourceForm);
    return { ok, stored: Boolean(data.stored) };
  } catch {
    return { ok: false, stored: false };
  }
}
