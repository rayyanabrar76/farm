import Link from "next/link";
import { ArrowRight, Wheat, Sparkles, CheckCircle } from "lucide-react";

const TRUST = ["Free to join", "Verified network", "Buyers in 8+ countries", "No middlemen"];

export default function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {/* Farm background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1800&h=900&fit=crop&auto=format&q=88"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,18,5,0.94) 0%, rgba(26,85,20,0.90) 100%)" }} />
      {/* Texture + depth glows */}
      <div className="hero-pattern absolute inset-0 opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 65%)",
      }} />
      <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(76,175,114,0.20) 0%, transparent 65%)",
      }} />
      {/* Gold hairline accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.7), transparent)",
      }} />

      {/* Premium glass card */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div
          className="rounded-[1.75rem] sm:rounded-4xl border border-white/15 px-6 sm:px-12 py-12 sm:py-16 text-center"
          style={{
            background: "rgba(7,20,8,0.42)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 40px 90px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] mb-6 border"
            style={{ color: "#FFD17A", background: "rgba(245,166,35,0.10)", borderColor: "rgba(245,166,35,0.30)" }}
          >
            <Sparkles size={13} /> Join the Movement
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.03] tracking-tight">
            Transform How Africa<br />
            Trades Its <span className="gradient-text">Harvest</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg mt-5 mb-9 max-w-xl mx-auto leading-relaxed">
            Join 12,400+ farmers and 3,200+ verified buyers connecting Africa&apos;s
            harvest to global markets on Agrolync.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-gray-900 text-base transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg,#FFD17A,#F5A623)", boxShadow: "0 10px 30px rgba(245,166,35,0.45)" }}
            >
              <Wheat size={18} /> Join as a Farmer
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:-translate-y-1 hover:bg-white/15"
              style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)" }}
            >
              Start Sourcing <ArrowRight size={16} />
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-xs font-semibold text-white/45">
            {TRUST.map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckCircle size={12} className="shrink-0" style={{ color: "#4CAF72" }} /> {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
