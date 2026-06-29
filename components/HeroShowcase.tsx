"use client";
import { useRef, useState, useCallback } from "react";
import HeroDualPhones from "./HeroDualPhones";

/* ─────────────────────────────────────────────────────────────
   Hero visual — a live, animated Agrolync "Trade Desk" dashboard
   floating in a parallax stage, framed by drifting glow blobs and a
   soft halo that react to the cursor.
   ───────────────────────────────────────────────────────────── */

export default function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  }, []);
  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  /* parallax helper — depth = how strongly a layer reacts (px) */
  const par = (depth: number) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
  });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="hero-scene relative w-full max-w-md mx-auto aspect-5/6 select-none"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      {/* Tilting stage */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${-tilt.y * 4}deg) rotateY(${tilt.x * 4}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Decorative drifting blobs */}
        <div className="absolute -top-8 -right-6 w-48 h-48 rounded-full pointer-events-none blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(76,175,114,0.30), transparent 70%)", animation: "heroBlob 9s ease-in-out infinite" }} />
        <div className="absolute -bottom-10 -left-8 w-56 h-56 rounded-full pointer-events-none blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.22), transparent 70%)", animation: "heroBlob 11s ease-in-out infinite", animationDelay: "1.5s" }} />

        {/* Soft halo + dashed ring behind the phone */}
        <div className="absolute inset-8 rounded-[2.6rem] pointer-events-none" style={{
          ...par(-8),
          background: "radial-gradient(circle at 50% 42%, rgba(76,175,114,0.20), transparent 70%)",
          border: "1.5px dashed rgba(45,122,58,0.18)",
        }} />

        {/* ── Two-phone app mockup ── */}
        <div className="absolute inset-0 flex items-center justify-center" style={par(8)}>
          <HeroDualPhones />
        </div>
      </div>
    </div>
  );
}
