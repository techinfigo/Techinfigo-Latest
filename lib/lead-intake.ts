import type { NewLead } from './leads-schema';
import { contentReasons } from './spam';
import { isCrmConfigured, recordReceived, sendToCrm } from './crm';

/**
 * Shared intake for leads that arrive from ad platforms rather than the
 * website's own forms. NODE RUNTIME ONLY.
 *
 * Each source maps its payload to these fields; the lead then gets the same
 * content checks and lands in the CRM's enquiries inbox, tagged with where it
 * came from.
 */
export type ExternalLead = {
  source: 'meta-lead-ads' | 'google-ads-lead-form' | 'webhook';
  /** For 'webhook': the connection's name from the CRM, e.g. "IndiaMART". */
  sourceName?: string | null;
  /** Integrations page counter key: 'meta', 'google-ads' or the connection id. */
  statsKey: string;
  website?: string | null;
  /** A free-text message from the sender, shown before the other answers. */
  note?: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  businessName: string | null;
  city: string | null;
  /** Answers to any extra questions on the ad form, as "Question: answer" lines. */
  answers: string[];
  campaign: string | null;
  adName: string | null;
  isTest: boolean;
};

export async function intakeExternalLead(lead: ExternalLead): Promise<{ stored: boolean; id?: string }> {
  if (!isCrmConfigured()) return { stored: false };

  const message =
    [lead.note ?? '', lead.city ? `City: ${lead.city}` : '', ...lead.answers].filter(Boolean).join('\n') || null;
  const name = lead.isTest ? `[TEST] ${lead.name}` : lead.name;

  const asNewLead: NewLead = {
    name,
    email: lead.email ?? '',
    phone: lead.phone,
    brandName: lead.businessName,
    website: lead.website ?? null,
    monthlyRevenue: null,
    adSpend: null,
    message,
    sourceForm: lead.source,
    landingPage: null,
    submittedFrom: null,
    utmSource:
      lead.source === 'meta-lead-ads' ? 'facebook' : lead.source === 'google-ads-lead-form' ? 'google' : lead.sourceName ?? 'webhook',
    utmMedium: lead.source === 'webhook' ? 'webhook' : 'lead-form',
    utmCampaign: lead.campaign,
    utmContent: lead.adName,
    utmTerm: null,
    referrer: null,
  };

  const reasons = contentReasons({
    name: lead.name,
    phone: lead.phone,
    businessName: lead.businessName,
    message,
  });

  const id = await sendToCrm(asNewLead, {
    status: reasons.length ? 'spam' : 'new',
    spamReasons: reasons,
    needs: [],
    sourceName: lead.sourceName ?? null,
  });
  if (!reasons.length || lead.isTest) await recordReceived(lead.statsKey, lead.isTest);
  return { stored: true, id };
}
