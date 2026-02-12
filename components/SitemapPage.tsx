import React, { useState, useEffect } from 'react';
import { SITE_STRUCTURE } from '../navigation';

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState(Object.keys(SITE_STRUCTURE)[0]);
  const categories = Object.keys(SITE_STRUCTURE);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    categories.forEach((cat) => {
      const id = cat.replace(/\s+/g, '-').toLowerCase();
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              NETWORK TOPOLOGY
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              System <br />
              Architecture.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Our operational nodes are mapped for maximum transparency. Navigate <br className="hidden lg:block" /> through our growth infrastructure and protocols.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-slide-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollTo(cat.replace(/\s+/g, '-').toLowerCase())}
              className="group p-8 bg-[#f8f8f8] border-2 border-dotted border-brandYellow/20 rounded-[2.5rem] text-left hover:bg-brandDark hover:border-brandDark transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-brandDark/30 group-hover:text-white/30 uppercase tracking-[0.4em] block">Node</span>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-brandDark group-hover:text-brandYellow tracking-tight">
                  {cat}
                </h3>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-32">
          {categories.map((cat) => {
            const categoryId = cat.replace(/\s+/g, '-').toLowerCase();
            return (
              <section key={cat} id={categoryId} className="space-y-12 scroll-mt-24">
                <div className="flex items-center gap-8 mb-16">
                   <div className="flex-grow h-[1px] bg-brandDark/10"></div>
                   <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter shrink-0">{cat}</h2>
                   <div className="flex-grow h-[1px] bg-brandDark/10"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SITE_STRUCTURE[cat].map((page) => (
                    <button key={page.id} onClick={() => onNavigate(page.id)} className="group p-8 bg-white border-2 border-dotted border-brandYellow/40 rounded-[2rem] text-left shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                       <h3 className="text-2xl font-bold text-brandDark tracking-tight group-hover:text-brandYellow transition-colors">{page.name}</h3>
                       <p className="text-brandDark/50 text-sm mt-2">{page.desc}</p>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};