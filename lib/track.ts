/**
 * Conversion events for GA4 and the Meta Pixel.
 *
 * components/Analytics.tsx loads the tags only when their IDs are set, so every
 * call here checks that the tag actually exists and does nothing otherwise.
 * Tracking must never be able to break a form submission or a click.
 */

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

function tags(): { gtag?: Gtag; fbq?: Fbq } {
  if (typeof window === 'undefined') return {};
  const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
  return { gtag: w.gtag, fbq: w.fbq };
}

/** A form was submitted successfully. `form` is the sourceForm label. */
export function trackLead(form: string): void {
  try {
    const { gtag, fbq } = tags();
    gtag?.('event', 'generate_lead', { form_name: form });
    fbq?.('track', 'Lead', { content_name: form });
  } catch {
    // Measurement is best-effort.
  }
}

/** A visitor tapped a WhatsApp or call button. */
export function trackContact(channel: 'whatsapp' | 'call', placement: string): void {
  try {
    const { gtag, fbq } = tags();
    gtag?.('event', channel === 'whatsapp' ? 'whatsapp_click' : 'call_click', {
      placement,
    });
    fbq?.('track', 'Contact', { content_name: `${channel}:${placement}` });
  } catch {
    // Measurement is best-effort.
  }
}
