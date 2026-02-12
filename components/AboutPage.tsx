import React, { useRef, useState, useEffect } from 'react';

interface AboutPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const baseTeam = [
    {
      name: "Sachin Kumar",
      role: "Founder & Strategist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Priya Patel",
      role: "Head of Performance",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sneha Gupta",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Rahul Kumar",
      role: "SEO Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Isha Verma",
      role: "Retention Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Ankit Sharma",
      role: "D2C Consultant",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Vikram Singh",
      role: "Data Infrastructure",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Aman Deep",
      role: "Senior Media Buyer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    }
  ];

  // Using a triple array for seamless infinite looping
  const team = [...baseTeam, ...baseTeam, ...baseTeam];

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    // Start in the middle set for immediate infinity
    const oneThird = slider.scrollWidth / 3;
    slider.scrollLeft = oneThird;

    let animationFrameId: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      if (!isDragging && !isHovered && slider) {
        const deltaTime = time - lastTime;
        // Constant slow drift
        slider.scrollLeft += 0.04 * deltaTime;

        // Reset logic for infinite feel
        if (slider.scrollLeft >= oneThird * 2) {
          slider.scrollLeft -= oneThird;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Drag multiplier for "friendly" speed
    const newScrollLeft = scrollLeft - walk;
    
    const oneThird = scrollRef.current.scrollWidth / 3;
    
    // Smooth looping during drag
    if (newScrollLeft >= oneThird * 2) {
      const resetScroll = newScrollLeft - oneThird;
      scrollRef.current.scrollLeft = resetScroll;
      setScrollLeft(resetScroll);
      setStartX(x);
    } else if (newScrollLeft <= 0) {
      const resetScroll = newScrollLeft + oneThird;
      scrollRef.current.scrollLeft = resetScroll;
      setScrollLeft(resetScroll);
      setStartX(x);
    } else {
      scrollRef.current.scrollLeft = newScrollLeft;
    }
  };

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* 1. Header Section */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              ABOUT US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              The Growth Partner <br />
              Behind Ambitious D2C <br />
              Brands
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              We're a team of strategists, creatives, and data nerds obsessed <br className="hidden lg:block" />
              with building profitable, compounding growth systems.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY Section */}
      <section className="py-16 lg:py-20 px-6 lg:px-12 bg-white relative overflow-hidden border-b border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">
              How We Drive Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto max-h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200" 
                alt="Growth Architecture" 
                className="w-full h-full object-cover grayscale brightness-90"
              />
              <div className="absolute inset-0 bg-brandDark/10"></div>
            </div>
            <div className="space-y-6 lg:space-y-8 animate-slide-up">
              {[
                { title: "Clear Promises", desc: "We commit to outcomes, not just activities. Predictable growth starts here." },
                { title: "Data + Judgement", desc: "Data tells us what happened, experience tells us what to do next." },
                { title: "Speed Over Perfect", desc: "We prioritize momentum and rapid learning cycles over overthinking." },
                { title: "Partners, Not Vendors", desc: "We integrate with your team and share your specific growth goals." }
              ].map((point, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-brandDark flex items-center justify-center shrink-0 group-hover:bg-brandYellow transition-colors duration-500 shadow-lg">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg lg:text-xl font-black text-brandDark tracking-tight leading-none uppercase">{point.title}</h3>
                    <p className="text-brandDark/50 text-xs lg:text-sm font-medium leading-relaxed max-w-md">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE TEAM Section - REFINED LOOP + GRAB */}
      <section className="py-20 lg:py-28 bg-brandDark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-slide-up">
            <div className="space-y-3">
              <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
                THE BUREAU
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-none">
                Meet the Growth Experts
              </h2>
              <p className="text-white/40 text-sm lg:text-base max-w-xl font-medium">
                High-performance minds operating as your expansion unit. Grab to explore.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="w-12 h-[1px] bg-brandYellow/30"></div>
               <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest whitespace-nowrap">Grab & Slide Active</span>
            </div>
          </div>
        </div>

        {/* Improved Slider Track */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto scrollbar-hide gap-5 lg:gap-8 px-6 lg:px-12 pb-12 active:cursor-grabbing cursor-grab transition-shadow ${isDragging ? 'select-none' : ''}`}
        >
          {team.map((member, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[180px] lg:w-[220px] group relative aspect-[3/4.2] rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl bg-brandSurface"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                draggable="false"
                className="w-full h-full object-cover grayscale brightness-[0.45] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-75 transition-all duration-1000 pointer-events-none"
              />
              
              {/* Card Overlay UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/10 to-transparent opacity-90"></div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                <p className="text-lg lg:text-xl font-black text-white leading-tight tracking-tight group-hover:text-brandYellow transition-colors">
                  {member.name}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-[1.5px] bg-brandYellow/60"></div>
                  <p className="text-[9px] lg:text-[10px] font-bold text-brandYellow/80 uppercase tracking-[0.2em]">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* 4. Comparison Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tighter leading-none">
              The Architecture <br />
              of <span className="text-brandYellow">Certainty.</span>
            </h2>
            <p className="text-lg lg:text-xl text-brandDark/50 font-medium">
              We solve for the only metric that matters: <span className="text-brandDark font-bold italic underline decoration-brandYellow">Net Contribution Margin.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
             <div className="bg-brandDark rounded-[2.5rem] p-10 lg:p-14 space-y-10 shadow-2xl">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">The Status Quo</span>
                  <h3 className="text-3xl font-black text-white tracking-tight">Guesswork Agencies</h3>
                </div>
                <ul className="space-y-6">
                  {["Creative based on 'vibes'", "Scaling on platform glitches", "Disconnected channel silos", "Junior talent account burnout"].map((text, i) => (
                    <li key={i} className="flex gap-4 items-center text-white/40">
                      <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-xs">✕</div>
                      <span className="text-lg font-bold tracking-tight">{text}</span>
                    </li>
                  ))}
                </ul>
             </div>
             
             <div className="bg-[#fffcf5] rounded-[2.5rem] p-10 lg:p-14 space-y-10 shadow-xl border border-brandYellow/10">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em]">The Techinfigo Way</span>
                  <h3 className="text-3xl font-black text-brandDark tracking-tight">Growth Engineers</h3>
                </div>
                <ul className="space-y-6">
                  {["Variable isolation testing", "Unit-economic guardrail scaling", "Full-stack growth architecture", "Direct partner-led execution"].map((text, i) => (
                    <li key={i} className="flex gap-4 items-center text-brandDark">
                      <div className="w-5 h-5 rounded-full bg-brandYellow flex items-center justify-center text-[10px] font-black">✓</div>
                      <span className="text-lg font-bold tracking-tight">{text}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Final Terminal CTA */}
      <section className="py-24 lg:py-32 bg-brandDark relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#fcb63220_0%,_transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-10">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Ready to <br />
            <span className="text-brandYellow">Initialize?</span>
          </h2>
          <p className="text-white/40 text-lg lg:text-xl font-medium max-w-xl mx-auto">
            We are currently accepting only 2 new partners for this quarter.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-14 py-6 bg-brandYellow text-brandDark font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-white hover:scale-105 transition-all duration-500 shadow-glow"
          >
            Apply for Free Audit
          </button>
        </div>
      </section>
    </div>
  );
};