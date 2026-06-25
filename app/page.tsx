"use client";
import Link from "next/link";
import { useRef } from "react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { PRODUCTS } from "@/lib/data";
import { ArrowRight, TrendingUp, Shield, Truck, CheckCircle, Wheat, ShoppingCart, Globe2, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { stars: 5, quote: "Before Agrolync, I lost 40% of my tumatir every season. Now I sell 95% of my harvest before it even leaves the farm. My income tripled in one year.", name: "Aisha Kano", role: "Tumatir Farmer, Kaduna State", initials: "AK", color: "from-primary-500 to-primary-400" },
  { stars: 5, quote: "As a restaurant owner in Lagos, I now source directly from verified farmers in Plateau State. Quality is consistent, prices are 30% lower, and I know exactly where my food comes from.", name: "Chidi Okonkwo", role: "Restaurant Owner, Lagos", initials: "CO", color: "from-blue-500 to-blue-400" },
  { stars: 5, quote: "I was skeptical at first, but the payment security feature won me over. The first order I placed, funds were in my account the next morning. No wahala at all!", name: "Emmanuel Musa", role: "Ji Ocha Farmer, Benue State", initials: "EM", color: "from-accent-500 to-accent-400" },
];

const TICKER_ITEMS = [
  "Aisha K. sold 500kg Tumatir · Kaduna · 3 min ago",
  "Chidi R. ordered 200kg Masara · Lagos · 7 min ago",
  "Flour Mills placed ₦420k order · Kano · 12 min ago",
  "Emmanuel M. listed 800kg Ji Ocha · Benue · 18 min ago",
  "FoodCo sourced fresh Alayyahu · Abuja · 24 min ago",
  "New farmer verified: Plateau State · 31 min ago",
  "Halima Y. earned ₦96k this week · Sokoto · 38 min ago",
];

const TRUST_BADGES = [
  { label: "Free to join" },
  { label: "No hidden fees" },
  { label: "Escrow-protected" },
  { label: "SMS in local languages" },
];

const STATS = [
  { num: "₦2.8B+", label: "Transactions Processed" },
  { num: "12,400", label: "Active Farmers" },
  { num: "67%",    label: "Less Post-Harvest Loss" },
  { num: "3,200+", label: "Verified Buyers" },
];

const PARTNERS = [
  "Flour Mills Nigeria",
  "Dangote Group",
  "Chi Farms",
  "NASCON Allied",
  "FoodCo Retail",
  "OLAM Nigeria",
];

