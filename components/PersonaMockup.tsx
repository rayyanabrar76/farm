"use client";
import { Leaf, Search, TrendingUp, TrendingDown, Bell, Calendar, Check } from "lucide-react";

/* Animated phone app-mockups, one per persona. Pure CSS motion (keyframes
   live in globals.css, prefixed mk*) so they loop forever without timers.
   `prefers-reduced-motion` freezes them via a media query in globals.css. */

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="persona-phone relative" style={{ width: 226, animation: "mkFloat 6s ease-in-out infinite" }}>
      <div className="relative rounded-[2.1rem] p-[6px] shadow-2xl" style={{ background: "#0b1f10" }}>
        {/* notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />
        <div className="relative bg-white rounded-[1.7rem] overflow-hidden" style={{ height: 410 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-9 flex items-end justify-between px-4 pb-1.5">
      <span className="text-[10px] font-bold text-gray-900">9:41</span>
      <span className="text-[9px] text-gray-500 tracking-tight">▦ ▮ 100%</span>
    </div>
  );
}

/* ── GROWER — farm task + plot scan ── */
function GrowerScreen() {
  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-4 pb-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "#1A5514" }}>
            <Leaf size={13} className="text-white" />
          </span>
          <span className="text-[12px] font-black text-gray-900">Agrolync</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <span className="w-6 h-6 rounded-full bg-primary-100 text-[9px] font-black text-primary-700 flex items-center justify-center">J</span>
      </div>

      <div className="px-4 pt-3">
        <p className="text-[13px] font-black text-gray-900 leading-tight">Review land task</p>
        <p className="text-[9px] text-gray-400 mt-0.5">‹ Back to my farm</p>

        {/* plot map with scan line */}
        <div className="relative mt-3 rounded-xl overflow-hidden h-30" style={{ height: 120, background: "linear-gradient(135deg,#2f4a2a,#1f3a1c)" }}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#ffffff22 1px,transparent 1px),linear-gradient(90deg,#ffffff22 1px,transparent 1px)", backgroundSize: "16px 16px" }} />
          <div className="absolute inset-3 rounded-md border-2 border-dashed border-white/60" />
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "#1A5514cc" }}>
            <Check size={8} /> Completed
          </span>
          <span className="absolute bottom-2 right-2 text-[8px] font-bold text-white/90 bg-black/40 px-1.5 py-0.5 rounded">P-01</span>
          {/* moving scan line */}
          <div className="absolute left-0 right-0 h-px" style={{ background: "rgba(124,255,150,0.9)", boxShadow: "0 0 8px rgba(124,255,150,0.9)", animation: "mkScan 3.2s ease-in-out infinite" }} />
        </div>

        {/* progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span className="font-bold text-gray-700">Land preparation</span>
            <span className="font-black text-primary-600">82%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#1A5514,#4CAF72)", animation: "mkFill 3.5s ease-in-out infinite" }} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 p-2 rounded-xl bg-gray-50">
          <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center"><Calendar size={13} className="text-primary-600" /></span>
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-gray-900">Next: Planting</p>
            <p className="text-[8px] text-gray-400">Scheduled in 3 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── BUYER — live prices + sweep ── */
function BuyerScreen() {
  const rows = [
    { name: "Tumatir", price: "$3.80", w: "82%", up: true },
    { name: "Ji Ocha", price: "$4.50", w: "68%", up: true },
    { name: "Masara", price: "$1.70", w: "44%", up: false },
    { name: "Wake", price: "$5.20", w: "90%", up: true },
  ];
  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-4 pb-2 flex items-center justify-between border-b border-gray-100">
        <span className="text-[12px] font-black text-gray-900">Source produce</span>
        <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center"><Search size={12} className="text-gray-500" /></span>
      </div>

      <div className="px-4 pt-3 flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Live prices</p>
        </div>

        {/* rows + moving highlight */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-[38px] rounded-lg pointer-events-none" style={{ background: "rgba(15,162,149,0.10)", animation: "mkSweep 4s ease-in-out infinite" }} />
          {rows.map((r, i) => (
            <div key={r.name} className="relative flex items-center gap-2 h-[38px]">
              <span className="text-[10px] font-bold text-gray-700 w-12 shrink-0">{r.name}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: r.w, background: r.up ? "#0FA295" : "#E0A100", animation: `mkFill ${3 + i * 0.4}s ease-in-out infinite` }} />
              </div>
              <span className="text-[10px] font-black text-gray-900 w-9 text-right">{r.price}</span>
              <span style={{ animation: "mkBlink 1.6s ease-in-out infinite" }}>
                {r.up ? <TrendingUp size={11} className="text-emerald-500" /> : <TrendingDown size={11} className="text-amber-500" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full py-2.5 rounded-xl text-center text-[11px] font-black text-white" style={{ background: "#0FA295" }}>
          Request produce
        </div>
      </div>
    </div>
  );
}

/* ── VENDOR — storefront sales + incoming order ── */
function VendorScreen() {
  const bars = [40, 62, 50, 80, 68, 95];
  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-4 pb-2 flex items-center justify-between border-b border-gray-100">
        <span className="text-[12px] font-black text-gray-900">Storefront</span>
        <span className="relative w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
          <Bell size={12} className="text-gray-500" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        </span>
      </div>

      <div className="relative px-4 pt-3 flex-1">
        {/* incoming order toast */}
        <div className="absolute left-4 right-4 top-2 z-10 flex items-center gap-2 p-2 rounded-xl shadow-lg bg-white border border-gray-100"
          style={{ animation: "mkToast 4.5s ease-in-out infinite" }}>
          <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#FFF4D6" }}><Check size={12} style={{ color: "#9A6A00" }} /></span>
          <div className="leading-tight">
            <p className="text-[10px] font-black text-gray-900">New order · $640</p>
            <p className="text-[8px] text-gray-400">Maize seedlings · 4 units</p>
          </div>
        </div>

        <div className="mt-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Today&apos;s sales</p>
          <p className="text-[22px] font-black text-gray-900 leading-none mt-1">$1,820</p>
          <p className="text-[9px] text-gray-400 mt-1">14 orders · 6 vendors</p>
        </div>

        {/* bar chart */}
        <div className="mt-4 flex items-end justify-between gap-1.5 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md"
              style={{ height: `${h}%`, transformOrigin: "bottom", background: "linear-gradient(180deg,#F5A623,#E0900A)", animation: `mkGrow ${2.2 + i * 0.2}s ease-in-out infinite` }} />
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full py-2.5 rounded-xl text-center text-[11px] font-black" style={{ background: "#F5A623", color: "#3A2A00" }}>
          Add a product
        </div>
      </div>
    </div>
  );
}

export default function PersonaMockup({ variant }: { variant: string }) {
  return (
    <Phone>
      {variant === "buyer" ? <BuyerScreen /> : variant === "vendor" ? <VendorScreen /> : <GrowerScreen />}
    </Phone>
  );
}
