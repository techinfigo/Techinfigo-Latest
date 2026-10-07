import React from 'react';
import {
  Check,
  X,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Heart,
  Send,
  Bell,
  Globe,
  Megaphone,
} from 'lucide-react';

/**
 * Small illustrations for the How We Work page, drawn in code rather than
 * stock photos: each one shows what actually happens at that step, in the
 * site's own colours. The names and numbers inside them are clearly sample UI.
 */

const card = 'rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5';

/** Hero: one enquiry arriving, from the customer's message to the CRM. */
export function HeroEnquiryStack({ rating, count }: { rating: number | null; count: number | null }) {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 h-[340px] sm:h-[380px]" aria-hidden="true">
      {/* Notification */}
      <div className={`${card} absolute top-0 left-0 right-8 sm:right-12 p-4 flex gap-3 items-start`}>
        <span className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-brandDark/50">WhatsApp · now</p>
          <p className="text-sm font-bold text-brandDark">New enquiry from your website</p>
          <p className="text-xs text-brandDark/60 truncate">“Hi, I need a quote for…”</p>
        </div>
      </div>

      {/* CRM lead */}
      <div className={`${card} absolute top-[108px] left-8 sm:left-12 right-0 p-5 space-y-3`}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-brandDark/50">Your CRM</p>
          <span className="px-2 py-0.5 rounded-full bg-brandYellow/20 text-brandDark text-[10px] font-bold">New lead</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-brandDark text-white text-sm font-bold flex items-center justify-center">R</span>
          <div>
            <p className="text-sm font-bold text-brandDark">Ritu S.</p>
            <p className="text-xs text-brandDark/50">Came from: Google search</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex-1 py-2 rounded-lg bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" /> Reply
          </span>
          <span className="flex-1 py-2 rounded-lg bg-brandBg text-brandDark text-[11px] font-bold flex items-center justify-center gap-1">
            <Phone className="w-3.5 h-3.5" /> Call
          </span>
        </div>
      </div>

      {/* Google rating (live numbers when available) */}
      <div className="absolute bottom-0 left-0 sm:left-2 rounded-2xl bg-brandYellow px-5 py-4 shadow-glow flex items-center gap-3">
        <span className="text-3xl font-black text-brandDark leading-none">{rating ? rating.toFixed(1) : '★'}</span>
        <span>
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-brandDark text-brandDark" />
            ))}
          </span>
          <span className="block text-[11px] font-bold text-brandDark/80">
            {count ? `${count} Google reviews` : 'Rated on Google'}
          </span>
        </span>
      </div>
    </div>
  );
}

/** Step 1: the health check report with three fixes. */
function HealthCheckVisual() {
  const rows = [
    { ok: false, text: 'Website has no WhatsApp button' },
    { ok: false, text: 'Google profile missing photos' },
    { ok: false, text: 'Ads not tracking enquiries' },
    { ok: true, text: 'Instagram posting regularly' },
  ];
  return (
    <div className={`${card} p-6 w-full max-w-sm space-y-4`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-brandDark">Your health check</p>
        <span className="text-[10px] font-bold text-brandDark/40">Sent on WhatsApp</span>
      </div>
      <div className="h-2 rounded-full bg-brandBg overflow-hidden">
        <div className="h-full w-[38%] bg-brandYellow rounded-full" />
      </div>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.text} className="flex items-center gap-3 text-xs font-semibold text-brandDark/80">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                r.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
              }`}
            >
              {r.ok ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            </span>
            {r.text}
          </li>
        ))}
      </ul>
      <p className="text-[11px] font-bold text-brandDark bg-brandYellow/20 rounded-lg px-3 py-2">3 fixes that will bring more enquiries</p>
    </div>
  );
}

/** Step 2: a phone with a website that gets calls, next to a complete Google profile. */
function BasicsVisual() {
  return (
    <div className="flex items-end gap-3 sm:gap-6">
      <div className="w-[128px] sm:w-[170px] rounded-[2rem] bg-brandDark p-2.5 shadow-[0_30px_60px_-25px_rgba(0,29,33,0.6)] shrink-0">
        <div className="rounded-[1.5rem] bg-white overflow-hidden">
          <div className="h-24 bg-gradient-to-br from-brandYellow/70 to-brandYellow/20 flex items-end p-3">
            <span className="text-[11px] font-black text-brandDark leading-tight">Your business,<br />your website</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="h-1.5 w-4/5 rounded bg-brandDark/10" />
            <div className="h-1.5 w-3/5 rounded bg-brandDark/10" />
            <div className="h-1.5 w-2/3 rounded bg-brandDark/10" />
            <div className="pt-2 grid grid-cols-2 gap-1.5">
              <span className="py-1.5 rounded-md bg-brandDark text-white text-[9px] font-bold flex items-center justify-center gap-1">
                <Phone className="w-3 h-3 hidden sm:block" /> Call
              </span>
              <span className="py-1.5 rounded-md bg-[#25D366] text-white text-[9px] font-bold flex items-center justify-center gap-1">
                <MessageCircle className="w-3 h-3 hidden sm:block" /> Chat
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${card} p-3 sm:p-4 w-[150px] sm:w-[200px] space-y-2 mb-6`}>
        <p className="text-xs font-black text-brandDark">Your Google profile</p>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-3 h-3 fill-brandYellow text-brandYellow" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="aspect-square rounded bg-brandDark/15" />
          <div className="aspect-square rounded bg-brandYellow/40" />
          <div className="aspect-square rounded bg-brandDark/10" />
        </div>
        <p className="text-[10px] text-brandDark/60 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Open now · Directions
        </p>
        <p className="text-[10px] text-brandDark/60 flex items-center gap-1">
          <Globe className="w-3 h-3" /> Website · Call
        </p>
      </div>
    </div>
  );
}

