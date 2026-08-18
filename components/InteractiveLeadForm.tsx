
'use client';

import React, { useState, useEffect } from 'react';
import { submitLead } from '../lib/submit-lead';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  ChevronLeft, 
  Zap, 
  Globe, 
  Instagram, 
  Mail, 
  User, 
  Phone, 
  Layout, 
  Smartphone, 
  Search, 
  Facebook, 
  ShoppingCart, 
  Code, 
  MoreHorizontal,
  Target,
  BarChart3,
  Building2,
  Clock,
  Wallet,
  ShieldCheck
} from 'lucide-react';
import { Footer } from './Footer';

interface InteractiveLeadFormProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onBookAudit: () => void;
}

type ServiceType = 
  | 'Facebook / Instagram Ads' 
  | 'Google Ads' 
  | 'Ecommerce Growth (D2C)' 
  | 'Website Development' 
  | 'Landing Page' 
  | 'App Development' 
  | 'SEO' 
  | 'Other';

export const InteractiveLeadForm: React.FC<InteractiveLeadFormProps> = ({ onBack, onNavigate, onBookAudit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    businessName: '',
    businessModel: '',
    primaryObjective: '',
    email: '',
    phone: '',
    website: '',

    // Step 2
    services: [] as ServiceType[],

    // Step 3 - Conditional
    // Ecommerce
    revenue: '',
    runningAds: '',
    aov: '',
    platform: '',
    problems: [] as string[],
    
    // Ads
    adSpend: '',
    performance: '',
    adIssues: [] as string[],

    // Website
    websiteType: '',
    designReady: '',
    websiteTimeline: '',
    websiteBudget: '',

    // App
    appType: '',
    appStage: '',
    appFeatures: [] as string[],
    appBudget: '',

    // SEO
    seoTraffic: '',
    seoGoal: [] as string[],

    // Other
    otherHelp: '',

    // Step 4
    finalBudget: '',
    finalTimeline: '',

    // "Other" text inputs for selections
    otherRevenue: '',
    otherPlatform: '',
    otherAdSpend: '',
    otherPerformance: '',
    otherWebsiteType: '',
    otherAppType: '',
    otherAppStage: '',
    otherTraffic: '',
    otherFinalBudget: '',
    otherFinalTimeline: ''
  });

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleChip = (field: keyof typeof formData, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      updateField(field, current.filter(v => v !== value));
    } else {
      updateField(field, [...current, value]);
    }
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

    const { fullName, email, phone, businessName, website, revenue, adSpend, ...rest } = formData;

    submitLead({
      sourceForm: 'lead-capture',
      name: fullName,
      email,
      phone,
      brandName: businessName,
      website,
      monthlyRevenue: revenue,
      adSpend,
      // Every conditional branch of the questionnaire, so nothing is dropped.
      extra: rest,
    }).finally(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.fullName && formData.email && formData.businessName && formData.businessModel && formData.primaryObjective;
    if (currentStep === 2) return formData.services.length > 0;
    if (currentStep === 3) {
      const s = formData.services;
      
      // If none selected somehow (should be caught by step 2 validation)
      if (s.length === 0) return true;

      // Validate Ecommerce
      if (s.includes('Ecommerce Growth (D2C)')) {
        if (!(formData.revenue && formData.runningAds && formData.platform && formData.problems.length > 0)) return false;
      }
      
      // Validate Ads
      if (s.includes('Facebook / Instagram Ads') || s.includes('Google Ads')) {
        if (!(formData.adSpend && formData.performance && formData.adIssues.length > 0)) return false;
      }

      // Validate Website
      if (s.includes('Website Development') || s.includes('Landing Page')) {
        if (!(formData.websiteType && formData.designReady && formData.websiteTimeline && formData.websiteBudget)) return false;
      }

      // Validate App
      if (s.includes('App Development')) {
        if (!(formData.appType && formData.appStage && formData.appFeatures.length > 0 && formData.appBudget)) return false;
      }

      // Validate SEO
      if (s.includes('SEO')) {
        if (!(formData.seoTraffic && formData.seoGoal.length > 0)) return false;
      }

      // Validate Other
      if (s.includes('Other')) {
        if (formData.otherHelp === '') return false;
      }

      return true;
    }
    if (currentStep === 4) return formData.finalBudget && formData.finalTimeline;
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
                <p className="text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em]">The Strategy</p>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">Your Growth <br/> Starts Here</h2>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { title: "Custom Blueprint", desc: "No cookie-cutter plans. We build for your specific goals.", icon: <Layout className="w-5 h-5" /> },
                  { title: "Data-Driven", desc: "Every decision is backed by unit economics and ROI.", icon: <BarChart3 className="w-5 h-5" /> },
                  { title: "Rapid Execution", desc: "We move fast to test, optimize, and scale winning hooks.", icon: <Zap className="w-5 h-5" /> }
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
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Confidential</p>
                    <p className="text-[11px] font-medium text-white/50">Your data is safe with our internal growth team.</p>
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
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-px bg-brandYellow"></span>
                              <p className="text-brandYellow text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em]">Growth Audit Application</p>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tight uppercase leading-none">
                              {currentStep === 1 && "Start Your Profile"}
                              {currentStep === 2 && "Growth Tools"}
                              {currentStep === 3 && "Unit Economics"}
                              {currentStep === 4 && "Final Roadmap"}
                            </h1>
                          </div>
                          <div className="text-right">
                            <div className="bg-brandDark/5 px-4 py-2 rounded-full inline-flex items-center gap-3">
                              <p className="text-brandDark/40 text-[10px] font-black uppercase tracking-widest leading-none">Step {currentStep} of 4</p>
                              <div className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-brandYellow/10 px-3 py-1.5 rounded-lg">
                            <p className="text-brandDark font-black text-[10px] uppercase tracking-wider">Takes 2 minutes. Could save you lakhs.</p>
                          </div>
                          <div className="h-px flex-1 bg-brandDark/5"></div>
                        </div>
                      </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-brandDark/5 rounded-full overflow-hidden flex gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`h-full flex-1 transition-all duration-700 ease-out rounded-full ${
                        step <= currentStep ? 'bg-brandYellow shadow-[0_0_10px_rgba(252,182,50,0.5)]' : 'bg-brandDark/5'
                      }`}
                    />
                  ))}
                </div>
              </div>

                <div className="bg-white rounded-[3.5rem] p-8 lg:p-14 shadow-2xl shadow-brandDark/5 border border-brandDark/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                  
                  <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: BASIC INFO */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="space-y-8"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-[11px] font-bold text-brandDark/50 uppercase tracking-[0.2em] ml-1">Business / Brand Name *</label>
                            <div className="relative group">
                              <input 
                                required 
                                type="text" 
                                value={formData.businessName}
                                onChange={(e) => updateField('businessName', e.target.value)}
                                placeholder="e.g. Acme Corp" 
                                className="w-full bg-[#fcfcfc] border-2 border-[#f0f0f0] px-7 py-6 pl-16 text-sm font-black focus:ring-4 focus:ring-brandYellow/10 focus:border-brandYellow outline-none rounded-[2rem] transition-all group-hover:border-brandDark/10 placeholder:text-brandDark/20" 
                              />
                              <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brandDark/30 group-focus-within:text-brandYellow transition-all group-focus-within:scale-110" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="text-[11px] font-bold text-brandDark/50 uppercase tracking-[0.2em] ml-1">Full Name *</label>
                            <div className="relative group">
                              <input 
                                required 
                                type="text" 
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                placeholder="e.g. Rahul Sharma" 
                                className="w-full bg-[#fcfcfc] border-2 border-[#f0f0f0] px-7 py-6 pl-16 text-sm font-black focus:ring-4 focus:ring-brandYellow/10 focus:border-brandYellow outline-none rounded-[2rem] transition-all group-hover:border-brandDark/10 placeholder:text-brandDark/20" 
                              />
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brandDark/30 group-focus-within:text-brandYellow transition-all group-focus-within:scale-110" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em] ml-1">Email Address *</label>
                            <div className="relative group">
                              <input 
                                required 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                placeholder="rahul@business.com" 
                                className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-6 py-5 pl-14 text-sm font-bold focus:ring-2 focus:ring-brandYellow/20 focus:border-brandYellow outline-none rounded-2xl transition-all group-hover:border-brandDark/10" 
                              />
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20 group-focus-within:text-brandYellow transition-colors" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em] ml-1">Phone Number (Optional)</label>
                            <div className="relative group">
                              <input 
                                type="tel" 
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                placeholder="+91 XXXX XXX XXX" 
                                className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-6 py-5 pl-14 text-sm font-bold focus:ring-2 focus:ring-brandYellow/20 focus:border-brandYellow outline-none rounded-2xl transition-all group-hover:border-brandDark/10" 
                              />
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20 group-focus-within:text-brandYellow transition-colors" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em] ml-1">Business Model *</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['D2C / Ecom', 'Service', 'B2B / SaaS', 'Other'].map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField('businessModel', opt)}
                                className={`px-4 py-3 rounded-xl border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                                  formData.businessModel === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em] ml-1">Primary Goal / Objective *</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              'Scale Existing Revenue', 
                              'Fix Unprofitable Ads', 
                              'Launch New Business', 
                              'Increase Lead Quality',
                              'Build / Redesign Assets',
                              'Other'
                            ].map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField('primaryObjective', opt)}
                                className={`px-4 py-3 rounded-xl border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                                  formData.primaryObjective === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em] ml-1">Website URL / Portfolio (Optional)</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              value={formData.website}
                              onChange={(e) => updateField('website', e.target.value)}
                              placeholder="https://yourbusiness.com" 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-6 py-5 pl-14 text-sm font-bold focus:ring-2 focus:ring-brandYellow/20 focus:border-brandYellow outline-none rounded-2xl transition-all group-hover:border-brandDark/10" 
                            />
                            <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/20 group-focus-within:text-brandYellow transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: SERVICE SELECTION */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { id: 'Facebook / Instagram Ads', icon: <Facebook className="w-6 h-6" /> },
                            { id: 'Google Ads', icon: <Search className="w-6 h-6" /> },
                            { id: 'Ecommerce Growth (D2C)', icon: <ShoppingCart className="w-6 h-6" /> },
                            { id: 'Website Development', icon: <Code className="w-6 h-6" /> },
                            { id: 'Landing Page', icon: <Layout className="w-6 h-6" /> },
                            { id: 'App Development', icon: <Smartphone className="w-6 h-6" /> },
                            { id: 'SEO', icon: <Target className="w-6 h-6" /> },
                            { id: 'Other', icon: <MoreHorizontal className="w-6 h-6" /> }
                          ].map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleChip('services', item.id)}
                                className={`p-8 rounded-[2.5rem] border-2 flex flex-col items-center gap-5 transition-all duration-500 group relative ${
                                  formData.services.includes(item.id as ServiceType) 
                                    ? 'border-brandYellow bg-brandYellow/[0.03] shadow-2xl shadow-brandYellow/10 scale-[1.05] z-10' 
                                    : 'border-[#f0f0f0] hover:border-brandDark/10 hover:bg-brandDark/[0.01]'
                                }`}
                              >
                                {formData.services.includes(item.id as ServiceType) && (
                                  <div className="absolute top-4 right-4 w-6 h-6 bg-brandYellow rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-brandDark" strokeWidth={3} />
                                  </div>
                                )}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                  formData.services.includes(item.id as ServiceType) 
                                    ? 'bg-brandYellow text-brandDark rotate-3' 
                                    : 'bg-brandDark/5 text-brandDark/30 group-hover:bg-brandDark/10'
                                }`}>
                                  {item.icon}
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-widest text-center leading-tight transition-colors duration-500 ${
                                  formData.services.includes(item.id as ServiceType) ? 'text-brandDark' : 'text-brandDark/40'
                                }`}>
                                  {item.id}
                                </span>
                              </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: CONDITIONAL QUESTIONS */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="space-y-10"
                      >
                        {/* ECOMMERCE GROWTH */}
                        {formData.services.includes('Ecommerce Growth (D2C)') && (
                          <div className="space-y-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Monthly Revenue</label>
                              <div className="flex flex-wrap gap-3">
                                {['0–1L', '1–5L', '5L+', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('revenue', opt)}
                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.revenue === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                              {formData.revenue === 'Other' && (
                                <input 
                                  type="text" 
                                  value={formData.otherRevenue}
                                  onChange={(e) => updateField('otherRevenue', e.target.value)}
                                  placeholder="Please specify..." 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-3 text-sm font-bold rounded-xl outline-none focus:border-brandYellow"
                                />
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-4">
                                <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Running Ads?</label>
                                <div className="flex gap-3">
                                  {['Yes', 'No'].map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => updateField('runningAds', opt)}
                                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                        formData.runningAds === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Average Order Value (AOV)</label>
                                <div className="relative group">
                                  <input 
                                    type="text" 
                                    value={formData.aov}
                                    onChange={(e) => updateField('aov', e.target.value)}
                                    placeholder="e.g. ₹1500" 
                                    className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-3 text-sm font-bold rounded-xl outline-none focus:border-brandYellow"
                                  />
                                  <button 
                                    type="button"
                                    onClick={() => updateField('aov', 'Not sure')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-brandDark/20 hover:text-brandYellow transition-colors"
                                  >
                                    Not sure
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Platform</label>
                              <div className="flex flex-wrap gap-3">
                                {['Shopify', 'WooCommerce', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('platform', opt)}
                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.platform === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                              {formData.platform === 'Other' && (
                                <input 
                                  type="text" 
                                  value={formData.otherPlatform}
                                  onChange={(e) => updateField('otherPlatform', e.target.value)}
                                  placeholder="Please specify..." 
                                  className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-3 text-sm font-bold rounded-xl outline-none focus:border-brandYellow"
                                />
                              )}
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Biggest Problem (Multi-select)</label>
                              <div className="flex flex-wrap gap-3">
                                {['Low Conversion', 'High CAC', 'Low ROAS', 'Scaling', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => toggleChip('problems', opt)}
                                    className={`px-5 py-2.5 rounded-full border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                                      formData.problems.includes(opt) ? 'border-brandYellow bg-brandYellow text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ADS */}
                        {(formData.services.includes('Facebook / Instagram Ads') || formData.services.includes('Google Ads')) && (
                          <div className="space-y-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Monthly Ad Spend</label>
                              <div className="flex flex-wrap gap-3">
                                {['<20k', '20k–50k', '50k+', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('adSpend', opt)}
                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.adSpend === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Current Performance</label>
                              <div className="flex flex-wrap gap-3">
                                {['Profitable', 'Not Profitable', 'Not Sure', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('performance', opt)}
                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.performance === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Biggest Issue (Multi-select)</label>
                              <div className="flex flex-wrap gap-3">
                                {['High CPL', 'Low ROAS', 'No Sales', 'Poor Leads', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => toggleChip('adIssues', opt)}
                                    className={`px-5 py-2.5 rounded-full border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                                      formData.adIssues.includes(opt) ? 'border-brandYellow bg-brandYellow text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* WEBSITE */}
                        {(formData.services.includes('Website Development') || formData.services.includes('Landing Page')) && (
                          <div className="space-y-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Website Type</label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Ecommerce', 'Service', 'Portfolio', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('websiteType', opt)}
                                    className={`p-4 rounded-2xl border-2 font-bold text-[10px] uppercase tracking-widest transition-all ${
                                      formData.websiteType === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-4">
                                <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Design Ready?</label>
                                <div className="flex gap-3">
                                  {['Yes', 'No', 'Need Help'].map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => updateField('designReady', opt)}
                                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                        formData.designReady === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Timeline</label>
                                <div className="flex gap-3">
                                  {['Urgent', '2–4 Weeks', 'Flexible'].map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => updateField('websiteTimeline', opt)}
                                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                        formData.websiteTimeline === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Budget Range</label>
                              <div className="flex flex-wrap gap-3">
                                {['<20k', '20k–50k', '50k+', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('websiteBudget', opt)}
                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.websiteBudget === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* APP */}
                        {formData.services.includes('App Development') && (
                          <div className="space-y-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">App Type</label>
                              <div className="flex gap-3">
                                {['Android', 'iOS', 'Both', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('appType', opt)}
                                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.appType === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Stage</label>
                              <div className="flex gap-3">
                                {['Idea', 'Existing App', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('appStage', opt)}
                                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.appStage === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Features Needed (Multi-select)</label>
                              <div className="flex flex-wrap gap-3">
                                {['Auth', 'Payments', 'Chat', 'Maps', 'Push Notifications', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => toggleChip('appFeatures', opt)}
                                    className={`px-5 py-2.5 rounded-full border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                                      formData.appFeatures.includes(opt) ? 'border-brandYellow bg-brandYellow text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Budget Range</label>
                              <div className="flex flex-wrap gap-3">
                                {['<50k', '50k–1L', '1L+', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('appBudget', opt)}
                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.appBudget === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SEO */}
                        {formData.services.includes('SEO') && (
                          <div className="space-y-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Current Traffic</label>
                              <div className="flex gap-3">
                                {['Low', 'Medium', 'High', 'Not Sure', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => updateField('seoTraffic', opt)}
                                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                      formData.seoTraffic === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Goal (Multi-select)</label>
                              <div className="flex flex-wrap gap-3">
                                {['Traffic', 'Leads', 'Ranking', 'Local SEO', 'Other'].map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => toggleChip('seoGoal', opt)}
                                    className={`px-5 py-2.5 rounded-full border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${
                                      formData.seoGoal.includes(opt) ? 'border-brandYellow bg-brandYellow text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* OTHER */}
                        {formData.services.includes('Other') && (
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">What do you need help with?</label>
                            <textarea 
                              required 
                              rows={4}
                              value={formData.otherHelp}
                              onChange={(e) => updateField('otherHelp', e.target.value)}
                              placeholder="Describe your requirements briefly..." 
                              className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-brandYellow/20 focus:border-brandYellow outline-none rounded-2xl transition-all" 
                            />
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 4: QUALIFICATION */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="space-y-10"
                      >
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Monthly Budget</label>
                          <div className="flex flex-wrap gap-3">
                            {['<20k', '20k–50k', '50k+', 'Other'].map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField('finalBudget', opt)}
                                className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                  formData.finalBudget === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.2em]">Timeline</label>
                          <div className="flex flex-wrap gap-3">
                            {['Immediately', '1–2 Weeks', 'Exploring', 'Other'].map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField('finalTimeline', opt)}
                                className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                  formData.finalTimeline === opt ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-[#f0f0f0] text-brandDark/40 hover:border-brandDark/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-8 bg-brandDark text-white rounded-[2rem] space-y-4 border border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-brandYellow" />
                            <p className="text-xs font-black uppercase tracking-[0.2em]">Final Verification</p>
                          </div>
                          <p className="text-white/40 text-xs font-medium leading-relaxed">
                            By submitting, you agree to our terms. Our team will review your application and prepare a custom strategy plan for our first call.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                    {/* NAVIGATION */}
                    <div className="pt-12 flex flex-col sm:flex-row items-center gap-5">
                      {currentStep > 1 && (
                        <button 
                          type="button"
                          onClick={prevStep}
                          className="w-full sm:w-auto px-12 py-6 bg-brandDark/5 text-brandDark font-black text-[11px] uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-brandDark/10 transition-all flex items-center justify-center gap-4 group"
                        >
                          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                          Prev
                        </button>
                      )}
                      
                      {currentStep < 4 ? (
                        <button 
                          type="button"
                          onClick={nextStep}
                          disabled={!isStepValid()}
                          className="flex-1 w-full py-6 bg-brandDark text-white font-black text-sm uppercase tracking-[0.5em] rounded-[1.5rem] hover:bg-[#fcb632] hover:text-brandDark transition-all duration-500 shadow-2xl shadow-brandDark/10 flex items-center justify-center gap-5 group disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Next Stage
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                        </button>
                      ) : (
                        <button 
                          type="submit" 
                          disabled={loading || !isStepValid()}
                          className="flex-1 w-full py-6 bg-[#fcb632] text-brandDark font-black text-sm uppercase tracking-[0.5em] rounded-[1.5rem] hover:bg-brandDark hover:text-white transition-all duration-500 shadow-2xl shadow-brandYellow/20 flex items-center justify-center gap-5 group disabled:opacity-80 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {loading ? (
                            <span className="flex items-center gap-4">
                              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              ANALYZING...
                            </span>
                          ) : (
                            <>
                              Submit Application
                              <Zap className="w-6 h-6 group-hover:scale-125 transition-transform" fill="currentColor" />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  <div className="text-center">
                    <p className="text-[9px] font-black text-brandDark/20 uppercase tracking-[0.3em]">No credit card required. 100% Free Strategy Session.</p>
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
