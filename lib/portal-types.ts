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
export type PortalSnapshot = {
  business: string;
  person: string;
  plans: PortalPlan[];
  invoices: PortalInvoice[];
  services: PortalService[];
  docs: PortalDoc[];
  upiId: string;
  contactName: string;
  contactPhone: string;
};

