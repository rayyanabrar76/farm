"use client";
import { useEffect, useRef, useState } from "react";

/* Animates a numeric value from 0 → target when it scrolls into view.
   Preserves any prefix (₦), thousands separators, decimals and suffix (+, B+). */

interface Props {
  value: string;           // e.g. "12,400+", "₦2.8B+", "36"
  className?: string;
  style?: React.CSSProperties;
  duration?: number;       // ms
}

function parse(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: "", suffix: "", target: 0, decimals: 0 };
  const numStr = m[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    prefix: m[1],
    suffix: m[3],
    target: parseFloat(numStr.replace(/,/g, "")),
    decimals,
  };
}

function fmt(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");
}

export default function CountUp({ value, className, style, duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const { prefix, suffix, target, decimals } = parse(value);
  const [display, setDisplay] = useState(prefix + fmt(0, decimals) + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: show the final value immediately (deferred).
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setDisplay(prefix + fmt(target, decimals) + suffix));
      return () => cancelAnimationFrame(id);
    }

    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e.isIntersecting || started.current) return;
      started.current = true;

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(prefix + fmt(target * eased, decimals) + suffix);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(prefix + fmt(target, decimals) + suffix);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [prefix, suffix, target, decimals, duration]);

  return <span ref={ref} className={className} style={style}>{display}</span>;
}
