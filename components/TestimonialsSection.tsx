import React from 'react';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Testimonial {
  brand: string;
  founder: string;
  result: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    brand: "Zouk",
    founder: "Disha Singh",
    result: "3.2x Profit Growth",
    quote: "Techinfigo didn't just manage our ads; they rebuilt our entire unit economics. We finally know exactly where every rupee goes.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    brand: "The Souled Store",
    founder: "Vedang Patel",
    result: "45% CAC Reduction",
    quote: "Their focus on profit over vanity metrics changed how we scale. Predictable growth is finally a reality for us.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    brand: "Snitch",
    founder: "Siddharth Dungarwal",
    result: "₹1.2Cr Monthly Revenue",
    quote: "The audit alone found leaks we didn't know existed. If you're spending lakhs on ads, you need their eyes on your numbers.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

interface TestimonialsSectionProps {
  onBookAudit?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full lg:min-h-screen flex flex-col justify-center py-12 lg:py-20 px-6 bg-[#000d0e] font-sans relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brandYellow rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Header & CTA */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-10">
            <div className="space-y-3 lg:space-y-4">
              <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em] block">REAL PROOF</span>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.95]">
                Trusted By <br />
                India's Fastest <br />
                <span className="text-brandYellow italic">D2C Brands.</span>
              </h2>
              <p className="text-white/50 text-sm lg:text-base font-medium max-w-xs leading-relaxed">
                We don't just manage ads; we rebuild unit economics for sustainable scale.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
                <button 
                  onClick={onBookAudit}
                  className="relative px-8 py-4 bg-brandYellow text-brandDark font-black text-[11px] lg:text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                >
                  Join The Top 1%
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.3em]">
                Limited to 10 brands per month.
              </p>
            </div>
          </div>

          {/* Right: Testimonials Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 lg:p-6 rounded-[1.5rem] flex flex-col justify-between group hover:bg-white/10 transition-all duration-500"
                >
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex justify-between items-start">
                      <Quote className="w-5 h-5 text-brandYellow/40" />
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, starIdx) => (
                          <Star key={starIdx} className="w-2 h-2 fill-brandYellow text-brandYellow" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-white/80 text-[11px] lg:text-xs xl:text-sm font-medium leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                    <img 
                      src={t.image} 
                      alt={t.founder} 
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-white font-black text-[11px] lg:text-xs tracking-tight truncate">{t.founder}</h4>
                      <p className="text-brandYellow text-[8px] lg:text-[9px] font-bold uppercase tracking-wider truncate">{t.brand} · {t.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
