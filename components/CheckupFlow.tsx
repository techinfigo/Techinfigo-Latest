'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HoneypotField } from './HoneypotField';
import { submitLead } from '../lib/submit-lead';
import { whatsappUrl } from '../config/site';
import {
  BIZ,
  QUESTIONS,
  bizOf,
  buildPayload,
  checkupSummary,
  computeResult,
  rupeesShort,
  SERVICE_NAMES,
  type Answers,
  type BizKey,
  type Finding,
} from '../lib/checkup';

/**
 * Free Business Check-up: one easy question at a time, only taps, in simple
 * Hinglish. Every answer gives something back at once (a "well done" or a
 * problem + its fix that drops into "Aapka plan"). Name and number are asked
 * only at the end, after the person has seen their plan.
 */

type Screen = { kind: 'intro' } | { kind: 'biz' } | { kind: 'q'; i: number } | { kind: 'value' } | { kind: 'result' } | { kind: 'done' };

const STEPS = 2 + QUESTIONS.length; // biz + questions + value

export default function CheckupFlow() {
  const [screen, setScreen] = useState<Screen>({ kind: 'intro' });
  const [biz, setBiz] = useState<BizKey | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [bump, setBump] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const b = bizOf(biz ?? undefined);
  const result = useMemo(() => computeResult(biz ?? undefined, answers), [biz, answers]);
  const planCount = result.findings.length;

  const stepNo = screen.kind === 'biz' ? 1 : screen.kind === 'q' ? 2 + screen.i : screen.kind === 'value' ? STEPS : screen.kind === 'intro' ? 0 : STEPS;
  const pct = Math.round((stepNo / STEPS) * 100);

  const go = (s: Screen) => {
    setScreen(s);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const answer = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setBump((n) => n + 1);
  };
  const back = () => {
    if (screen.kind === 'biz') go({ kind: 'intro' });
    else if (screen.kind === 'q') go(screen.i === 0 ? { kind: 'biz' } : { kind: 'q', i: screen.i - 1 });
    else if (screen.kind === 'value') go({ kind: 'q', i: QUESTIONS.length - 1 });
    else if (screen.kind === 'result') go({ kind: 'value' });
  };

  return (
    <div ref={topRef} className="ck min-h-[100svh] bg-brandBg text-brandDark">
      <style>{CSS}</style>

      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-brandBg/95 backdrop-blur border-b border-brandDark/10">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Techinfigo home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/proposal-logo.png" alt="" width={28} height={28} className="w-7 h-7 rounded-lg bg-brandDark p-1" />
            <span className="font-black tracking-wide text-sm">TECHINFIGO</span>
          </a>
          {screen.kind !== 'intro' && screen.kind !== 'done' && (
            <span key={bump} className="ck-bump ml-auto inline-flex items-center gap-1.5 rounded-full bg-brandDark text-white text-xs font-bold px-3 py-1.5">
              🩺 Aapka plan: <b className="text-brandYellow">{planCount}</b> {planCount === 1 ? 'ilaaj' : 'ilaaj'}
            </span>
          )}
        </div>
        {screen.kind !== 'intro' && screen.kind !== 'done' && (
          <div className="max-w-xl mx-auto px-4 pb-3">
            <div className="h-2.5 rounded-full bg-brandDark/10 overflow-hidden">
              <div className="h-full rounded-full bg-brandYellow transition-all duration-500" style={{ width: `${Math.max(6, pct)}%` }} />
            </div>
            <p className="mt-1.5 text-xs font-semibold text-brandDark/60">{screen.kind === 'result' ? 'Aapka plan taiyaar hai ✅' : progressLine(pct)}</p>
          </div>
        )}
      </header>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-28">
        {screen.kind === 'intro' && <Intro onStart={() => go({ kind: 'biz' })} />}

        {screen.kind === 'biz' && (
          <Card key="biz">
            <Ask n={1}>Aapka kaam kya hai? 👇</Ask>
            <div className="grid grid-cols-2 gap-3">
              {BIZ.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => {
                    setBiz(x.key);
                    setBump((n) => n + 1);
                  }}
                  className={`ck-tile rounded-2xl border-2 px-3 py-4 text-center transition ${biz === x.key ? 'border-brandYellow bg-brandYellow/15 scale-[1.02]' : 'border-brandDark/10 bg-white hover:border-brandYellow'}`}
                >
                  <span className="block text-4xl leading-none">{x.emoji}</span>
                  <span className="block mt-2 font-bold">{x.label}</span>
                </button>
              ))}
            </div>
            {biz && (
              <Reaction tone="tip">
                <p className="font-bold">💡 Kya aap jaante ho?</p>
                <p className="mt-1">{b.tip}</p>
              </Reaction>
            )}
            <Nav onBack={back} onNext={biz ? () => go({ kind: 'q', i: 0 }) : undefined} />
          </Card>
        )}

        {screen.kind === 'q' && (() => {
          const q = QUESTIONS[screen.i];
          const picked = q.options.find((o) => o.id === answers[q.id]);
          return (
            <Card key={q.id}>
              <Ask n={2 + screen.i}>{q.ask(b)}</Ask>
              <div className="grid gap-3">
                {q.options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => answer(q.id, o.id)}
                    className={`ck-tile flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition ${answers[q.id] === o.id ? 'border-brandYellow bg-brandYellow/15' : 'border-brandDark/10 bg-white hover:border-brandYellow'}`}
                  >
                    <span className="text-3xl leading-none">{o.emoji}</span>
                    <span className="font-bold text-lg">{o.label}</span>
                  </button>
                ))}
              </div>
              {picked && (picked.good ? (
                <Reaction key={picked.id} tone="good">
                  <p className="font-bold text-lg">{q.praise(b)}</p>
                </Reaction>
              ) : (
                <FindingCard key={picked.id} f={q.finding(b)} />
              ))}
              <Nav onBack={back} onNext={picked ? () => go(screen.i + 1 < QUESTIONS.length ? { kind: 'q', i: screen.i + 1 } : { kind: 'value' }) : undefined} />
            </Card>
          );
        })()}

        {screen.kind === 'value' && (
          <Card key="value">
            <Ask n={STEPS}>
              Ek {b.one} se aapko kitna milta hai? 💰
              {b.valueNote && <span className="block text-base font-semibold text-brandDark/60 mt-1">({b.valueNote})</span>}
            </Ask>
            <div className="grid grid-cols-2 gap-3">
              {b.values.map((v, i) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => answer('value', String(v))}
                  className={`ck-tile rounded-2xl border-2 px-3 py-5 text-center transition ${answers.value === String(v) ? 'border-brandYellow bg-brandYellow/15' : 'border-brandDark/10 bg-white hover:border-brandYellow'}`}
                >
                  <span className="block text-2xl font-black">{rupeesShort(v)}{i === b.values.length - 1 ? '+' : ''}</span>
                </button>
              ))}
            </div>
            {answers.value && (
              <Reaction tone="good">
                <p className="font-bold text-lg">Bas ho gaya! 🎉 Aapka plan ban raha hai…</p>
              </Reaction>
            )}
            <Nav onBack={back} onNext={answers.value ? () => go({ kind: 'result' }) : undefined} nextLabel="Mera plan dikhao 🎁" />
          </Card>
        )}

        {screen.kind === 'result' && biz && <ResultScreen biz={biz} answers={answers} onBack={back} onDone={() => go({ kind: 'done' })} />}

        {screen.kind === 'done' && <Done />}
      </div>
    </div>
  );
}

