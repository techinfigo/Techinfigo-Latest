import type { PortalSnapshot } from './portal-types';

/**
 * Sample data for /portal?demo=1 — lets the agency preview the portal fully
 * populated without touching any real client. Uses a Clinic pipeline so the
 * per-business stages show, and relative dates so the follow-up states
 * (overdue / today / upcoming / no-next-step) are always realistic.
 */
export const DEMO_BUSINESS_TYPE = 'clinic';

export function demoSnapshot(): PortalSnapshot {
  const now = new Date();
  const iso = (days: number, hour = 11, min = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(hour, min, 0, 0);
    return d.toISOString();
  };
  const dayKey = (days: number) => iso(days).slice(0, 10);

  return {
    business: 'Glow Dental & Skin Clinic',
    person: 'Dr. Anjali',
    leads: [
      { id: 'd1', name: 'Rahul Mehta', phone: '9876543210', source: 'Meta Ads', status: 'New Lead', stage: 'Enquiry', note: 'Teeth cleaning ka rate puchha', at: iso(0, 9, 30) },
      { id: 'd2', name: 'Priya Sharma', company: '', phone: '9988776655', email: 'priya@example.com', source: 'IndiaMART', status: 'Contacted', stage: 'Appointment Booked', nextFollowUp: iso(0, 17), at: iso(-1, 12), activity: [{ type: 'Call', note: 'Called — Saturday 5pm slot diya', at: iso(-1, 12, 10) }] },
      { id: 'd3', name: 'Neha Gupta', phone: '8899001122', source: 'Website', status: 'Negotiation', stage: 'Visited', nextFollowUp: iso(-2, 11), at: iso(-6, 15), activity: [{ type: 'Visit', note: 'Clinic aayi, price compare kar rahi hai', at: iso(-2, 16) }, { type: 'Call', note: 'First enquiry call', at: iso(-6, 15, 20) }] },
      { id: 'd4', name: 'Amit Verma', phone: '9001234567', source: 'Walk-in', status: 'Contacted', stage: 'Appointment Booked', nextFollowUp: iso(3, 11), at: iso(-4, 10), activity: [{ type: 'Call', note: 'Follow-up 2 — root canal ke liye interested', at: iso(-1, 18) }] },
      { id: 'd5', name: 'Kavita Jain', phone: '9765432109', source: 'JustDial', status: 'Negotiation', stage: 'Visited', note: 'Braces consultation done', at: iso(-3, 14), activity: [{ type: 'Visit', note: 'Consultation done, quote diya', at: iso(-3, 14, 30) }] },
      { id: 'd6', name: 'Sunil Rana', phone: '9700112233', source: 'Meta Ads', status: 'New Lead', stage: 'Enquiry', note: 'Skin treatment enquiry', at: iso(-2, 19) },
      { id: 'd7', name: 'Imran Khan', phone: '9811223344', source: 'Meta Ads', status: 'Closed Won', stage: 'Treatment Done', note: 'Teeth whitening done — ₹8,000', at: iso(-8, 12), activity: [{ type: 'Visit', note: 'Treatment complete, happy', at: iso(-5, 13) }] },
      { id: 'd8', name: 'Pooja Singh', phone: '9555667788', source: 'IndiaMART', status: 'Closed Lost', stage: 'Not Interested', note: 'Budget zyada laga', at: iso(-7, 11) },
      { id: 'd9', name: 'Deepak Yadav', phone: '9333445566', source: 'WhatsApp', status: 'New Lead', stage: 'Enquiry', note: 'Aaj ka naya enquiry', at: iso(0, 11, 15) },
    ],
    plans: [
      { id: 'p1', date: dayKey(-2), kind: 'Reel', title: 'Diwali smile-makeover offer', platforms: ['Instagram', 'Facebook'], status: 'Done' },
      { id: 'p2', date: dayKey(0), kind: 'Post', title: 'Patient testimonial — Imran', platforms: ['Instagram'], status: 'Making', previewUrl: 'https://www.canva.com/' },
      { id: 'p3', date: dayKey(1), kind: 'Story', title: 'Before / after — teeth whitening', platforms: ['Instagram'], status: 'Approved' },
      { id: 'p4', date: dayKey(2), kind: 'Reel', title: 'Meet the doctor — trust reel', platforms: ['Instagram', 'Facebook'], status: 'Idea' },
      { id: 'p5', date: dayKey(3), kind: 'Meeting', title: 'Monthly review call with Techinfigo', platforms: [], status: 'Idea', time: '16:00' },
    ],
    invoices: [
      { id: 'i1', number: 'INV-108', issueDate: dayKey(-30), dueDate: dayKey(-2), total: 15000, paid: 15000, due: 0, status: 'Paid' },
      { id: 'i2', number: 'INV-121', issueDate: dayKey(-5), dueDate: dayKey(5), total: 15000, paid: 5000, due: 10000, status: 'Partially paid' },
    ],
    services: [
      { name: 'Social media (12 posts + 4 reels)', cost: 10000, billingType: 'Monthly' },
      { name: 'Meta ads management', cost: 5000, billingType: 'Monthly' },
      { name: 'Google Business Profile growth', cost: 3000, billingType: 'Monthly' },
    ],
    docs: [
      { title: 'Content Plan — this month', url: 'https://www.techinfigo.com/', date: dayKey(-3) },
      { title: 'Ads Report — last month', url: 'https://www.techinfigo.com/', date: dayKey(-6) },
    ],
    upiId: 'techinfigo@okaxis',
    contactName: 'Sachin, Techinfigo',
    contactPhone: '9557338487',
  };
}
