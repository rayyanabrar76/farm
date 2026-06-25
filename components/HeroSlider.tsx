"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Wheat, ShoppingCart, TrendingUp } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "Harvest Season is Open",
    headline: ["FROM FARM", "TO MARKET,", "DIRECT."],
    accentLine: 1,
    sub: "Connect with 12,400+ verified Nigerian farmers. No middlemen, no markups — straight from the source.",
    cta: { label: "Browse Fresh Produce", href: "/marketplace" },
    cta2: { label: "Start Selling", href: "/register" },
    ctaIcon: ShoppingCart,
    accent: "#F5A623",
    img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1600&h=900&fit=crop&auto=format&q=85",
  },
  {
    eyebrow: "Live Market Intelligence",
    headline: ["REAL-TIME", "PRICES.", "FAIR PAY."],
    accentLine: 2,
    sub: "Track live commodity prices from Dawanau, Onitsha, Terminus and 40+ markets across Nigeria — updated every minute.",
    cta: { label: "View Price Tracker", href: "/marketplace" },
    cta2: { label: "Join Free", href: "/register" },
    ctaIcon: TrendingUp,
    accent: "#4CAF72",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop&auto=format&q=85",
  },
  {
    eyebrow: "Secure. Fast. Trusted.",
    headline: ["EARN MORE.", "WASTE LESS.", "GROW."],
    accentLine: 0,
    sub: "Escrow-protected payments. 67% average income increase. Join 12,000+ farmers already earning more with Agrolync.",
    cta: { label: "Start Selling Today", href: "/register" },
    cta2: { label: "Browse Market", href: "/marketplace" },
    ctaIcon: Wheat,
    accent: "#FFB84D",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=900&fit=crop&auto=format&q=85",
  },
];

const LIVE_PRICES = [
  { name: "Tumatir", emoji: "🍅", price: 380, change: +12 },
  { name: "Masara",  emoji: "🌽", price: 170, change: -5  },
  { name: "Tatasai", emoji: "🌶️", price: 1200, change: +45 },
  { name: "Ji Ocha", emoji: "🍠", price: 450, change: +28 },
  { name: "Alayyahu",emoji: "🥬", price: 250, change: -8  },
  { name: "Dawa",    emoji: "🌾", price: 90,  change: +3  },
];

const NOTIFICATIONS = [
  "Aisha K. sold 500kg Tumatir · Kaduna",
  "Chidi R. ordered 200kg Masara · Lagos",
  "New farmer verified · Plateau State",
  "Flour Mills placed ₦420k order · Kano",
];

const PHONE_PRODUCTS = [
  { emoji: "🍅", name: "Tumatir (Roma Tomato)",    seller: "Alhaji Musa · Kaduna", price: "₦380/kg",    verified: true  },
  { emoji: "🌶️", name: "Tatasai (Scotch Bonnet)",  seller: "Aisha Kaduna · Kaduna", price: "₦1,200/kg", verified: true  },
  { emoji: "🥬", name: "Alayyahu (Garden Leaf)",   seller: "Fatima A. · Plateau",  price: "₦250/bunch", verified: false },
];

