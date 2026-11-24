/** Client portal data shapes. Pure types, safe for the browser. */

export type PortalPlan = {
  id: string;
  date: string;
  time?: string;
  kind: string;
  title: string;
  platforms: string[];
  status: 'Idea' | 'Making' | 'Approved' | 'Done';
  previewUrl?: string;
  clientComment?: string;
  changeRequested?: boolean;
};
export type PortalInvoice = { id: string; number: string; issueDate: string; dueDate: string; total: number; paid: number; due: number; status: string };
export type PortalService = { name: string; cost: number; billingType: string };
export type PortalDoc = { title: string; url: string; date?: string };
export type PortalFollowUp = { type: string; note: string; at: string };
// Same pipeline stages as the agency CRM, minus the internal "Audit" stage.
export type PortalLeadStatus = 'New Lead' | 'Contacted' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export const PORTAL_STAGES: PortalLeadStatus[] = ['New Lead', 'Contacted', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];
export type PortalLead = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  source?: string;
  status: PortalLeadStatus;
  note?: string;
  at?: string;
  nextFollowUp?: string;        // ISO datetime of the next planned call/visit
  activity?: PortalFollowUp[];  // recent logged activity, newest first
};
/** Accepts legacy 4-stage values and CRM values; returns a valid portal stage. */
export function normalizeStage(v: unknown): PortalLeadStatus {
  const s = String(v);
  if (s === 'New' || s === 'New Lead') return 'New Lead';
  if (s === 'Contacted' || s === 'Audit in Progress') return 'Contacted';
  if (s === 'Converted' || s === 'Closed Won') return 'Closed Won';
  if (s === 'Lost' || s === 'Closed Lost') return 'Closed Lost';
  if (s === 'Proposal Sent') return 'Proposal Sent';
  if (s === 'Negotiation') return 'Negotiation';
  return 'New Lead';
}
export type PortalSnapshot = {
  business: string;
  person: string;
  plans: PortalPlan[];
  invoices: PortalInvoice[];
  services: PortalService[];
  docs: PortalDoc[];
  leads: PortalLead[];
  upiId: string;
  contactName: string;
  contactPhone: string;
};

