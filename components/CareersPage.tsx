'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HoneypotField } from './HoneypotField';
import { submitLead } from '../lib/submit-lead';
import { CareerRoles, CAREER_ROLES } from './CareerRoles';

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
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange, placeholder = "Select..." }) => {
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
      <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#fcfcfc] border px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 text-left ${
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

interface CareersPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works' | 'careers') => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    linkedin: '',
    portfolio: '',
    specialization: '',
    experience: '',
    expectedCtc: '',
    pitch: ''
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    submitLead({
      sourceForm: 'careers',
      name: formData.fullName,
      email: formData.email,
      phone: formData.whatsapp,
      website: formData.portfolio,
      message: formData.pitch,
      extra: {
        linkedin: formData.linkedin,
        specialization: formData.specialization,
        experience: formData.experience,
        expectedCtc: formData.expectedCtc,
      },
    }).finally(() => {
      setLoading(false);
      setSubmitted(true);
    });
  };


  if (submitted) {
    return (
      <div className="min-h-screen bg-brandBg pt-48 pb-32 px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-8 animate-slide-up">
          <div className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <svg className="w-10 h-10 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-brandDark tracking-tighter">Application sent.</h1>
          <p className="text-brandDark/60 text-lg lg:text-xl max-w-lg mx-auto leading-relaxed">
            Thank you. We read every application, and if there is a fit we will message you on WhatsApp.
          </p>
          <button onClick={() => onNavigate('home')} className="inline-block mt-8 text-brandDark font-bold uppercase tracking-widest text-xs border-b-2 border-brandYellow pb-1 transition-all hover:text-brandYellow">
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              Careers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Work with us <br />
              <span className="text-brandYellow italic">in Agra.</span>
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              We’re a small, founder-led team in Sanjay Place. There are no openings listed right now, but we always want to hear from good people.
            </p>
          </div>
        </div>
      </section>

      {/* Roles we hire for (job cards; details open on click) */}
      <section className="pt-20 lg:pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tighter leading-none">Roles we hire for</h2>
            <p className="text-brandDark/60 text-lg font-medium leading-relaxed">
              No fixed openings right now. Tap a role to see the details, then apply anytime.
            </p>
          </div>
          <CareerRoles
            selected={formData.specialization}
            onApply={(value) => {
              updateField('specialization', value);
              scrollToForm();
            }}
          />
        </div>
      </section>

      <section className="pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Right Column: Application Form */}
          <div ref={formRef} className="scroll-mt-28">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-4xl border border-brandDark/5 space-y-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-bl-[2.5rem] pointer-events-none"></div>
              
              <div className="space-y-3">
                <h2 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tight">Send your application</h2>
                <p className="text-brandDark/50 text-base">Takes about 2 minutes.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <HoneypotField />
                
                {/* Identity Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">YOUR NAME *</label>
                    <input 
                      required type="text" 
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="e.g. Rahul Sharma" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">EMAIL *</label>
                    <input 
                      required type="email" 
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@domain.com" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WHATSAPP *</label>
                    <input 
                      required type="tel" 
                      value={formData.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      placeholder="+91 XXXX XXX XXX" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">LINKEDIN (OPTIONAL)</label>
                    <input 
                      type="url" 
                      value={formData.linkedin}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                </div>

                {/* Professional Scope */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <CustomSelect 
                    label="WHAT ARE YOU GOOD AT? *"
                    options={CAREER_ROLES.map((r) => ({ label: r.title, value: r.value }))}
                    value={formData.specialization}
                    onChange={(val) => updateField('specialization', val)}
                  />
                  <CustomSelect 
                    label="EXPERIENCE *"
                    options={[
                      { label: "Fresher or under 1 year", value: "0-1" },
                      { label: "1–3 years", value: "1-3" },
                      { label: "3+ years", value: "3+" }
                    ]}
                    value={formData.experience}
                    onChange={(val) => updateField('experience', val)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">LINK TO YOUR WORK</label>
                    <input 
                      type="url" 
                      value={formData.portfolio}
                      onChange={(e) => updateField('portfolio', e.target.value)}
                      placeholder="Instagram, Drive, Behance or website" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">EXPECTED MONTHLY SALARY (₹)</label>
                    <input 
                      type="text" 
                      value={formData.expectedCtc}
                      onChange={(e) => updateField('expectedCtc', e.target.value)}
                      placeholder="e.g. 20,000" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">TELL US ABOUT YOURSELF *</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.pitch}
                    onChange={(e) => updateField('pitch', e.target.value)}
                    placeholder="What you are good at, and something you have made or achieved."
                    className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all resize-none"
                  />
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-6 bg-brandDark text-white font-bold text-sm uppercase tracking-[0.4em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-80"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        SENDING…
                      </span>
                    ) : (
                      <>
                        Send Application
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};