export default function HeroSlider() {
  const [cur,        setCur]        = useState(0);
  const [fading,     setFading]     = useState(false);
  const [priceSet,   setPriceSet]   = useState(0);
  const [notif,      setNotif]      = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [tilt,       setTilt]       = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);

  const go = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setCur(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
      setFading(false);
    }, 300);
  }, []);

  // Slide auto-advance
  useEffect(() => {
    const id = setInterval(() => go(cur + 1), 6500);
    return () => clearInterval(id);
  }, [cur, go]);

  // Price cycling
  useEffect(() => {
    const t = setInterval(() => setPriceSet(p => (p + 1) % LIVE_PRICES.length), 1800);
    return () => clearInterval(t);
  }, []);

  // Notification popups
  useEffect(() => {
    let ni = 0;
    const fire = () => {
      setNotif(NOTIFICATIONS[ni % NOTIFICATIONS.length]);
      ni++;
      setTimeout(() => setNotif(null), 2800);
    };
    const delay = setTimeout(fire, 1200);
    const t = setInterval(fire, 5200);
    return () => { clearTimeout(delay); clearInterval(t); };
  }, []);

  // Card highlight cycling
  useEffect(() => {
    const t = setInterval(() => setActiveCard(c => (c + 1) % PHONE_PRODUCTS.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Mouse parallax on phone
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const r = phoneRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const s = SLIDES[cur];
  const Icon = s.ctaIcon;

  const visiblePrices = [
    LIVE_PRICES[priceSet % LIVE_PRICES.length],
    LIVE_PRICES[(priceSet + 1) % LIVE_PRICES.length],
    LIVE_PRICES[(priceSet + 2) % LIVE_PRICES.length],
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(640px, 88vh, 820px)" }}>

      {/* Background image */}
      <div key={cur} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: fading ? 0 : 1 }}>
        <img src={s.img} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Overlay — heavier on left for text legibility */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 48%, rgba(0,0,0,0.28) 100%)" }} />

      <div className="hero-pattern absolute inset-0 opacity-20 pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${s.accent}18, transparent)` }} />

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{ paddingTop: "100px", opacity: fading ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 w-full pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── LEFT: text ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: s.accent }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                </span>
                <p className="text-xs sm:text-sm font-black tracking-[0.22em] uppercase" style={{ color: s.accent }}>
                  {s.eyebrow}
                </p>
              </div>

              <h1 className="font-black text-white leading-none tracking-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)" }}>
                {s.headline.map((line, i) => (
                  <span key={i} className="block" style={i === s.accentLine ? { color: s.accent } : {}}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className="text-white/70 text-base leading-relaxed max-w-md mb-8">{s.sub}</p>

              <div className="flex flex-wrap gap-3">
                <Link href={s.cta.href}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-gray-900 text-sm transition-all hover:-translate-y-0.5 hover:brightness-110"
                  style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`, boxShadow: `0 6px 24px ${s.accent}55` }}>
                  <Icon size={17} />{s.cta.label}
                </Link>
                <Link href={s.cta2.href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  {s.cta2.label}
                </Link>
              </div>

              <p className="mt-10 text-white/25 text-xs font-mono tracking-[0.2em]">
                0{cur + 1} &nbsp;/&nbsp; 0{SLIDES.length}
              </p>
            </div>

            {/* ── RIGHT: live phone mockup ── */}
            <div className="hidden lg:flex justify-center items-center">
              <div
                ref={phoneRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                style={{
                  width: 230,
                  transition: "transform 0.15s ease",
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  willChange: "transform",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Phone shell */}
                <div className="relative rounded-[40px] overflow-hidden"
                  style={{ width: 230, height: 460, background: "#0d0d0d", border: "2.5px solid rgba(255,255,255,0.13)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>

                  {/* Dynamic Island */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black flex items-center justify-center gap-2"
                    style={{ width: 110, height: 30 }}>
                    <div className="w-2 h-2 rounded-full bg-gray-800 border border-gray-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>

                  {/* Screen */}
                  <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 38, background: "#f9fafb", WebkitFontSmoothing: "antialiased" }}>

                    {/* App header */}
                    <div className="px-4 pt-12 pb-2.5 flex items-center justify-between bg-white border-b border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "#1B5E28" }}>
                          <span className="text-white text-[8px] font-black">A</span>
                        </div>
                        <span className="text-[11px] font-black text-gray-900 tracking-tight">AGROLYNC</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "#dcfce7" }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[7px] font-bold text-green-700">LIVE</span>
                        </div>
                        <span className="text-[15px]">🔔</span>
                      </div>
                    </div>

                    {/* Notification banner */}
                    <div
                      className="mx-3 mt-2 px-3 py-2 rounded-xl flex items-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #1B5E28, #2D7A3A)",
                        opacity: notif ? 1 : 0,
                        transform: notif ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.96)",
                        transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                        minHeight: 34,
                      }}
                    >
                      <span className="text-sm shrink-0">⚡</span>
                      <span className="text-white text-[9px] font-semibold flex-1 truncate">{notif ?? ""}</span>
                    </div>

                    {/* Live prices */}
                    <div className="mx-3 mt-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Prices</span>
                        <span className="text-[7px] font-bold text-green-600">● Dawanau Market</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {visiblePrices.map((p, i) => (
                          <div key={`${p.name}-${i}`}
                            className="rounded-xl p-2 text-center border"
                            style={{
                              background: i === 1 ? "#f0fdf4" : "#ffffff",
                              borderColor: i === 1 ? "#86efac" : "#f3f4f6",
                            }}>
                            <div className="text-[18px] leading-none mb-0.5">{p.emoji}</div>
                            <div className="text-[7px] font-bold text-gray-700 truncate">{p.name}</div>
                            <div className="text-[9px] font-black text-gray-900">₦{p.price}</div>
                            <div className={`text-[7px] font-bold ${p.change > 0 ? "text-green-600" : "text-red-500"}`}>
                              {p.change > 0 ? "▲" : "▼"} {Math.abs(p.change)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured listings */}
                    <div className="mx-3 mt-3">
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Featured Listings</span>
                      <div className="mt-1.5 flex flex-col gap-1.5">
                        {PHONE_PRODUCTS.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer"
                            style={{
                              background: activeCard === i ? "#f0fdf4" : "#ffffff",
                              border: activeCard === i ? "1.5px solid #86efac" : "1.5px solid #f3f4f6",
                              transform: activeCard === i ? "scale(1.015)" : "scale(1)",
                              transition: "all 0.35s ease",
                            }}
                          >
                            <span className="text-[20px] shrink-0">{item.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-[8px] font-bold text-gray-900 truncate">{item.name}</div>
                              <div className="text-[7px] text-gray-400 truncate">{item.seller}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-[9px] font-black text-gray-900">{item.price}</div>
                              {item.verified && (
                                <div className="text-[6px] font-bold text-green-600">✓ Verified</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 px-5 py-2.5 flex justify-around items-center">
                      {[
                        { icon: "🏠", label: "Home",    active: true  },
                        { icon: "🛒", label: "Market",  active: false },
                        { icon: "📊", label: "Prices",  active: false },
                        { icon: "👤", label: "Profile", active: false },
                      ].map((tab) => (
                        <div key={tab.label} className="flex flex-col items-center gap-0.5">
                          <span className="text-sm">{tab.icon}</span>
                          <span className={`text-[6px] font-bold ${tab.active ? "text-green-600" : "text-gray-400"}`}>
                            {tab.label}
                          </span>
                          {tab.active && <div className="w-1 h-1 rounded-full bg-green-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => go(cur - 1)} aria-label="Previous"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => go(cur + 1)} aria-label="Next"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? s.accent : "rgba(255,255,255,0.35)" }} />
        ))}
      </div>
    </section>
  );
}
