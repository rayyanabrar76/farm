import Link from "next/link";
import { ArrowRight, Leaf, Building2, Truck, type LucideIcon } from "lucide-react";

interface Audience {
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  cta: string;
  href: string;
  bg: string;
  iconBg: string;
  iconColor: string;
}

const WHO_FOR: Audience[] = [
  {
    icon: Leaf,
    title: "Farmers",
    tagline: "Sell directly. Earn more.",
    desc: "List your harvest, reach thousands of verified buyers, and receive escrow-protected payments — no brokers, no markups.",
    cta: "Join as a Farmer",
    href: "/register",
    bg: "linear-gradient(145deg, #EEF9EE 0%, #DCEEDE 100%)",
    iconBg: "#C5E6C5",
    iconColor: "#1A5514",
  },
  {
    icon: Building2,
    title: "Buyers & Processors",
    tagline: "Source at scale. Pay fairly.",
    desc: "Source bulk commodities from verified African farms. Grade A quality, export-ready logistics, and live price intelligence.",
    cta: "Start Sourcing",
    href: "/marketplace",
    bg: "linear-gradient(145deg, #FFFCF0 0%, #FFF4D6 100%)",
    iconBg: "#FFE5A0",
    iconColor: "#B57200",
  },
  {
    icon: Truck,
    title: "Agro-Vendors",
    tagline: "Expand your trade network.",
    desc: "Partner with Agrolync to bridge African farms and buyers worldwide. Leverage our logistics and cross-border trade infrastructure.",
    cta: "Partner with Us",
    href: "/register",
    bg: "linear-gradient(145deg, #F7F1EA 0%, #ECE0D3 100%)",
    iconBg: "#E2CDB5",
    iconColor: "#6B4226",
  },
];

export default function WhoForSection() {
  return (
    <section className="py-20 sm:py-28 px-4" style={{ background: "#F9F6F0" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-black tracking-[0.25em] text-primary-600 uppercase mb-3">
            Built for the full value chain
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            Who is Agrolync for?
          </h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto text-base">
            Whether you grow it, buy it, or move it — Agrolync is your partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {WHO_FOR.map((card) => (
            <div
              key={card.title}
              className="group card-shine rounded-3xl p-8 flex flex-col gap-5 border border-white/70 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
              style={{ background: card.bg }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                style={{ background: card.iconBg, boxShadow: `0 8px 20px ${card.iconColor}22, inset 0 1px 0 rgba(255,255,255,0.65)` }}
              >
                <card.icon size={26} style={{ color: card.iconColor }} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm font-bold mb-3" style={{ color: card.iconColor }}>{card.tagline}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all"
                style={{ color: card.iconColor }}
              >
                {card.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
