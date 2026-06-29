const PARTNERS = [
  "Flour Mills Nigeria",
  "Dangote Group",
  "Chi Farms",
  "NASCON Allied",
  "FoodCo Retail",
  "OLAM Nigeria",
  "Olam Agri",
  "TGI Group",
];

const SURFACE = "#F9F6F0";
const GOLD = "#C49A4A";

// A small harvest-gold diamond — the through-line that ties this section to the
// nav's gold hairline. Used as the marquee separator and to flank the eyebrow.
function Diamond({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block rotate-45 shrink-0 ${className}`} style={{ background: GOLD }} />;
}

export default function PartnersSection() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden border-t border-black/5" style={{ background: SURFACE }}>
      {/* Heading */}
      <div className="text-center px-4 mb-12 sm:mb-16">
        <p className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary-700 mb-4">
          <Diamond className="w-1.5 h-1.5 opacity-70" />
          The network
          <Diamond className="w-1.5 h-1.5 opacity-70" />
        </p>
        <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-[#0E2A12] max-w-2xl mx-auto">
          Trusted by Africa&apos;s leading agribusinesses
        </h2>
      </div>

      {/* Auto-scrolling wordmark wall */}
      <div className="relative group/ticker">
        {/* edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${SURFACE}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${SURFACE}, transparent)` }} />

        <div className="ticker-wrap flex">
          {/* Pause the drift while a visitor is reading the wall. */}
          <div
            className="ticker-inner items-center group-hover/ticker:[animation-play-state:paused]"
            style={{ display: "inline-flex" }}
          >
            {[0, 1].map((g) =>
              PARTNERS.map((p, i) => (
                <span key={`${g}-${i}`} className="flex items-center shrink-0">
                  <span className="group/name px-7 sm:px-11 py-2">
                    <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.18em] whitespace-nowrap text-[#0E2A12]/35 group-hover/name:text-[#0E2A12]/85 transition-colors duration-300">
                      {p}
                    </span>
                  </span>
                  {/* separator between every wordmark */}
                  <Diamond className="w-1.5 h-1.5 opacity-30" />
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}