function progressLine(pct: number) {
  if (pct < 30) return 'Shuruaat ho gayi 👍';
  if (pct < 60) return `Aapka plan ${pct}% taiyaar 💪`;
  if (pct < 90) return `Aapka plan ${pct}% taiyaar 🔥`;
  return 'Bas ek aur sawaal! 🏁';
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="ck-in text-center pt-6">
      <div className="text-6xl">🩺</div>
      <h1 className="mt-4 text-3xl sm:text-4xl font-black leading-tight">
        Free Business <span className="whitespace-nowrap text-brandYellow bg-brandDark px-2 rounded-lg">Check-up</span>
      </h1>
      <p className="mt-4 text-lg font-semibold text-brandDark/80">
        Sirf 60 second. Sirf tap karna hai.
        <br />
        Har jawaab pe turant milega aapke business ka ilaaj. 💡
      </p>
      <ul className="mt-6 grid gap-2 text-left max-w-sm mx-auto">
        {['Kahan se customers chhoot rahe hain', 'Unka aasaan ilaaj', 'Kitni extra kamaai ho sakti hai'].map((t, i) => (
          <li key={t} className="flex items-center gap-3 rounded-xl bg-white border border-brandDark/10 px-4 py-3 font-semibold">
            <span className="text-xl">{['🔍', '✅', '📈'][i]}</span>
            {t}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onStart} className="ck-pulse mt-8 w-full max-w-sm rounded-2xl bg-brandYellow text-brandDark text-xl font-black py-4 shadow-glow">
        Shuru karein 👉
      </button>
      <p className="mt-3 text-sm text-brandDark/60">100% free · Koi login nahi · Koi spam nahi</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <section className="ck-in">{children}</section>;
}

function Ask({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-black uppercase tracking-widest text-brandDark/50">
        Sawaal {n} / {STEPS}
      </p>
      <h2 className="mt-1 text-2xl sm:text-3xl font-black leading-snug">{children}</h2>
    </div>
  );
}

/** Brings a just-shown answer card into view above the bottom buttons. */
function useShowMe<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
    return () => clearTimeout(t);
  }, []);
  return ref;
}

