import { Leaf, Globe } from "lucide-react";
import CountUp from "@/components/CountUp";

const STATS = [
  { num: "12,400+", label: "farmers across Africa" },
  { num: "8",       label: "countries market presence" },
  { num: "3,200+",  label: "global agro-buyers" },
  { num: "12+",     label: "crops cultivated for export" },
  { num: "$180M+",  label: "produce traded" },
];

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-4">
      {/* Farm background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&h=1100&fit=crop&auto=format&q=85"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Light overlay — opaque on the left for cards, clears to reveal the farm on the right */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(100deg, rgba(244,248,242,0.97) 0%, rgba(244,248,242,0.92) 42%, rgba(244,248,242,0.50) 64%, rgba(244,248,242,0.04) 84%)",
      }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-xl mb-10 sm:mb-12">
          <p className="text-[11px] font-black tracking-[0.25em] text-primary-600 uppercase mb-3">Our impact</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            Aggregating Africa&apos;s harvest at scale
          </h2>
        </div>

        {/* Staggered stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-3xl">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 sm:p-7 shadow-card"
              style={{ marginTop: `${(i % 3) * 0.9}rem` }}
            >
              {/* Leaf watermark */}
              <Leaf size={88} strokeWidth={1.3} className="absolute -right-3 -bottom-4 text-primary-100" />
              <CountUp value={s.num} className="relative block text-3xl sm:text-4xl font-black tabular-nums" style={{ color: "#1A8A3A" }} />
              <p className="relative text-sm text-gray-500 mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating decorative markers (right) — leaf + globe */}
      <div className="hidden lg:flex flex-col items-center absolute top-[18%] right-[13%] pointer-events-none">
        <div className="w-13 h-13 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-lg">
          <Leaf size={22} className="text-white" />
        </div>
        <div className="w-px h-24 bg-white/45" />
      </div>
      <div className="hidden lg:flex flex-col items-center absolute bottom-[16%] right-[6%] pointer-events-none">
        <div className="w-px h-24 bg-white/45" />
        <div className="w-13 h-13 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-lg">
          <Globe size={22} className="text-white" />
        </div>
      </div>
    </section>
  );
}
