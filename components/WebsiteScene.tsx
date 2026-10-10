import React from 'react';
import { MessageCircle, Phone, Pointer, FileText } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Website service, explained in one loop (styles: `.web-*` in globals.css).
 * Left: a visitor on your website taps WhatsApp, then Call, then "Get a quote".
 * Right: each tap lands in your CRM as a new enquiry, with where it came from.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const LEADS = [
  { name: 'Ritu S.', from: 'WhatsApp', tone: 'bg-[#25D366] text-white', Icon: MessageCircle },
  { name: 'Amit K.', from: 'Call', tone: 'bg-brandDark text-white', Icon: Phone },
  { name: 'Neha P.', from: 'Quote form', tone: 'bg-brandYellow text-brandDark', Icon: FileText },
];

export function WebsiteScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 grid grid-cols-[40%_1fr] gap-2.5 sm:gap-3 text-left font-sans">
        {/* Left: your website on a phone */}
        <div className="flex items-center justify-center min-w-0">
          <div className="relative w-[104px] h-[188px] rounded-[1.4rem] bg-brandDark p-1 shadow-[0_20px_40px_-18px_rgba(0,29,33,0.6)] shrink-0">
            <div className="relative w-full h-full rounded-[1.1rem] bg-white overflow-hidden">
              <div className="h-[22px] bg-brandYellow flex items-center px-2">
                <span className="text-[7.5px] font-black text-brandDark">Your Shop · Agra</span>
              </div>
              <div className="mx-2 mt-1 h-[44px] rounded-md bg-gradient-to-br from-brandDark/15 to-brandYellow/30" />
              <div className="mx-2 mt-1.5 space-y-1">
                <div className="h-1 w-4/5 rounded bg-brandDark/10" />
                <div className="h-1 w-3/5 rounded bg-brandDark/10" />
              </div>
              <span className="web-btn web-btn-quote absolute left-2 right-2 top-[108px] h-5 rounded-md bg-brandYellow/30 text-brandDark text-[7.5px] font-black flex items-center justify-center">
                Get a quote
              </span>
              <span className="web-btn web-btn-call absolute left-2 w-[38px] top-[134px] h-5 rounded-md bg-brandDark text-white text-[7.5px] font-black flex items-center justify-center gap-0.5">
                <Phone className="w-2 h-2" /> Call
              </span>
              <span className="web-btn web-btn-wa absolute right-2 w-[38px] top-[134px] h-5 rounded-md bg-[#25D366] text-white text-[7px] font-black flex items-center justify-center gap-0.5">
                <MessageCircle className="w-2 h-2" /> Chat
              </span>
              {/* The visitor's finger */}
              <span className="web-finger absolute left-0 top-0 text-brandDark drop-shadow">
                <Pointer className="w-4 h-4 fill-white" />
              </span>
            </div>
          </div>
        </div>

        {/* Right: your CRM */}
        <div className="relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-3 flex flex-col min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-brandDark uppercase tracking-wider">Your CRM</p>
            <span className="text-[8.5px] font-bold text-brandDark/40">Today</span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {LEADS.map((l, i) => (
              <li key={l.name} className={`web-lead web-lead-${i} flex items-center gap-1.5 rounded-lg bg-brandBg px-1.5 py-1.5 min-w-0`}>
                <span className={`w-5 h-5 rounded-full ${l.tone} flex items-center justify-center shrink-0`}>
                  <l.Icon className="w-2.5 h-2.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9.5px] font-black text-brandDark leading-tight truncate">{l.name}</span>
                  <span className="block text-[8px] text-brandDark/50 leading-tight truncate">from {l.from}</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-brandYellow/30 text-brandDark text-[7.5px] font-black shrink-0">New</span>
              </li>
            ))}
          </ul>
          <p className="web-total mt-auto rounded-lg bg-emerald-50 text-emerald-800 text-[9px] font-black px-2 py-1.5 text-center">
            3 enquiries · 0 missed
          </p>
        </div>
      </div>
    </PlayInView>
  );
}