const IG_POSTS = [
  { img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400&h=400&fit=crop&auto=format", alt: "Farmer harvesting tomatoes" },
  { img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=400&fit=crop&auto=format", alt: "Fresh vegetables at market" },
  { img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop&auto=format", alt: "African farm field" },
  { img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop&auto=format", alt: "Yam harvest" },
  { img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=400&fit=crop&auto=format", alt: "Fresh peppers" },
  { img: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=400&h=400&fit=crop&auto=format", alt: "Maize harvest" },
];

const GRID_SECTIONS = [
  {
    title: "Fresh Vegetables",
    label: "Alayyahu · Tumatir · Tatasai · Afufa",
    href: "/marketplace?cat=Vegetables",
    ids: [1, 4, 8, 9],
  },
  {
    title: "Grains & Staples",
    label: "Masara · Ji Ocha · Dawa · Wake Soya",
    href: "/marketplace?cat=Grains",
    ids: [2, 3, 10, 12],
  },
  {
    title: "Fruits, Legumes & Cash Crops",
    label: "Wake · Ope Oyibo · Koko · Ogede Agbagba",
    href: "/marketplace?cat=Fruits",
    ids: [5, 6, 7, 11],
  },
];

export default function HomePage() {
  const tickerText = TICKER_ITEMS.join("   ·   ");
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <>
      {/* ── HERO SLIDER with Three.js ── */}
      <HeroSlider />

      {/* ── FEATURED PRODUCE (Arena Club carousel style) ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header row */}
          <div className="flex items-end justify-between mb-1">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Featured Produce</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel(-1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Sub-label */}
          <div className="mb-6">
            <Link href="/marketplace" className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors group">
              Fresh Listings
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
          >
            {PRODUCTS.map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-72">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRIDS (3 × 4 products, Arena Club style) ── */}
      {GRID_SECTIONS.map((section, si) => {
        const sectionProducts = section.ids.map(id => PRODUCTS.find(p => p.id === id)!);
        return (
          <section key={si} className="py-12 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Header */}
              <div className="flex items-end justify-between mb-1">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{section.title}</h2>
              </div>
              <div className="mb-6">
                <Link href={section.href}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors group">
                  {section.label}
                  <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              {/* 4-column grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sectionProducts.map(p => p && <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── FEATURE SECTION (Arena Club 3-column style) ── */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">

          {/* Centered headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 text-center uppercase tracking-tight mb-16 max-w-3xl mx-auto leading-tight">
            Agrolync brings the power of the market into every farmer&apos;s hands
          </h2>

          {/* 3-column feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* VERIFY */}
            <div className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
              <div className="p-7 pb-5">
                <p className="text-[10px] font-black tracking-[0.2em] text-primary-600 uppercase mb-3">VERIFY</p>
                <h3 className="text-xl font-black text-gray-900 leading-snug">AI-powered farmer<br />verification.</h3>
              </div>
              {/* Mockup visual */}
              <div className="mx-5 mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-black">AM</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Alhaji Musa Ibrahim</p>
                    <p className="text-[10px] text-gray-400">Kano State · 2.4 ha farm</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-bold text-primary-600 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={9} /> Verified
                    </span>
                  </div>
                </div>
                {[["NIN Identity", true], ["Farm Location", true], ["Phone Number", true]].map(([l, v]) => (
                  <div key={l as string} className="flex items-center justify-between py-1.5">
                    <span className="text-[10px] text-gray-500">{l as string}</span>
                    <span className={`text-[10px] font-bold ${v ? "text-primary-600" : "text-red-400"}`}>{v ? "✓ Confirmed" : "✗ Pending"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MARKET PRICES */}
            <div className="flex flex-col rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(160deg, #071809 0%, #1B5E28 100%)" }}>
              <div className="p-7 pb-5">
                <p className="text-[10px] font-black tracking-[0.2em] text-primary-300 uppercase mb-3">MARKET PRICES</p>
                <h3 className="text-xl font-black text-white leading-snug">Real-time price<br />intelligence.</h3>
              </div>
              {/* Price chart mockup */}
              <div className="mx-5 mb-5 rounded-xl bg-white/8 border border-white/10 p-4">
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-3">Live Prices · Dawanau Market</p>
                {[
                  { name: "Tumatir", price: "₦380", pct: 85, up: true },
                  { name: "Ji Ocha", price: "₦450", pct: 72, up: true },
                  { name: "Masara",  price: "₦170", pct: 45, up: false },
                  { name: "Wake",    price: "₦520", pct: 90, up: true },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-white/60 w-14 shrink-0">{r.name}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${r.pct}%`, background: r.up ? "#4CAF72" : "#F5A623" }} />
                    </div>
                    <span className="text-[10px] font-bold text-white/80 w-10 text-right shrink-0">{r.price}</span>
                    <span className={`text-[9px] font-bold shrink-0 ${r.up ? "text-green-400" : "text-accent-400"}`}>{r.up ? "↑" : "↓"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ESCROW PAYMENTS */}
            <div className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
              <div className="p-7 pb-5">
                <p className="text-[10px] font-black tracking-[0.2em] text-accent-600 uppercase mb-3">ESCROW PAY</p>
                <h3 className="text-xl font-black text-gray-900 leading-snug">Instant secured<br />payments.</h3>
              </div>
              {/* Payment UI mockup */}
              <div className="mx-5 mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400">Order Confirmed</p>
                    <p className="text-lg font-black text-gray-900">₦114,000</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                    <Shield size={15} className="text-primary-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-400">Produce</span>
                    <span className="text-[10px] font-semibold text-gray-700">Tumatir · 300kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-400">Buyer</span>
                    <span className="text-[10px] font-semibold text-gray-700">Chidi Restaurants</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-primary-600">Funds secured in escrow · Released on delivery</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Wide LOGISTICS card */}
          <div className="relative rounded-2xl overflow-hidden border border-accent-200 p-8 sm:p-10 mt-6"
            style={{ background: "linear-gradient(135deg, rgba(245,166,35,0.05) 0%, rgba(245,166,35,0.02) 100%)" }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-accent-600 uppercase mb-3">AGROLYNC LOGISTICS</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">End-to-end delivery.<br />Farm to doorstep.</h3>
                <p className="text-gray-500 mt-3 text-sm max-w-md">Partnered with local transport networks and cold chain providers across Nigeria and 7 other African countries.</p>
              </div>
              <div className="flex gap-6 sm:gap-10 shrink-0">
                {[["12,400", "active farmers"], ["3,200+", "verified buyers"], ["8", "countries"]].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-3xl font-black text-primary-600">{n}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-snug">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-5 right-6">
              <div className="w-10 h-10 rounded-xl icon-gradient-gold flex items-center justify-center">
                <Truck size={20} className="text-accent-600" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── OUR INDUSTRY PARTNERS ── */}
      <section className="py-16 sm:py-20 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-black tracking-[0.25em] text-gray-400 uppercase mb-12">Our Industry Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-6 sm:gap-y-8">
            {PARTNERS.map((p) => (
              <span key={p} className="text-2xl sm:text-3xl font-black text-gray-200 hover:text-gray-700 transition-colors duration-200 cursor-default select-none tracking-tight">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl sm:text-2xl md:text-4xl font-black text-gray-900 mb-4 sm:mb-6 leading-snug">
            Agrolync was built by Nigerians,<br />for Nigerian farmers.
          </p>
          <p className="text-gray-500 text-base sm:text-lg mb-8 sm:mb-14 leading-relaxed max-w-xl mx-auto">
            For an experience that lives up to the hard work every farmer puts in before dawn every day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-black mb-3 ring-4 ring-primary-100"
                style={{ background: "linear-gradient(135deg, #2D7A3A, #1B5E28)" }}>TA</div>
              <p className="font-bold text-gray-900">Tobi Adeyemo</p>
              <p className="text-gray-400 text-sm mt-0.5">Founder &amp; CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOLLOW ON INSTAGRAM ── */}
      <section className="py-16 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] font-black tracking-[0.22em] text-gray-400 uppercase mb-3">Follow Us On Instagram!</p>
          <p className="text-2xl font-black text-gray-900 mb-8">@agrolync</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
            {IG_POSTS.map((post, i) => (
              <a key={i} href="https://instagram.com/agrolync" target="_blank" rel="noopener noreferrer"
                className="relative aspect-square rounded-2xl overflow-hidden group block bg-gray-100">
                <img src={post.img} alt={post.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
              </a>
            ))}
          </div>
          <a href="https://instagram.com/agrolync" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
            View all posts <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ── GET THE APP ── */}
      <section className="py-16 sm:py-20 px-4 bg-surface border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-black tracking-[0.22em] text-gray-400 uppercase mb-3">Get the app</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">Agrolync in your pocket.</h3>
            <p className="text-gray-500 text-sm sm:text-base">Works on basic Android phones and 2G networks. Zero data? Use <span className="font-bold text-primary-600">*347#</span></p>
          </div>
          <div className="flex flex-col xs:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a href="#" className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-2xl transition-colors justify-center sm:justify-start">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white/80"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div>
                <div className="text-[9px] text-white/50 leading-none">Download on the</div>
                <div className="text-sm font-bold leading-tight">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-2xl transition-colors justify-center sm:justify-start">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white/80"><path d="M3.18 23.76c.3.17.64.24.99.2l12.47-7.2-2.57-2.57-10.89 9.57zm-1.61-20.3C1.21 3.85 1 4.35 1 4.98v14.08c0 .63.21 1.13.57 1.52L14.43 8.5 1.57 3.46zm19.47 8.31-3.07-1.77-2.9 2.9 2.9 2.9 3.09-1.78c.88-.51.88-1.33-.02-1.85zM4.17.28 16.64 7.48l-2.57 2.57L3.18.48c.3-.18.65-.24.99-.2z"/></svg>
              <div>
                <div className="text-[9px] text-white/50 leading-none">Get it on</div>
                <div className="text-sm font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}

      <section className="py-24 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #071809 0%, #0E3317 50%, #0A2A10 100%)" }}
      >
        <div className="hero-pattern absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 left-0 w-125 h-125 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(76,175,114,0.07) 0%, transparent 65%)" }} />

        <div className="max-w-7xl mx-auto relative">
          <p className="section-label text-accent-400">Success Stories</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">Farmers &amp; Buyers Love Agrolync</h2>
          <p className="text-white/40 text-base sm:text-lg mb-8 sm:mb-14 max-w-xl">Real stories from real people transforming African agriculture.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="relative glass rounded-2xl p-7 flex flex-col group hover:bg-white/10 transition-all duration-300">
                <div className="absolute top-3 right-5 text-[90px] font-black leading-none text-white/4 pointer-events-none select-none" style={{ fontFamily: "Georgia, serif" }}>&ldquo;</div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-white/72 text-sm leading-relaxed flex-1 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className={`w-10 h-10 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white ring-2 ring-white/15 shrink-0`}>{t.initials}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/38 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2D7A3A 0%, #1B5E28 60%, #134520 100%)" }}
      >
        <div className="hero-pattern absolute inset-0 pointer-events-none opacity-60" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(76,175,114,0.12) 0%, transparent 65%)" }} />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/75 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Zap size={12} className="text-accent-400" />
            Free to join · No commission on first 10 orders
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">Ready to Transform<br />Your Farm Business?</h2>
          <p className="text-white/58 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
            Join over 12,000 farmers earning more and wasting less with Agrolync.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-gray-900 text-base shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #FFB84D, #F5A623)", boxShadow: "0 4px 24px rgba(245,166,35,0.35)" }}
            >
              <Wheat size={18} /> Start as a Farmer
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/register"
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-1 hover:bg-white/18"
              style={{ background: "rgba(255,255,255,0.11)", border: "1.5px solid rgba(255,255,255,0.22)" }}
            >
              <ShoppingCart size={18} /> Register as a Buyer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
