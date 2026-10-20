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

  const input = 'mt-1 w-full rounded-xl border-2 border-brandDark/15 bg-white px-4 py-3 text-lg font-semibold outline-none focus:border-brandYellow';

  return (
    <div className="min-h-[100svh] bg-brandBg text-brandDark flex flex-col">
      <header className="border-b border-brandDark/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/proposal-logo.png" alt="" width={28} height={28} className="w-7 h-7 rounded-lg bg-brandDark p-1" />
          <span className="font-black tracking-wide text-sm">TECHINFIGO</span>
          <span className="ml-auto text-xs font-bold text-brandDark/50">Client portal</span>
        </div>
      </header>
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-10 pb-16">
        <div className="text-center">
          <p className="text-5xl">📊</p>
          <h1 className="mt-3 text-3xl font-black">Your growth dashboard</h1>
          <p className="mt-2 font-semibold text-brandDark/70">Content calendar, approvals and payments, all in one place.</p>
        </div>
        <form onSubmit={submit} className="mt-8 rounded-3xl bg-white border-2 border-brandDark/10 p-5 grid gap-4">
          <label className="block text-sm font-bold">
            Mobile number
            <div className="mt-1 flex rounded-xl border-2 border-brandDark/15 focus-within:border-brandYellow overflow-hidden bg-white">
              <span className="px-3 flex items-center bg-brandDark/5 font-bold">+91</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} className="w-full px-3 py-3 text-lg font-semibold outline-none" />
            </div>
          </label>
          <label className="block text-sm font-bold">
            Password
            <div className="relative">
              <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={`${input} pr-20`} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-sm font-bold text-brandDark/60">
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          {error && (
            <p className="text-sm font-bold text-red-600" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy || !phone || !password} className="w-full rounded-2xl bg-brandYellow py-4 text-lg font-black shadow-glow disabled:opacity-50">
            {busy ? 'Logging in…' : 'Login 👉'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-brandDark/60">
          Password bhool gaye?{' '}
          <a className="font-bold underline" href={whatsappUrl('Namaste, mujhe client portal ka password chahiye.')} target="_blank" rel="noopener noreferrer">
            WhatsApp karein
          </a>
        </p>
      </main>
    </div>
  );
}
