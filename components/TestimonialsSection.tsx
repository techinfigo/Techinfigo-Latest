import React from 'react';
import { Play, Quote, CheckCircle2, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  onBookAudit?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookAudit }) => {
  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Founder, D2C Skincare Brand",
      quote: "We were scaling revenue but profit was always inconsistent. Their audit completely changed how we look at our numbers. Within 2 months, we were finally seeing stable profits.",
      result: "Profit increased from ₹1.5L → ₹5L/month",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Ananya Iyer",
      role: "Founder, Apparel Brand",
      quote: "For the first time, we actually understood where our money was going. The level of clarity they provide is unmatched in the industry. No more guessing games.",
      result: "MER improved from 12% → 28%",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Vikram Malhotra",
      role: "CEO, Supplements Brand",
      quote: "Now we scale with confidence instead of guessing. We know exactly what our CAC threshold is and how much we can spend to stay profitable. It's a real system.",
      result: "Scaled from ₹5L → ₹25L/month profitably",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Siddharth Verma",
      role: "Founder, Home Decor Brand",
      quote: "The audit was a wake-up call. We were burning cash on retargeting while our new-to-brand acquisition was stagnant. They fixed the core funnel first.",
      result: "Reduced CAC by 42% in 45 days",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <section className="w-full py-24 lg:py-40 px-6 bg-[#f9f9f9] font-sans relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#001d21 1px, transparent 1px)`, backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
          <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-brandYellow bg-brandDark/5 px-4 py-2 rounded-full inline-block mb-6">
            FOUNDER RESULTS
          </span>
          <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-[0.9] mb-8">
            Trusted by D2C Founders <br className="hidden md:block" />
            Who Care About Profit
          </h2>
          <p className="text-brandDark/60 text-lg lg:text-xl font-medium">
            Not just growth. Real, measurable business impact.
          </p>
        </div>

        {/* 2. VIDEO TESTIMONIAL (Main Highlight) */}
        <div className="mb-20 animate-slide-up">
          <div className="bg-brandDark rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 relative aspect-video lg:aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200" 
              alt="Video Testimonial Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <button className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center shadow-glow mb-8 hover:scale-110 transition-transform duration-500">
                <Play className="w-8 h-8 text-brandDark fill-current ml-1" />
              </button>
              <h3 className="text-2xl lg:text-4xl font-black text-white tracking-tight max-w-lg">
                Watch how we scaled profit without increasing ad spend
              </h3>
            </div>

            {/* Floating Result Badge */}
            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brandYellow" />
              <span className="text-white font-bold text-sm">₹2.1L → ₹6.4L Profit in 75 Days</span>
            </div>
          </div>
        </div>

        {/* 3. TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] p-8 shadow-soft hover:-translate-y-2 transition-all duration-500 border border-brandDark/5 flex flex-col justify-between group animate-slide-up" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
              <div className="space-y-6">
                {/* TOP: Profile */}
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brandYellow/20" />
                  <div>
                    <h4 className="text-sm font-black text-brandDark uppercase tracking-wide">{t.name}</h4>
                    <p className="text-[9px] font-bold text-brandDark/40 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>

                {/* MIDDLE: Quote */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-brandDark/[0.03] -z-10" />
                  <p className="text-brandDark/80 text-base font-medium leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* BOTTOM: Result Highlight */}
              <div className="mt-8 pt-6 border-t border-brandDark/5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-brandYellow fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-brandDark font-black text-[10px] uppercase tracking-widest">
                  <span className="text-brandYellow">RESULT:</span> {t.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. TRUST STRIP */}
        <div className="py-12 border-y border-brandDark/5 mb-12 animate-slide-up">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 text-center lg:text-left">
            <p className="text-[11px] font-black text-brandDark/40 uppercase tracking-[0.3em]">
              Worked with D2C brands across:
            </p>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
              {['Skincare', 'Apparel', 'Supplements', 'Lifestyle'].map((industry) => (
                <div key={industry} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brandYellow"></div>
                  <span className="text-brandDark font-bold uppercase tracking-widest text-xs">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. MICRO-PROOF LINE */}
        <div className="text-center mb-16 animate-slide-up">
          <p className="text-brandDark/60 font-medium italic">
            "Most of our clients come through referrals."
          </p>
        </div>

        {/* 6. CTA BUTTON */}
        <div className="text-center space-y-6 animate-slide-up">
          <button 
            onClick={onBookAudit}
            className="group relative px-12 py-6 bg-brandDark text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">Get Your Profit Audit</span>
            <div className="absolute inset-0 bg-brandYellow translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          <p className="text-brandDark/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            Let’s see what’s possible for your brand
          </p>
        </div>

      </div>
    </section>
  );
};
