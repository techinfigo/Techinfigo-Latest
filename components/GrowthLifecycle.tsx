'use client';

import React, { useState } from 'react';
import { Search, FlaskConical, ShieldCheck, TrendingUp, Users, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CAPACITY } from '../config/site';

interface GrowthLifecycleProps {
  onBookAudit?: () => void;
}

export const GrowthLifecycle: React.FC<GrowthLifecycleProps> = ({ onBookAudit }) => {
  const [selectedLeaks, setSelectedLeaks] = useState<number[]>([]);

  const profitLeaks = [
    { id: 1, text: "ROAS looks good, but margins are shrinking" },
    { id: 2, text: "Scaling revenue kills my profitability" },
    { id: 3, text: "Creatives burn out faster than we replace them" },
    { id: 4, text: "Hidden costs (Logistics/COD) are eating my cash" },
    { id: 5, text: "Unsure which product/ad is actually making money" }
  ];

  const protocolSteps = [
    { id: "01", label: "Diagnostic Audit" },
    { id: "02", label: "Margin Engineering" },
    { id: "03", label: "Scientific Testing" },
    { id: "04", label: "Profit Scaling" },
    { id: "05", label: "Asset Stabilization" }
  ];

  const toggleLeak = (id: number) => {
    setSelectedLeaks(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full py-12 lg:py-16 px-6 bg-brandBg font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-brandDark/[0.01] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        Diagnostic
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse" />
              <span className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.3em]">Profit Correction Lab</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter leading-[0.9] uppercase">
              Identify Your <span className="text-brandYellow italic">Leaks.</span>
            </h2>
          </div>
          <p className="text-brandDark/60 text-sm font-medium max-w-md md:text-right leading-relaxed">
            Select the issues preventing your growth. We'll show you the exact protocol step needed to stabilize your contribution margin.
          </p>
        </div>

        {/* Dashboard Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-brandDark/5">
          
          {/* Left Side: Diagnostic Input */}
          <div className="lg:col-span-5 p-8 lg:p-10 bg-brandBg/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-brandDark/30 uppercase tracking-widest">Self-Diagnostic Input</span>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-widest">{selectedLeaks.length} Identified</span>
            </div>
            
            <div className="space-y-3">
              {profitLeaks.map((leak) => (
                <button
                  key={leak.id}
                  onClick={() => toggleLeak(leak.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden ${
                    selectedLeaks.includes(leak.id)
                      ? 'bg-brandDark border-brandDark text-brandYellow shadow-lg translate-x-2'
                      : 'bg-white border-brandDark/5 text-brandDark/70 hover:border-brandYellow/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${
                    selectedLeaks.includes(leak.id)
                      ? 'bg-brandYellow border-brandYellow text-brandDark'
                      : 'bg-brandDark/5 border-brandDark/10 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[4]" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-tight leading-tight">
                    {leak.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4 opacity-40">
              <AlertTriangle className="w-4 h-4 text-brandDark" />
              <p className="text-[9px] font-black uppercase tracking-widest leading-none">
                Protocol: Fix leaks first, Scale second.
              </p>
            </div>
          </div>

          {/* Right Side: Correction Strategy Output */}
          <div className="lg:col-span-7 bg-brandDark p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-[100px] -mr-32 -mt-32" />
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Calculated Strategy</span>
                <div className="flex gap-1.5">
                  {protocolSteps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        selectedLeaks.length > 0 ? 'bg-brandYellow w-6' : 'bg-white/10 w-4'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLeaks.length > 0 ? 'active' : 'idle'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-[0.95]">
                      {selectedLeaks.length > 0 
                        ? `WE HAVE THE PROTOCOL TO BRIDGE ALL ${selectedLeaks.length} LEAKS.` 
                        : "IDENTIFY YOUR LEAKS TO REVEAL STRATEGY."
                      }
                    </h3>
                    <p className="text-white/60 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
                      {selectedLeaks.length > 0 
                        ? "Most agencies ignore these leaks and scale into deficits. We re-engineer your unit economics to stabilize profit before we push the ad spend pedal."
                        : "Use the diagnostic lab on the left to select the profit-killing issues you're currently facing in your D2C brand."
                      }
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
                {protocolSteps.map((step, i) => (
                  <div key={i} className={`space-y-2 transition-all duration-500 ${selectedLeaks.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}>
                    <div className="h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-brandYellow">
                      {step.id}
                    </div>
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest text-center leading-tight">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={onBookAudit}
                className="group relative w-full sm:w-auto px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(252,182,50,0.15)] flex items-center justify-center gap-3"
              >
                {selectedLeaks.length > 0 ? "Fix My Profit Leaks" : "Get Free Audit"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Next Batch</span>
                <span className="text-brandYellow text-[10px] font-black uppercase tracking-widest">{CAPACITY.nextBatch}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TargetItem = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

