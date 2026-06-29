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

export default function PartnersSection() {
  return (
    <section className="py-16 sm:py-20 overflow-hidden border-t border-gray-100" style={{ background: SURFACE }}>
      {/* Heading */}
      <div className="text-center px-4 mb-10 sm:mb-12">
        <p className="text-[11px] font-black tracking-[0.25em] uppercase text-primary-600 mb-3">
          Trusted by Industry Leaders
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
          Powering trade for Africa&apos;s top agribusinesses
        </h2>
      </div>

      {/* Auto-scrolling logo marquee */}
      <div className="relative">
        {/* edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${SURFACE}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${SURFACE}, transparent)` }} />

        <div className="ticker-wrap flex">
          <div className="ticker-inner items-center gap-4 sm:gap-5 pr-4 sm:pr-5" style={{ display: "inline-flex" }}>
            {[0, 1].map((g) =>
              PARTNERS.map((p, i) => (
                <span
                  key={`${g}-${i}`}
                  className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-sm shrink-0 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary-200"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-300 group-hover:bg-primary-500 transition-colors" />
                  <span className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap text-gray-400 group-hover:text-gray-700 transition-colors">
                    {p}
                  </span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
