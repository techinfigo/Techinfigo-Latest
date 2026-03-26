
import React, { useState, useRef, useEffect } from 'react';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ChevronLeft, ShieldCheck, Zap, BarChart3, Target, Globe, Instagram, Building2, Briefcase, MapPin, Users, Wallet, Calendar } from 'lucide-react';

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
        <div className="absolute z-[100] left-0 right-0 mt-2 bg-white border border-[#f0f0f0] rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden max-h-60 overflow-y-auto">
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

interface LeadCapturePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onBookAudit: () => void;
}

export const LeadCapturePage: React.FC<LeadCapturePageProps> = ({ onBack, onNavigate, onBookAudit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    phoneNumber: '',
    websiteOrInsta: '',
    businessCategory: '',
    
    // Step 2 - D2C
    d2cRevenue: '',
    d2cRunningAds: '',
    d2cAov: '',
    d2cPlatform: '',
    d2cProblem: '',
    
    // Step 2 - Service
    serviceOffer: '',
    serviceLeads: '',
    serviceCpl: '',
    serviceRunningAds: '',
    serviceProblem: '',
    
    // Step 2 - Local
    localBusinessType: '',
    localLocation: '',
    localWalkins: '',
    localRunningAds: '',
    localGoal: '',
    
    // Step 3
    marketingBudget: '',
    startTime: ''
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Filter out irrelevant fields based on business category for cleaner submission
    const submissionData = { ...formData };
    if (formData.businessCategory !== 'd2c') {
      delete (submissionData as any).d2cRevenue;
      delete (submissionData as any).d2cRunningAds;
      delete (submissionData as any).d2cAov;
      delete (submissionData as any).d2cPlatform;
      delete (submissionData as any).d2cProblem;
    }
    if (formData.businessCategory !== 'service') {
      delete (submissionData as any).serviceOffer;
      delete (submissionData as any).serviceLeads;
      delete (submissionData as any).serviceCpl;
      delete (submissionData as any).serviceRunningAds;
      delete (submissionData as any).serviceProblem;
    }
    if (formData.businessCategory !== 'local') {
      delete (submissionData as any).localBusinessType;
      delete (submissionData as any).localLocation;
      delete (submissionData as any).localWalkins;
      delete (submissionData as any).localRunningAds;
      delete (submissionData as any).localGoal;
    }

    fetch("https://formsubmit.co/ajax/thetechinfigo@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Lead Capture - ${formData.fullName} - ${formData.businessCategory.toUpperCase()}`,
        ...submissionData
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
    if (currentStep === 1) {
      return formData.fullName && formData.phoneNumber && formData.websiteOrInsta && formData.businessCategory;
    }
    if (currentStep === 2) {
      if (formData.businessCategory === 'd2c') {
        return formData.d2cRevenue && formData.d2cRunningAds && formData.d2cAov && formData.d2cPlatform && formData.d2cProblem;
      }
      if (formData.businessCategory === 'service') {
        return formData.serviceOffer && formData.serviceLeads && formData.serviceCpl && formData.serviceRunningAds && formData.serviceProblem;
      }
      if (formData.businessCategory === 'local') {
        return formData.localBusinessType && formData.localLocation && formData.localWalkins && formData.localRunningAds && formData.localGoal;
      }
      return false;
    }
    if (currentStep === 3) {
      return formData.marketingBudget && formData.startTime;
    }
    return false;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col font-sans">
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 max-w-3xl mx-auto"
          >
            {/* Success Header */}
            <div className="space-y-4">
              <div className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brandYellow/20">
                <Check className="w-10 h-10 text-brandDark" strokeWidth={3} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-brandDark">
                APPLICATION LOGGED.
              </h2>
              <p className="text-brandDark/60 text-lg font-medium max-w-xl mx-auto">
                Your data is being processed by our growth engineers. We'll be in touch shortly.
              </p>
            </div>

            {/* The 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Review Data", desc: "Our team analyzes your unit economics.", icon: <BarChart3 className="w-6 h-6" /> },
                { title: "Identify Leaks", desc: "We find exactly where you're losing money.", icon: <Zap className="w-6 h-6" /> },
                { title: "Share Audit", desc: "We deliver your custom scaling roadmap.", icon: <Target className="w-6 h-6" /> }
              ].map((card, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-brandDark/5 shadow-xl space-y-4 text-left relative overflow-hidden group hover:border-brandYellow/50 transition-colors">
                  <div className="w-12 h-12 bg-brandDark/5 rounded-2xl flex items-center justify-center text-brandDark group-hover:bg-brandYellow transition-colors">
                    {card.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black uppercase text-sm tracking-tight">{card.title}</h3>
                    <p className="text-brandDark/40 text-xs leading-relaxed font-medium">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Action */}
            <div className="space-y-8 pt-4">
              <div className="space-y-4">
                <button 
                  onClick={() => window.open('https://calendly.com', '_blank')}
                  className="w-full md:w-auto px-12 py-6 bg-[#fcb632] text-brandDark font-black text-lg uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-brandYellow/30"
                >
                  Book Your Audit Call
                </button>
                
                <div className="flex flex-col items-center gap-4">
                  <a 
                    href="https://wa.me/yournumber" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brandDark/60 hover:text-brandDark font-bold text-sm flex items-center gap-2 transition-colors"
                  >
                    Want faster response? <span className="text-[#25D366] underline">Chat on WhatsApp</span>
                  </a>
                  
                  <p className="text-brandYellow text-[11px] font-black uppercase tracking-[0.3em] animate-pulse">
                    You’ll receive your audit within 24 hours
                  </p>
                </div>
              </div>

              {/* Value Reminder */}
              <div className="bg-brandDark/5 rounded-[2.5rem] p-8 space-y-6 border border-brandDark/5">
                <p className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.4em]">Your audit will include:</p>
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    "Profit leak breakdown",
                    "Funnel analysis",
                    "Scaling roadmap"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
                      <span className="text-xs font-black uppercase tracking-tight text-brandDark">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onBack}
                className="text-brandDark/40 hover:text-brandDark font-black text-[10px] uppercase tracking-[0.4em] transition-colors"
              >
                Go Back to Home
              </button>
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
          
          {/* Left Sidebar: Context */}
          <aside className="lg:col-span-4 space-y-8 animate-slide-up">
            <div className="bg-[#001d21] rounded-[2.5rem] p-8 lg:p-10 space-y-10 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <div className="space-y-2 relative z-10">
                <p className="text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em]">The Agency Edge</p>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">Scale Your <br/> Business</h2>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { title: "Strategic Audit", desc: "We analyze your current metrics to find hidden profit leaks.", icon: <BarChart3 className="w-5 h-5" /> },
                  { title: "Growth Roadmap", desc: "A custom plan tailored to your specific business model.", icon: <Zap className="w-5 h-5" /> },
                  { title: "Expert Execution", desc: "Our team handles the heavy lifting of scaling your brand.", icon: <Target className="w-5 h-5" /> }
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
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Data Privacy</p>
                    <p className="text-[11px] font-medium text-white/50">Your business data is 100% secure and confidential.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main: Multi-Step Form */}
          <main className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-8">
              {/* Progress Header */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.3em]">Lead Capture Form</p>
                    <h1 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tight uppercase leading-none">
                      {currentStep === 1 && "Basic Information"}
                      {currentStep === 2 && "Business Performance"}
                      {currentStep === 3 && "Qualification"}
                    </h1>
                  </div>
                  <div className="text-right">
                    <p className="text-brandDark/40 text-[10px] font-bold uppercase tracking-widest mb-1">Step {currentStep} of 3</p>
                    <p className="text-brandDark font-black text-xs uppercase tracking-tight">Takes 2 minutes to complete.</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-brandDark/5 rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3].map((step) => (
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
                            <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">FULL NAME *</label>
                            <div className="relative">
                              <input 
                                required 
                                type="text" 
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                placeholder="e.g. John Doe" 
                                className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 pl-12 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                              />
                              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">PHONE NUMBER *</label>
                            <div className="relative">
                              <input 
                                required 
                                type="tel" 
                                value={formData.phoneNumber}
                                onChange={(e) => updateField('phoneNumber', e.target.value)}
                                placeholder="+91 XXXX XXX XXX" 
                                className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 pl-12 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                              />
                              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WEBSITE OR INSTAGRAM PROFILE *</label>
                          <div className="relative">
                            <input 
                              required 
                              type="text" 
                              value={formData.websiteOrInsta}
                              onChange={(e) => updateField('websiteOrInsta', e.target.value)}
                              placeholder="https://yourbrand.com or @yourinsta" 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 pl-12 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                            />
                            <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20" />
                          </div>
                        </div>
                        <CustomSelect 
                          label="BUSINESS CATEGORY *"
                          required
                          options={[
                            { label: "D2C / Ecommerce", value: "d2c" },
                            { label: "Service Business", value: "service" },
                            { label: "Local Business", value: "local" }
                          ]}
                          value={formData.businessCategory}
                          onChange={(val) => updateField('businessCategory', val)}
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
                        {/* D2C Conditional Fields */}
                        {formData.businessCategory === 'd2c' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <CustomSelect 
                                label="MONTHLY REVENUE *"
                                required
                                options={[
                                  { label: "0–1L", value: "0-1L" },
                                  { label: "1–5L", value: "1-5L" },
                                  { label: "5L+", value: "5L+" }
                                ]}
                                value={formData.d2cRevenue}
                                onChange={(val) => updateField('d2cRevenue', val)}
                              />
                              <CustomSelect 
                                label="ARE YOU RUNNING ADS? *"
                                required
                                options={[
                                  { label: "Yes", value: "yes" },
                                  { label: "No", value: "no" }
                                ]}
                                value={formData.d2cRunningAds}
                                onChange={(val) => updateField('d2cRunningAds', val)}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">AVERAGE ORDER VALUE (AOV) *</label>
                                <input 
                                  required 
                                  type="text" 
                                  value={formData.d2cAov}
                                  onChange={(e) => updateField('d2cAov', e.target.value)}
                                  placeholder="e.g. ₹1500" 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                />
                              </div>
                              <CustomSelect 
                                label="PLATFORM *"
                                required
                                options={[
                                  { label: "Shopify", value: "shopify" },
                                  { label: "WooCommerce", value: "woocommerce" },
                                  { label: "Other", value: "other" }
                                ]}
                                value={formData.d2cPlatform}
                                onChange={(val) => updateField('d2cPlatform', val)}
                              />
                            </div>
                            <CustomSelect 
                              label="BIGGEST PROBLEM *"
                              required
                              options={[
                                { label: "Low Conversion", value: "low-conversion" },
                                { label: "High CAC", value: "high-cac" },
                                { label: "Low ROAS", value: "low-roas" },
                                { label: "Scaling Issues", value: "scaling" }
                              ]}
                              value={formData.d2cProblem}
                              onChange={(val) => updateField('d2cProblem', val)}
                            />
                          </div>
                        )}

                        {/* Service Conditional Fields */}
                        {formData.businessCategory === 'service' && (
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WHAT SERVICE DO YOU OFFER? *</label>
                              <div className="relative">
                                <input 
                                  required 
                                  type="text" 
                                  value={formData.serviceOffer}
                                  onChange={(e) => updateField('serviceOffer', e.target.value)}
                                  placeholder="e.g. Real Estate, Consulting" 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 pl-12 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                />
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">MONTHLY LEADS *</label>
                                <input 
                                  required 
                                  type="text" 
                                  value={formData.serviceLeads}
                                  onChange={(e) => updateField('serviceLeads', e.target.value)}
                                  placeholder="e.g. 50" 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">COST PER LEAD *</label>
                                <input 
                                  required 
                                  type="text" 
                                  value={formData.serviceCpl}
                                  onChange={(e) => updateField('serviceCpl', e.target.value)}
                                  placeholder="e.g. ₹200" 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                />
                              </div>
                            </div>
                            <CustomSelect 
                              label="ARE YOU RUNNING ADS? *"
                              required
                              options={[
                                { label: "Yes", value: "yes" },
                                { label: "No", value: "no" }
                              ]}
                              value={formData.serviceRunningAds}
                              onChange={(val) => updateField('serviceRunningAds', val)}
                            />
                            <CustomSelect 
                              label="BIGGEST PROBLEM *"
                              required
                              options={[
                                { label: "No Leads", value: "no-leads" },
                                { label: "Poor Quality Leads", value: "poor-quality" },
                                { label: "High CPL", value: "high-cpl" }
                              ]}
                              value={formData.serviceProblem}
                              onChange={(val) => updateField('serviceProblem', val)}
                            />
                          </div>
                        )}

                        {/* Local Conditional Fields */}
                        {formData.businessCategory === 'local' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">BUSINESS TYPE *</label>
                                <div className="relative">
                                  <input 
                                    required 
                                    type="text" 
                                    value={formData.localBusinessType}
                                    onChange={(e) => updateField('localBusinessType', e.target.value)}
                                    placeholder="e.g. Salon, Gym, Clinic" 
                                    className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 pl-12 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                  />
                                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">LOCATION *</label>
                                <div className="relative">
                                  <input 
                                    required 
                                    type="text" 
                                    value={formData.localLocation}
                                    onChange={(e) => updateField('localLocation', e.target.value)}
                                    placeholder="e.g. Mumbai, Bandra" 
                                    className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 pl-12 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                  />
                                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20" />
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">MONTHLY WALK-INS *</label>
                                <input 
                                  required 
                                  type="text" 
                                  value={formData.localWalkins}
                                  onChange={(e) => updateField('localWalkins', e.target.value)}
                                  placeholder="e.g. 100" 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                                />
                              </div>
                              <CustomSelect 
                                label="ARE YOU RUNNING ADS? *"
                                required
                                options={[
                                  { label: "Yes", value: "yes" },
                                  { label: "No", value: "no" }
                                ]}
                                value={formData.localRunningAds}
                                onChange={(val) => updateField('localRunningAds', val)}
                              />
                            </div>
                            <CustomSelect 
                              label="MAIN GOAL *"
                              required
                              options={[
                                { label: "More Leads", value: "more-leads" },
                                { label: "More Footfall", value: "more-footfall" },
                                { label: "Brand Awareness", value: "brand-awareness" }
                              ]}
                              value={formData.localGoal}
                              onChange={(val) => updateField('localGoal', val)}
                            />
                          </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <CustomSelect 
                            label="MONTHLY MARKETING BUDGET *"
                            required
                            options={[
                              { label: "Below 20k", value: "below-20k" },
                              { label: "20k–50k", value: "20k-50k" },
                              { label: "50k+", value: "50k+" }
                            ]}
                            value={formData.marketingBudget}
                            onChange={(val) => updateField('marketingBudget', val)}
                          />
                          <CustomSelect 
                            label="WHEN DO YOU WANT TO START? *"
                            required
                            options={[
                              { label: "Immediately", value: "immediately" },
                              { label: "1–2 weeks", value: "1-2-weeks" },
                              { label: "Just exploring", value: "exploring" }
                            ]}
                            value={formData.startTime}
                            onChange={(val) => updateField('startTime', val)}
                          />
                        </div>
                        
                        <div className="p-6 bg-brandDark text-white rounded-2xl space-y-4 border border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-brandYellow/10 blur-2xl rounded-full -mr-12 -mt-12"></div>
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-brandYellow" />
                            <p className="text-xs font-black uppercase tracking-widest">Qualification Protocol</p>
                          </div>
                          <p className="text-white/60 text-xs font-medium leading-relaxed">
                            We only partner with brands where we can guarantee a significant ROI. This audit will determine if we can help you scale profitably.
                          </p>
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
                    
                    {currentStep < 3 ? (
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
                            PROCESSING...
                          </span>
                        ) : (
                          <>
                            Get Free Growth Audit
                            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-[9px] font-bold text-brandDark/20 uppercase tracking-[0.3em]">No credit card required. 100% Free Audit.</p>
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
