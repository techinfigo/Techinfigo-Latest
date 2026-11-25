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
  company?: string;
  phone?: string;
  email?: string;
  source?: string;
  status: PortalLeadStatus;     // agency CRM roll-up status
  stage?: string;               // the client's own pipeline stage (per business type)
  note?: string;
  at?: string;
  nextFollowUp?: string;        // ISO datetime of the next planned call/visit
  activity?: PortalFollowUp[];  // recent logged activity, newest first
};
/* -------- Per-business pipelines: each client picks stages that fit them -------- */
export type PortalStage = { name: string; kind: 'open' | 'won' | 'lost' };
export const BUSINESS_TEMPLATES: Record<string, { label: string; stages: PortalStage[] }> = {
  general: { label: 'General / Sales', stages: [
    { name: 'New Lead', kind: 'open' }, { name: 'Contacted', kind: 'open' }, { name: 'Proposal Sent', kind: 'open' }, { name: 'Negotiation', kind: 'open' }, { name: 'Closed Won', kind: 'won' }, { name: 'Closed Lost', kind: 'lost' },
  ] },
  clinic: { label: 'Clinic / Healthcare', stages: [
    { name: 'Enquiry', kind: 'open' }, { name: 'Appointment Booked', kind: 'open' }, { name: 'Visited', kind: 'open' }, { name: 'Treatment Done', kind: 'won' }, { name: 'Not Interested', kind: 'lost' },
  ] },
  realestate: { label: 'Real Estate', stages: [
    { name: 'Enquiry', kind: 'open' }, { name: 'Site Visit', kind: 'open' }, { name: 'Negotiation', kind: 'open' }, { name: 'Booked', kind: 'won' }, { name: 'Lost', kind: 'lost' },
  ] },
  coaching: { label: 'Coaching / Education', stages: [
    { name: 'Enquiry', kind: 'open' }, { name: 'Demo Class', kind: 'open' }, { name: 'Enrolled', kind: 'won' }, { name: 'Dropped', kind: 'lost' },
  ] },
  restaurant: { label: 'Restaurant / Food', stages: [
    { name: 'Enquiry', kind: 'open' }, { name: 'Reserved / Order', kind: 'open' }, { name: 'Served', kind: 'won' }, { name: 'Lost', kind: 'lost' },
  ] },
  retail: { label: 'Shop / Showroom', stages: [
    { name: 'Enquiry', kind: 'open' }, { name: 'Visited', kind: 'open' }, { name: 'Purchased', kind: 'won' }, { name: 'Lost', kind: 'lost' },
  ] },
  hotel: { label: 'Hotel / Travel', stages: [
    { name: 'Enquiry', kind: 'open' }, { name: 'Quote Sent', kind: 'open' }, { name: 'Booked', kind: 'won' }, { name: 'Lost', kind: 'lost' },
  ] },
  d2c: { label: 'D2C / Online Store', stages: [
    { name: 'Lead', kind: 'open' }, { name: 'Cart', kind: 'open' }, { name: 'Ordered', kind: 'won' }, { name: 'Lost', kind: 'lost' },
  ] },
};
export const DEFAULT_BUSINESS = 'general';
export function stagesForType(type?: string): PortalStage[] {
  return (type && BUSINESS_TEMPLATES[type]?.stages) || BUSINESS_TEMPLATES.general.stages;
}
/** Map a client stage back to the agency CRM's status enum, for roll-up reporting. */
export function stageToStatus(stage: PortalStage, index: number): PortalLeadStatus {
  if (stage.kind === 'won') return 'Closed Won';
  if (stage.kind === 'lost') return 'Closed Lost';
  return index === 0 ? 'New Lead' : 'Contacted';
}
/** Pick the client stage name that best fits a lead's existing status (for leads with no explicit stage yet). */
export function deriveStageName(status: PortalLeadStatus, stages: PortalStage[]): string {
  const exact = stages.find((s) => s.name === status);
  if (exact) return exact.name;
  if (status === 'Closed Won') return (stages.find((s) => s.kind === 'won') || stages[0]).name;
  if (status === 'Closed Lost') return (stages.find((s) => s.kind === 'lost') || stages[0]).name;
  if (status === 'New Lead') return stages[0].name;
  return (stages.find((s, i) => s.kind === 'open' && i > 0) || stages[0]).name;
}

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

