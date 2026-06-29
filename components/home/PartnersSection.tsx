const PARTNERS = [
  "Flour Mills Nigeria",
  "Dangote Group",
  "Chi Farms",
  "NASCON Allied",
  "FoodCo Retail",
  "OLAM Nigeria",
];

export default function PartnersSection() {
  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <p
          className="text-center text-[11px] font-black tracking-[0.22em] uppercase mb-10"
          style={{ color: "#C8D6C8" }}
        >
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-20 gap-y-6">
          {PARTNERS.map((p) => (
            <span
              key={p}
              className="text-2xl sm:text-3xl font-black tracking-tight cursor-default select-none text-gray-300 hover:text-gray-600 transition-colors duration-200"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
