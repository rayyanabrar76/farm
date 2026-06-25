"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Wheat, ShoppingCart, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const SLIDES = [
  {
    eyebrow: "Harvest Season is Open",
    headline: ["FROM FARM TO", "MARKET,", "WITHOUT THE\nMIDDLEMEN."],
    accentLine: 1,
    cta: { label: "Browse Fresh Produce", href: "/marketplace" },
    ctaIcon: ShoppingCart,
    img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&h=600&fit=crop&auto=format&q=80",
    imgAlt: "Nigerian farmer harvesting produce",
    accent: "#F5A623",
    bg: "linear-gradient(120deg, #071809 0%, #0E3317 60%, #1a4a20 100%)",
  },
  {
    eyebrow: "Live Market Intelligence",
    headline: ["REAL-TIME PRICES.", "FAIR PAY.", "ZERO\nMIDDLEMEN."],
    accentLine: 1,
    cta: { label: "View Price Tracker", href: "/marketplace" },
    ctaIcon: TrendingUp,
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop&auto=format&q=80",
    imgAlt: "African farmland at sunrise",
    accent: "#4CAF72",
    bg: "linear-gradient(120deg, #071809 0%, #102c18 60%, #1a4a20 100%)",
  },
  {
    eyebrow: "Secure. Fast. Trusted.",
    headline: ["EARN MORE.", "WASTE LESS.", "GROW WITH\nAGROLYNC."],
    accentLine: 2,
    cta: { label: "Start Selling Today", href: "/register" },
    ctaIcon: Wheat,
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop&auto=format&q=80",
    imgAlt: "Fresh vegetables at Nigerian market",
    accent: "#FFB84D",
    bg: "linear-gradient(120deg, #071809 0%, #1B5E28 60%, #256030 100%)",
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
    }, 280);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(cur + 1), 6500);
    return () => clearInterval(id);
  }, [cur, go]);

  const s = SLIDES[cur];
  const Icon = s.ctaIcon;

  return (
    <div className="relative w-full overflow-hidden pt-16" style={{ background: s.bg, transition: "background 0.6s ease" }}>
      {/* Three.js ambient canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* ── Content wrapper ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto flex items-stretch"
        style={{
          minHeight: "clamp(320px, 60vw, 480px)",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.28s ease",
        }}
      >
        {/* LEFT — Large hero image (Arena Club style: image fills left, no card) */}
        <div className="relative hidden sm:block w-[38%] shrink-0 self-stretch">
          {/* Glow behind image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${s.accent}28 0%, transparent 70%)` }}
          />
          <img
            src={s.img}
            alt={s.imgAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.88) saturate(1.1)" }}
          />
          {/* Right-side fade so image blends into text area */}
          <div
            className="absolute inset-y-0 right-0 w-24 pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, ${s.bg.split(",")[1]?.trim().split(" ")[0] ?? "#071809"})` }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(7,24,9,0.7), transparent)" }}
          />
        </div>

        {/* RIGHT — Text content */}
        <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 md:px-12 py-10 sm:py-14">
          {/* Eyebrow */}
          <p
            className="text-xs font-black tracking-[0.22em] uppercase mb-5"
            style={{ color: s.accent }}
          >
            {s.eyebrow}
          </p>

          {/* Headline */}
          <h1 className="font-black text-white leading-none tracking-tight mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {s.headline.map((line, i) => (
              <span
                key={i}
                className="block"
                style={i === s.accentLine ? { color: s.accent } : {}}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={s.cta.href}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-gray-900 text-sm transition-all hover:-translate-y-0.5 hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${s.accent}, ${s.accent}bb)`,
                boxShadow: `0 4px 18px ${s.accent}44`,
              }}
            >
              <Icon size={16} />
              {s.cta.label}
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm border transition-all hover:bg-white/12"
              style={{ border: "1.5px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)" }}
            >
              Get Started Free
            </Link>
          </div>

          {/* Slide counter */}
          <p className="mt-8 text-white/25 text-xs font-mono tracking-widest">
            0{cur + 1} / 0{SLIDES.length}
          </p>
        </div>
      </div>

      {/* ── Left arrow ── */}
      <button
        onClick={() => go(cur - 1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* ── Right arrow ── */}
      <button
        onClick={() => go(cur + 1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === cur ? 24 : 7,
              height: 7,
              background: i === cur ? s.accent : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
