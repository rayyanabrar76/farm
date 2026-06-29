"use client";
import { useEffect, useRef, useState } from "react";
import PersonaPanel, { type Persona } from "./PersonaPanel";

/* ─────────────────────────────────────────────────────────────
   PersonaShowcase — scroll-triggered "products showcase".

   • Add a 4th persona by appending ONE entry to PERSONAS below.
   • Desktop (and motion allowed): the section is `height: N×100vh`;
     an inner sticky stage pins to the viewport while you scroll, and
     `active` is derived from scroll progress. Panels are stacked
     absolutely — the active one sits at translateY(0), earlier panels
     exit upward (-100%), later panels wait below (+100%) — so the
     incoming panel slides up while the previous exits to the top.
   • Mobile / prefers-reduced-motion: NO pinning or scroll-jacking —
     panels stack vertically and gently fade in as they enter view.

   Implementation choice: plain CSS sticky + a passive scroll listener
   (no GSAP/Lenis) to stay dependency-free and match the project's
   existing IntersectionObserver / rAF patterns.
   ───────────────────────────────────────────────────────────── */

const PERSONAS: Persona[] = [
  {
    key: "grower",
    pill: "Agrolync Grower – For Farmers",
    headline: "Farm smarter, not harder",
    body: "Plan, secure quality inputs, and manage your farm from anywhere. Get connected with global buyers and access data-driven insights for better yields and profits.",
    primary: { label: "Start farming", href: "/register" },
    secondary: { label: "Learn more", href: "/marketplace" },
    img: "https://placehold.co/380x760/FFFFFF/64748B/png?text=Grower+App",
    imgAlt: "Agrolync Grower app preview",
    theme: {
      bg: "linear-gradient(160deg,#F2F7F2 0%,#E7F1E8 100%)",
      text: "#0E2A12",
      bodyText: "#3F5F46",
      pillBg: "#D2EAD2",
      pillText: "#1A5514",
      primaryBg: "#1A5514",
      primaryText: "#FFFFFF",
      ghostBorder: "rgba(26,85,20,0.30)",
      ghostText: "#1A5514",
      cardBg: "#2EA84F",
    },
  },
  {
    key: "buyer",
    pill: "Agrolync Buyer – For Buyers",
    headline: "Source high-quality produce with transparency and ease",
    body: "Connect with a trusted network of growers producing export-ready crops across Africa. Enjoy traceability, transparent fulfilment, and reliable sourcing, no matter the season or scale.",
    primary: { label: "Start sourcing", href: "/marketplace" },
    secondary: { label: "Learn more", href: "/marketplace" },
    img: "https://placehold.co/380x760/FFFFFF/64748B/png?text=Buyer+App",
    imgAlt: "Agrolync Buyer app preview",
    theme: {
      bg: "linear-gradient(160deg,#EDF7F5 0%,#DBEEEA 100%)",
      text: "#0B3B38",
      bodyText: "#3A615D",
      pillBg: "#C4E8E2",
      pillText: "#0E6E63",
      primaryBg: "#0E8C7E",
      primaryText: "#FFFFFF",
      ghostBorder: "rgba(14,140,126,0.35)",
      ghostText: "#0E6E63",
      cardBg: "#0FA295",
    },
  },
  {
    key: "vendor",
    pill: "Agrolync Storefront – For Vendors",
    headline: "Sell inputs and services to thousands of active farmers",
    body: "List your products on our digital marketplace and reach thousands of real growers actively looking for tools and supplies to run better farms.",
    primary: { label: "Start selling", href: "/register" },
    secondary: { label: "Learn more", href: "/marketplace" },
    img: "https://placehold.co/380x760/FFFFFF/64748B/png?text=Storefront",
    imgAlt: "Agrolync Storefront preview",
    theme: {
      bg: "linear-gradient(160deg,#FFFaee 0%,#FCF0D2 100%)",
      text: "#4A3300",
      bodyText: "#7A5E25",
      pillBg: "#FBE3A6",
      pillText: "#9A6A00",
      primaryBg: "#F5A623",
      primaryText: "#3A2A00",
      ghostBorder: "rgba(201,138,0,0.40)",
      ghostText: "#9A6A00",
      cardBg: "#F5A623",
    },
  },
];

export default function PersonaShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);
  const [visible, setVisible] = useState<Set<number>>(() => new Set([0]));

  // ── Decide mode: pinned only on wide screens with motion allowed ──
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  // ── Pinned: map scroll progress through the tall track → active index ──
  useEffect(() => {
    if (!pinned) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      // Distance we can scroll while the inner stage stays pinned.
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
      // How far we've scrolled into the section (0 → scrollable).
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), scrollable);
      const progress = scrolled / scrollable;              // 0..1 across the section
      const idx = Math.min(PERSONAS.length - 1, Math.floor(progress * PERSONAS.length));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pinned]);

  // ── Stacked: reveal each panel as it scrolls into view ──
  useEffect(() => {
    if (pinned) return;
    const els = sectionRef.current?.querySelectorAll<HTMLElement>("[data-idx]");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            setVisible((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
          }
        });
      },
      { threshold: 0.3 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pinned]);

  // ── STACKED (mobile / reduced-motion): inset rounded frames, stacked ──
  if (!pinned) {
    return (
      <section ref={sectionRef} className="w-full px-4 sm:px-6 py-12 flex flex-col gap-6">
        {PERSONAS.map((p, i) => (
          <PersonaPanel
            key={p.key}
            data={p}
            idx={i}
            active={visible.has(i)}
            className="max-w-7xl mx-auto rounded-[1.75rem] sm:rounded-4xl shadow-lg"
          />
        ))}
      </section>
    );
  }

  // ── PINNED (desktop) ──
  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${PERSONAS.length * 100}vh` }}
      aria-label="Products showcase"
    >
      {/* Sticky stage: a static, inset rounded frame; panels slide inside it. */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 py-6">
        <div
          className="relative w-full max-w-7xl overflow-hidden rounded-[1.75rem] sm:rounded-4xl border border-black/[0.07] shadow-xl"
          style={{ height: "min(82vh, 760px)" }}
        >
          {PERSONAS.map((p, i) => {
            // Position relative to the active panel:
            //   above  → exited to the top (-100%)
            //   active → centered (0)
            //   below  → waiting at the bottom (+100%)
            const offset = i < active ? "-100%" : i > active ? "100%" : "0%";
            const isActive = i === active;
            return (
              <PersonaPanel
                key={p.key}
                data={p}
                active={isActive}
                className="absolute inset-0"
                style={{
                  transform: `translateY(${offset})`,
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 30 : i > active ? 20 : 10,
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease",
                  willChange: "transform, opacity",
                }}
              />
            );
          })}

          {/* Progress indicator */}
          <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
            {PERSONAS.map((p, i) => (
              <span
                key={p.key}
                className="block rounded-full transition-all duration-300"
                style={{
                  width: 8,
                  height: i === active ? 22 : 8,
                  background: i === active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
