import { captureAttribution } from './attribution';

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
  email: string;
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

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...rest,
        message: combinedMessage || undefined,
        ...captureAttribution(),
        // Honeypot: always empty for a real visitor, so the server can drop
        // bot traffic that fills every field it can find.
        _gotcha: '',
      }),
    });

    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; stored?: boolean };
    return { ok: response.ok && data.ok !== false, stored: Boolean(data.stored) };
  } catch {
    return { ok: false, stored: false };
  }
}
