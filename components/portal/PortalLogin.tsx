'use client';

import React, { useState } from 'react';
import { whatsappUrl } from '../../config/site';

/** Client portal sign-in: mobile number + password (given by Techinfigo). */
export default function PortalLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/portal/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, password }) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        window.location.reload();
        return;
      }
      setError(json.error || 'Login nahi ho paya. Dobara try karein.');
    } catch {
      setError('Internet check karke dobara try karein.');
    }
    setBusy(false);
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-brandDark text-brandBg">
      {/* Premium ambient glow + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-brandYellow/20 blur-[140px]" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[420px] w-[420px] rounded-full bg-brandYellow/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#faf6ed 1px, transparent 1px), linear-gradient(90deg, #faf6ed 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      </div>

      <header className="relative">
        <div className="max-w-6xl mx-auto px-5 py-5 flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/proposal-logo.png" alt="" width={34} height={34} className="w-8 h-8 rounded-xl bg-brandSurface ring-1 ring-brandBg/10 p-1.5" />
          <span className="font-black tracking-wide text-sm">
            <span className="text-brandYellow">TECH</span>INFIGO
          </span>
          <span className="ml-auto text-[11px] font-bold uppercase tracking-widest text-brandBg/40">Client Portal</span>
        </div>
      </header>

      <main className="relative flex items-center justify-center px-5 pb-20 pt-6 sm:pt-10">
        <div className="w-full max-w-md">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brandBg/5 ring-1 ring-brandBg/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brandYellow">
              <span className="h-1.5 w-1.5 rounded-full bg-brandYellow animate-pulse" /> Growth Dashboard
            </span>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-black tracking-tight">
              Welcome <span className="text-brandYellow">back</span>
            </h1>
            <p className="mt-3 font-medium text-brandBg/60">
              Your leads, content and payments — <br className="hidden sm:block" />all in one premium place.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 rounded-[28px] bg-brandSurface/80 backdrop-blur ring-1 ring-brandBg/10 shadow-3xl p-6 sm:p-7 grid gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brandBg/50 mb-2">Mobile number</label>
              <div className="flex rounded-2xl bg-brandDark/60 ring-1 ring-brandBg/10 focus-within:ring-2 focus-within:ring-brandYellow overflow-hidden transition">
                <span className="px-4 flex items-center bg-brandBg/5 font-bold text-brandBg/70 border-r border-brandBg/10">+91</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} className="w-full bg-transparent px-4 py-3.5 text-lg font-semibold text-brandBg placeholder:text-brandBg/30 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brandBg/50 mb-2">Password</label>
              <div className="relative rounded-2xl bg-brandDark/60 ring-1 ring-brandBg/10 focus-within:ring-2 focus-within:ring-brandYellow overflow-hidden transition">
                <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="••••••••" className="w-full bg-transparent px-4 py-3.5 pr-20 text-lg font-semibold text-brandBg placeholder:text-brandBg/30 outline-none" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wide text-brandBg/50 hover:text-brandYellow">
                  {show ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-500/10 ring-1 ring-red-500/30 px-3 py-2 text-sm font-bold text-red-300" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={busy || !phone || !password} className="group w-full rounded-2xl bg-brandYellow py-4 text-lg font-black text-brandDark shadow-glow transition hover:brightness-105 disabled:opacity-40 disabled:shadow-none">
              {busy ? 'Logging in…' : 'Login to dashboard →'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-brandBg/50">
            Password bhool gaye?{' '}
            <a className="font-bold text-brandYellow hover:underline" href={whatsappUrl('Namaste, mujhe client portal ka password chahiye.')} target="_blank" rel="noopener noreferrer">
              WhatsApp karein
            </a>
          </p>

          <p className="mt-10 text-center text-[11px] font-semibold uppercase tracking-widest text-brandBg/30">
            Powered by Techinfigo
          </p>
        </div>
      </main>
    </div>
  );
}
