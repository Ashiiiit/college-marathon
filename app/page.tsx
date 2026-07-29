'use client';

import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// --- ADMIN CONTROLS ---
const IS_REGISTRATION_OPEN = false; 
// ----------------------

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export default function MarathonPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  const mainContainer = useRef<HTMLElement>(null);

  const perks = [
    { icon: '🏅', title: 'Finisher Medal', desc: 'First 25 from each category crossing the finish line.', topTag: 'All Runners', tagColor: 'text-amber-300 bg-amber-300/10 border-amber-300/20', border: 'border-t-amber-400' },
    { icon: '💧', title: 'Hydration Stations', desc: 'Water & isotonic electrolyte drinks at every 1 KM checkpoint. Stay fuelled from start to finish.', topTag: 'Route Support', tagColor: 'text-sky-300 bg-sky-300/10 border-sky-300/20', border: 'border-t-sky-400' },
    { icon: '💵', title: 'Cash Prize', desc: 'Winners in each category will be awarded with cash prizes', topTag: 'Prize', tagColor: 'text-violet-300 bg-violet-300/10 border-violet-300/20', border: 'border-t-violet-400' },
    { icon: '👕', title: 'T-Shirt', desc: 'Premium moisture-wicking fabric with ATAL RUN 2026 design. Available in all sizes.', topTag: 'Apparel', tagColor: 'text-emerald-300 bg-emerald-300/10 border-emerald-300/20', border: 'border-t-emerald-400' },
  ];

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-04-26T05:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.hero-anim', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.1 }
    );

    const scrollElements = gsap.utils.toArray('.scroll-anim');
    scrollElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        }
      );
    });
  }, { scope: mainContainer });

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!IS_REGISTRATION_OPEN) {
      alert("Registration is currently closed. Please check back later!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const entry = {
      full_name: (formData.get('fullname') as string) || "",
      email: (formData.get('email') as string) || "",
      age: Number(formData.get('age')) || 0,
      gender: (formData.get('gender') as string) || "Male",
      race_type: "5KM Run",
      shirt_size: (formData.get('shirtsize') as string) || "M",
      illness: (formData.get('illness') as string) || "None",
    };

    if (!entry.email || !entry.full_name) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // Simulate backend processing and successful registration without Supabase and Razorpay
    setTimeout(() => {
      console.log('Processed Registration:', entry);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  }

  return (
    <main ref={mainContainer} className="min-h-screen font-sans overflow-hidden pb-24 md:pb-0 relative selection:bg-amber-400/30 antialiased" style={{ background: '#06090f', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Fonts & Custom CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,900;1,9..40,400&family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap');
        
        .display-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
        .serif-font { font-family: 'DM Serif Display', serif; }
        
        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        
        .gold-shimmer {
          background: linear-gradient(90deg, #d4af37, #fff2aa, #d4af37, #f7e08b);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Polished Form Inputs */
        .input-premium {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          color: white;
          backdrop-filter: blur(12px);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-premium:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.12);
        }
        .input-premium:focus {
          background: rgba(255,255,255,0.04);
          border-color: rgba(201,168,76,0.6);
          outline: none;
          box-shadow: 0 0 0 4px rgba(201,168,76,0.1), inset 0 2px 10px rgba(0,0,0,0.2);
          transform: translateY(-1px);
        }
        .input-premium option {
          background: #0f172a;
          color: white;
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.6);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover { color: #ffffff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
        .nav-link:hover::after { width: 100%; }

        .medal-badge {
          position: absolute;
          top: -1.75rem;
          left: 50%;
          transform: translateX(-50%);
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.25rem;
        }
        
        .perk-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .perk-card:hover { 
          transform: translateY(-8px) scale(1.01); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.03);
          background: rgba(255,255,255,0.035);
        }
        .perk-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.75rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.01));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .section-label {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          color: #c9a84c;
          text-shadow: 0 0 15px rgba(201,168,76,0.3);
        }

        .prize-card {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .prize-card:hover { 
          transform: translateY(-12px) scale(1.02); 
        }
        .prize-card-gold:hover {
          box-shadow: 0 0 80px rgba(201,168,76,0.15), 0 30px 80px rgba(0,0,0,0.7);
        }

        .register-btn {
          background: linear-gradient(135deg, #c9a84c 0%, #f0d060 50%, #c9a84c 100%);
          background-size: 200% 200%;
          transition: all 0.4s ease;
          color: #0a0c12;
        }
        .register-btn:hover {
          background-position: right center;
          box-shadow: 0 10px 40px rgba(201,168,76,0.4), 0 0 0 1px rgba(201,168,76,0.3);
          transform: translateY(-2px);
        }

        .cta-pill {
          background: linear-gradient(135deg, #c9a84c, #e8c96e);
          color: #0a0c12;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(201,168,76,0.2);
        }
        .cta-pill:hover {
          box-shadow: 0 0 35px rgba(201,168,76,0.4);
          transform: scale(1.03) translateY(-1px);
        }

        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(6,9,15,0.7) 0%,
            rgba(6,9,15,0.4) 40%,
            rgba(6,9,15,0.8) 80%,
            #06090f 100%
          );
        }

        .countdown-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(25px);
          box-shadow: inset 0 0 20px rgba(255,255,255,0.01), 0 10px 30px rgba(0,0,0,0.3);
        }

        .footer-contact-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.04);
        }
        .footer-contact-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* PREMIUM TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all" style={{ background: 'rgba(6,9,15,0.75)', backdropFilter: 'blur(40px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between px-4 md:px-12 h-[70px] md:h-[88px] relative">
          
          <div className="w-10 md:w-32"></div>

          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-max group">
            <div className="flex items-center gap-2 md:gap-3 mb-1.5 transition-transform duration-500 group-hover:scale-105">
              <img src="/WhatsApp Image 2026-03-14 at 10.42.19 PM.jpeg" alt="ATAL" className="w-7 h-7 md:w-10 md:h-10 object-contain bg-white rounded-full p-0.5 shadow-lg" style={{ border: '1px solid rgba(201,168,76,0.4)' }} />
              <img src="/Untitled design_20260312_121903_0000.png" alt="Meraki" className="w-7 h-7 md:w-10 md:h-10 object-contain bg-white rounded-full p-0.5 shadow-lg" style={{ border: '1px solid rgba(201,168,76,0.4)' }} />
              <img src="/WhatsApp Image 2026-03-14 at 10.42.20 PM.jpeg" alt="ANIIMS" className="w-7 h-7 md:w-10 md:h-10 object-contain bg-white rounded-full p-0.5 shadow-lg" style={{ border: '1px solid rgba(201,168,76,0.4)' }} />
            </div>
            <span className="gold-shimmer text-[8px] md:text-[10px] font-black uppercase tracking-[0.22em] whitespace-nowrap">
              ATAL MARATHON × Meraki'26
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'ATAL', 'Meraki', 'Perks', 'Prizes', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => item === 'Home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} 
                  className="nav-link"
                >
                  {item}
                </button>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden md:block cta-pill text-xs px-7 py-2.5 rounded-full transition-all"
            >
              Register Now
            </button>

            <button className="md:hidden p-2 rounded-xl transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 shadow-2xl' : 'max-h-0'}`} style={{ background: 'rgba(6,9,15,0.95)', backdropFilter: 'blur(30px)', borderBottom: isMenuOpen ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
          <div className="flex flex-col items-center py-8 gap-7">
            {[
              { label: 'Home', action: () => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
              { label: 'ATAL Foundation', action: () => { setIsMenuOpen(false); document.getElementById('atal')?.scrollIntoView({ behavior: 'smooth' }); } },
              { label: "Meraki'26", action: () => { setIsMenuOpen(false); document.getElementById('meraki')?.scrollIntoView({ behavior: 'smooth' }); } },
              { label: 'Prize Pool', action: () => { setIsMenuOpen(false); document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' }); } },
              { label: 'Contact', action: () => { setIsMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } },
            ].map((item) => (
              <button key={item.label} onClick={item.action} className="text-sm font-semibold tracking-widest uppercase transition-colors" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* PREMIUM HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat mt-16 md:mt-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 hero-overlay z-10" />
        {/* Subtle horizontal scan line */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)' }} />
        
        {/* Subtle glowing orb behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] pointer-events-none z-10 opacity-30" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }}></div>

        <div className="relative z-20 text-center px-4 mt-10 md:mt-0">
          <div className="hero-anim mb-5">
            <span className="section-label" style={{ color: '#c9a84c' }}>April 26, 2026 — Sri Vijaya Puram</span>
          </div>
          <h1 className="hero-anim display-font text-[5rem] md:text-[8.5rem] lg:text-[11rem] leading-none text-white tracking-wide" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 80px rgba(255,255,255,0.1)' }}>
            ATAL MARATHON
          </h1>
          <p className="hero-anim mt-4 text-sm md:text-base font-light tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Meraki'26  ·  Push your limits  ·  Conquer
          </p>

          {mounted && (
            <div className="hero-anim flex justify-center gap-3 md:gap-5 my-14">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds },
              ].map((time, index) => (
                <div key={index} className="countdown-box flex flex-col items-center rounded-[1.25rem] p-4 md:p-6 min-w-[76px] md:min-w-[104px]">
                  <span className="display-font text-4xl md:text-5xl text-white leading-none drop-shadow-md">{time.value.toString().padStart(2, '0')}</span>
                  <span className="section-label mt-2.5 text-[9px] md:text-[10px]" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>{time.label}</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })} className="hero-anim cta-pill inline-block text-sm py-4 px-12 rounded-full transition-all mt-2">
            REGISTER NOW — ₹200
          </button>
        </div>
      </section>

      {/* ATAL SECTION */}
      <section id="atal" className="py-28 relative" style={{ background: '#080c14' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
          <div className="scroll-anim grid grid-cols-2 gap-5">
            <div className="h-64 md:h-80 overflow-hidden rounded-[1.75rem] bg-slate-900" style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <img src="/WhatsApp Image 2026-03-19 at 12.47.04 PM.jpeg" className="w-full h-full object-contain" alt="Foundation Work" />
            </div>
            <div className="h-64 md:h-80 overflow-hidden rounded-[1.75rem] mt-8 bg-slate-900" style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <img src="/WhatsApp Image 2026-03-19 at 12.47.06 PM.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Project Detail" />
            </div>
          </div>
          <div className="scroll-anim space-y-8">
            <div>
              <span className="section-label block mb-3">ATAL Foundation</span>
              <h2 className="display-font text-5xl md:text-6xl text-white leading-tight">About Us</h2>
              <div className="mt-4 w-16 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }}></div>
            </div>
            <ul className="space-y-6">
              {[
                "The Foundations work to uplift unprivileged communities by promoting education, health developments and skill awareness.",
                "It focuses on creating positive social changes through grass route initiatives.",
                "The Organisation also promotes community engagement public awareness campaigns and social responsibilities programmes.",
                "In Andaman and Nicobar Islands the foundation actively organises social initiatives awareness drives and sports activities."
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-5 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors group-hover:bg-amber-400/10" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <span className="text-[10px]" style={{ color: '#c9a84c' }}>✓</span>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MERAKI SECTION */}
      <section id="meraki" className="py-28 relative" style={{ background: '#0a0e1a', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="scroll-anim overflow-hidden rounded-[2rem]" style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            <img src="/WhatsApp Image 2026-03-14 at 10.30.23 PM.jpeg" className="w-full h-auto block object-cover hover:scale-105 transition-transform duration-700" alt="Foundation Work" />
          </div>
          <div className="scroll-anim space-y-8">
            <div>
              <span className="section-label block mb-3">MERAKI'26</span>
              <h2 className="display-font text-5xl md:text-6xl text-white leading-tight">ANIIMS</h2>
              <div className="mt-4 w-16 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }}></div>
            </div>
            <ul className="space-y-6">
              {[
                "Some glimpse from our prestigious gallery — MERAKI",
                "The Andaman & Nicobar Islands Institute of Medical Sciences (ANIIMS) is a premier, 100% government-funded medical college located in Sri Vijayapuram. Established in 2015, it serves as the only medical college for the entire Union Territory.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-5 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors group-hover:bg-amber-400/10" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <span className="text-[10px]" style={{ color: '#c9a84c' }}>✓</span>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <a href="https://www.instagram.com/meraki_aniims?igsh=MXVlc2ZkazZwa3cwOQ==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-semibold py-3.5 px-8 rounded-full text-sm transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #e91e8c, #8b31c7, #4657c7)', boxShadow: '0 8px 25px rgba(139,49,199,0.3)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Follow Meraki'26
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* PREMIUM PERKS SECTION */}
      <section id="perks" className="py-28 relative noise-bg" style={{ background: '#050810', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        
        <div className="max-w-6xl mx-auto px-6 pb-16 text-center scroll-anim relative z-10">
          <span className="section-label block mb-4">Included With Every Bib</span>
          <h2 className="display-font text-5xl md:text-6xl text-white mb-5">What You Get</h2>
          <p className="text-base font-light max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every runner deserves the full experience. Here's what's included when you register.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {perks.map((perk, index) => (
            <div key={index} className={`scroll-anim perk-card rounded-[1.75rem] p-8 border-t-[3px] ${perk.border}`} style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex justify-between items-start mb-8">
                <div className="text-2xl w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.02)' }}>
                  {perk.icon}
                </div>
                <span className={`text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-full border ${perk.tagColor}`}>
                  {perk.topTag}
                </span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3 tracking-tight">{perk.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM PRIZES SECTION */}
      <section id="prizes" className="py-32 relative overflow-hidden" style={{ background: '#040710', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)' }}></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center scroll-anim">
          <span className="section-label block mb-4">Equal Prizes · Men & Women</span>
          <h2 className="display-font text-5xl md:text-6xl text-white mb-5">Prize Pool</h2>
          <p className="text-base font-light max-w-xl mx-auto mb-24" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Push your limits and claim your victory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
            
            {/* Silver (2nd) */}
            <div className="scroll-anim prize-card order-2 md:order-1 rounded-[2rem] p-8 pt-14 relative md:-translate-y-6" style={{ background: 'linear-gradient(160deg, rgba(148,163,184,0.08) 0%, rgba(15,23,42,0.6) 100%)', border: '1px solid rgba(148,163,184,0.15)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div className="medal-badge" style={{ background: 'linear-gradient(135deg, #94a3b8, #e2e8f0)', color: '#0f172a', boxShadow: '0 8px 20px rgba(148,163,184,0.3)', border: '2px solid #040710' }}>2</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Runner Up</h3>
              <div className="display-font text-5xl text-white mb-7 tracking-wide drop-shadow-sm">₹10,000</div>
              <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(148,163,184,0.15)', color: '#94a3b8' }}>✓</span>
                  Silver Medal
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(148,163,184,0.15)', color: '#94a3b8' }}>✓</span>
                  Official Trophy
                </li>
              </ul>
            </div>

            {/* Gold (1st) */}
            <div className="scroll-anim prize-card prize-card-gold order-1 md:order-2 rounded-[2.5rem] p-10 pt-16 relative z-10 scale-[1.03]" style={{ background: 'linear-gradient(160deg, rgba(201,168,76,0.15) 0%, rgba(6,9,15,0.95) 100%)', border: '1px solid rgba(201,168,76,0.3)', backdropFilter: 'blur(20px)', boxShadow: '0 0 60px rgba(201,168,76,0.1), 0 30px 80px rgba(0,0,0,0.6)' }}>
              <div className="medal-badge" style={{ background: 'linear-gradient(135deg, #d4af37, #f7e08b)', color: '#0a0c12', boxShadow: '0 12px 30px rgba(201,168,76,0.4)', border: '3px solid #040710', top: '-1.85rem' }}>1</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#d4af37' }}>Champion</h3>
              <div className="display-font text-6xl text-white mb-8 tracking-wide drop-shadow-md">₹15,000</div>
              <ul className="space-y-3 text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <li className="flex items-center justify-center gap-3">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>✓</span>
                  Gold Medal
                </li>
                <li className="flex items-center justify-center gap-3">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>✓</span>
                  Championship Trophy
                </li>
                <li className="flex items-center justify-center gap-3">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>✓</span>
                  Champion Certificate
                </li>
              </ul>
            </div>

            {/* Bronze (3rd) */}
            <div className="scroll-anim prize-card order-3 rounded-[2rem] p-8 pt-14 relative md:-translate-y-6" style={{ background: 'linear-gradient(160deg, rgba(180,83,9,0.08) 0%, rgba(15,23,42,0.6) 100%)', border: '1px solid rgba(180,83,9,0.15)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div className="medal-badge" style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)', color: '#fef3c7', boxShadow: '0 8px 20px rgba(180,83,9,0.3)', border: '2px solid #040710' }}>3</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#f59e0b' }}>2nd Runner Up</h3>
              <div className="display-font text-5xl text-white mb-7 tracking-wide drop-shadow-sm">₹5,000</div>
              <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(180,83,9,0.15)', color: '#d97706' }}>✓</span>
                  Bronze Medal
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(180,83,9,0.15)', color: '#d97706' }}>✓</span>
                  Official Trophy
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 inline-flex items-center gap-4 scroll-anim" style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 3rem', borderRadius: '100px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <span className="text-3xl drop-shadow-lg">🏆</span>
            <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Medals for the first <span className="text-white font-bold tracking-wide">25 performers</span> in each category
            </p>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-24 relative" style={{ background: '#06090f', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="scroll-anim section-label block mb-4">Race Route</span>
          <h2 className="scroll-anim display-font text-5xl md:text-6xl text-white mb-4">The Starting Line</h2>
          <p className="scroll-anim text-base font-light mb-12" style={{ color: 'rgba(255,255,255,0.5)' }}>
            A glorious 5KM from Cellular Jail to Marina Park via Nescafe.
          </p>
          <div className="scroll-anim w-full h-[450px] overflow-hidden" style={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            <iframe 
  src="https://maps.google.com/maps?saddr=11.6747447,92.7478601&daddr=11.6588986,92.7541905+to:11.6697857,92.7460738&t=m&z=14&output=embed" 
  width="100%" 
  height="100%" 
  style={{ border: 0, filter: 'contrast(1.1) opacity(0.95)' }} 
  allowFullScreen 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
          </div>
        </div>
      </section>

      {/* PREMIUM REGISTRATION FORM SECTION */}
      <section id="register-form" className="py-32 px-6 relative" style={{ background: '#05070c' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        
        <div className="max-w-6xl mx-auto scroll-anim grid grid-cols-1 lg:grid-cols-5 gap-3 relative z-10" style={{ background: 'rgba(255,255,255,0.015)', backdropFilter: 'blur(40px)', padding: '12px', borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
          
          {/* Left Panel */}
          <div className="lg:col-span-2 rounded-[2rem] p-10 md:p-12 text-white relative overflow-hidden flex flex-col justify-center" style={{ background: 'linear-gradient(155deg, #0a0f1c 0%, #05070c 100%)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" style={{ background: 'rgba(201,168,76,0.08)' }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] -ml-10 -mb-10 pointer-events-none" style={{ background: 'rgba(99,102,241,0.06)' }}></div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2.5 rounded-full inline-block mb-8" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: '#d4af37', boxShadow: '0 4px 20px rgba(201,168,76,0.1)' }}>Official Entry</span>
              <h3 className="display-font text-5xl md:text-7xl mt-0 mb-3 text-white leading-none tracking-wide drop-shadow-md">5KM Run</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="display-font text-5xl text-white">₹200</span>
                <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>/ runner</span>
              </div>
              
              <div className="space-y-7" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2.5rem' }}>
                {[
                  { label: 'Date', value: 'Sunday, April 26, 2026' },
                  { label: 'Time', value: 'Report: 5:00 AM · Flag-off: 5:30 AM' },
                  { label: 'Route', value: 'Cellular Jail → Marina Park via Nescafe' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="section-label mb-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.label}</p>
                    <p className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.value}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <button onClick={() => document.getElementById('perks')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left group flex items-center justify-between p-5 rounded-2xl transition-all hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">See What You Get</p>
                      <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>Medals, T-Shirts & Goodies</p>
                    </div>
                    <span className="text-lg group-hover:translate-x-1.5 transition-transform duration-300" style={{ color: '#d4af37' }}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel (Form) */}
          <div className="lg:col-span-3 p-8 md:p-14 relative z-10">
            {isSubmitted ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981', boxShadow: '0 8px 40px rgba(16,185,129,0.15)' }}>✓</div>
                <h2 className="display-font text-5xl text-white mb-4">You're In!</h2>
                <p className="text-base font-light mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>Your registration is confirmed. See you at the starting line.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-sm font-semibold transition-colors px-6 py-3 rounded-full hover:bg-amber-400/10" style={{ color: '#d4af37', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>← Register another runner</button>
              </div>
            ) : (
              <div>
                <h2 className="display-font text-4xl md:text-5xl text-white mb-2 drop-shadow-sm">Secure Your Spot</h2>
                <p className="text-sm font-light mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>Fill out the details below to officially register.</p>
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Full Name</label>
                    <input name="fullname" type="text" required className="input-premium font-medium w-full p-4 rounded-2xl" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Email Address</label>
                    <input name="email" type="email" required className="input-premium font-medium w-full p-4 rounded-2xl" placeholder="you@example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Age</label>
                      <input name="age" type="number" min="16" max="100" required className="input-premium font-medium w-full p-4 rounded-2xl" placeholder="e.g. 20" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Gender</label>
                      <select name="gender" required defaultValue="" className="input-premium font-medium w-full p-4 rounded-2xl">
                        <option value="" disabled>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-2 col-span-2 md:col-span-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>T-Shirt Size</label>
                      <select name="shirtsize" required defaultValue="" className="input-premium font-medium w-full p-4 rounded-2xl">
                        <option value="" disabled>Select your size</option>
                        <option value="S">S (36")</option>
                        <option value="M">M (38")</option>
                        <option value="L">L (40")</option>
                        <option value="XL">XL (42")</option>
                        <option value="XXL">XXL (44")</option>
                      </select>
                    </div>
                    {/* NEW MEDICAL FIELD */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Medical Conditions / Illness (If any)
                    </label>
                    <input 
                      name="illness" 
                      type="text" 
                      className="input-premium font-medium w-full p-4 rounded-2xl" 
                      placeholder="e.g. Asthma, Diabetes, or 'None'" 
                    />
                  </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Race Distance</label>
                    <input name="race" type="text" value="5KM Run" readOnly className="w-full p-4 rounded-2xl font-semibold cursor-not-allowed" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)' }} />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading || !IS_REGISTRATION_OPEN} 
                    className={`w-full font-bold tracking-[0.15em] text-sm uppercase mt-6 py-5 rounded-2xl transition-all ${
                      (isLoading || !IS_REGISTRATION_OPEN) 
                        ? 'cursor-not-allowed' 
                        : 'register-btn'
                    }`}
                    style={(isLoading || !IS_REGISTRATION_OPEN) ? { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.05)' } : {}}
                  >
                    {isLoading ? 'Processing...' : IS_REGISTRATION_OPEN ? 'Pay & Register — ₹200' : 'Registration Closed'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer id="contact" className="py-20 px-6" style={{ background: '#030408', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <p className="display-font text-2xl text-white mb-4 leading-tight">ATAL MARATHON <br/> <span style={{ color: 'rgba(255,255,255,0.3)' }}>× MERAKI'26</span></p>
            <div className="w-10 h-0.5 mb-5 rounded-full" style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }}></div>
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Push your limits. Represent your college. Join us for the most anticipated 5KM event of the year.</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <a href="https://instagram.com/atal.foundation.ani" target="_blank" rel="noopener noreferrer" className="footer-contact-card flex flex-col items-center md:items-start p-8 rounded-[1.75rem]" style={{ background: 'rgba(255,255,255,0.015)' }}>
              <span className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 text-pink-400" style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </span>
              <span className="text-white font-semibold text-sm mb-1">Instagram</span>
              <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>Follow ATAL</span>
            </a>
            <a href="mailto:Atalfoundationandaman@gmail.com?subject=Question%20about%20ATALRUN%202026" className="footer-contact-card flex flex-col items-center md:items-start p-8 rounded-[1.75rem]" style={{ background: 'rgba(255,255,255,0.015)' }}>
              <span className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 text-sky-400 text-xl" style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}>✉️</span>
              <span className="text-white font-semibold text-sm mb-1">Email Us</span>
              <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>Atalfoundationandaman<br className="hidden md:block"/>@gmail.com</span>
            </a>
            <a href="tel:+917001591773" className="footer-contact-card flex flex-col items-center md:items-start p-8 rounded-[1.75rem]" style={{ background: 'rgba(255,255,255,0.015)' }}>
              <span className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 text-emerald-400 text-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>📞</span>
              <span className="text-white font-semibold text-sm mb-1">Call Co-Ordinator</span>
              <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>+917001591773</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits Section */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-light tracking-wider text-white/30 text-center md:text-left">
              © 2026 MERAKI × ATAL Foundation. All rights reserved.
            </p>
            
            {/* DEVELOPER CREDIT */}
            <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 flex items-center gap-2">
              <span>Designed & Developed by</span>
              <a 
                href="https://github.com/Ashiiiit" // Optional: Link to your GitHub or Portfolio
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#c9a84c] transition-colors duration-300 font-bold"
              >
                ASHIT
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 pb-safe" style={{ background: 'rgba(6,9,15,0.95)', backdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
        <div className="flex justify-around items-center h-16 px-2 relative">
          
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center justify-center w-1/5 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span className="text-[8px] font-bold uppercase tracking-wider">Home</span>
          </button>

          <button onClick={() => document.getElementById('atal')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center justify-center w-1/5 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V16a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-4a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="text-[8px] font-bold uppercase tracking-wider">ATAL</span>
          </button>

          <div className="w-1/5 flex justify-center relative">
            <button 
              onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })} 
              className="absolute -top-8 flex flex-col items-center justify-center w-[58px] h-[58px] rounded-[1.2rem] transition-transform hover:scale-105 rotate-45"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d060)', color: '#0a0c12', boxShadow: '0 10px 25px rgba(201,168,76,0.4)', border: '3px solid #06090f' }}
            >
              <div className="-rotate-45 flex flex-col items-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                <span className="text-[7px] font-black uppercase mt-0.5 tracking-wider">Pay</span>
              </div>
            </button>
          </div>

          <button onClick={() => document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center justify-center w-1/5 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
            <span className="text-[8px] font-bold uppercase tracking-wider">Prizes</span>
          </button>

          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center justify-center w-1/5 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span className="text-[8px] font-bold uppercase tracking-wider">Contact</span>
          </button>
          
        </div>
      </nav>

    </main>
  );
}
