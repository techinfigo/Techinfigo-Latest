'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Check, Clapperboard, Code2, Megaphone, Palette, Search, Users, X } from 'lucide-react';

/**
 * The roles Techinfigo hires for, shown as job cards. Clicking a card opens
 * the full role; "Apply for this role" picks it in the application form.
 * There are no fixed openings, so cards say "Apply anytime" and make no claims
 * about salary, hours or location.
 */

export type CareerRole = {
  value: string;
  title: string;
  summary: string;
  tags: string[];
  icon: React.ReactNode;
  about: string;
  tasks: string[];
  lookFor: string[];
};

export const CAREER_ROLES: CareerRole[] = [
  {
    value: 'social',
    title: 'Social Media Designer',
    summary: 'Posts, carousels and brand designs for local businesses and brands.',
    tags: ['Canva', 'Photoshop', 'Instagram'],
    icon: <Palette className="w-5 h-5" />,
    about: 'You design the posts and carousels that keep our clients’ Instagram and Facebook pages active and on-brand.',
    tasks: ['Design monthly posts and carousels for clients', 'Follow each client’s colours and style', 'Prepare Google Business post images', 'Work with the team on festive and offer creatives'],
    lookFor: ['A portfolio of designs you have made', 'A good eye for clean, readable layouts', 'Comfort with Canva, Photoshop or Illustrator'],
  },
  {
    value: 'video',
    title: 'Reels & Video Editor',
    summary: 'Short videos for Instagram, YouTube Shorts and ads.',
    tags: ['Reels', 'CapCut', 'Premiere'],
    icon: <Clapperboard className="w-5 h-5" />,
    about: 'You turn raw clips from clients and shoots into short, punchy reels that people watch to the end.',
    tasks: ['Edit reels and Shorts with captions and music', 'Cut short ad videos in different sizes', 'Help plan simple shoots for local businesses', 'Keep up with what works on Instagram'],
    lookFor: ['Reels or videos you have edited', 'Good sense of timing and hooks', 'CapCut, Premiere Pro or similar'],
  },
  {
    value: 'ads',
    title: 'Ads Executive (Meta & Google)',
    summary: 'Run lead campaigns that bring real enquiries for clients.',
    tags: ['Meta Ads', 'Google Ads', 'Lead forms'],
    icon: <Megaphone className="w-5 h-5" />,
    about: 'You set up and improve Facebook, Instagram and Google ads that bring calls and WhatsApp enquiries, and check every lead lands in the CRM.',
    tasks: ['Set up lead and click-to-WhatsApp campaigns', 'Run Google search ads for local services', 'Check costs and results every week', 'Write simple monthly reports for clients'],
    lookFor: ['Hands-on experience with Meta or Google Ads', 'Comfort with numbers and spreadsheets', 'Clear communication with clients'],
  },
  {
    value: 'web',
    title: 'Website Developer',
    summary: 'Build and fix fast business websites that get calls.',
    tags: ['WordPress', 'Next.js', 'Landing pages'],
    icon: <Code2 className="w-5 h-5" />,
    about: 'You build mobile-friendly websites and landing pages with WhatsApp and call buttons, connected to our CRM.',
    tasks: ['Build and update client websites', 'Make pages fast and mobile-friendly', 'Add forms, tracking and WhatsApp buttons', 'Fix issues found in health checks'],
    lookFor: ['Websites you have built (links)', 'WordPress, Shopify or React/Next.js', 'Care for speed and small details'],
  },
  {
    value: 'seo',
    title: 'SEO & Google Profile Executive',
    summary: 'Help local businesses show up on Google Maps and Search.',
    tags: ['Local SEO', 'Google Business', 'Content'],
    icon: <Search className="w-5 h-5" />,
    about: 'You keep clients’ Google Business Profiles complete and active, and help their websites rank for local searches.',
    tasks: ['Optimise and post on Google Business Profiles', 'Create listings on JustDial, IndiaMART and Sulekha', 'Write and improve service pages', 'Track progress in Search Console'],
    lookFor: ['Understanding of local SEO basics', 'Good written English and Hindi', 'Patience: SEO takes time'],
  },
  {
    value: 'sales',
    title: 'Sales & Client Support',
    summary: 'Talk to business owners, follow up and keep clients happy.',
    tags: ['Calls', 'WhatsApp', 'CRM'],
    icon: <Users className="w-5 h-5" />,
    about: 'You are the first voice business owners hear: you answer enquiries, book health checks and keep clients updated.',
    tasks: ['Reply to new enquiries quickly', 'Book and follow up on free health checks', 'Share updates with clients on WhatsApp', 'Keep every lead up to date in the CRM'],
    lookFor: ['Confident on calls in Hindi and English', 'Organised and quick to follow up', 'Friendly and honest with clients'],
  },
];

