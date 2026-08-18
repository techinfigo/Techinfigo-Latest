/**
 * First-touch attribution captured in the browser.
 *
 * The UTM parameters land on the entry page, but the form is usually two or
 * three clicks later — so the values are stashed in sessionStorage on first
 * sight and replayed at submit time. Without this, every paid lead would be
 * attributed to whatever page happened to hold the form.
 */
export type Attribution = {
  landingPage?: string;
  submittedFrom?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
};

const STORAGE_KEY = 'techinfigo_attribution';

function readStored(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    // Private mode, disabled storage, or corrupt JSON — attribution is a
    // nice-to-have and must never break a submission.
    return {};
  }
}

/** Records first touch if this visit carries UTMs (or nothing is stored yet). */
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    utmContent: params.get('utm_content') ?? undefined,
    utmTerm: params.get('utm_term') ?? undefined,
  };

  const stored = readStored();
  const hasFreshCampaign = Object.values(fromUrl).some(Boolean);

  // A new campaign overwrites the old one; otherwise first touch wins.
  const firstTouch: Attribution =
    hasFreshCampaign || !stored.landingPage
      ? {
          ...fromUrl,
          landingPage: window.location.pathname,
          referrer: document.referrer || undefined,
        }
      : stored;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(firstTouch));
  } catch {
    // Ignored for the same reason as above.
  }

  return { ...firstTouch, submittedFrom: window.location.pathname };
}
