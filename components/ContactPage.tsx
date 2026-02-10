
import React, { useState } from 'react';
import { Footer } from './Footer';

interface ContactPageProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
  onBookAudit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigate, onBookAudit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col font-sans">
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <div className="max-w-2xl w-full text-center space-y-8 animate-slide-up">
            <div className="w-24 h-24 bg-brandYellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <svg className="w-12 h-12 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-brandDark tracking-tighter">Application Logged.</h1>
            <p className="text-brandDark/60 text-lg lg:text-xl max-w-lg mx-auto">
              Our audit engine has received your parameters. A senior strategist will be in touch via WhatsApp within 24 hours.
            </p>
            <button onClick={onBack} className="inline-block mt-8 text-brandDark font-bold uppercase tracking-widest text-xs border-b-2 border-brandYellow pb-1 transition-all hover:text-brandYellow">
              Return to Command Center
            </button>
          </div>
        </div>
        <Footer onNavigate={onNavigate} onBookAudit={onBookAudit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg font-sans">
      <div className="pb-24">
        {/* Dark Header Section */}
        <section className="bg-[#001d21] pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brandYellow"></div>
              <div className="pl-8">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] mb-4 block">CONTACT US</span>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tighter mb-4">Book a Free Audit</h1>
                <p className="text-white/60 text-lg max-w-lg">
                  Tell us about your brand. Get a no-obligation growth proposal within one business day.
                </p>
              </div>
              <button 
                onClick={onBack} 
                className="absolute top-0 right-0 text-white/20 hover:text-brandYellow transition-colors flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Left Sidebar: Direct Access */}
          <aside className="lg:col-span-4 space-y-8 animate-slide-up">
            <div className="bg-[#001d21] rounded-[2rem] p-10 space-y-10 shadow-2xl border border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandYellow/10 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
                <span className="text-[9px] font-bold text-brandYellow uppercase tracking-widest">ACTIVE STRATEGISTS</span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tighter">Direct Access</h2>
                <p className="text-white/40 text-sm">Skip the queue for urgent scaling needs.</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'WhatsApp Chat', sub: 'FASTEST RESPONSE', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
                  { label: 'Voice Call', sub: 'IMMEDIATE TALK', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                  { label: 'Email Brief', sub: 'DETAILED BRIEF', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 flex items-center justify-center bg-brandYellow/10 rounded-xl group-hover:bg-brandDark transition-colors">
                        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white group-hover:text-brandDark transition-colors uppercase tracking-tight">{item.label}</p>
                        <p className="text-[9px] font-bold text-white/30 group-hover:text-brandDark/40 tracking-widest uppercase transition-colors">{item.sub}</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-brandDark transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase">HEADQUARTERS</p>
                    <p className="text-[12px] font-medium text-white/70 leading-relaxed">
                      Office no. 03, Second Floor, Block no.25, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-brandDark/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-brandYellow/10 flex items-center justify-center">
                  <span className="text-brandYellow">⏱</span>
                </div>
                <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.3em]">The SLA</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-2xl font-extrabold text-brandDark tracking-tighter">30m</p>
                  <p className="text-[9px] font-bold text-brandDark/40 uppercase tracking-widest">RESPONSE TIME</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-extrabold text-brandDark tracking-tighter">24h</p>
                  <p className="text-[9px] font-bold text-brandDark/40 uppercase tracking-widest">AUDIT PROPOSAL</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Section: Form Application */}
          <main className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-10 lg:p-16 shadow-2xl border border-brandDark/5 space-y-14">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-brandDark tracking-tighter">Growth Audit Application</h2>
                  <p className="text-brandDark/50 text-sm">Help us prepare by sharing some context.</p>
                </div>
                <div className="bg-[#fff8eb] border border-brandYellow/20 px-4 py-1.5 rounded-lg flex items-center gap-2">
                   <span className="text-[9px] font-bold text-brandYellow uppercase tracking-widest">REQUIRED FIELDS</span>
                </div>
              </div>

              {/* Section 1: Brand Profile */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-4 bg-brandYellow"></div>
                  <h3 className="text-sm font-extrabold text-brandDark uppercase tracking-widest">Brand Profile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">BRAND NAME <span className="text-brandYellow">*</span></label>
                    <input required type="text" placeholder="e.g. Aura Skincare" className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WEBSITE URL</label>
                    <input type="url" placeholder="https://yourbrand.com" className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">BUSINESS MODEL <span className="text-brandYellow">*</span></label>
                    <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                      <option value="">Select...</option>
                      <option value="d2c">D2C Brand</option>
                      <option value="ecommerce">E-commerce Marketplace</option>
                      <option value="saas">SaaS / Service</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">PLATFORM <span className="text-brandYellow">*</span></label>
                    <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                      <option value="">Select...</option>
                      <option value="shopify">Shopify</option>
                      <option value="woocommerce">WooCommerce</option>
                      <option value="magento">Magento</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Metrics & Scaling */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-4 bg-brandYellow"></div>
                  <h3 className="text-sm font-extrabold text-brandDark uppercase tracking-widest">Metrics & Scaling</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">MONTHLY AD SPEND <span className="text-brandYellow">*</span></label>
                    <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                      <option value="">Select...</option>
                      <option value="0-5">₹0 - ₹5L</option>
                      <option value="5-20">₹5L - ₹20L</option>
                      <option value="20-50">₹20L - ₹50L</option>
                      <option value="50+">₹50L+</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">MONTHLY REVENUE <span className="text-brandYellow">*</span></label>
                    <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                      <option value="">Select...</option>
                      <option value="20-50">₹20L - ₹50L</option>
                      <option value="50-100">₹50L - ₹1Cr</option>
                      <option value="100+">₹1Cr+</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">PRIMARY OBJECTIVE <span className="text-brandYellow">*</span></label>
                  <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                    <option value="">Select...</option>
                    <option value="scale">Aggressive Scaling</option>
                    <option value="profit">Optimizing Net Profit</option>
                    <option value="infrastructure">Fixing Attribution/Infrastructure</option>
                  </select>
                </div>
              </div>

              {/* Section 3: Engagement */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-4 bg-brandYellow"></div>
                  <h3 className="text-sm font-extrabold text-brandDark uppercase tracking-widest">Engagement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">READY FOR 3-MO ENGAGEMENT? <span className="text-brandYellow">*</span></label>
                    <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                      <option value="">Select...</option>
                      <option value="yes">Yes, Definitely</option>
                      <option value="no">Just exploring</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">MONTHLY BUDGET CAPACITY <span className="text-brandYellow">*</span></label>
                    <select required className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all appearance-none">
                      <option value="">Select...</option>
                      <option value="lite">₹50K - ₹1.5L</option>
                      <option value="standard">₹1.5L - ₹3L</option>
                      <option value="enterprise">₹3L+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-4 bg-brandYellow"></div>
                  <h3 className="text-sm font-extrabold text-brandDark uppercase tracking-widest">Contact Info</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WORK EMAIL <span className="text-brandYellow">*</span></label>
                    <input required type="email" placeholder="you@brand.com" className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WHATSAPP <span className="text-brandYellow">*</span></label>
                    <input required type="tel" placeholder="+91 XXXX XXX XXX" className="w-full bg-brandBg/50 border border-brandDark/5 px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-6 bg-brandDark text-white font-bold text-[13px] uppercase tracking-[0.4em] rounded-2xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Submit Application
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </button>
                <p className="text-center text-[9px] font-bold text-brandDark/20 uppercase tracking-[0.3em]">TAKES LESS THAN 2 MINUTES</p>
              </div>

            </form>
          </main>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onBookAudit={onBookAudit} />
    </div>
  );
};
