import Link from "next/link";
import { ArrowRight, Wheat, CheckCircle } from "lucide-react";
import HeroShowcase from "@/components/HeroShowcase";

const TRUST = ["Free to join", "Verified farmers only", "Request-based sourcing", "Buyers in 8+ countries"];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8F2 55%, #F9F6F0 100%)" }}>
      {/* Decorative ambient glows */}
      <div className="absolute -top-32 -right-24 w-136 h-136 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(76,175,114,0.14) 0%, transparent 65%)",
      }} />
      <div className="absolute -bottom-40 -left-24 w-136 h-136 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 65%)",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT — copy */}
          <div className="max-w-xl" style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-bold tracking-[0.16em] uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse shrink-0" />
              Africa&apos;s Agro Aggregation Platform
            </div>

            <h1 className="font-black tracking-tight leading-[0.95] text-gray-900 text-[2.7rem] xs:text-5xl sm:text-6xl lg:text-[4.2rem]">
              Where Harvest<br />
              <span style={{ color: "#1A5514" }}>Meets Market.</span>
            </h1>

            <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mt-6 max-w-lg">
              Agrolync links farmers and vendors to buyers worldwide on one
              trusted network — fair prices, verified trade, delivered end to end.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#1A5514,#2D7A3A)", boxShadow: "0 8px 26px rgba(26,85,20,0.32)" }}
              >
                <Wheat size={18} /> List Your Harvest
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-gray-800 text-base bg-white border border-gray-200 transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
              >
                Start Sourcing <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-gray-400 mt-9">
              {TRUST.map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-primary-500 shrink-0" /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — editorial farmer showcase */}
          <div className="relative">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