function Reaction({ tone, children }: { tone: 'good' | 'tip'; children: React.ReactNode }) {
  const ref = useShowMe<HTMLDivElement>();
  return (
    <div ref={ref} className={`ck-pop mt-5 rounded-2xl px-5 py-4 ${tone === 'good' ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900' : 'bg-white border-2 border-brandYellow'}`}>
      {children}
    </div>
  );
}

function FindingCard({ f }: { f: Finding }) {
  const ref = useShowMe<HTMLDivElement>();
  return (
    <div ref={ref} className="ck-pop mt-5 rounded-2xl overflow-hidden border-2 border-brandDark/10 bg-white">
      <div className="bg-red-50 px-5 py-4">
        <p className="text-xs font-black uppercase tracking-widest text-red-600">🔴 Problem mila</p>
        <p className="mt-1 font-black text-lg text-red-900">{f.problem}</p>
        <p className="mt-1 text-sm font-semibold text-red-700">💸 {f.loss}</p>
      </div>
      <div className="bg-emerald-50 px-5 py-4">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-700">✅ Ilaaj</p>
        <p className="mt-1 font-bold text-emerald-900">{f.fix}</p>
        <p className="ck-added mt-2 inline-flex items-center gap-1 rounded-full bg-brandDark text-white text-xs font-bold px-3 py-1">➕ Aapke plan mein jud gaya!</p>
      </div>
    </div>
  );
}

function Nav({ onBack, onNext, nextLabel = 'Aage chalo 👉' }: { onBack: () => void; onNext?: () => void; nextLabel?: string }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-20 bg-brandBg/95 backdrop-blur border-t border-brandDark/10">
      <div className="max-w-xl mx-auto px-4 py-3 flex gap-3">
        <button type="button" onClick={onBack} className="rounded-2xl border-2 border-brandDark/15 px-5 py-3.5 font-bold" aria-label="Peeche">
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!onNext}
          className={`flex-1 rounded-2xl py-3.5 text-lg font-black transition ${onNext ? 'bg-brandYellow text-brandDark shadow-glow' : 'bg-brandDark/10 text-brandDark/40'}`}
        >
          {onNext ? nextLabel : 'Ek option chuno ☝️'}
        </button>
      </div>
    </div>
  );
}