/** Step 3: an ad that brings a message, not just likes. */
function EnquiriesVisual() {
  return (
    <div className="relative w-full max-w-sm">
      <div className={`${card} overflow-hidden`}>
        <div className="flex items-center gap-2 p-3">
          <span className="w-7 h-7 rounded-full bg-brandDark text-brandYellow text-[10px] font-black flex items-center justify-center">YB</span>
          <div>
            <p className="text-[11px] font-bold text-brandDark leading-none">Your Business</p>
            <p className="text-[9px] text-brandDark/40 flex items-center gap-1">
              <Megaphone className="w-2.5 h-2.5" /> Sponsored · Agra
            </p>
          </div>
        </div>
        <div className="h-36 bg-brandDark relative overflow-hidden flex items-center justify-center">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-brandYellow/30" />
          <div className="absolute -left-6 bottom-0 w-24 h-24 rounded-full bg-white/10" />
          <p className="relative text-white font-black text-lg text-center leading-tight px-6">Festive offer<br /><span className="text-brandYellow">this week only</span></p>
        </div>
        <div className="flex items-center justify-between p-3">
          <div className="flex gap-3 text-brandDark/40">
            <Heart className="w-4 h-4" />
            <Send className="w-4 h-4" />
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-brandYellow text-brandDark text-[10px] font-black">Send message</span>
        </div>
      </div>
      <div className="absolute -bottom-5 -right-2 sm:-right-6 rounded-xl bg-[#25D366] text-white px-3 py-2 shadow-lg flex items-center gap-2 text-[11px] font-bold">
        <Bell className="w-3.5 h-3.5" /> 4 new messages today
      </div>
    </div>
  );
}

/** Step 4: every lead tracked, with where it came from. */
function TrackVisual() {
  const leads = [
    { name: 'Ritu S.', from: 'Google search', status: 'New', tone: 'bg-brandYellow/25 text-brandDark' },
    { name: 'Amit K.', from: 'Instagram ad', status: 'Follow up', tone: 'bg-sky-100 text-sky-800' },
    { name: 'Neha P.', from: 'Website form', status: 'Won', tone: 'bg-emerald-100 text-emerald-800' },
  ];
  return (
    <div className={`${card} p-5 w-full max-w-sm space-y-3`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-brandDark">Your CRM</p>
        <span className="text-[10px] font-bold text-brandDark/40">This month</span>
      </div>
      <ul className="divide-y divide-brandDark/5">
        {leads.map((l) => (
          <li key={l.name} className="flex items-center gap-3 py-2.5">
            <span className="w-8 h-8 rounded-full bg-brandDark text-white text-xs font-bold flex items-center justify-center shrink-0">
              {l.name.charAt(0)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-brandDark">{l.name}</p>
              <p className="text-[10px] text-brandDark/50">{l.from}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${l.tone}`}>{l.status}</span>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-2 pt-1">
        {[
          { h: 'h-6', label: 'Ads' },
          { h: 'h-10', label: 'Google' },
          { h: 'h-4', label: 'Social' },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1">
            <div className="h-10 w-full flex items-end">
              <div className={`${b.h} w-full rounded-md bg-brandYellow`} />
            </div>
            <span className="text-[9px] font-bold text-brandDark/50">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEP_VISUALS = [HealthCheckVisual, BasicsVisual, EnquiriesVisual, TrackVisual];

/** The picture for step `index`, or nothing if a step was added in admin beyond the four. */
export function StepVisual({ index }: { index: number }) {
  const Visual = STEP_VISUALS[index];
  return Visual ? <Visual /> : null;
}
