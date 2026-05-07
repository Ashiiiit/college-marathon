'use client';

import { useState, useId } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const BRAND = {
  gold: {
    50:  '#fdf8ec',
    500: '#c9a84c',
    600: '#b8922e',
    700: '#a07a1e',
    950: '#1a1100',
  },
  bg: '#06090f',
} as const;

// ─── Sub-component ────────────────────────────────────────────────────────────
const TechArtifact = () => {
  const uid = useId();
  const gradientId = `centralGlow-${uid}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-gold-500 opacity-90"
      role="img"
      aria-label="Animated tech logo"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={BRAND.gold[500]} stopOpacity="0.4" />
          <stop offset="100%" stopColor={BRAND.gold[500]} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="30" fill={`url(#${gradientId})`} />
      <circle cx="50" cy="50" r="6"  fill="currentColor" />

      <circle
        cx="50" cy="50" r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="5 5"
        className="origin-center animate-spin spin-15s"
      />

      <path d="M50 5  L55 30 L45 30 Z" fill="currentColor" className="origin-center animate-spin spin-20s" />
      <path d="M95 50 L70 55 L70 45 Z" fill="currentColor" className="origin-center animate-spin spin-25s" />
      <path d="M50 95 L45 70 L55 70 Z" fill="currentColor" className="origin-center animate-spin spin-18s" />
      <path d="M5  50 L30 45 L30 55 Z" fill="currentColor" className="origin-center animate-spin spin-22s" />
    </svg>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PremiumComingSoonPage() {
  const [email, setEmail] = useState('');

  const handleNotify = () => {
    console.log('Registered:', email);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 antialiased relative overflow-hidden font-serif"
      style={{ background: BRAND.bg }}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-[150px]"
        style={{ background: `${BRAND.gold[600]}0d` }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full z-0 blur-[100px] bg-slate-800/10"
      />

      <div className="relative z-10 text-center flex flex-col items-center max-w-xl w-full">

        <div className="absolute top-0 left-0 w-full flex justify-center py-12 md:py-16">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-700">
            MERAKI&apos;26
          </span>
        </div>

        <div className="relative flex items-center justify-center h-40 w-40 mb-16 mt-20 md:mt-0 p-4 rounded-full bg-slate-900/40 border border-slate-800/50 shadow-inner group overflow-hidden">
          <div
            className="absolute inset-0 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-1000 blur-[20px]"
            style={{ background: `${BRAND.gold[700]}0d` }}
          />
          <div className="relative z-10">
            <TechArtifact />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-100 tracking-[-0.06em] leading-[0.9] mb-6">
          Constructing<br />
          Experience
          <span style={{ color: BRAND.gold[500] }}>.</span>
        </h1>

        <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed mb-16 max-w-sm uppercase tracking-[0.15em]">
          We are currently optimizing the platform for initialization.
        </p>

        <div className="w-full max-w-md flex flex-col md:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNotify()}
            placeholder="Register for exclusive updates"
            className="flex-grow p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 outline-none"
          />
          <button
            onClick={handleNotify}
            className="p-4 px-8 font-semibold rounded-xl"
            style={{ background: BRAND.gold[600], color: BRAND.gold[950] }}
          >
            Notify Me
          </button>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex justify-center py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-800">
          ATAL MARATHON × MERAKI&apos;26
        </div>

      </div>
    </main>
  );
}