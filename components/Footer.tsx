import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Send, type LucideIcon } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Logo from "./Logo";

const SOCIALS: { label: string; Icon: IconType }[] = [
  { label: "Instagram", Icon: FaInstagram },
  { label: "LinkedIn", Icon: FaLinkedinIn },
  { label: "Facebook", Icon: FaFacebookF },
  { label: "X", Icon: FaXTwitter },
];

const LINKS: Record<string, string[]> = {
  Platform: ["Source Produce", "Farmer Dashboard", "Live Prices", "Logistics Network", "USSD (*347#)"],
  Support:  ["Help Centre", "Farmer Training", "Payment Guide", "Logistics Partners", "Contact Us"],
  Company:  ["About Us", "Impact Report 2025", "Press & Media", "Partners", "Careers"],
};

const CONTACT: { Icon: LucideIcon; text: string }[] = [
  { Icon: Phone, text: "+234 800 AGROLYNC" },
  { Icon: Mail, text: "hello@agrolync.com" },
  { Icon: MapPin, text: "Lagos · Kano · Nairobi" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-gray-400" style={{ background: "linear-gradient(180deg,#0A2010 0%,#06120A 100%)" }}>
      {/* Top accent hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.55) 30%, rgba(76,175,114,0.55) 70%, transparent)",
      }} />
      {/* Texture + ambient glow */}
      <div className="hero-pattern absolute inset-0 opacity-40 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(76,175,114,0.12) 0%, transparent 65%)",
      }} />

      {/* ── Newsletter card ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16">
        <div
          className="rounded-3xl border border-white/10 px-6 sm:px-9 py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, rgba(26,85,20,0.45) 0%, rgba(7,18,8,0.25) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#FFD17A,#E09200)", boxShadow: "0 8px 22px rgba(245,166,35,0.35)" }}>
              <Send size={19} style={{ color: "#3A2A00" }} />
            </span>
            <div>
              <p className="text-white font-black text-lg sm:text-xl">Stay ahead of the harvest</p>
              <p className="text-white/50 text-sm mt-1 max-w-md">Weekly commodity price alerts and agri-market insights — straight to your inbox.</p>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full xs:flex-1 md:w-60 bg-white/8 border border-white/12 text-white placeholder:text-white/30 text-sm px-4 py-3 rounded-xl outline-none focus:border-accent-400 focus:bg-white/12 transition-colors"
            />
            <button className="flex items-center justify-center gap-1.5 px-5 py-3 text-gray-900 font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 shrink-0 w-full xs:w-auto" style={{ background: "linear-gradient(135deg,#FFD17A,#F5A623)", boxShadow: "0 6px 18px rgba(245,166,35,0.35)" }}>
              Subscribe <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex mb-5"><Logo height={34} onDark /></Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-sm">
              Aggregating Africa&apos;s agricultural supply chain — connecting smallholder farmers directly to buyers, processors, and global markets.
            </p>

            {/* Contact chips */}
            <div className="flex flex-col gap-2.5 mt-6">
              {CONTACT.map((c) => (
                <span key={c.text} className="flex items-center gap-2.5 text-sm text-white/55">
                  <span className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                    <c.Icon size={13} className="text-primary-300" />
                  </span>
                  {c.text}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2.5 mt-6">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary-500 hover:text-white hover:border-primary-400 transition-colors">
                  <s.Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group}>
                <h4 className="text-white font-bold text-[11px] sm:text-sm mb-4 sm:mb-5 uppercase tracking-wider">{group}</h4>
                <ul className="space-y-3">
                  {items.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-white/45 hover:text-white hover:pl-1 transition-all text-[13px] sm:text-sm leading-snug block">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* App buttons + USSD note */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-6 border-t border-white/8">
          <div className="flex gap-2.5">
            <a href="#" className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white/75 transition-colors">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="text-white/60 shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
            <a href="#" className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white/75 transition-colors">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="text-white/60 shrink-0"><path d="M3.18 23.76c.3.17.64.24.99.2l12.47-7.2-2.57-2.57-10.89 9.57zm-1.61-20.3C1.21 3.85 1 4.35 1 4.98v14.08c0 .63.21 1.13.57 1.52L14.43 8.5 1.57 3.46zm19.47 8.31-3.07-1.77-2.9 2.9 2.9 2.9 3.09-1.78c.88-.51.88-1.33-.02-1.85zM4.17.28 16.64 7.48l-2.57 2.57L3.18.48c.3-.18.65-.24.99-.2z"/></svg>
              Google Play
            </a>
          </div>
          <p className="text-xs text-white/40 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Works on 2G · Dial <span className="font-bold text-accent-400">*347#</span> — no internet needed
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35 text-center sm:text-left">
          <span>© 2026 Agrolync Africa Ltd. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <Link key={l} href="#" className="hover:text-white/70 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized wordmark watermark */}
      <div className="relative h-12 sm:h-24 pointer-events-none select-none">
        <p
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-black leading-none text-white/[0.035] text-[19vw] sm:text-[22vw]"
          style={{ fontFamily: "'Baloo 2', system-ui, sans-serif", bottom: "-0.16em" }}
        >
          agrolync
        </p>
      </div>
    </footer>
  );
}
