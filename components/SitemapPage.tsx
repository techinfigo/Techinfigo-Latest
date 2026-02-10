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
    <div className="min-h-screen bg-brandBg font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-32">
        
        {/* Header Infrastructure */}
        <div className="mb-24 space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark text-white rounded-full">
            <svg className="w-4 h-4 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A2 2 0 013 15.483V8.517a2 2 0 011.553-1.943L9 5.25m0 14.75l5.447-2.724A2 2 0 0016 15.483V8.517a2 2 0 00-1.553-1.943L9 5.25m0 14.75V5.25m0 14.75l5-2.5m-5-12.25l5 2.5m0 12.25l5-2.5m-5-12.25l5 2.5m0 12.25V5.25" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Network Topology</span>
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-brandDark tracking-tighter leading-none">
            System <br />
            <span className="text-brandDark/20 italic">Architecture.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-brandDark/60 leading-relaxed max-w-3xl font-medium border-l-4 border-brandYellow pl-8">
            Our operational nodes are mapped for maximum transparency. Navigate through our growth infrastructure, legal protocols, and specialized mandates.
          </p>
        </div>

        {/* Directory Hub - Instant Scan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollTo(cat.replace(/\s+/g, '-').toLowerCase())}
              className="group p-8 bg-[#f8f8f8] border-2 border-dotted border-brandYellow/20 rounded-[2.5rem] text-left hover:bg-brandDark hover:border-brandDark transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-brandDark/30 group-hover:text-white/30 uppercase tracking-[0.4em] block">Category Node</span>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-brandDark group-hover:text-brandYellow tracking-tight transition-colors">
                  {cat}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brandDark/40 group-hover:text-white/40 uppercase tracking-widest">
                    {SITE_STRUCTURE[cat].length} Operational Units
                  </span>
                  <svg className="w-4 h-4 text-brandYellow group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Map Sections */}
        <div className="space-y-32">
          {categories.map((cat) => {
            const categoryId = cat.replace(/\s+/g, '-').toLowerCase();
            return (
              <section 
                key={cat} 
                id={categoryId} 
                className="space-y-12 scroll-mt-24"
              >
                <div className="flex items-center gap-8 mb-16">
                   <div className="flex-grow h-[1px] bg-brandDark/10"></div>
                   <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter shrink-0">
                     {cat}
                   </h2>
                   <div className="flex-grow h-[1px] bg-brandDark/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {SITE_STRUCTURE[cat].map((page) => (
                    <button
                      key={page.id}
                      onClick={() => onNavigate(page.id)}
                      className="group relative text-left h-full pt-6"
                    >
                      {/* Folder Tab Effect */}
                      <div className="absolute top-0 left-0 w-32 h-8 bg-white border-x-2 border-t-2 border-dotted border-brandYellow/40 rounded-t-2xl z-0 transition-colors group-hover:bg-brandDark group-hover:border-brandDark"></div>
                      
                      <div className="h-full p-8 bg-white border-2 border-dotted border-brandYellow/40 rounded-tr-[2rem] rounded-b-[2rem] shadow-sm hover:shadow-4xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between gap-8 relative overflow-hidden z-10 group-hover:border-brandYellow">
                        
                        {/* Unit Identifier in the Tab space */}
                        <div className="absolute top-[-1.5rem] left-6 z-20">
                          <span className="text-[9px] font-mono font-bold text-brandDark/30 uppercase tracking-widest group-hover:text-brandYellow/50 transition-colors">UNIT_{page.id.toUpperCase().slice(0,3)}</span>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow group-hover:scale-110 transition-all duration-500">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={page.icon} />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-brandDark tracking-tight group-hover:text-brandYellow transition-colors">
                              {page.name}
                            </h3>
                            <p className="text-brandDark/50 text-sm leading-relaxed font-medium">
                              {page.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-dotted border-brandYellow/20 relative z-10">
                          <span className="text-[9px] font-bold text-brandDark/30 uppercase tracking-[0.4em]">Initialize Connection</span>
                          <div className="w-8 h-8 rounded-full border-2 border-dotted border-brandYellow/40 flex items-center justify-center group-hover:bg-brandDark group-hover:border-brandDark transition-all">
                            <svg className="w-4 h-4 text-brandDark group-hover:text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Background Design Element */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brandYellow/[0.02] rounded-full blur-3xl -mr-16 -mb-16 group-hover:bg-brandYellow/10 transition-colors"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer Index Note */}
        <div className="mt-48 pt-20 border-t border-dotted border-brandYellow/20 text-center space-y-4">
          <p className="text-brandDark/20 text-[10px] font-black uppercase tracking-[0.6em]">Techinfigo Sitemap Protocol v4.2</p>
          <div className="flex justify-center gap-4">
             <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
             <div className="w-2 h-2 rounded-full bg-brandYellow/20"></div>
             <div className="w-2 h-2 rounded-full bg-brandYellow/20"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
