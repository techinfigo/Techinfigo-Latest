'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HoneypotField } from './HoneypotField';
import { submitLead } from '../lib/submit-lead';
import { whatsappUrl } from '../config/site';
import {
  BIZ,
  BUDGET,
  GOALS,
  PAIN,
  PRAISE,
  SERVICE_NAMES,
  SOURCES,
  STEP_IDS,
  WEBSITE,
  WHEN,
  adEnquiries,
  bizOf,
  buildPayload,
  checkupSummary,
  computeResult,
  enquiriesNeeded,
  painFinding,
  rupeesShort,
  sourcesFinding,
  websiteFinding,
  type Answers,
  type Biz,
  type Finding,
  type Option,
  type StepId,
} from '../lib/checkup';

/**
 * Free Business Check-up: one easy question at a time, only taps, in simple
 * Hinglish. Every answer gives something back at once (a "well done", a tip,
 * or a problem + its fix that drops into "Aapka plan"). Name and number are
 * asked only at the end, after the person has seen their plan.
 */

type Screen = { kind: 'intro' } | { kind: 'step'; i: number } | { kind: 'result' } | { kind: 'done' };

const STEPS = STEP_IDS.length;

export default function CheckupFlow() {
  const [screen, setScreen] = useState<Screen>({ kind: 'intro' });
  const [a, setA] = useState<Answers>({});
  const [bump, setBump] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const b = bizOf(a.biz);
  const result = useMemo(() => computeResult(a), [a]);
  const planCount = result.findings.length;

  const stepNo = screen.kind === 'step' ? screen.i + 1 : screen.kind === 'intro' ? 0 : STEPS;
  const pct = Math.round((stepNo / STEPS) * 100);

  const go = (s: Screen) => {
    setScreen(s);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  };
  const set = (patch: Answers) => {
    setA((x) => ({ ...x, ...patch }));
    setBump((n) => n + 1);
  };
  const back = () => {
    if (screen.kind === 'step') go(screen.i === 0 ? { kind: 'intro' } : { kind: 'step', i: screen.i - 1 });
    else if (screen.kind === 'result') go({ kind: 'step', i: STEPS - 1 });
  };
  const next = () => {
    if (screen.kind !== 'step') return;
    go(screen.i + 1 < STEPS ? { kind: 'step', i: screen.i + 1 } : { kind: 'result' });
  };

  const showBar = screen.kind === 'step' || screen.kind === 'result';

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
          {showBar && (
            <span key={bump} className="ck-bump ml-auto inline-flex items-center gap-1.5 rounded-full bg-brandDark text-white text-xs font-bold px-3 py-1.5">
              🩺 Aapka plan: <b className="text-brandYellow">{planCount}</b> ilaaj
            </span>
          )}
        </div>
        {showBar && (
          <div className="max-w-xl mx-auto px-4 pb-3">
            <div className="h-2.5 rounded-full bg-brandDark/10 overflow-hidden">
              <div className="h-full rounded-full bg-brandYellow transition-all duration-500" style={{ width: `${Math.max(6, pct)}%` }} />
            </div>
            <p className="mt-1.5 text-xs font-semibold text-brandDark/60">{screen.kind === 'result' ? 'Aapka plan taiyaar hai ✅' : progressLine(stepNo)}</p>
          </div>
        )}
      </header>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-28">
        {screen.kind === 'intro' && <Intro onStart={() => go({ kind: 'step', i: 0 })} />}
        {screen.kind === 'step' && <Step key={STEP_IDS[screen.i]} id={STEP_IDS[screen.i]} n={screen.i + 1} a={a} b={b} set={set} onBack={back} onNext={next} />}
        {screen.kind === 'result' && <ResultScreen a={a} onBack={back} onDone={() => go({ kind: 'done' })} />}
        {screen.kind === 'done' && <Done />}
      </div>
    </div>
  );
}

function progressLine(step: number) {
  if (step <= 2) return 'Shuruaat ho gayi 👍';
  if (step === STEPS) return 'Bas ye aakhri sawaal! 🏁';
  const pct = Math.round((step / STEPS) * 100);
  return `Aapka plan ${pct}% taiyaar ${pct < 60 ? '💪' : '🔥'}`;
}

/* ------------------------------------------------------------------ steps */

