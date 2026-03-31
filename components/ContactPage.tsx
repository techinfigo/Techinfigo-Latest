
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ChevronLeft, ShieldCheck, Zap, BarChart3, Target } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange, placeholder = "Select...", required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">
        {label} {required && <span className="text-brandYellow font-black">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#fcfcfc] border px-5 py-4 text-sm font-medium rounded-xl transition-all duration-300 text-left ${
          isOpen ? 'border-brandYellow ring-2 ring-brandYellow/5' : 'border-[#f0f0f0]'
        }`}
      >
        <span className={selectedOption ? 'text-brandDark' : 'text-brandDark/30'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 text-brandDark/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brandYellow' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-[100] left-0 right-0 mt-2 bg-white border border-[#f0f0f0] rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                value === opt.value 
                  ? 'bg-brandYellow text-brandDark' 
                  : 'hover:bg-brandYellow/10 text-brandDark/70 hover:text-brandDark'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface ContactPageProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
  onBookAudit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigate, onBookAudit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    brandName: '',
    website: '',
    businessModel: '',
    revenue: '',
    adSpend: '',
    challenge: '',
    name: '',
    email: '',
    whatsapp: ''
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isPriority = formData.revenue === '20-50' || formData.revenue === '50+';

    fetch("https://formsubmit.co/ajax/thetechinfigo@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Growth Audit Application ${isPriority ? '[PRIORITY]' : ''} - Techinfigo`,
        ...formData,
        priority: isPriority ? 'YES' : 'NO'
      })
    })
    .then(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.brandName && formData.businessModel;
    if (currentStep === 2) return formData.revenue && formData.adSpend;
    if (currentStep === 3) return formData.challenge;
    return formData.name && formData.email && formData.whatsapp;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col font-sans">
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 w-full"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Main Success Card */}
              <div className="bg-brandDark text-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brandYellow/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-10">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brandYellow">Application Verified</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                      Your Scaling Roadmap <br/> <span className="text-brandYellow">is being built.</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
                      We've logged your data. Our team is now analyzing your funnel to identify the exact leaks stopping you from scaling.
                    </p>
                  </div>

                  <div className="w-full max-w-md space-y-6">
                    <button 
                      onClick={() => window.open('https://calendly.com', '_blank')}
                      className="w-full py-6 bg-brandYellow text-brandDark font-black text-sm uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_20px_40px_rgba(252,182,50,0.3)] group"
                    >
                      <span className="flex items-center justify-center gap-3">
                        Book Your Audit Call
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    
                    <button 
                      onClick={() => window.open('https://wa.me/91XXXXXXXXXX', '_blank')}
                      className="group flex items-center justify-center gap-3 text-white/60 hover:text-white transition-all w-full"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <span className="font-bold uppercase tracking-widest text-[10px]">Chat on WhatsApp for faster response</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit Breakdown Section */}
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-brandDark/5"></div>
                  <h3 className="text-brandDark/40 font-black text-[10px] uppercase tracking-[0.4em]">Your Audit Deliverables</h3>
                  <div className="h-px flex-1 bg-brandDark/5"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "Profit Leak Breakdown", 
                      desc: "We identify exactly where your margins are bleeding — from high CAC to low LTV.",
                      icon: <Target className="w-5 h-5" /> 
                    },
                    { 
                      title: "Funnel Analysis", 
                      desc: "A page-by-page breakdown of your conversion bottlenecks and drop-off points.",
                      icon: <BarChart3 className="w-5 h-5" /> 
                    },
                    { 
                      title: "Scaling Roadmap", 
                      desc: "The step-by-step strategy to scale your brand from where you are to ₹50Cr+.",
                      icon: <Zap className="w-5 h-5" /> 
                    }
                  ].map((item, i) => (
                    <div key={i} className="group p-8 bg-white border border-brandDark/5 rounded-[2rem] hover:border-brandYellow/50 transition-all duration-500 hover:shadow-xl text-left">
                      <div className="w-12 h-12 rounded-2xl bg-brandDark text-brandYellow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                        {item.icon}
                      </div>
                      <h4 className="text-brandDark font-black text-xs uppercase tracking-wider mb-3">{item.title}</h4>
                      <p className="text-brandDark/40 text-xs font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3 px-4 py-2 bg-brandDark/5 rounded-full w-fit mx-auto">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-bold text-brandDark/60 uppercase tracking-[0.2em]">
                    Audit delivery: Within 24 hours
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={onBack}
                  className="text-brandDark/40 hover:text-brandDark font-black text-[10px] uppercase tracking-[0.3em] transition-colors border-b border-brandDark/10 pb-1"
                >
                  Go Back to Home
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer onNavigate={onNavigate} onBookAudit={onBookAudit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg font-sans">
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-36 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-20">
          
          {/* Left Sidebar: Value Proposition */}
          <aside className="lg:col-span-4 space-y-8 animate-slide-up">
            <div className="bg-[#001d21] rounded-[2.5rem] p-8 lg:p-10 space-y-10 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <div className="space-y-2 relative z-10">
                <p className="text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em]">The Outcome</p>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">What You'll Get</h2>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { title: "Profit Leak Breakdown", desc: "Identify exactly where your money is leaking in your current funnel.", icon: <Target className="w-5 h-5" /> },
                  { title: "Full Funnel Analysis", desc: "A deep dive into your ads, landing pages, and backend retention.", icon: <BarChart3 className="w-5 h-5" /> },
                  { title: "Scaling Roadmap", desc: "A clear, step-by-step plan to increase spend without breaking margins.", icon: <Zap className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-white font-black uppercase text-sm tracking-tight">{item.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brandYellow/20 flex items-center justify-center text-brandYellow">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Confidentiality</p>
                    <p className="text-[11px] font-medium text-white/50">Your data is strictly used for audit purposes only.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-3xl border border-brandDark/5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-brandDark/40 uppercase tracking-widest">AVERAGE RESPONSE</p>
                <p className="text-2xl font-black text-brandDark tracking-tighter uppercase">Under 24h</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-brandYellow/10 flex items-center justify-center text-brandYellow">
                <Zap className="w-6 h-6" fill="currentColor" />
              </div>
            </div>
          </aside>

          {/* Right Main: Multi-Step Form */}
          <main className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-8">
              {/* Value Line & Progress */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.3em]">Growth Audit Application</p>
                    <h1 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tight uppercase leading-none">
                      {steps[currentStep - 1].title}
                    </h1>
                  </div>
                  <div className="text-right">
                    <p className="text-brandDark/40 text-[10px] font-bold uppercase tracking-widest mb-1">Step {currentStep} of 4</p>
                    <p className="text-brandDark font-black text-xs uppercase tracking-tight">Takes 2 minutes. Could save you lakhs.</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-brandDark/5 rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`h-full flex-1 transition-all duration-700 ease-out rounded-full ${
                        step <= currentStep ? 'bg-brandYellow' : 'bg-brandDark/5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-4xl border border-brandDark/5 relative">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">BRAND NAME *</label>
                            <input 
                              required 
                              type="text" 
                              value={formData.brandName}
                              onChange={(e) => updateField('brandName', e.target.value)}
                              placeholder="e.g. Aura Skincare" 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WEBSITE URL</label>
                            <input 
                              type="url" 
                              value={formData.website}
                              onChange={(e) => updateField('website', e.target.value)}
                              placeholder="https://yourbrand.com" 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                            />
                          </div>
                        </div>
                        <CustomSelect 
                          label="BUSINESS MODEL *"
                          required
                          options={[
                            { label: "D2C Brand", value: "d2c" },
                            { label: "E-commerce Marketplace", value: "ecommerce" },
                            { label: "SaaS / Service", value: "saas" }
                          ]}
                          value={formData.businessModel}
                          onChange={(val) => updateField('businessModel', val)}
                        />
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <CustomSelect 
                            label="MONTHLY REVENUE *"
                            required
                            options={[
                              { label: "Below ₹5L", value: "below-5" },
                              { label: "₹5L - ₹20L", value: "5-20" },
                              { label: "₹20L - ₹50L", value: "20-50" },
                              { label: "₹50L+", value: "50+" }
                            ]}
                            value={formData.revenue}
                            onChange={(val) => updateField('revenue', val)}
                          />
                          <CustomSelect 
                            label="MONTHLY AD SPEND *"
                            required
                            options={[
                              { label: "₹0 - ₹2L", value: "0-2" },
                              { label: "₹2L - ₹5L", value: "2-5" },
                              { label: "₹5L - ₹10L", value: "5-10" },
                              { label: "₹10L+", value: "10+" }
                            ]}
                            value={formData.adSpend}
                            onChange={(val) => updateField('adSpend', val)}
                          />
                        </div>

                        {formData.revenue === 'below-5' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-brandYellow/10 border border-brandYellow/20 rounded-xl flex items-center gap-3"
                          >
                            <Zap className="w-5 h-5 text-brandYellow shrink-0" />
                            <p className="text-xs font-bold text-brandDark/70 uppercase tracking-tight">
                              You may need foundational setup before scaling.
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <CustomSelect 
                          label="BIGGEST CHALLENGE *"
                          required
                          options={[
                            { label: "Getting sales but low profit", value: "low-profit" },
                            { label: "High CAC", value: "high-cac" },
                            { label: "Scaling issues", value: "scaling" },
                            { label: "Inconsistent performance", value: "inconsistent" },
                            { label: "Not sure what's wrong", value: "unsure" }
                          ]}
                          value={formData.challenge}
                          onChange={(val) => updateField('challenge', val)}
                        />
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">FULL NAME *</label>
                          <input 
                            required 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="e.g. Rahul Sharma" 
                            className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WORK EMAIL *</label>
                            <input 
                              required 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => updateField('email', e.target.value)}
                              placeholder="you@brand.com" 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WHATSAPP NUMBER *</label>
                            <input 
                              required 
                              type="tel" 
                              value={formData.whatsapp}
                              onChange={(e) => updateField('whatsapp', e.target.value)}
                              placeholder="+91 XXXX XXX XXX" 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                    {currentStep > 1 && (
                      <button 
                        type="button"
                        onClick={prevStep}
                        className="w-full sm:w-auto px-8 py-5 bg-brandDark/5 text-brandDark font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brandDark/10 transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}
                    
                    {currentStep < 4 ? (
                      <button 
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className="flex-1 w-full py-5 bg-brandDark text-white font-bold text-sm uppercase tracking-[0.4em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Continue
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={loading || !isStepValid()}
                        className="flex-1 w-full py-5 bg-brandDark text-white font-bold text-sm uppercase tracking-[0.4em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group disabled:opacity-80"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ANALYZING...
                          </span>
                        ) : (
                          <>
                            Show Me My Profit Gaps
                            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-[9px] font-bold text-brandDark/20 uppercase tracking-[0.3em]">No spam. No pressure. Just clarity.</p>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onBookAudit={onBookAudit} />
    </div>
  );
};

const steps = [
  { id: 1, title: "Tell us about your brand" },
  { id: 2, title: "Your current performance" },
  { id: 3, title: "What's your biggest challenge?" },
  { id: 4, title: "Where should we send your audit?" }
];

