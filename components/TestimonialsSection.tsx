import React, { useState, useEffect, useCallback } from 'react';
import { Quote, Star, ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Realization {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const realizations: Realization[] = [
  {
    title: "Revenue ≠ Profit",
    text: "Most founders think they’re growing because revenue is increasing — until they actually look at profit.",
    icon: <TrendingUp className="w-6 h-6 text-brandYellow" />
  },
  {
    title: "ROAS Isn’t the Full Story",
    text: "A good ROAS doesn’t always mean a profitable business. Real growth comes from understanding margins.",
    icon: <Star className="w-6 h-6 text-brandYellow" />
  },
  {
    title: "Scaling Without Clarity Is Risky",
    text: "Increasing ad spend without stable unit economics often leads to higher losses — not growth.",
    icon: <ChevronRight className="w-6 h-6 text-brandYellow" />
  },
  {
    title: "Backend Matters More Than Ads",
    text: "Retention, AOV, and repeat purchases often impact profit more than ads themselves.",
    icon: <Quote className="w-6 h-6 text-brandYellow" />
  }
];

interface TestimonialsSectionProps {
  onBookAudit?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookAudit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % realizations.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + realizations.length) % realizations.length);
  }, []);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="w-full lg:min-h-screen flex flex-col justify-center py-12 lg:py-20 px-6 bg-[#000d0e] font-sans relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brandYellow rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Header & CTA */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-10">
            <div className="space-y-3 lg:space-y-4">
              <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em] block">WHAT D2C FOUNDERS REALIZE</span>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.95]">
                Clarity That Changes <br />
                How You Look at <br />
                <span className="text-brandYellow italic">Growth.</span>
              </h2>
              <div className="space-y-2">
                <p className="text-white/70 text-sm lg:text-base font-bold leading-relaxed">
                  We don’t use fake testimonials.
                </p>
                <p className="text-white/40 text-xs lg:text-sm font-medium leading-relaxed">
                  We share what founders usually realize after seeing their numbers clearly.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
                <button 
                  onClick={onBookAudit}
                  className="relative px-8 py-4 bg-brandYellow text-brandDark font-black text-[11px] lg:text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                >
                  Understand My Numbers
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.3em]">
                No fluff. Just clarity on your business.
              </p>
            </div>

            {/* Navigation Controls (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 pt-4">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brandYellow hover:border-brandYellow transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brandYellow hover:border-brandYellow transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="flex gap-2 ml-4">
                {realizations.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brandYellow w-6' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Testimonial Slider */}
          <div className="lg:col-span-7 relative h-[400px] lg:h-[450px] flex flex-col justify-center">
            <div className="relative w-full h-[300px] lg:h-[350px] overflow-hidden lg:overflow-visible mb-8">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div 
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full max-w-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-12 rounded-[2rem] flex flex-col justify-center shadow-2xl relative group min-h-[280px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-brandYellow/10 rounded-xl">
                          {realizations[currentIndex].icon}
                        </div>
                        <div className="text-[10px] font-black text-brandYellow/40 uppercase tracking-[0.3em]">
                          INSIGHT {currentIndex + 1}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                          {realizations[currentIndex].title.split(' ').map((word, i) => (
                            <span key={i} className={['Profit', 'ROAS', 'CAC'].includes(word) ? 'text-brandYellow' : ''}>
                              {word}{' '}
                            </span>
                          ))}
                        </h3>
                        <p className="text-white/70 text-base lg:text-lg font-medium leading-relaxed">
                          {realizations[currentIndex].text}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Authority Strip & Future Proof */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="h-[1px] w-8 bg-brandYellow/30"></div>
                <p className="text-[10px] lg:text-[11px] font-bold text-brandYellow uppercase tracking-[0.3em]">
                  These are patterns we consistently see across D2C brands
                </p>
              </div>
              <p className="text-white/20 text-[9px] lg:text-[10px] font-medium italic">
                Real case studies will be published as we work with more brands.
              </p>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden absolute -bottom-16 left-1/2 -translate-x-1/2 items-center gap-6">
              <button onClick={prevSlide} className="text-white/40 hover:text-brandYellow"><ChevronLeft className="w-8 h-8" /></button>
              <div className="flex gap-2">
                {realizations.map((_, idx) => (
                  <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex ? 'bg-brandYellow' : 'bg-white/20'}`} />
                ))}
              </div>
              <button onClick={nextSlide} className="text-white/40 hover:text-brandYellow"><ChevronRight className="w-8 h-8" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

