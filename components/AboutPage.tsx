'use client';

import React from 'react';
import Link from 'next/link';
import { Check, MapPin, MessageCircle, Linkedin, Store, ShoppingBag } from 'lucide-react';
import { useSiteSettings } from './SiteSettingsProvider';
import { SERVICES } from '../lib/services';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

/**
 * About: who Sachin is, what Techinfigo does and for whom, in plain words.
 * Only checkable facts: years in the field, the Agra office, the live Google
 * rating, the services and packages. No stock photos (an "SB" card stands in
 * until a real photo is supplied).
 */

interface AboutPageProps {
  onNavigate: (page: string) => void;
  rating?: number | null;
  reviewCount?: number | null;
  /** Server-rendered Google reviews section. */
  reviews?: React.ReactNode;
}

const DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=TECHINFIGO%20-%20Digital%20Marketing%20Agency&destination_place_id=ChIJd-bZWwl3dDkRj4H5YdWtwPM';

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, rating = null, reviewCount = null, reviews }) => {
  const { founder } = useSiteSettings();
  const name = founder.name || 'Sachin Bauddh';
  const firstName = name.split(' ')[0];

  const facts = [
    { big: '10 yrs', small: 'in digital marketing' },
    { big: '6 yrs', small: 'running Techinfigo' },
    { big: rating ? `${rating.toFixed(1)}★` : '★', small: reviewCount ? `${reviewCount} Google reviews` : 'Rated on Google' },
    { big: 'Agra', small: 'Sanjay Place office' },
  ];

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Hero */}
      <section className="bg-brandDark pt-28 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto space-y-14 relative">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-5">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">About Techinfigo</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter max-w-5xl">
              An Agra agency <br />
              <span className="text-brandYellow italic">that tracks every enquiry.</span>
            </h1>
            <p className="text-base lg:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">
              Founded by {name}. We help local businesses and online brands get more customers from their website, Google, social media and ads, and show them exactly where each one came from.
            </p>
          </div>

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[2rem] overflow-hidden border border-white/10">
            {facts.map((f) => (
              <div key={f.small} className="bg-brandDark px-6 py-7 lg:px-8">
                <dt className="sr-only">{f.small}</dt>
                <dd className="text-3xl lg:text-4xl font-black text-brandYellow tracking-tighter">{f.big}</dd>
                <dd className="text-white/60 text-sm font-semibold mt-1">{f.small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            {/* Replace with a real photo of Sachin when available. Never a stock photo. */}
            <div className="aspect-[4/5] max-w-md mx-auto rounded-[3rem] bg-brandDark flex flex-col items-center justify-center gap-6 p-10 text-center shadow-4xl">
              <span className="w-32 h-32 rounded-full bg-brandYellow text-brandDark text-5xl font-black flex items-center justify-center tracking-tighter">
                {name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
              </span>
              <div className="space-y-2">
                <p className="text-white text-2xl font-black tracking-tight">{name}</p>
                <p className="text-brandYellow text-sm font-bold">Founder, Techinfigo</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter">Hi, I’m {firstName}.</h2>
            <div className="space-y-5 text-lg lg:text-xl text-brandDark/70 font-medium leading-relaxed">
              <p>
                I’ve spent 10 years in digital marketing: building websites and apps, running Google and Meta ads, and helping online stores grow. Six years ago I started Techinfigo here in Agra.
              </p>
              <p>
                I kept seeing the same problem. Businesses paid for marketing every month with no idea what it brought back. So every Techinfigo client gets a free CRM, and we judge our work by enquiries and sales, not likes.
              </p>
              <p>You work with me directly, from the first call.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl(`Hi ${firstName}, I found Techinfigo and would like to talk about my business.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', 'about-founder')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp {firstName}
              </a>
              {founder.linkedin ? (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-brandDark/15 text-brandDark text-xs font-black uppercase tracking-widest hover:bg-brandBg transition-colors"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandBg border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter max-w-3xl">Who we work with</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: <Store className="w-6 h-6" aria-hidden="true" />,
                title: 'Local businesses in Agra',
                text: 'Shops, showrooms, clinics, coaching centres, hotels and restaurants that want more calls and walk-ins.',
                points: ['Website and Google profile', 'Social media and local ads', 'Enquiries tracked in a free CRM'],
                dark: true,
              },
              {
                icon: <ShoppingBag className="w-6 h-6" aria-hidden="true" />,
                title: 'Online brands (D2C)',
                text: 'Brands across India selling on their own website or Shopify that want profitable growth, not just more orders.',
                points: ['Meta sales campaigns and creatives', 'Product page and checkout fixes', 'Repeat-purchase flows on WhatsApp'],
                dark: false,
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`rounded-[2.5rem] p-8 lg:p-12 space-y-6 ${c.dark ? 'bg-brandDark text-white' : 'bg-white text-brandDark border border-brandDark/5'}`}
              >
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.dark ? 'bg-brandYellow text-brandDark' : 'bg-brandDark text-brandYellow'}`}>
                  {c.icon}
                </span>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight">{c.title}</h3>
                <p className={`text-lg leading-relaxed ${c.dark ? 'text-white/65' : 'text-brandDark/65'}`}>{c.text}</p>
                <ul className="space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-semibold">
                      <Check className="w-4 h-4 text-brandYellow shrink-0" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tighter">What we do</h2>
            <p className="text-brandDark/60 text-lg leading-relaxed">
              Six services, one goal: more enquiries and sales you can see. Every package includes a free CRM.
            </p>
            <Link href="/how-it-works" className="inline-block text-sm font-black text-brandDark underline decoration-brandYellow decoration-2 underline-offset-4">
              See how we work
            </Link>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-brandDark/10 px-5 py-4 hover:border-brandYellow hover:bg-brandYellow/10 transition-colors"
              >
                <p className="font-black text-brandDark">{s.title}</p>
                <p className="text-xs text-brandDark/55 mt-1 line-clamp-2">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Google reviews */}
      {reviews}

      {/* Visit / contact */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none">Let’s talk about your business.</h2>
          <p className="text-white/60 text-lg">Start with a free health check, or visit us in Sanjay Place.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('lead-capture')}
              className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow"
            >
              Get My Free Health Check
            </button>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-xl border border-white/15 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-colors"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" /> Get Directions
            </a>
          </div>
          <p className="text-white/40 text-sm flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-brandYellow shrink-0" aria-hidden="true" />
            Office no. 03, Second Floor, Block no. 25, Cloth Market, Sanjay Place, Agra
          </p>
        </div>
      </section>
    </div>
  );
};
