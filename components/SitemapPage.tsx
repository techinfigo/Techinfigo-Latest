import React, { useState } from 'react';
import { SITE_STRUCTURE } from '../navigation';
import { Footer } from './Footer';

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStructure = Object.entries(SITE_STRUCTURE).reduce((acc, [category, pages]) => {
    const filteredPages = pages.filter(page => 
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      page.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredPages.length > 0) {
      acc[category] = filteredPages;
    }
    return acc;
  }, {} as typeof SITE_STRUCTURE);

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Header */}
      <section className="bg-brandDark pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Directory</span>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8">
            Sitemap
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Navigate our entire ecosystem. Find exactly what you're looking for below.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-brandDark/40 group-focus-within:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-6 py-5 bg-white text-brandDark placeholder-brandDark/40 rounded-2xl border-2 border-transparent focus:border-brandYellow focus:outline-none shadow-xl transition-all text-lg font-medium"
            />
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {Object.keys(filteredStructure).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-brandDark/40 font-bold">No pages found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-brandYellow font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {Object.entries(filteredStructure).map(([category, pages]) => (
              <div key={category} className="animate-slide-up">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl font-black text-brandDark tracking-tight">{category}</h2>
                  <div className="h-px bg-brandDark/10 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => onNavigate(page.id)}
                      className="group flex flex-col items-start p-8 bg-white border border-brandDark/5 rounded-[2rem] hover:border-brandYellow/50 hover:shadow-2xl transition-all duration-300 text-left h-full"
                    >
                      <div className="w-12 h-12 bg-brandBg rounded-xl flex items-center justify-center text-brandDark mb-6 group-hover:bg-brandYellow group-hover:text-brandDark transition-colors shadow-sm">
                        {page.icon ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={page.icon} />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-brandDark mb-3 group-hover:text-brandYellow transition-colors">
                        {page.name}
                      </h3>
                      
                      <p className="text-brandDark/50 text-sm leading-relaxed">
                        {page.desc}
                      </p>
                      
                      <div className="mt-auto pt-6 flex items-center text-xs font-bold text-brandDark/30 uppercase tracking-widest group-hover:text-brandDark transition-colors">
                        Visit Page 
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} onBookAudit={() => onNavigate('contact')} />
    </div>
  );
};