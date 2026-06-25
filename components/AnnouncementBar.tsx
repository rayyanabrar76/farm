"use client";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

const ANNOUNCEMENTS = [
  "🌱 Agrolync is live — 12,400+ verified farmers across Nigeria.",
  "🚀 New: Escrow-protected payments — get paid on delivery, every time.",
  "📊 Track real-time prices from Dawanau, Onitsha & 40+ markets.",
  "✅ Join free today — no hidden fees, no middlemen.",
  "🌍 Connecting farmers to buyers across all 36 Nigerian states.",
];

export default function AnnouncementBar() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  const text = ANNOUNCEMENTS.join("     ·     ");

  return (
    <div
      className="relative flex items-center overflow-hidden text-white text-xs font-semibold w-full"
      style={{ height: 36 }}
      style={{ background: "linear-gradient(90deg, #1B5E28 0%, #2D7A3A 50%, #1B5E28 100%)" }}
    >

      {/* Scrolling text */}
      <div className="ticker-wrap flex-1 h-full flex items-center overflow-hidden">
        <div
          className="ticker-inner inline-flex items-center whitespace-nowrap gap-0"
          style={{ animation: "ticker 28s linear infinite", color: "rgba(255,255,255,0.92)" }}
        >
          {[0, 1].map((ri) => (
            <span key={ri} className="inline-flex items-center">
              <span>{text}</span>
              <Link
                href="/register"
                className="inline-flex items-center mx-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-white/30 hover:bg-white/20 transition-colors whitespace-nowrap"
                style={{ color: "#a3d9a5" }}
                onClick={e => e.stopPropagation()}
              >
                Join free →
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setClosed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-60 hover:opacity-100 transition-opacity shrink-0"
        aria-label="Close"
      >
        <X size={14} />
      </button>
    </div>
  );
}
