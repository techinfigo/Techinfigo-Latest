'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Zap, BarChart3, Quote, X, CheckCircle2, Filter, ChevronRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  brand: string;
  category: string;
  before: {
    spend: string;
    roas: string;
    profit: string;
    pain: string;
  };
  after: {
    spend: string;
    profit: string;
    cacReduction: string;
    gain: string;
  };
  highlight: string;
  details: {
    overview: {
      industry: string;
      revenue: string;
      spend: string;
    };
    problem: string;
    diagnosis: string[];
    solution: string[];
    results: {
      profitBefore: string;
      profitAfter: string;
      cacImprovement: string;
      timeline: string;
    };
    quote: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'skincare-india',
    brand: 'D2C Skincare Brand (India)',
    category: 'Skincare',
    before: {
      spend: '₹12L/month',
      roas: '4.8x',
      profit: '₹1.2L',
      pain: 'High CAC & unstable scaling'
    },
    after: {
      spend: '₹12L',
      profit: '₹5.6L/month',
      cacReduction: '32%',
      gain: 'Stable & predictable growth'
    },
    highlight: 'Profit Increased 4.6x Without Increasing Ad Spend',
    details: {
      overview: {
        industry: 'Personal Care / Skincare',
        revenue: '₹50L - ₹1Cr / month',
        spend: '₹12L / month'
      },
      problem: 'Scaling revenue but profit not growing. Every time they increased spend, CAC shot up, wiping out margins.',
      diagnosis: [
        'High CAC due to broad targeting and weak creative hooks.',
        'Poor backend retention; 85% of revenue was from first-time buyers.',
        'Wrong scaling strategy: Scaling horizontally without stabilizing unit economics.'
      ],
      solution: [
        'Fixed Funnel: Re-engineered the landing page for 4.2% CR (up from 1.8%).',
        'Improved AOV: Bundling strategy increased AOV by 24%.',
        'Reduced CAC: Creative-led growth strategy focused on high-intent hooks.',
        'Stabilized: Built a 90-day LTV model before scaling spend.'
      ],
      results: {
        profitBefore: '₹1.2L',
        profitAfter: '₹5.6L',
        cacImprovement: '32% Reduction',
        timeline: '75 Days'
      },
      quote: 'We finally understood where our money was going. Techinfigo didn’t just give us a higher ROAS; they gave us a healthier business.'
    }
  },
  {
    id: 'apparel-lifestyle',
    brand: 'Premium Apparel Label',
    category: 'Apparel',
    before: {
      spend: '₹8L/month',
      roas: '3.2x',
      profit: '₹80K',
      pain: 'Low AOV & high return rates'
    },
    after: {
      spend: '₹10L',
      profit: '₹3.8L/month',
      cacReduction: '24%',
      gain: 'High-LTV customer acquisition'
    },
    highlight: 'Net Profit Grew 4.7x While Scaling Spend by 25%',
    details: {
      overview: {
        industry: 'Fashion & Apparel',
        revenue: '₹30L - ₹50L / month',
        spend: '₹8L / month'
      },
      problem: 'Brand was stuck in a "discount loop". Revenue was coming only during sales, and returns were eating 30% of revenue.',
      diagnosis: [
        'Low AOV due to single-item purchases.',
        'High RTO (Return to Origin) due to poor COD verification.',
        'Ad creative focused on price rather than brand value.'
      ],
      solution: [
        'Value-Based Creative: Shifted from "Sale" ads to "Lifestyle" storytelling.',
        'RTO Optimization: Implemented automated WhatsApp verification for COD.',
        'Upsell Engine: Post-purchase upsells increased AOV by ₹450.',
        'Profit-First Scaling: Only scaled products with >40% contribution margin.'
      ],
      results: {
        profitBefore: '₹80K',
        profitAfter: '₹3.8L',
        cacImprovement: '24% Reduction',
        timeline: '90 Days'
      },
      quote: 'Techinfigo fixed our bottom line before they touched our top line. Our business is finally sustainable.'
    }
  },
  {
    id: 'supplements-growth',
    brand: 'Performance Supplement Brand',
    category: 'Supplements',
    before: {
      spend: '₹25L/month',
      roas: '2.4x',
      profit: '₹2L',
      pain: 'Stagnant growth & high churn'
    },
    after: {
      spend: '₹45L',
      profit: '₹14L/month',
      cacReduction: '41%',
      gain: 'Dominant market share'
    },
    highlight: '7x Profit Growth Through Retention-First Scaling',
    details: {
      overview: {
        industry: 'Health & Wellness',
        revenue: '₹1Cr+ / month',
        spend: '₹25L / month'
      },
      problem: 'High customer acquisition cost meant they were losing money on the first order. Churn was high, and LTV was low.',
      diagnosis: [
        'Negative contribution margin on first purchase.',
        'No automated retention flows (Email/SMS/WhatsApp).',
        'Inefficient creative testing: Spending 80% on "loser" creatives.'
      ],
      solution: [
        'Subscription Model: Launched a "Subscribe & Save" program.',
        'Retention Flows: Built a 12-step automated retention engine.',
        'Creative Sandbox: Implemented a rapid testing framework to find winners.',
        'LTV Scaling: Scaled spend based on 6-month LTV, not just 1-day ROAS.'
      ],
      results: {
        profitBefore: '₹2L',
        profitAfter: '₹14L',
        cacImprovement: '41% Reduction',
        timeline: '120 Days'
      },
      quote: 'They turned our supplement brand into a recurring revenue machine. The profit growth has been life-changing.'
    }
  }
];

