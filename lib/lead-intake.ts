import type { NewLead } from './leads-schema';
import { contentReasons } from './spam';
import { isCrmConfigured, sendToCrm } from './crm';

/**
 * Shared intake for leads that arrive from ad platforms rather than the
 * website's own forms. NODE RUNTIME ONLY.
 *
 * Each source maps its payload to these fields; the lead then gets the same
 * content checks and lands in the CRM's enquiries inbox, tagged with where it
 * came from.
 */
export type ExternalLead = {
  source: 'meta-lead-ads' | 'google-ads-lead-form';
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

  const message = [lead.city ? `City: ${lead.city}` : '', ...lead.answers].filter(Boolean).join('\n') || null;
  const name = lead.isTest ? `[TEST] ${lead.name}` : lead.name;

  const asNewLead: NewLead = {
    name,
    email: lead.email ?? '',
    phone: lead.phone,
    brandName: lead.businessName,
    website: null,
    monthlyRevenue: null,
    adSpend: null,
    message,
    sourceForm: lead.source,
    landingPage: null,
    submittedFrom: null,
    utmSource: lead.source === 'meta-lead-ads' ? 'facebook' : 'google',
    utmMedium: 'lead-form',
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
  });
  return { stored: true, id };
}
