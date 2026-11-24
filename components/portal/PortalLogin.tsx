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
    <div className="min-h-[100svh] bg-brandDark sm:grid sm:place-items-center sm:p-6">
      <div className="w-full sm:max-w-5xl grid md:grid-cols-2 sm:rounded-[32px] overflow-hidden sm:shadow-big min-h-[100svh] sm:min-h-[580px]">
        {/* Left — brand panel */}
        <div className="relative bg-brandDark text-brandBg p-8 sm:p-10 flex flex-col overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-80 w-80 rounded-full bg-brandYellow/20 blur-[120px]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#faf6ed 1px, transparent 1px), linear-gradient(90deg, #faf6ed 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/proposal-logo.png" alt="" width={36} height={36} className="w-9 h-9 rounded-xl bg-brandSurface ring-1 ring-brandBg/10 p-1.5" />
            <span className="font-black tracking-wide"><span className="text-brandYellow">TECH</span>INFIGO</span>
          </div>
          <div className="relative mt-auto pt-10">
            <h1 className="text-[2.4rem] sm:text-[2.7rem] leading-[1.05] font-black tracking-tight">Your leads,<br />handled with care.</h1>
            <p className="mt-4 font-medium text-brandBg/60 max-w-xs">Every enquiry from your ads and website lands here — ready to call before it goes cold.</p>
            <div className="mt-7 w-full max-w-sm rounded-2xl bg-brandSurface/80 backdrop-blur ring-1 ring-brandBg/10 p-4 shadow-card">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brandYellow"><span className="h-1.5 w-1.5 rounded-full bg-brandYellow animate-pulse" />New lead just now</div>
              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <p className="font-black">Rahul Mehta</p>
                  <p className="text-sm text-brandBg/50">Facebook Ad · Skincare</p>
                </div>
                <div className="flex gap-2">
                  <span className="grid place-items-center h-9 w-9 rounded-xl bg-brandYellow text-brandDark">📞</span>
                  <span className="grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white">💬</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="bg-brandBg text-brandDark p-8 sm:p-10 flex items-center">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-black">Welcome back</h2>
            <p className="mt-2 font-medium text-brandDark/55">Log in to see your dashboard.</p>

            <form onSubmit={submit} className="mt-7 grid gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brandDark/45 mb-2">Mobile number</label>
                <div className="flex rounded-2xl bg-white ring-1 ring-brandDark/10 focus-within:ring-2 focus-within:ring-brandYellow overflow-hidden transition">
                  <span className="px-4 grid place-items-center bg-brandDark/5 font-bold text-brandDark/60 border-r border-brandDark/10">+91</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} className="w-full bg-transparent px-4 py-3.5 text-lg font-semibold outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brandDark/45 mb-2">Password</label>
                <div className="relative rounded-2xl bg-white ring-1 ring-brandDark/10 focus-within:ring-2 focus-within:ring-brandYellow overflow-hidden transition">
                  <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="••••••••" className="w-full bg-transparent px-4 py-3.5 pr-16 text-lg font-semibold outline-none" />
                  <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wide text-brandDark/40 hover:text-brandDark">
                    {show ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 ring-1 ring-red-200 px-3 py-2 text-sm font-bold text-red-700" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy || !phone || !password} className="mt-1 w-full rounded-2xl bg-brandYellow py-4 text-lg font-black text-brandDark shadow-glow transition hover:brightness-105 disabled:opacity-40 disabled:shadow-none">
                {busy ? 'Logging in…' : 'Log in to dashboard'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm font-medium text-brandDark/50">
              Forgot password?{' '}
              <a className="font-bold text-brandDark underline decoration-brandYellow decoration-2 underline-offset-2" href={whatsappUrl('Namaste, mujhe client portal ka password chahiye.')} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
