'use client';

import React, { useState } from 'react';
import { CRED_ITEMS, type CredItemKey } from '../lib/cred-items';
import { whatsappUrl } from '../config/site';

/**
 * The page a client opens to share their logins: one card per item the
 * agency asked for. Each card: login details, give access by invite (where
 * the platform allows it), or "Abhi nahi pata". One submit, then the link
 * stops working.
 */

type Mode = 'login' | 'invite' | 'unknown';
type Answer = { mode: Mode; username: string; password: string; phone: string; url: string; notes: string; label: string };

const blank = (mode: Mode): Answer => ({ mode, username: '', password: '', phone: '', url: '', notes: '', label: '' });

export default function CredForm({ id, clientName, items, inviteEmail }: { id: string; clientName: string; items: CredItemKey[]; inviteEmail: string }) {
  const list = CRED_ITEMS.filter((i) => items.includes(i.key));
  const [ans, setAns] = useState<Record<string, Answer>>(() => Object.fromEntries(list.map((i) => [i.key, blank('login')])));
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (k: string, patch: Partial<Answer>) => setAns((a) => ({ ...a, [k]: { ...a[k], ...patch } }));
  const filled = (a: Answer) => a.mode !== 'login' || !!(a.username || a.password || a.phone || a.url || a.notes);
  const count = list.filter((i) => filled(ans[i.key])).length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!count) return setError('Kam se kam ek cheez bhariye 🙏');
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/cred-requests/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: list.filter((i) => filled(ans[i.key])).map((i) => ({ key: i.key, ...ans[i.key] })) }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) setDone(true);
      else setError(json.error || 'Save nahi ho paya. Dobara try karein.');
    } catch {
      setError('Internet check karke dobara try karein.');
    }
    setBusy(false);
  };

  if (done)
    return (
      <Shell>
        <div className="text-center pt-10">
          <p className="text-6xl">✅</p>
          <h1 className="mt-4 text-3xl font-black">Thank you!</h1>
          <p className="mt-3 text-lg font-semibold text-brandDark/80">Aapki details safely Techinfigo team tak pahunch gayi hain. Ab hum kaam start karte hain. 🙌</p>
          <p className="mt-2 text-sm text-brandDark/60">Ye link ab band ho gaya hai, kisi aur ko kaam nahi karega.</p>
        </div>
      </Shell>
    );

  const input = 'mt-1 w-full rounded-xl border-2 border-brandDark/15 bg-white px-4 py-3 text-base font-semibold outline-none focus:border-brandYellow';

  return (
    <Shell>
      <div className="text-center">
        <p className="text-5xl">🔐</p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-black leading-tight">{clientName} ke login details</h1>
        <p className="mt-2 font-semibold text-brandDark/70">Kaam start karne ke liye ye details chahiye. Sirf Techinfigo team dekh sakti hai.</p>
      </div>
      <ul className="mt-5 grid gap-2 text-sm font-semibold">
        <li className="rounded-xl bg-white border border-brandDark/10 px-4 py-2.5">🔒 Ye link sirf ek baar kaam karta hai aur 7 din mein band ho jaata hai.</li>
        <li className="rounded-xl bg-white border border-brandDark/10 px-4 py-2.5">✅ Jahan &quot;Access invite&quot; option hai, wo password dene se zyada safe hai.</li>
      </ul>

      <form onSubmit={submit} className="mt-6 grid gap-5" autoComplete="off">
        {list.map((item) => {
          const a = ans[item.key];
          const modes: { m: Mode; label: string }[] = [
            { m: 'login', label: 'Login details' },
            ...(item.invite ? [{ m: 'invite' as Mode, label: 'Access invite ⭐' }] : []),
            { m: 'unknown', label: 'Abhi nahi pata' },
          ];
          return (
            <section key={item.key} className="rounded-3xl bg-white border-2 border-brandDark/10 p-5">
              <h2 className="text-xl font-black">
                {item.emoji} {item.label}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {modes.map(({ m, label }) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => set(item.key, { mode: m })}
                    aria-pressed={a.mode === m}
                    className={`rounded-full px-4 py-2 text-sm font-bold border-2 ${a.mode === m ? 'bg-brandDark text-white border-brandDark' : 'border-brandDark/15'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {a.mode === 'login' && (
                <div className="mt-4 grid gap-3">
                  {item.key === 'other' && (
                    <label className="block text-sm font-bold">
                      Ye kis cheez ka login hai?
                      <input value={a.label} onChange={(e) => set(item.key, { label: e.target.value })} placeholder="jaise: Zomato partner" className={input} maxLength={60} />
                    </label>
                  )}
                  {item.url && (
                    <label className="block text-sm font-bold">
                      Login page / website link <span className="font-normal text-brandDark/50">(optional)</span>
                      <input value={a.url} onChange={(e) => set(item.key, { url: e.target.value })} inputMode="url" autoCapitalize="none" spellCheck={false} placeholder="jaise: www.aapkasite.com/wp-admin" className={input} maxLength={300} />
                    </label>
                  )}
                  <label className="block text-sm font-bold">
                    Username / Email / Phone
                    <input value={a.username} onChange={(e) => set(item.key, { username: e.target.value })} autoCapitalize="none" spellCheck={false} autoComplete="off" className={input} maxLength={200} />
                  </label>
                  <label className="block text-sm font-bold">
                    Password
                    <div className="relative">
                      <input
                        type={show[item.key] ? 'text' : 'password'}
                        value={a.password}
                        onChange={(e) => set(item.key, { password: e.target.value })}
                        autoComplete="new-password"
                        autoCapitalize="none"
                        spellCheck={false}
                        className={`${input} pr-20`}
                        maxLength={200}
                      />
                      <button type="button" onClick={() => setShow((s) => ({ ...s, [item.key]: !s[item.key] }))} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-sm font-bold text-brandDark/60">
                        {show[item.key] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </label>
                  <label className="block text-sm font-bold">
                    OTP kis number pe aata hai? <span className="font-normal text-brandDark/50">(optional)</span>
                    <input value={a.phone} onChange={(e) => set(item.key, { phone: e.target.value })} inputMode="tel" className={input} maxLength={20} />
                  </label>
                </div>
              )}

              {a.mode === 'invite' && item.invite && (
                <div className="mt-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-4">
                  <p className="font-bold text-emerald-900">Password dene ki zarurat nahi. Bas ye karein:</p>
                  <ol className="mt-2 grid gap-1.5 list-decimal pl-5 text-emerald-950">
                    {item.invite.map((s, i) => (
                      <li key={i}>{s.split('{email}').flatMap((part, j) => (j ? [<b key={j} className="select-all break-all bg-white px-1 rounded">{inviteEmail}</b>, part] : [part]))}</li>
                    ))}
                  </ol>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">Ho jaane ke baad neeche Submit dabaiye. ✅</p>
                </div>
              )}

              {a.mode === 'unknown' && <p className="mt-4 rounded-2xl bg-brandBg px-4 py-3 font-semibold text-brandDark/70">Koi baat nahi 🙂 Hum aapse call pe le lenge.</p>}

              <label className="block mt-3 text-sm font-bold">
                Kuch aur batana hai? <span className="font-normal text-brandDark/50">(optional)</span>
                <input value={a.notes} onChange={(e) => set(item.key, { notes: e.target.value })} placeholder="jaise: password bhai ke paas hai" className={input} maxLength={500} />
              </label>
            </section>
          );
        })}

        {error && (
          <p className="text-center font-bold text-red-600" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className="w-full rounded-2xl bg-brandYellow py-4 text-lg font-black shadow-glow disabled:opacity-60">
          {busy ? 'Bhej rahe hain…' : `Submit karein (${count}/${list.length}) 🔒`}
        </button>
        <p className="text-center text-xs text-brandDark/50">
          Koi dikkat? <a className="underline font-bold" href={whatsappUrl('Namaste, login details wale form mein help chahiye.')} target="_blank" rel="noopener noreferrer">WhatsApp karein</a>
        </p>
      </form>
    </Shell>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100svh] bg-brandBg text-brandDark">
      <header className="border-b border-brandDark/10">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/proposal-logo.png" alt="" width={28} height={28} className="w-7 h-7 rounded-lg bg-brandDark p-1" />
          <span className="font-black tracking-wide text-sm">TECHINFIGO</span>
        </div>
      </header>
      <main className="max-w-xl mx-auto px-4 pt-6 pb-16">{children}</main>
    </div>
  );
}