function RoleModal({ role, onClose, onApply }: { role: CareerRole; onClose: () => void; onApply: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-brandDark/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-modal-title"
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto bg-white rounded-[2rem] p-8 lg:p-10 shadow-2xl animate-slide-up space-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-brandBg flex items-center justify-center text-brandDark hover:bg-brandDark hover:text-white transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-4 pr-10">
          <span className="w-12 h-12 rounded-2xl bg-brandDark text-brandYellow flex items-center justify-center shrink-0">{role.icon}</span>
          <div>
            <h2 id="role-modal-title" className="text-2xl font-black text-brandDark tracking-tight">{role.title}</h2>
            <p className="text-sm text-emerald-700 font-bold">Apply anytime · Techinfigo, Agra</p>
          </div>
        </div>

        <p className="text-brandDark/70 leading-relaxed">{role.about}</p>

        <div className="space-y-3">
          <h3 className="text-sm font-black text-brandDark uppercase tracking-widest">What you’ll do</h3>
          <ul className="space-y-2">
            {role.tasks.map((t) => (
              <li key={t} className="flex gap-3 text-brandDark/75">
                <Check className="w-4 h-4 mt-1 text-brandYellow shrink-0" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-black text-brandDark uppercase tracking-widest">What we look for</h3>
          <ul className="space-y-2">
            {role.lookFor.map((t) => (
              <li key={t} className="flex gap-3 text-brandDark/75">
                <Check className="w-4 h-4 mt-1 text-brandDark shrink-0" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {role.tags.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-lg bg-brandBg text-brandDark/70 text-xs font-bold">{t}</span>
          ))}
        </div>

        <button
          type="button"
          onClick={onApply}
          className="w-full py-4 rounded-xl bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.25em] hover:bg-brandDark hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          Apply for this role <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

function RoleCard({ role, selected, onOpen }: { role: CareerRole; selected: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group w-full text-left flex flex-col rounded-[2rem] bg-white p-6 border transition-all duration-300 hover:shadow-[0_20px_40px_-20px_rgba(0,29,33,0.3)] focus-visible:outline-2 focus-visible:outline-brandYellow ${
        selected ? 'border-brandYellow shadow-md' : 'border-brandDark/5'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="w-12 h-12 rounded-2xl bg-brandDark text-brandYellow flex items-center justify-center shrink-0">{role.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-black text-brandDark tracking-tight leading-tight">{role.title}</h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-wider shrink-0">Apply anytime</span>
          </div>
          <p className="mt-1.5 text-sm text-brandDark/60 leading-relaxed">{role.summary}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {role.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg bg-brandBg text-brandDark/60 text-[11px] font-bold">{t}</span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-brandDark group-hover:text-brandYellow transition-colors">
          Details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}

/**
 * Job cards in an endless vertical slider; `onApply(value)` picks the role in
 * the form. The row pauses while hovered or while a role is open.
 */
export function CareerRoles({ selected, onApply }: { selected: string; onApply: (value: string) => void }) {
  const [open, setOpen] = useState<CareerRole | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div className={`jobs-marquee-viewport relative h-[520px] lg:h-[760px] overflow-hidden ${open ? 'is-paused' : ''}`}>
        <div className="jobs-marquee" style={{ ['--marquee-duration' as string]: `${CAREER_ROLES.length * 7}s` } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="space-y-4 pb-4" aria-hidden={copy === 1 || undefined} inert={copy === 1 || undefined}>
              {CAREER_ROLES.map((role) => (
                <RoleCard key={`${copy}-${role.value}`} role={role} selected={selected === role.value} onOpen={() => setOpen(role)} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {open && (
        <RoleModal
          role={open}
          onClose={close}
          onApply={() => {
            const value = open.value;
            setOpen(null);
            onApply(value);
          }}
        />
      )}
    </>
  );
}
