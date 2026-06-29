"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import PersonaMockup from "./PersonaMockup";

/* ─────────────────────────────────────────────────────────────
   PersonaPanel — one reusable persona panel.
   Pure presentational: the parent (PersonaShowcase) positions it
   (absolute+sliding when pinned, or in normal flow when stacked)
   and toggles `active` to play the inner stagger reveal.

   All colors come from the `theme` object on each data entry and are
   re-exposed as CSS variables (--p-*) on the root, so you can retune
   every panel by editing the data array — no markup changes needed.
   ───────────────────────────────────────────────────────────── */

export interface PersonaTheme {
  bg: string;          // panel background (solid or gradient)
  text: string;        // headline / strong text
  bodyText: string;    // paragraph text
  pillBg: string;
  pillText: string;
  primaryBg: string;   // solid CTA
  primaryText: string;
  ghostBorder: string; // ghost CTA outline
  ghostText: string;
  cardBg: string;      // mockup card background
}

export interface Persona {
  key: string;
  pill: string;
  headline: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  img: string;
  imgAlt: string;
  theme: PersonaTheme;
}

interface Props {
  data: Persona;
  active: boolean;       // true → play reveal (current panel, or in-view when stacked)
  idx?: number;          // used by the stacked IntersectionObserver
  className?: string;
  style?: CSSProperties;
}

export default function PersonaPanel({ data, active, idx, className = "", style }: Props) {
  const t = data.theme;

  // Theme tokens → CSS variables on the root (descendants read them via var()).
  const rootStyle = {
    background: t.bg,
    "--p-text": t.text,
    "--p-body": t.bodyText,
    "--p-pill-bg": t.pillBg,
    "--p-pill-text": t.pillText,
    "--p-primary-bg": t.primaryBg,
    "--p-primary-text": t.primaryText,
    "--p-ghost-border": t.ghostBorder,
    "--p-ghost-text": t.ghostText,
    "--p-card-bg": t.cardBg,
    ...style,
  } as CSSProperties;

  return (
    <div
      data-active={active ? "true" : "false"}
      data-idx={idx}
      className={`persona-panel w-full overflow-hidden flex items-center ${className}`}
      style={rootStyle}
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16 py-10 sm:py-12 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

        {/* LEFT — copy (text leads on mobile, sits left on desktop) */}
        <div className="persona-reveal persona-text">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ background: "var(--p-pill-bg)", color: "var(--p-pill-text)" }}
          >
            {data.pill}
          </span>

          <h2
            className="mt-5 font-black leading-[1.05] tracking-tight text-4xl sm:text-5xl"
            style={{ color: "var(--p-text)" }}
          >
            {data.headline}
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: "var(--p-body)" }}
          >
            {data.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={data.primary.href}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--p-primary-bg)", color: "var(--p-primary-text)" }}
            >
              {data.primary.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={data.secondary.href}
              className="inline-flex items-center px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-colors hover:bg-black/4"
              style={{ borderColor: "var(--p-ghost-border)", color: "var(--p-ghost-text)" }}
            >
              {data.secondary.label}
            </Link>
          </div>
        </div>

        {/* RIGHT — colored card with the live app mockup (phone bleeds off bottom) */}
        <div className="persona-reveal persona-card">
          <div
            className="relative rounded-[1.75rem] overflow-hidden aspect-4/3 flex items-start justify-center pt-7 px-6 shadow-xl"
            style={{ background: "var(--p-card-bg)" }}
          >
            <PersonaMockup variant={data.key} />
          </div>
        </div>
      </div>
    </div>
  );
}
