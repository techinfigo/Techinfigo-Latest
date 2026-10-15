'use client';

import React, { useEffect, useState } from 'react';

export type LegalSection = { id: string; label: string; title: string; body: React.ReactNode };

/**
 * Shared layout for the legal pages (Privacy Policy, Refund Policy):
 * dark header, sticky "On this page" list on desktop, cream content card.
 */
export const LegalPage: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  updated: string;
  summary: React.ReactNode[];
  sections: LegalSection[];
}> = ({ eyebrow, title, intro, updated, summary, sections }) => {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">{eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">{title}</h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">{intro}</p>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Last updated: {updated}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-3 sticky top-40 hidden lg:block">
            <div className="bg-[#001d21] rounded-[2rem] p-8 shadow-2xl border border-white/5 space-y-8">
              <h3 className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em]">On This Page</h3>
              <nav className="flex flex-col gap-4">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`flex items-center gap-4 text-left group transition-all duration-300 ${active === s.id ? 'translate-x-2' : ''}`}
                  >
                    <div className={`w-1 rounded-full transition-colors ${active === s.id ? 'bg-brandYellow h-3' : 'bg-white/10 h-1 group-hover:bg-brandYellow'}`}></div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${active === s.id ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <div className="bg-[#fff9f0] rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-8 lg:p-16 shadow-4xl border border-brandDark/5 space-y-14">
              <div className="bg-white rounded-3xl p-6 lg:p-10 border border-brandYellow/20 shadow-sm space-y-5">
                <h2 className="text-2xl font-bold text-brandDark tracking-tight">In Plain English</h2>
                <ul className="space-y-3">
                  {summary.map((point, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-2.5 flex-shrink-0"></div>
                      <p className="text-brandDark/70 font-medium leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="space-y-5 scroll-mt-28">
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-brandDark tracking-tight">
                    {i + 1}. {s.title}
                  </h2>
                  <div className="legal-body space-y-4 text-brandDark/75 text-base lg:text-lg leading-relaxed max-w-3xl">{s.body}</div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/** Bulleted list used inside legal sections. */
export const LegalList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-2 pl-1">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 items-start">
        <span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-[0.7em] flex-shrink-0"></span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