const CATEGORIES = ['All', 'Skincare', 'Apparel', 'Supplements', 'Lifestyle'];

interface CaseStudiesPageProps {
  onNavigate: (page: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredCaseStudies = activeCategory === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(cs => cs.category === activeCategory);

  useEffect(() => {
    if (selectedCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCaseStudy]);

  return (
    <div className="min-h-screen bg-[#001d21] text-white font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brandYellow/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-brandYellow/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-brandYellow/20 bg-brandYellow/5 text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              Case Studies
            </span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              Real Profit.<br />
              <span className="text-brandYellow">Not Just ROAS.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
              See how we help D2C brands turn ad spend into predictable profit by fixing unit economics and scaling what actually matters.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-brandYellow text-brandDark font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(252,182,50,0.3)] flex items-center gap-2 mx-auto"
            >
              Get My Profit Audit <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 lg:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-brandYellow border-brandYellow text-brandDark shadow-lg' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study List */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((cs, index) => (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-[#002a2f] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="p-8 lg:p-10 space-y-8">
                    {/* Top */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest mb-2 block">{cs.category}</span>
                        <h3 className="text-2xl font-bold tracking-tight">{cs.brand}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brandYellow transition-colors duration-500">
                        <TrendingUp className="w-6 h-6 text-white/40 group-hover:text-brandDark transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Middle: Before vs After */}
                    <div className="grid grid-cols-2 gap-6 relative">
                      {/* Vertical Divider */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2"></div>
                      
                      {/* Before */}
                      <div className="space-y-4 opacity-40 group-hover:opacity-60 transition-opacity">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Before</span>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/40">Spend</span>
                            <span className="text-xs font-mono">{cs.before.spend}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/40">ROAS</span>
                            <span className="text-xs font-mono">{cs.before.roas}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/40">Net Profit</span>
                            <span className="text-xs font-mono">{cs.before.profit}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-white/30 italic leading-tight">{cs.before.pain}</p>
                      </div>

                      {/* After */}
                      <div className="space-y-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brandYellow">After AIS</span>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/60">Spend</span>
                            <span className="text-xs font-mono text-white">{cs.after.spend}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/60">Net Profit</span>
                            <span className="text-sm font-black font-mono text-brandYellow">{cs.after.profit}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/60">CAC Reduction</span>
                            <span className="text-xs font-mono text-brandYellow">-{cs.after.cacReduction}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-brandYellow font-bold leading-tight uppercase tracking-wider">{cs.after.gain}</p>
                      </div>
                    </div>

                    {/* Bottom: Highlight */}
                    <div className="pt-8 border-t border-white/5">
                      <p className="text-lg font-bold leading-tight mb-6 group-hover:text-brandYellow transition-colors">
                        "{cs.highlight}"
                      </p>
                      <button 
                        onClick={() => setSelectedCaseStudy(cs)}
                        className="w-full py-4 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brandDark transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        View Full Breakdown <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <p className="text-sm font-bold text-white/30 uppercase tracking-[0.3em] text-center lg:text-left">
              Worked with D2C brands across:
            </p>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <span key={cat} className="text-lg font-black text-white/10 uppercase tracking-tighter hover:text-white/20 transition-colors cursor-default">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-brandYellow/[0.02] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">
            Want Similar Results<br />
            <span className="text-brandYellow">for Your Brand?</span>
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
            We'll show you exactly where your profit is leaking and build a roadmap to fix it. No vanity metrics, just bottom-line growth.
          </p>
          <div className="space-y-6">
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandYellow text-brandDark font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(252,182,50,0.4)] text-lg"
            >
              Get Free Profit Audit
            </button>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
              Limited to 2 brands per month
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-brandDark/95 backdrop-blur-xl"
              onClick={() => setSelectedCaseStudy(null)}
            ></div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#002a2f] rounded-[3rem] border border-white/10 shadow-2xl overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-brandDark transition-all z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 lg:p-16">
                {/* Header */}
                <div className="mb-16">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-brandYellow/20 bg-brandYellow/5 text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                    Full Breakdown
                  </span>
                  <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">
                    {selectedCaseStudy.brand}
                  </h2>
                  
                  {/* Overview Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Industry</span>
                      <p className="text-lg font-bold">{selectedCaseStudy.details.overview.industry}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Revenue Range</span>
                      <p className="text-lg font-bold">{selectedCaseStudy.details.overview.revenue}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Ad Spend</span>
                      <p className="text-lg font-bold">{selectedCaseStudy.details.overview.spend}</p>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  {/* Left Column: Problem & Diagnosis */}
                  <div className="lg:col-span-7 space-y-16">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brandYellow/10 flex items-center justify-center border border-brandYellow/20">
                          <Target className="w-4 h-4 text-brandYellow" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">The Problem</h3>
                      </div>
                      <p className="text-lg text-white/60 leading-relaxed font-normal">
                        {selectedCaseStudy.details.problem}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brandYellow/10 flex items-center justify-center border border-brandYellow/20">
                          <BarChart3 className="w-4 h-4 text-brandYellow" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">The Diagnosis</h3>
                      </div>
                      <div className="space-y-4">
                        {selectedCaseStudy.details.diagnosis.map((item, i) => (
                          <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                            <span className="text-brandYellow font-mono text-sm">0{i+1}</span>
                            <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brandYellow/10 flex items-center justify-center border-brandYellow/20 border">
                          <Zap className="w-4 h-4 text-brandYellow" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">What We Did</h3>
                      </div>
                      <div className="space-y-4">
                        {selectedCaseStudy.details.solution.map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="mt-1.5">
                              <CheckCircle2 className="w-4 h-4 text-brandYellow" />
                            </div>
                            <p className="text-base text-white/80 leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Results & Quote */}
                  <div className="lg:col-span-5 space-y-10">
                    {/* Results Card */}
                    <div className="bg-brandYellow p-8 lg:p-10 rounded-[2.5rem] text-brandDark space-y-8 shadow-2xl">
                      <h3 className="text-2xl font-black uppercase tracking-tighter">The Results</h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-brandDark/10 pb-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Profit (Before)</span>
                          <span className="text-xl font-mono font-black">{selectedCaseStudy.details.results.profitBefore}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-brandDark/10 pb-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Profit (After)</span>
                          <span className="text-3xl font-mono font-black">{selectedCaseStudy.details.results.profitAfter}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-brandDark/10 pb-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">CAC Improvement</span>
                          <span className="text-xl font-mono font-black">{selectedCaseStudy.details.results.cacImprovement}</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Timeline</span>
                          <span className="text-xl font-mono font-black">{selectedCaseStudy.details.results.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quote Card */}
                    <div className="p-8 lg:p-10 border border-white/10 rounded-[2.5rem] bg-white/5 space-y-6 relative overflow-hidden">
                      <Quote className="absolute -top-4 -left-4 w-24 h-24 text-white/[0.03]" />
                      <p className="text-xl font-medium italic leading-relaxed relative z-10">
                        "{selectedCaseStudy.details.quote}"
                      </p>
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        <div className="w-10 h-10 rounded-full bg-brandYellow/20 flex items-center justify-center">
                          <span className="text-brandYellow font-bold text-xs">F</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold">Founder</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest">{selectedCaseStudy.brand}</p>
                        </div>
                      </div>
                    </div>

                    {/* Visual Proof Placeholder */}
                    <div className="aspect-video bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center group">
                      <BarChart3 className="w-12 h-12 text-white/10 mb-4 group-hover:text-brandYellow transition-colors" />
                      <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Dashboard Proof Attached</p>
                      <p className="text-[10px] text-white/10 mt-2">Proprietary data obscured for privacy</p>
                    </div>

                    <button 
                      onClick={() => onNavigate('contact')}
                      className="w-full py-5 bg-white text-brandDark font-black rounded-full hover:bg-brandYellow transition-colors shadow-xl text-lg"
                    >
                      Get My Profit Audit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(252, 182, 50, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(252, 182, 50, 0.4);
        }
      `}</style>
    </div>
  );
};