function Step({ id, n, a, b, set, onBack, onNext }: { id: StepId; n: number; a: Answers; b: Biz; set: (p: Answers) => void; onBack: () => void; onNext: () => void }) {
  const last = n === STEPS;
  // The reply card can sit below the fold on small phones. Instead of jumping
  // the page (which pulls the options out from under the finger), show a small
  // button that brings it into view, and hide it once the card is visible.
  const reactRef = useRef<HTMLDivElement>(null);
  const [reactSeen, setReactSeen] = useState(true);
  useEffect(() => {
    const check = () => {
      const el = reactRef.current;
      if (!el || !el.firstElementChild) return setReactSeen(true);
      // "Seen" once the top of the card is clearly above the bottom buttons.
      setReactSeen(el.getBoundingClientRect().top + 70 < window.innerHeight - 80);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  });
  let body: React.ReactNode = null;
  let reaction: React.ReactNode = null;
  let done = false;

  switch (id) {
    case 'biz':
      done = !!a.biz;
      body = (
        <>
          <Ask n={n}>Aapka kaam kya hai? 👇</Ask>
          <div className="grid grid-cols-2 gap-3">
            {BIZ.map((x) => (
              <Tile key={x.key} on={a.biz === x.key} onClick={() => set({ biz: x.key })} big>
                <span className="block text-4xl leading-none">{x.emoji}</span>
                <span className="block mt-2 font-bold">{x.label}</span>
              </Tile>
            ))}
          </div>
        </>
      );
      if (a.biz) reaction = <Tip key={a.biz} title="💡 Kya aap jaante ho?">{b.tip}</Tip>;
      break;

    case 'pain': {
      done = !!a.pain;
      body = (
        <>
          <Ask n={n}>Abhi sabse badi pareshani kya hai?</Ask>
          <Choices opts={PAIN} value={a.pain} onPick={(v) => set({ pain: v })} />
        </>
      );
      const f = painFinding(a.pain, b);
      if (f) reaction = <FindingCard key={a.pain} f={f} />;
      break;
    }

    case 'sources': {
      const picked = a.sources || [];
      done = picked.length > 0;
      body = (
        <>
          <Ask n={n} hint="Jitne sahi lagein, sab chuniye">
            Abhi naye {b.many} kahan se aate hain?
          </Ask>
          <Choices
            opts={SOURCES}
            multi
            values={picked}
            onPick={(v) => set({ sources: picked.includes(v) ? picked.filter((x) => x !== v) : [...picked, v] })}
          />
        </>
      );
      if (done) {
        const f = sourcesFinding(picked);
        reaction = f ? <FindingCard key={f.problem} f={f} /> : <Good key="ok">{PRAISE.sources}</Good>;
      }
      break;
    }

    case 'website': {
      done = !!a.website;
      body = (
        <>
          <Ask n={n}>Kya aapki website hai? 🌐</Ask>
          <Choices opts={WEBSITE} value={a.website} onPick={(v) => set({ website: v })} />
        </>
      );
      if (a.website) {
        const f = websiteFinding(a.website);
        reaction = f ? <FindingCard key={a.website} f={f} /> : <Good key="ok">{PRAISE.website}</Good>;
      }
      break;
    }

    case 'goal': {
      done = !!a.goal;
      body = (
        <>
          <Ask n={n}>Har mahine kitne naye {b.many} chahiye? 🎯</Ask>
          <div className="grid grid-cols-2 gap-3">
            {GOALS.map((g, i) => (
              <Tile key={g} on={a.goal === String(g)} onClick={() => set({ goal: String(g) })}>
                <span className="block text-3xl font-black">
                  {g}
                  {i === GOALS.length - 1 ? '+' : ''}
                </span>
                <span className="block text-sm font-semibold text-brandDark/60">naye {b.many}</span>
              </Tile>
            ))}
          </div>
        </>
      );
      if (a.goal) {
        const g = Number(a.goal);
        reaction = (
          <Tip key={a.goal} title="🎯 Aapka target set!">
            {g} naye {b.many} ke liye har mahine ≈ <b>{enquiriesNeeded(g)} enquiries</b> chahiye. Aapke plan mein iska poora rasta hai 👍
          </Tip>
        );
      }
      break;
    }

    case 'value': {
      done = !!a.value;
      body = (
        <>
          <Ask n={n} hint={b.valueNote ? `(${b.valueNote})` : undefined}>
            Ek {b.one} se aapko kitna milta hai? 💰
          </Ask>
          <div className="grid grid-cols-2 gap-3">
            {b.values.map((v, i) => (
              <Tile key={v} on={a.value === String(v)} onClick={() => set({ value: String(v) })}>
                <span className="block text-2xl font-black">
                  {rupeesShort(v)}
                  {i === b.values.length - 1 ? '+' : ''}
                </span>
              </Tile>
            ))}
          </div>
        </>
      );
      if (a.value && a.goal) {
        reaction = (
          <Tip key={a.value} title="💰 Socho zara!">
            {a.goal} naye {b.many} = <b>≈ {rupeesShort(Number(a.goal) * Number(a.value))} ka extra business</b> har mahine!
          </Tip>
        );
      }
      break;
    }

    case 'budget': {
      done = !!a.budget;
      body = (
        <>
          <Ask n={n} hint="Ads + marketing, har mahine">
            Marketing pe kitna laga sakte ho?
          </Ask>
          <Choices opts={BUDGET} value={a.budget} onPick={(v) => set({ budget: v })} />
        </>
      );
      if (a.budget) {
        const mid = BUDGET.find((x) => x.id === a.budget)?.mid || 0;
        const lo = BUDGET.find((x) => x.id === a.budget);
        reaction =
          mid === 0 ? (
            <Good key="0">Koi baat nahi! 🙂 Google Maps aur website se bina ads ke bhi shuruaat ho sakti hai.</Good>
          ) : (
            <Tip key={a.budget} title="📈 Achha start!">
              {lo?.label} mein ads se ≈ <b>{adEnquiries(lo?.id === '5-10' ? 5000 : lo?.id === '10-25' ? 10000 : 25000)}+ enquiries</b> har mahine aa sakti hain (andaaza).
            </Tip>
          );
      }
      break;
    }

    case 'when': {
      done = !!a.when;
      body = (
        <>
          <Ask n={n}>Kab shuru karna chahte ho?</Ask>
          <Choices opts={WHEN} value={a.when} onPick={(v) => set({ when: v })} />
        </>
      );
      if (a.when)
        reaction = (
          <Good key={a.when}>
            {a.when === 'now'
              ? '🔥 Badhiya! Aapka plan sabse pehle banega.'
              : a.when === 'month'
                ? '👍 Theek hai! Hum aapke plan ke saath ready rahenge.'
                : '🙂 Koi baat nahi! Plan dekh lijiye, koi pressure nahi.'}
          </Good>
        );
      break;
    }
  }

  return (
    <section className="ck-in">
      {body}
      <div ref={reactRef}>{reaction}</div>
      {reaction && !reactSeen && (
        <div className="fixed inset-x-0 bottom-[84px] z-20 flex justify-center pointer-events-none">
          <button
            type="button"
            onClick={() => reactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="ck-pop pointer-events-auto rounded-full bg-brandDark text-white text-sm font-bold px-4 py-2 shadow-3xl"
          >
            👇 Aapka jawaab neeche dekhein
          </button>
        </div>
      )}
      <Nav onBack={onBack} onNext={done ? onNext : undefined} nextLabel={last ? 'Mera plan dikhao 🎁' : 'Aage chalo 👉'} />
    </section>
  );
}

/* ---------------------------------------------------------- small pieces */

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

function Ask({ n, hint, children }: { n: number; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-black uppercase tracking-widest text-brandDark/50">
        Sawaal {n} / {STEPS}
      </p>
      <h2 className="mt-1 text-2xl sm:text-3xl font-black leading-snug">{children}</h2>
      {hint && <p className="mt-1 text-base font-semibold text-brandDark/60">{hint}</p>}
    </div>
  );
}

function Tile({ on, onClick, big, children }: { on: boolean; onClick: () => void; big?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`ck-tile rounded-2xl border-2 px-3 ${big ? 'py-4' : 'py-5'} text-center transition ${on ? 'border-brandYellow bg-brandYellow/15 scale-[1.02]' : 'border-brandDark/10 bg-white hover:border-brandYellow'}`}
    >
      {children}
    </button>
  );
}

function Choices({ opts, value, values, multi, onPick }: { opts: Option[]; value?: string; values?: string[]; multi?: boolean; onPick: (id: string) => void }) {
  return (
    <div className="grid gap-3">
      {opts.map((o) => {
        const on = multi ? !!values?.includes(o.id) : value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            aria-pressed={on}
            className={`ck-tile flex items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition ${on ? 'border-brandYellow bg-brandYellow/15' : 'border-brandDark/10 bg-white hover:border-brandYellow'}`}
          >
            <span className="text-3xl leading-none">{o.emoji}</span>
            <span className="font-bold text-lg leading-snug flex-1">{o.label}</span>
            {multi && (
              <span className={`w-7 h-7 shrink-0 rounded-lg border-2 grid place-items-center font-black ${on ? 'bg-brandYellow border-brandYellow' : 'border-brandDark/20'}`} aria-hidden="true">
                {on ? '✓' : ''}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Good({ children }: { children: React.ReactNode }) {
  return (
    <div className="ck-pop mt-5 rounded-2xl px-5 py-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-900">
      <p className="font-bold text-lg">{children}</p>
    </div>
  );
}

function Tip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ck-pop mt-5 rounded-2xl px-5 py-4 bg-white border-2 border-brandYellow">
      <p className="font-bold">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function FindingCard({ f }: { f: Finding }) {
  return (
    <div className="ck-pop mt-5 rounded-2xl overflow-hidden border-2 border-brandDark/10 bg-white">
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

function Nav({ onBack, onNext, nextLabel }: { onBack: () => void; onNext?: () => void; nextLabel: string }) {
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

/* ----------------------------------------------------------------- result */

function ResultScreen({ a, onBack, onDone }: { a: Answers; onBack: () => void; onDone: () => void }) {
  const b = bizOf(a.biz);
  const r = computeResult(a);
  const score = useCountUp(r.score);
  const color = r.score < 40 ? '#e04848' : r.score < 70 ? '#f6b324' : '#16a172';
  const label = r.score < 40 ? 'Bahut kuch chhoot raha hai' : r.score < 70 ? 'Theek hai, par aur ho sakta hai' : 'Badhiya! Ab aur aage badhein';
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const digits = phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  const phoneOk = /^[6-9]\d{9}$/.test(digits);
  const ready = name.trim().length >= 2 && phoneOk;

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

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || busy) {
      setError(!phoneOk ? 'Apna 10 digit WhatsApp number daaliye 🙏' : 'Apna naam daaliye 🙏');
      return;
    }
    setBusy(true);
    setError('');
    const checkup = buildPayload(a);
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

  const fixes = r.findings.length ? r.findings.map((f) => f.fix) : ['Jo chal raha hai usse aur bada karna: ads + content'];

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
        <p className="font-black text-lg">✅ Aapke liye {fixes.length} ilaaj</p>
        <ul className="mt-3 grid gap-2.5">
          {fixes.map((fix, i) => (
            <li key={i} className="ck-pop flex gap-3 rounded-xl bg-emerald-50 px-4 py-3" style={{ animationDelay: `${150 * i}ms` }}>
              <span className="text-emerald-600 font-black">✓</span>
              <span className="font-semibold text-emerald-950">{fix}</span>
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
        {r.goal > 0 && (
          <p className="mt-2 text-sm font-semibold">
            🎯 Aapka target: {r.goal}
            {r.goal === 50 ? '+' : ''} naye {b.many}.{' '}
            {r.high >= r.goal ? 'Ye plan aapko wahan tak le ja sakta hai! 💪' : 'Isse aage ke liye plan ko step by step badhayenge. 💪'}
          </p>
        )}
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
          <span className="text-sm font-bold">
            Business ka naam <span className="font-normal text-brandDark/50">(optional)</span>
          </span>
          <input value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" placeholder="Jaise: Gyan Path Coaching" className="mt-1 w-full rounded-xl border-2 border-brandDark/15 px-4 py-3 text-lg font-semibold focus:border-brandYellow outline-none" />
        </label>
        <label className="block mt-3">
          <span className="text-sm font-bold">WhatsApp number</span>
          <div className="mt-1 flex rounded-xl border-2 border-brandDark/15 focus-within:border-brandYellow overflow-hidden">
            <span className="px-3 flex items-center bg-brandDark/5 font-bold">+91</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} className="w-full px-3 py-3 text-lg font-semibold outline-none" />
          </div>
        </label>
        {error && (
          <p className="mt-3 text-sm font-bold text-red-600" role="alert">
            {error}
          </p>
        )}
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
            <button type="button" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="ck-pulse w-full rounded-2xl bg-brandYellow text-brandDark py-3.5 text-lg font-black">
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
@keyframes ckIn{from{opacity:0}to{opacity:1}}
@keyframes ckPop{0%{opacity:0;transform:scale(.9) translateY(8px)}100%{opacity:1;transform:none}}
@keyframes ckBump{0%{transform:scale(1)}40%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes ckPulse{0%,100%{box-shadow:0 0 0 0 rgba(252,182,50,.55)}50%{box-shadow:0 0 0 10px rgba(252,182,50,0)}}
@media (prefers-reduced-motion:reduce){.ck-in,.ck-pop,.ck-bump,.ck-added,.ck-pulse{animation:none}}
`;
