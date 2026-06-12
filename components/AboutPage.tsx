'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { BarChart3, TrendingUp, Search, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

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
      role: "Founder & Lead Strategist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Growth Engine",
      role: "Proprietary Infrastructure",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    }
  ];

  // Using a triple array for seamless infinite looping
  const team = [...baseTeam, ...baseTeam, ...baseTeam, ...baseTeam];

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let animationId: number;
    let lastTime = 0;
    const speed = 0.5; // pixels per ms

    const scroll = (time: number) => {
      if (lastTime !== 0 && !isDragging && !isHovered) {
        const deltaTime = time - lastTime;
        slider.scrollLeft += speed * deltaTime;

        // Loop horizontally
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };
  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* 1. Header Section - Updated to 2 Lines */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              THE MISSION
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl uppercase">
              Building The <br className="hidden lg:block" />
              Profit-First Future
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              We started Techinfigo because the agency model was broken. <br className="hidden lg:block" />
              We aren't here for vanity metrics. We're here for net profit.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY Section */}
      <section className="py-16 lg:py-20 px-6 lg:px-12 bg-white relative overflow-hidden border-b border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
              THE MANIFESTO
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter uppercase">
              Why We Exist.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto max-h-[450px]">
              <Image 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200" 
                alt="Growth Architecture" 
                fill
                className="object-cover grayscale brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brandDark/10"></div>
            </div>
            <div className="space-y-6 lg:space-y-8 animate-slide-up">
              {[
                { title: "Zero Agency Bloat", desc: "No account managers. No junior interns. You work directly with the leads." },
                { title: "Profit Guardrails", desc: "We don't scale unless your contribution margin allows it. Efficiency first." },
                { title: "Systemic Growth", desc: "Ads are just one lever. We fix the offer, the ops, and the tech." },
                { title: "Founding Partner Focus", desc: "Currently onboarding our first cohort of founding partners only." }
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

      {/* 3. THE FOUNDER Section */}
      <section className="py-20 lg:py-28 bg-brandDark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-slide-up">
            <div className="space-y-3">
              <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
                FOUNDER-LED
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-none uppercase">
                Meet Your Partner
              </h2>
              <p className="text-white/40 text-sm lg:text-base max-w-xl font-medium">
                Hands-on execution from founders who have spent years in the trenches of D2C.
              </p>
            </div>
          </div>
        </div>

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
              <Image 
                src={member.image} 
                alt={member.name} 
                fill
                draggable="false"
                className="object-cover grayscale brightness-[0.45] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-75 transition-all duration-1000 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/10 to-transparent opacity-90"></div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1 transform group-hover:translate-y-[-4px] transition-transform duration-500 text-center">
                <p className="text-lg lg:text-xl font-black text-white leading-tight tracking-tight group-hover:text-brandYellow transition-colors">
                  {member.name}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-[1.5px] bg-brandYellow/60"></div>
                  <p className="text-[9px] lg:text-[10px] font-bold text-brandYellow/80 uppercase tracking-[0.2em]">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE JOURNEY Section - Timeline of Evolution */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 space-y-4 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
              THE GENESIS
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-[1.1] uppercase">
              The Evolution of <br className="hidden lg:block" /> The Techinfigo System
            </h2>
          </div>

          <div className="relative border-l-2 border-brandDark/5 ml-4 lg:ml-0 pl-10 lg:pl-20 space-y-20">
            {[
              {
                year: "PHASE 01",
                title: "Obsession with P&L",
                desc: "Sachin Kumar begins identifying the massive gap between vanity ROAS and actual business net profit while consulting."
              },
              {
                year: "PHASE 02",
                title: "Standardizing the Stack",
                desc: "Developing the proprietary 'Profit-First' blueprints for meta scaling, creative velocity, and full-stack ops."
              },
              {
                year: "PHASE 03",
                title: "Incubating Techinfigo",
                desc: "Building the infrastructure to support high-intensity D2C partnerships without the traditional agency lag."
              },
              {
                year: "TODAY",
                title: "Founding Partner Onboarding",
                desc: "Officially opening doors to a limited pool of 3-5 high-potential brands to scale into national leaders."
              }
            ].map((item, i) => (
              <div key={i} className="relative group animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute -left-[51px] lg:-left-[91px] top-1.5 w-5 h-5 rounded-full bg-brandDark border-4 border-white shadow-sm group-hover:scale-125 group-hover:bg-brandYellow transition-all duration-500"></div>
                
                <div className="space-y-4">
                  <span className="text-xl lg:text-2xl font-black text-brandYellow tracking-tight block">
                    {item.year}
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tighter uppercase">
                      {item.title}
                    </h3>
                    <p className="text-brandDark/60 text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE STANDARD Section - What We Target */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#fcfcfc] border-t border-brandDark/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
              THE STANDARD
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-tight uppercase">
              Our System Targets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-slide-up">
            {[
              {
                target: "Account Efficiency",
                desc: "We target a minimum 20% reduction in blended CAC through variable isolation testing.",
                icon: <BarChart3 className="w-8 h-8 text-brandYellow" />
              },
              {
                target: "Scaling Velocity",
                desc: "Our system targets 2-3x profit-backed scale within the first 120 days of partnership.",
                icon: <Zap className="w-8 h-8 text-brandYellow" />
              }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-3xl border border-brandDark/5 relative group hover:shadow-4xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-brandYellow/10 transition-colors"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-brandDark/5 flex items-center justify-center group-hover:bg-brandDark group-hover:text-brandYellow transition-all duration-500">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-black text-brandDark tracking-tighter uppercase whitespace-nowrap">{stat.target}</h3>
                  <p className="text-brandDark/50 text-base lg:text-xl font-medium leading-relaxed max-w-md">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Comparison Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white border-t border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tighter leading-none uppercase">
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
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">Guesswork Agencies</h3>
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
                  <h3 className="text-3xl font-black text-brandDark tracking-tight uppercase">Growth Engineers</h3>
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
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none uppercase">
            Start Your <br />
            <span className="text-brandYellow">Audit.</span>
          </h2>
          <p className="text-white/40 text-lg lg:text-xl font-medium max-w-xl mx-auto leading-relaxed">
            We are currently accepting our first founding partners. <br/> 
            Spaces are intentionally limited to preserve throughput.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-14 py-6 bg-brandYellow text-brandDark font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-white hover:scale-105 transition-all duration-500 shadow-glow"
          >
            Get My Free Profit Audit
          </button>
        </div>
      </section>
    </div>
  );
};