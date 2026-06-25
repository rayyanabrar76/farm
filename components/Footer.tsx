import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = {
  Platform: ["Marketplace", "Farmer Dashboard", "Price Tracker", "Logistics", "USSD (*347#)"],
  Support:  ["Help Centre", "Farmer Training", "Payment Guide", "Delivery Partners", "Contact Us"],
  Company:  ["About Us", "Impact Report 2025", "Press & Media", "Partners", "Careers"],
};

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-400">
      {/* Newsletter strip */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-white font-bold text-base">Stay ahead of the market</p>
              <p className="text-white/45 text-sm mt-0.5">Weekly price alerts and agri-news delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-56 bg-white/8 border border-white/12 text-white placeholder:text-white/30 text-sm px-4 py-2.5 rounded-xl outline-none focus:border-primary-300 focus:bg-white/12 transition-colors"
              />
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-accent-500 hover:bg-accent-400 text-gray-900 font-bold text-sm rounded-xl transition-colors shrink-0">
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-4">
              <Logo height={34} onDark />
            </Link>
            <p className="text-sm leading-relaxed text-white/45 mb-6 max-w-xs">
              Connecting smallholder farmers to markets across Nigeria and Africa. Reducing post-harvest losses. Increasing farmer income.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 text-sm text-white/40">
              <span className="flex items-center gap-2"><Phone size={13} /> +234 800 FARMCONNECT</span>
              <span className="flex items-center gap-2"><Mail size={13} /> hello@farmconnectafrica.com</span>
              <span className="flex items-center gap-2"><MapPin size={13} /> Lagos, Nigeria · Nairobi, Kenya</span>
            </div>
          </div>

          {/* Links */}
          {(Object.entries(LINKS) as [string, string[]][]).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-bold text-sm mb-5">{group}</h4>
              <ul className="space-y-3 text-sm">
                {items.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-white/40 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile app buttons */}
        <div className="flex flex-col xs:flex-row gap-3 mb-8 sm:mb-10">
          <span className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white/70 cursor-pointer transition-colors">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="text-white/50"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            App Store
          </span>
          <span className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white/70 cursor-pointer transition-colors">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="text-white/50"><path d="M3.18 23.76c.3.17.64.24.99.2l12.47-7.2-2.57-2.57-10.89 9.57zm-1.61-20.3C1.21 3.85 1 4.35 1 4.98v14.08c0 .63.21 1.13.57 1.52L14.43 8.5 1.57 3.46zm19.47 8.31-3.07-1.77-2.9 2.9 2.9 2.9 3.09-1.78c.88-.51.88-1.33-.02-1.85zM4.17.28 16.64 7.48l-2.57 2.57L3.18.48c.3-.18.65-.24.99-.2z"/></svg>
            Google Play
          </span>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© 2026 Agrolync Africa Ltd. All rights reserved.</span>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <Link key={l} href="#" className="hover:text-white/70 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
