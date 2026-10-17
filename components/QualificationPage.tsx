'use client';

import React, { useState } from 'react';
import { SitePhoto, usePhoto } from './SitePhoto';
import {
  Check,
  X,
  MessageCircle,
  Target,
  PhoneCall,
  CalendarClock,
  FlaskConical,
  ShieldAlert,
  PhoneOff,
  Wallet,
  Zap,
  Stethoscope,
  GraduationCap,
  Building2,
  Hotel,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

/**
 * Who We Fit: who we help, a quick 4-question fit check, and an honest
 * good-fit / not-a-fit list. Both lists are editable in admin → Content →
 * Qualification. No revenue gates, no "spots left" counters.
 */

interface QualificationPageProps {
  greenLights?: SiteContent['qualification']['greenLights'];
  redFlags?: SiteContent['qualification']['redFlags'];
  onNavigate: (page: string) => void;
}

const GREEN_ICONS = [Target, PhoneCall, CalendarClock, FlaskConical];
const RED_ICONS = [ShieldAlert, PhoneOff, Wallet, Zap];

const INDUSTRIES = [
  { label: 'Clinics & doctors', Icon: Stethoscope, slot: 'fit-clinic' },
  { label: 'Coaching & schools', Icon: GraduationCap, slot: 'fit-coaching' },
  { label: 'Real estate', Icon: Building2, slot: 'fit-realestate' },
  { label: 'Hotels & travel', Icon: Hotel, slot: 'fit-hotel' },
  { label: 'Shops & showrooms', Icon: Store, slot: 'fit-shop' },
  { label: 'Restaurants & sweets', Icon: UtensilsCrossed, slot: 'fit-restaurant' },
  { label: 'Online brands (D2C)', Icon: ShoppingBag, slot: 'fit-d2c' },
] as const;

/** One industry tile: the uploaded photo on top when there is one, the icon either way. */
function IndustryTile({ label, Icon, slot }: (typeof INDUSTRIES)[number]) {
  const photo = usePhoto(slot);
  return (
    <li className="rounded-2xl bg-white border border-brandDark/5 shadow-[0_10px_30px_-20px_rgba(0,29,33,0.25)] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
      {photo && <SitePhoto slot={slot} alt={label} className="w-full aspect-[4/3] object-cover" />}
      <div className="p-4 lg:p-5 flex flex-col items-start gap-3">
        <span className={`w-11 h-11 rounded-xl text-brandDark flex items-center justify-center ${photo ? '-mt-10 bg-brandYellow shadow-lg' : 'bg-brandYellow/15'}`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-black text-brandDark leading-tight">{label}</span>
      </div>
    </li>
  );
}

const QUESTIONS = [
  'Do you want more calls and WhatsApp enquiries, not just likes?',
  'Can someone reply to new enquiries within an hour or two?',
  'Can you give your marketing at least 3 months?',
  'Are you open to trying new offers, posts and ads?',
];


type Point = { title: string; desc: string };

/**
 * Lines each "good fit" point up with its opposite "not a fit" point
 * (reply quickly vs enquiries go unanswered, and so on). Points we don't
 * recognise (edited in admin) keep their order.
 */
const OPPOSITES: [RegExp, RegExp][] = [
  [/customers|likes/i, /guarantee/i],
  [/reply|quick/i, /unanswered|no one/i],
  [/months|time/i, /magic|one-month|overnight/i],
  [/trying|open|test/i, /budget/i],
];

function pairUp(good: readonly Point[], bad: readonly Point[]): { good?: Point; bad?: Point }[] {
  const left = [...bad];
  const pairs: { good?: Point; bad?: Point }[] = good.map((g) => {
    const rule = OPPOSITES.find(([gRe]) => gRe.test(g.title));
    const idx = rule ? left.findIndex((b) => rule[1].test(b.title)) : -1;
    return { good: g, bad: idx >= 0 ? left.splice(idx, 1)[0] : undefined };
  });
  // Fill any gaps with the leftover points, in order.
  for (const p of pairs) if (!p.bad && left.length) p.bad = left.shift();
  for (const b of left) pairs.push({ bad: b });
  return pairs;
}

function FitCheck({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [answers, setAnswers] = useState<(boolean | null)[]>(QUESTIONS.map(() => null));
  const answered = answers.filter((a) => a !== null).length;
  const yes = answers.filter((a) => a === true).length;
  const done = answered === QUESTIONS.length;

  const result = !done
    ? null
    : yes === 4
      ? { title: 'Great fit!', text: 'You are exactly who we do our best work for. Let’s start with a free health check of your business.', tone: 'bg-emerald-400' }
      : yes >= 2
        ? { title: 'Probably a fit', text: 'A few things to sort out, but we can likely help. A quick chat will tell us both.', tone: 'bg-brandYellow' }
        : { title: 'Maybe not yet', text: 'Marketing may not pay off for you right now. Get a free health check first; we’ll tell you honestly what to fix.', tone: 'bg-rose-400' };

  return (
    <div className="rounded-[2rem] lg:rounded-[2.5rem] bg-brandDark p-6 sm:p-8 lg:p-12 relative">
      {/* Glow in its own clipped layer, so the card itself never scrolls sideways. */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brandYellow/10 rounded-full blur-3xl" />
      </div>
      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
        <div className="space-y-4">
          <span className="text-[11px] font-black uppercase tracking-[0.35em] text-brandYellow">60-second fit check</span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">Answer 4 quick questions</h2>
          <ol className="space-y-3 pt-2">
            {QUESTIONS.map((q, i) => (
              <li key={q} className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="flex-1 text-white/85 font-medium leading-snug">
                  <span className="text-brandYellow font-black mr-2">{i + 1}.</span>
                  {q}
                </p>
                <div className="flex gap-2 shrink-0" role="group" aria-label={`Question ${i + 1}`}>
                  {[true, false].map((val) => {
                    const on = answers[i] === val;
                    return (
                      <button
                        key={String(val)}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setAnswers((a) => a.map((x, j) => (j === i ? val : x)))}
                        className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                          on
                            ? val
                              ? 'bg-brandYellow text-brandDark'
                              : 'bg-white text-brandDark'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {val ? 'Yes' : 'No'}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 lg:p-8 space-y-5 lg:mt-12" aria-live="polite">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brandDark/40">Your result</p>
          <div className="flex gap-1.5" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${
                  answers[i] === true ? 'bg-brandYellow' : answers[i] === false ? 'bg-brandDark/25' : 'bg-brandDark/10'
                }`}
              />
            ))}
          </div>
          {result ? (
            <>
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${result.tone}`} aria-hidden="true" />
                <p className="text-3xl font-black text-brandDark tracking-tight">{result.title}</p>
              </div>
              <p className="text-brandDark/65 leading-relaxed">{result.text}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('lead-capture')}
                  className="px-6 py-4 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.25em] rounded-xl hover:bg-brandDark hover:text-white transition-all"
                >
                  Free health check
                </button>
                <button
                  type="button"
                  onClick={() => setAnswers(QUESTIONS.map(() => null))}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-brandDark/15 text-brandDark font-black text-[11px] uppercase tracking-[0.25em] hover:bg-brandBg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Again
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-black text-brandDark/25 tracking-tight">
                {answered}/{QUESTIONS.length} answered
              </p>
              <p className="text-brandDark/55 leading-relaxed">Tap Yes or No on each question to see if we are the right agency for you.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const QualificationPage: React.FC<QualificationPageProps> = ({
  onNavigate,
  greenLights = DEFAULT_CONTENT.qualification.greenLights,
  redFlags = DEFAULT_CONTENT.qualification.redFlags,
}) => {
  const pairs = pairUp(greenLights, redFlags);
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Header */}
      <section className="bg-brandDark pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-5 relative">
          <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">Who We Fit</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter max-w-4xl">
            Are we a good fit? <br />
            <span className="text-brandYellow italic">Here’s an honest list.</span>
          </h1>
          <p className="text-base lg:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">
            Whether you run a local business in Agra or sell online across India, we work best with people who want steady enquiries and are ready to follow up on them.
          </p>
        </div>
      </section>

      {/* Who we help */}
      <section className="pt-16 lg:pt-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brandDark/40">Who we help most</span>
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tight leading-tight">Local businesses that live on enquiries.</h2>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 lg:gap-4">
            {INDUSTRIES.map((ind) => (
              <IndustryTile key={ind.label} {...ind} />
            ))}
          </ul>
        </div>
      </section>

      {/* Fit check */}
      <section className="pt-14 lg:pt-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <FitCheck onNavigate={onNavigate} />
        </div>
      </section>

      {/* Good fit vs not a fit, side by side */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="max-w-2xl space-y-3 mb-4 lg:mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brandDark/40">Side by side</span>
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tight leading-tight">Good fit vs not the right fit.</h2>
          </div>

          {/* Column headings (desktop) */}
          <div className="hidden md:grid grid-cols-[1fr_56px_1fr] items-center gap-0">
            <div className="flex items-center gap-3 px-2">
              <span className="w-10 h-10 rounded-xl bg-brandYellow text-brandDark flex items-center justify-center">
                <Check className="w-5 h-5" aria-hidden="true" />
              </span>
              <p className="text-xl font-black text-brandDark">We’re a good fit if…</p>
            </div>
            <span />
            <div className="flex items-center gap-3 px-2">
              <span className="w-10 h-10 rounded-xl bg-brandDark text-white flex items-center justify-center">
                <X className="w-5 h-5" aria-hidden="true" />
              </span>
              <p className="text-xl font-black text-brandDark">We’re not the right fit if…</p>
            </div>
          </div>

          <ol className="space-y-5 md:space-y-4">
            {pairs.map(({ good, bad }, i) => {
              const GoodIcon = GREEN_ICONS[i % GREEN_ICONS.length];
              const BadIcon = bad
                ? /budget/i.test(bad.title)
                  ? Wallet
                  : /magic|one-month/i.test(bad.title)
                    ? Zap
                    : /unanswered/i.test(bad.title)
                      ? PhoneOff
                      : /guarantee/i.test(bad.title)
                        ? ShieldAlert
                        : RED_ICONS[i % RED_ICONS.length]
                : ShieldAlert;
              return (
                <li key={i} className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-stretch">
                  {good ? (
                    <div className="rounded-t-[1.75rem] md:rounded-[1.75rem] bg-white border border-brandDark/5 shadow-[0_10px_40px_-20px_rgba(0,29,33,0.25)] p-6 lg:p-7 flex gap-4">
                      <span className="w-11 h-11 rounded-xl bg-brandYellow text-brandDark flex items-center justify-center shrink-0">
                        <GoodIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="space-y-1.5">
                        <p className="md:hidden text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Good fit</p>
                        <h3 className="text-lg font-black text-brandDark leading-snug">{good.title}</h3>
                        <p className="text-brandDark/60 text-sm leading-relaxed">{good.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}

                  <div className="relative flex items-center justify-center h-0 md:h-auto z-10" aria-hidden="true">
                    <span className="hidden md:block absolute inset-y-3 left-1/2 w-px bg-brandDark/10" />
                    <span className="relative w-10 h-10 rounded-full bg-brandBg border-2 border-brandDark/10 text-[11px] font-black uppercase text-brandDark/50 flex items-center justify-center">
                      vs
                    </span>
                  </div>

                  {bad ? (
                    <div className="rounded-b-[1.75rem] md:rounded-[1.75rem] bg-brandDark p-6 lg:p-7 flex gap-4">
                      <span className="w-11 h-11 rounded-xl bg-white/10 text-white/85 flex items-center justify-center shrink-0">
                        <BadIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="space-y-1.5">
                        <p className="md:hidden text-[10px] font-black uppercase tracking-[0.3em] text-rose-300">Not the right fit</p>
                        <h3 className="text-lg font-black text-white leading-snug">{bad.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{bad.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-white text-center px-6 border-t border-brandDark/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">Sounds like you?</h2>
          <p className="text-brandDark/60 text-lg">Start with a free health check. We’ll be honest if we’re not the right people for the job.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('lead-capture')}
              className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-brandDark hover:text-white transition-all shadow-glow"
            >
              Get My Free Health Check
            </button>
            <a
              href={whatsappUrl('Hi Techinfigo, I would like to check if you can help my business.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'who-we-fit')}
              className="inline-flex items-center gap-2 px-8 py-5 rounded-xl border border-brandDark/15 text-brandDark font-black text-xs uppercase tracking-[0.3em] hover:bg-brandBg transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
