import React, { useState, useEffect, useCallback } from 'react';
import { Quote, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  },
  {
    brand: "Sugar Cosmetics",
    founder: "Vineeta Singh",
    result: "2.8x ROAS Improvement",
    quote: "Their data-first approach to scaling is refreshing. They don't just show you dashboards; they show you profit.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  },
  {
    brand: "Boat",
    founder: "Aman Gupta",
    result: "60% Increase in LTV",
    quote: "The retention flows they built for us are a game changer. Our repeat customer rate has never been higher.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    brand: "Mamaearth",
    founder: "Ghazal Alagh",
    result: "35% Lower Blended CAC",
    quote: "They understand the nuances of the Indian D2C market like no one else. Highly recommended for serious brands.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
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
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
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
                {testimonials.map((_, idx) => (
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
          <div className="lg:col-span-7 relative h-[350px] lg:h-[400px] flex items-center">
            <div className="relative w-full h-full overflow-hidden lg:overflow-visible">
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
                  <div className="w-full max-w-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10 rounded-[2rem] flex flex-col justify-between shadow-2xl relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <Quote className="w-10 h-10 text-brandYellow/20" />
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star key={starIdx} className="w-3 h-3 fill-brandYellow text-brandYellow" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-white/90 text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed italic">
                        "{testimonials[currentIndex].quote}"
                      </p>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].founder} 
                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-brandYellow/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-white font-black text-base lg:text-lg tracking-tight">{testimonials[currentIndex].founder}</h4>
                        <p className="text-brandYellow text-[10px] lg:text-[11px] font-bold uppercase tracking-widest">{testimonials[currentIndex].brand} · {testimonials[currentIndex].result}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 items-center gap-6">
              <button onClick={prevSlide} className="text-white/40 hover:text-brandYellow"><ChevronLeft className="w-8 h-8" /></button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
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

