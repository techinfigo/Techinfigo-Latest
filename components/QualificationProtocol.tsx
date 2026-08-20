'use client';

import React, { useState, useMemo } from 'react';
import { CheckCircle2, ArrowRight, Zap, Target, TrendingUp, Settings, BarChart3, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteSettings } from './SiteSettingsProvider';

interface QualificationProtocolProps {
  onBookAudit: () => void;
}

const CRITERIA = [
  {
    id: 'spend',
    label: 'Spending ₹2L+/mo',
    description: 'You have a proven product and are already investing in traffic.',
    icon: Zap,
  },
  {
    id: 'profit',
    label: 'Profit Focused',
    description: 'You care about bottom-line margins more than vanity ROAS.',
    icon: Target,
  },
  {
    id: 'orders',
    label: 'Stable Orders',
    description: 'You have consistent sales but your margins feel unstable.',
    icon: BarChart3,
  },
  {
    id: 'predictable',
    label: 'Repeatable Growth',
    description: 'You want a system that works every month, not just by luck.',
    icon: TrendingUp,
  },
  {
    id: 'backend',
    label: 'Backend Ready',
    description: 'You are willing to fix operations to support 10x volume.',
    icon: Settings,
  }
];

export const QualificationProtocol: React.FC<QualificationProtocolProps> = ({ onBookAudit }) => {
  const { capacity } = useSiteSettings();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleCriteria = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const score = selectedIds.length;
  const progress = (score / CRITERIA.length) * 100;

  const getStatus = () => {
    if (score === 0) return { label: 'Select your current stage', color: 'text-brandDark/40' };
    if (score <= 2) return { label: 'Building Foundation', color: 'text-brandDark/60' };
    if (score <= 4) return { label: 'Growth Potential', color: 'text-brandYellow/80' };
    return { label: 'Ready to Scale', color: 'text-brandYellow' };
  };  const getPersonalizedMessage = () => {
    if (score === 5) return "Your brand is in the top 1% of readiness. You have the foundations; now you need the infrastructure. Book your audit immediately to claim a founding partner slot.";
    if (score >= 3) return "You have significant growth potential, but profit leaks are currently slowing your velocity. A diagnostic audit will pinpoint exactly where capital is being or wasted.";
    return "You are in the build phase. Focus on fixing the unit economics before pushing budgets. Let's map out your roadmap in a free profit audit.";
  };

  const status = getStatus();

  return (
    <section className="w-full py-32 lg:py-48 px-6 bg-brandBg font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-brandYellow/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] bg-brandDark/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 lg:mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark/5 border border-brandDark/10 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-brandYellow" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/60">Profit Readiness Quiz</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black text-brandDark tracking-tighter leading-[0.9] max-w-5xl mx-auto uppercase"
          >
            Is Your Brand Ready To <br />
            <span className="text-brandYellow italic">Scale Profitably?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brandDark/60 text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Select the statements that describe your current stage. Our system is designed for brands ready for extreme unit-economic efficiency.
          </motion.p>
        </div>

        {/* Diagnostic Tool Container */}
        <div className="bg-white rounded-[3rem] shadow-3xl border border-black/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brandYellow/5 blur-[100px] rounded-full -mr-48 -mt-48 opacity-50"></div>
          
          {/* Progress Header */}
          <div className="bg-brandDark p-10 lg:p-16 text-white relative h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16">
              <div className="space-y-3">
                <p className="text-brandYellow text-[11px] font-black uppercase tracking-[0.4em]">Readiness Score</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl lg:text-8xl font-black tracking-tighter">{score}</span>
                  <span className="text-white/30 text-3xl font-bold">/ {CRITERIA.length}</span>
                </div>
              </div>
              <div className="flex-1 max-w-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[12px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="text-[12px] font-bold text-white/40">{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-brandYellow shadow-[0_0_20px_rgba(252,182,50,0.6)] rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Grid of Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CRITERIA.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => toggleCriteria(item.id)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        toggleCriteria(item.id);
                      }
                    }}
                    className={`relative p-8 rounded-3xl border-2 transition-all duration-500 text-left group cursor-pointer ${
                      isSelected 
                        ? 'bg-white/10 border-brandYellow shadow-[inset_0_0_30px_rgba(252,182,50,0.1)]' 
                        : 'bg-white/5 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex flex-col gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-lg ${
                        isSelected ? 'bg-brandYellow text-brandDark rotate-3' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-3">
                        <h4 className={`text-xl font-black tracking-tight transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>
                          {item.label}
                        </h4>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                      <div className={`absolute top-6 right-6 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isSelected ? 'bg-brandYellow border-brandYellow scale-110 shadow-lg shadow-brandYellow/20' : 'border-white/10'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-brandDark" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Result / Action Area */}
          <div className="p-10 lg:p-16 bg-white flex flex-col lg:flex-row items-center justify-between gap-12 relative">
            <div className="max-w-2xl text-center lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={score}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brandDark text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">
                    <Target className="w-4 h-4 text-brandYellow" />
                    Personalized Insight
                  </div>
                  <h3 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
                    {score >= 4 ? "The Scale Batch is Open." : score > 0 ? "Strategic Realignment." : "Diagnostic Required."}
                  </h3>
                  <p className="text-brandDark/70 text-lg lg:text-xl font-medium leading-relaxed">
                    {getPersonalizedMessage()}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="shrink-0 group">
              <motion.button
                onClick={onBookAudit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-7 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-4">
                  Get My Free Profit Audit
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-brandDark opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              </motion.button>
              {capacity.showScarcity && (
                <p className="mt-4 text-center text-[10px] font-black text-brandDark/30 uppercase tracking-[0.3em]">
                  Founding Partner Batch: {capacity.slotsOpen} Spots Left
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-brandDark/30 text-xs font-bold uppercase tracking-[0.5em] animate-pulse">
            Precision over volume. Profit over revenue.
          </p>
        </div>
      </div>
    </section>
  );
};
