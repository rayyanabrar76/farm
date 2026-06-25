"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Wheat, ShoppingCart, TrendingUp } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "Harvest Season is Open",
    headline: ["FROM FARM", "TO MARKET,", "DIRECT."],
    accentLine: 1,
    sub: "Connect with 12,400+ verified Nigerian farmers. No middlemen, no markups — straight from the source.",
    cta: { label: "Browse Fresh Produce", href: "/marketplace" },
    cta2: { label: "Start Selling", href: "/register" },
    ctaIcon: ShoppingCart,
    accent: "#F5A623",
    img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1600&h=900&fit=crop&auto=format&q=85",
  },
  {
    eyebrow: "Live Market Intelligence",
    headline: ["REAL-TIME", "PRICES.", "FAIR PAY."],
    accentLine: 2,
    sub: "Track live commodity prices from Dawanau, Onitsha, Terminus and 40+ markets across Nigeria — updated every minute.",
    cta: { label: "View Price Tracker", href: "/marketplace" },
    cta2: { label: "Join Free", href: "/register" },
    ctaIcon: TrendingUp,
    accent: "#4CAF72",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop&auto=format&q=85",
  },
  {
    eyebrow: "Secure. Fast. Trusted.",
    headline: ["EARN MORE.", "WASTE LESS.", "GROW."],
    accentLine: 0,
    sub: "Escrow-protected payments. 67% average income increase. Join 12,000+ farmers already earning more with Agrolync.",
    cta: { label: "Start Selling Today", href: "/register" },
    cta2: { label: "Browse Market", href: "/marketplace" },
    ctaIcon: Wheat,
    accent: "#FFB84D",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=900&fit=crop&auto=format&q=85",
  },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);

  const go = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setCur(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(cur + 1), 6500);
    return () => clearInterval(id);
  }, [cur, go]);

  const s = SLIDES[cur];
  const Icon = s.ctaIcon;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(600px, 80vh, 760px)" }}>

      {/* ── Full-screen background image ── */}
      <div
        key={cur}
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <img
          src={s.img}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>

      {/* ── Dark overlay for text readability ── */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.30) 100%)" }} />

      {/* ── Hero pattern over overlay ── */}
      <div className="hero-pattern absolute inset-0 opacity-20 pointer-events-none" />

      {/* ── Accent color glow at bottom ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${s.accent}18, transparent)` }} />

      {/* ── Content ── */}
      <div
        className="relative z-10 h-full flex items-center pt-16"
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 w-full py-20">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: s.accent }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ background: s.accent }} />
            </span>
            <p className="text-xs sm:text-sm font-black tracking-[0.22em] uppercase"
              style={{ color: s.accent }}>
              {s.eyebrow}
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-black text-white leading-none tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)" }}>
            {s.headline.map((line, i) => (
              <span key={i} className="block"
                style={i === s.accentLine ? { color: s.accent } : {}}>
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-10">
            {s.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link href={s.cta.href}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-gray-900 text-sm sm:text-base transition-all hover:-translate-y-0.5 hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                boxShadow: `0 6px 24px ${s.accent}55`,
              }}>
              <Icon size={17} />
              {s.cta.label}
            </Link>
            <Link href={s.cta2.href}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-sm sm:text-base transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
              {s.cta2.label}
            </Link>
          </div>

          {/* Slide counter */}
          <p className="mt-10 sm:mt-12 text-white/25 text-xs font-mono tracking-[0.2em]">
            0{cur + 1} &nbsp;/&nbsp; 0{SLIDES.length}
          </p>
        </div>
      </div>

      {/* ── Left arrow ── */}
      <button onClick={() => go(cur - 1)} aria-label="Previous"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <ChevronLeft size={22} />
      </button>

      {/* ── Right arrow ── */}
      <button onClick={() => go(cur + 1)} aria-label="Next"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <ChevronRight size={22} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === cur ? 28 : 8,
              height: 8,
              background: i === cur ? s.accent : "rgba(255,255,255,0.35)",
            }} />
        ))}
      </div>
    </section>
  );
}