function useCountUp(target: number, ms = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function ResultScreen({ biz, answers, onBack, onDone }: { biz: BizKey; answers: Answers; onBack: () => void; onDone: () => void }) {
  const b = bizOf(biz);
  const r = computeResult(biz, answers);
  const score = useCountUp(r.score);
  const color = r.score < 40 ? '#e04848' : r.score < 70 ? '#f6b324' : '#16a172';
  const label = r.score < 40 ? 'Bahut kuch chhoot raha hai' : r.score < 70 ? 'Theek hai, par aur ho sakta hai' : 'Badhiya! Ab aur aage badhein';
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const digits = phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  const ready = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(digits);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || busy) {
      setError(!/^[6-9]\d{9}$/.test(digits) ? 'Apna 10 digit WhatsApp number daaliye 🙏' : 'Apna naam daaliye 🙏');
      return;
    }
    setBusy(true);
    setError('');
    const checkup = buildPayload(biz, answers);
    const res = await submitLead({
      sourceForm: 'growth-checkup',
      name: name.trim(),
      phone: digits,
      brandName: business.trim() || undefined,
      message: checkupSummary(checkup),
      extra: { needs: checkup.services.map((s) => SERVICE_NAMES[s]) },
      checkup,
    });
    setBusy(false);
    if (res.ok) onDone();
    else setError('Kuch gadbad ho gayi. Dobara try karein, ya neeche WhatsApp button dabayein.');
  };

  const R = 54;
  const C = 2 * Math.PI * R;
  const formRef = useRef<HTMLFormElement>(null);
  const [formSeen, setFormSeen] = useState(false);
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setFormSeen(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ck-in">
      <div className="text-center">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-2 text-3xl font-black leading-tight">Badhai ho! Aapka Growth Plan taiyaar hai</h2>
      </div>

      {/* Score */}
      <div className="mt-6 rounded-3xl bg-brandDark text-white p-6 flex items-center gap-5">
        <svg viewBox="0 0 128 128" className="w-28 h-28 shrink-0" aria-label={`Score ${r.score} out of 100`}>
          <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="12" />
          <circle cx="64" cy="64" r={R} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)} transform="rotate(-90 64 64)" />
          <text x="64" y="66" textAnchor="middle" fontSize="34" fontWeight="900" fill="#fff">{score}</text>
          <text x="64" y="88" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,.6)">/ 100</text>
        </svg>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-white/60">Aapka online score</p>
          <p className="mt-1 text-xl font-black" style={{ color }}>{label}</p>
        </div>
      </div>

      {/* Fixes */}
      <div className="mt-5 rounded-3xl bg-white border-2 border-brandDark/10 p-5">
        <p className="font-black text-lg">✅ Aapke liye {r.findings.length || 1} ilaaj</p>
        <ul className="mt-3 grid gap-2.5">
          {(r.findings.length ? r.findings : [{ fix: 'Jo chal raha hai usse aur bada karna: ads + content', problem: '' } as Finding]).map((f, i) => (
            <li key={i} className="ck-pop flex gap-3 rounded-xl bg-emerald-50 px-4 py-3" style={{ animationDelay: `${150 * i}ms` }}>
              <span className="text-emerald-600 font-black">✓</span>
              <span className="font-semibold text-emerald-950">{f.fix}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Estimate */}
      <div className="mt-5 rounded-3xl bg-brandYellow/20 border-2 border-brandYellow p-5">
        <p className="text-xs font-black uppercase tracking-widest text-brandDark/60">📈 Ye sab karne se</p>
        <p className="mt-1 text-2xl font-black leading-snug">
          ≈ {r.low}–{r.high} naye {b.many} har mahine
        </p>
        <p className="mt-1 text-lg font-bold text-emerald-700">
          ≈ {rupeesShort(r.lowMoney)} – {rupeesShort(r.highMoney)} ka extra business har mahine
        </p>
        <p className="mt-2 text-xs font-semibold text-brandDark/60">
          Ye sirf andaaza hai (estimate), guarantee nahi. Asli result aapke area, season aur enquiry ka jaldi jawaab dene pe depend karta hai.
        </p>
      </div>

      {/* Contact */}
      <form ref={formRef} onSubmit={send} className="mt-6 rounded-3xl bg-white border-2 border-brandDark p-5 shadow-3xl" noValidate>
        <HoneypotField />
        <p className="text-xl font-black">📲 Ye poora plan apne WhatsApp pe paayein</p>
        <p className="mt-1 text-sm font-semibold text-brandDark/60">Saath mein free audit report bhi. Bilkul free.</p>
        <label className="block mt-4">
          <span className="text-sm font-bold">Aapka naam</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jaise: Anil Sharma" className="mt-1 w-full rounded-xl border-2 border-brandDark/15 px-4 py-3 text-lg font-semibold focus:border-brandYellow outline-none" />
        </label>
        <label className="block mt-3">
          <span className="text-sm font-bold">Business ka naam <span className="font-normal text-brandDark/50">(optional)</span></span>
          <input value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" placeholder="Jaise: Gyan Path Coaching" className="mt-1 w-full rounded-xl border-2 border-brandDark/15 px-4 py-3 text-lg font-semibold focus:border-brandYellow outline-none" />
        </label>
        <label className="block mt-3">
          <span className="text-sm font-bold">WhatsApp number</span>
          <div className="mt-1 flex rounded-xl border-2 border-brandDark/15 focus-within:border-brandYellow overflow-hidden">
            <span className="px-3 flex items-center bg-brandDark/5 font-bold">+91</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} className="w-full px-3 py-3 text-lg font-semibold outline-none" />
          </div>
        </label>
        {error && <p className="mt-3 text-sm font-bold text-red-600" role="alert">{error}</p>}
        <button type="submit" disabled={busy} className={`mt-5 w-full rounded-2xl py-4 text-lg font-black transition ${ready ? 'bg-brandYellow text-brandDark shadow-glow ck-pulse' : 'bg-brandYellow/60 text-brandDark/70'}`}>
          {busy ? 'Bhej rahe hain…' : 'Ye plan mere WhatsApp pe bhejo 👉'}
        </button>
        <p className="mt-3 text-center text-xs text-brandDark/50">🔒 Aapka number sirf plan bhejne ke liye. Koi spam nahi.</p>
      </form>

      <button type="button" onClick={onBack} className="mt-4 w-full text-sm font-bold text-brandDark/60 underline">
        ← Jawaab badlein
      </button>

      {!formSeen && (
        <div className="fixed bottom-0 inset-x-0 z-20 bg-brandBg/95 backdrop-blur border-t border-brandDark/10">
          <div className="max-w-xl mx-auto px-4 py-3">
            <button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="ck-pulse w-full rounded-2xl bg-brandYellow text-brandDark py-3.5 text-lg font-black"
            >
              📲 Ye plan WhatsApp pe paayein 👇
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Done() {
  return (
    <section className="ck-in text-center pt-8">
      <p className="text-6xl">🙌</p>
      <h2 className="mt-4 text-3xl font-black">Ho gaya!</h2>
      <p className="mt-3 text-lg font-semibold text-brandDark/80">
        Sachin 2 ghante ke andar aapko poora plan WhatsApp karenge.
        <br />
        <span className="text-sm text-brandDark/60">(Raat ko bheja hai toh subah 10 baje tak)</span>
      </p>
      <a
        href={whatsappUrl('Namaste! Maine abhi Free Business Check-up kiya. Mujhe mera plan chahiye.')}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-full max-w-sm justify-center rounded-2xl bg-[#25d366] text-white text-lg font-black py-4"
      >
        Abhi WhatsApp pe baat karein 💬
      </a>
      <a href="/" className="mt-4 block text-sm font-bold text-brandDark/60 underline">
        Website dekhein
      </a>
    </section>
  );
}

const CSS = `
.ck-in{animation:ckIn .35s ease-out both}
.ck-pop{animation:ckPop .45s cubic-bezier(.2,1.4,.4,1) both}
.ck-bump{animation:ckBump .5s ease-out}
.ck-added{animation:ckPop .5s .25s cubic-bezier(.2,1.4,.4,1) both}
.ck-pulse{animation:ckPulse 1.8s ease-in-out infinite}
.ck-tile:active{transform:scale(.97)}
@keyframes ckIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes ckPop{0%{opacity:0;transform:scale(.9) translateY(8px)}100%{opacity:1;transform:none}}
@keyframes ckBump{0%{transform:scale(1)}40%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes ckPulse{0%,100%{box-shadow:0 0 0 0 rgba(252,182,50,.55)}50%{box-shadow:0 0 0 10px rgba(252,182,50,0)}}
@media (prefers-reduced-motion:reduce){.ck-in,.ck-pop,.ck-bump,.ck-added,.ck-pulse{animation:none}}
`;
