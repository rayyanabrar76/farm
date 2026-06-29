"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Globe, Play } from "lucide-react";
import Logo from "./Logo";
import clsx from "clsx";

// ──────────────────────────────────────────────────────────────────────────
// "Editorial agritech house" navigation — a complete departure from the
// dropdown bar. A slim centered-wordmark rail; the real navigation lives in a
// full-screen immersive overlay where the three personas read as oversized
// serif statements. Harvest-gold appears exactly once (the CTA). A 2px gold
// hairline pinned to the top edge is the brand signature.
//
// Buyer flow stays request-only — Cart/checkout intentionally unlinked.
// ──────────────────────────────────────────────────────────────────────────

const GOLD = "linear-gradient(135deg,#E2C27D 0%,#C49A4A 55%,#B0863A 100%)";

// The three ways into Agrolync — parallel paths, not a sequence (so no 01/02/03).
const PATHS = [
  { tag: "For growers", title: "Grow & sell your harvest",   href: "/register" },
  { tag: "For buyers",  title: "Source produce at scale",    href: "/marketplace" },
  { tag: "For vendors", title: "Supply inputs & logistics",  href: "/register" },
];

// Everything else, set quietly beside the headline paths.
const EXPLORE: { label: string; href: string; soon?: boolean }[] = [
  { label: "Marketplace",  href: "/marketplace" },
  { label: "About us",     href: "/#about" },
  { label: "How it works", href: "/#how" },
  { label: "Help Centre",  href: "/#help" },
  { label: "Blog",         href: "/#blog" },
  { label: "Newsroom",     href: "/#news" },
  { label: "Gallery",      href: "/#gallery" },
  { label: "Ebooks",       href: "/#ebooks", soon: true },
  { label: "Events",       href: "/#events", soon: true },
  { label: "Contact",      href: "/#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + allow Escape to close the overlay.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  // When the overlay is open the rail text flips to light (it floats above it).
  const railText = open ? "text-white" : "text-gray-800";

  return (
    <>
      {/* Brand signature: a hairline of harvest-gold pinned to the very top. */}
      <div className="fixed top-0 inset-x-0 h-0.5 z-60" style={{ background: GOLD }} />

      {/* ── Slim centered-wordmark rail ── */}
      <header
        className={clsx(
          "fixed top-0.5 inset-x-0 z-50 transition-colors duration-300 motion-reduce:transition-none",
          open
            ? "bg-transparent"
            : scrolled
              ? "bg-white/80 backdrop-blur-xl border-b border-black/6"
              : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 grid grid-cols-[1fr_auto_1fr] items-center gap-2">

          {/* Left — the only trigger. A morphing burger + word. */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={clsx("group justify-self-start flex items-center gap-3 rounded-full -ml-1 px-1 h-11 transition-colors", railText)}
          >
            <span className="relative w-6 h-4 shrink-0" aria-hidden>
              <span className={clsx(
                "absolute left-0 right-0 h-0.5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 group-hover:top-0.5",
              )} />
              <span className={clsx(
                "absolute left-0 right-0 h-0.5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 group-hover:bottom-0.5",
              )} />
            </span>
            <span className="hidden sm:inline text-[13px] font-bold tracking-[0.12em] uppercase">
              {open ? "Close" : "Menu"}
            </span>
          </button>

          {/* Center — wordmark. */}
          <Link href="/" aria-label="Agrolync home"
            className="justify-self-center transition-transform duration-300 hover:scale-[1.04] motion-reduce:transform-none"
            onClick={() => setOpen(false)}>
            <span className={open ? "**:fill-white **:text-white" : undefined}>
              <Logo height={36} />
            </span>
          </Link>

          {/* Right — account actions. */}
          <div className="justify-self-end flex items-center gap-2 sm:gap-4">
            <Link href="/login"
              className={clsx("hidden sm:inline text-[13px] font-bold tracking-[0.12em] uppercase transition-colors hover:opacity-70", railText)}>
              Log in
            </Link>
            <Link href="/register"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 h-10 rounded-full text-[13px] font-bold tracking-[0.04em] transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              style={{ background: GOLD, color: "#0E2A12", boxShadow: "0 8px 22px -6px rgba(176,134,58,0.5)" }}
              onClick={() => setOpen(false)}>
              <span className="sm:hidden">Join</span>
              <span className="hidden sm:inline">Get started</span>
              <ArrowUpRight size={15} className="hidden sm:block" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-[opacity,visibility] duration-500 motion-reduce:transition-none",
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        )}
        style={{
          background:
            "radial-gradient(120% 120% at 80% 0%, #1A5514 0%, #0E2A12 55%, #081B0B 100%)",
        }}
      >
        {/* Ambient pattern + grain, if your global hero-pattern class exists. */}
        <div className="hero-pattern absolute inset-0 opacity-[0.06]" aria-hidden />

        <div className="relative h-dvh max-w-7xl mx-auto px-5 sm:px-6 pt-20 sm:pt-28 overflow-y-auto overscroll-contain flex flex-col pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="flex-1 grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-20">

            {/* Paths — oversized serif statements, staggered reveal. */}
            <div>
              <Eyebrow open={open} delay={60}>Where do you fit</Eyebrow>
              <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
                {PATHS.map((p, i) => (
                  <li key={p.title}>
                    <Reveal open={open} delay={120 + i * 80}>
                      <Link href={p.href} onClick={() => setOpen(false)}
                        className="group block py-2 sm:py-3">
                        <span className="block text-[12px] font-bold tracking-[0.16em] uppercase text-[#C49A4A]">{p.tag}</span>
                        <span className="mt-1 flex items-start gap-2 sm:gap-5">
                          <span className="min-w-0 font-serif text-[clamp(1.875rem,7.5vw,4.25rem)] leading-[1.05] text-white/90 transition-colors group-hover:text-white">
                            {p.title}
                          </span>
                          <ArrowUpRight
                            className="shrink-0 mt-1.5 sm:mt-3 w-6 h-6 sm:w-9 sm:h-9 text-white/30 transition-all duration-300 group-hover:text-[#E2C27D] group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                            strokeWidth={1.5} />
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore — quiet utility column. */}
            <div className="border-t border-white/10 pt-8 mt-2 lg:border-t-0 lg:pt-0 lg:mt-0 lg:border-l lg:border-white/10 lg:pl-16">
              <Eyebrow open={open} delay={260}>Explore</Eyebrow>
              <ul className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-1">
                {EXPLORE.map((it, i) => (
                  <li key={it.label}>
                    <Reveal open={open} delay={300 + i * 35}>
                      <Link href={it.href} onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-2 py-2.5 text-white/70 hover:text-white transition-colors">
                        <span className="text-[15px] sm:text-base font-medium">{it.label}</span>
                        {it.soon && <span className="text-[10px] font-bold tracking-wide uppercase text-[#C49A4A]">Soon</span>}
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>

              {/* Brand story tile. */}
              <Reveal open={open} delay={680}>
                <Link href="/#story" onClick={() => setOpen(false)}
                  className="group mt-8 flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Play size={15} className="text-white fill-white ml-0.5" />
                  </span>
                  <span className="text-sm font-semibold">Watch our brand story</span>
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Overlay footer. */}
          <Reveal open={open} delay={760}>
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/50">
              <button className="flex items-center gap-1.5 text-[13px] font-semibold tracking-wide hover:text-white transition-colors">
                <Globe size={14} /> English
              </button>
              <a href="mailto:hello@agrolync.com" className="text-[13px] font-medium hover:text-white transition-colors">
                hello@agrolync.com
              </a>
              <span className="hidden sm:inline sm:ml-auto text-[11px] tracking-[0.14em] uppercase">Farm to market · West Africa</span>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

// Small uppercase label that fades+rises with the overlay.
function Eyebrow({ children, open, delay }: { children: React.ReactNode; open: boolean; delay: number }) {
  return (
    <Reveal open={open} delay={delay}>
      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">{children}</p>
    </Reveal>
  );
}

// Staggered reveal wrapper — translate-up + fade, keyed off `open` and `delay`.
function Reveal({ children, open, delay }: { children: React.ReactNode; open: boolean; delay: number }) {
  return (
    <div
      className={clsx(
        "transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none",
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
      style={{ transitionDelay: open ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}