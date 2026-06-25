"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, TrendingUp, X, Leaf } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { PRODUCTS, CATEGORY_ICON, type Category } from "@/lib/data";

const CATEGORIES: Category[] = ["Vegetables", "Grains", "Tubers", "Fruits", "Legumes", "Cash Crops"];
const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Highest Rated", "Most Reviews"];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const [sort, setSort] = useState("Relevance");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.farmer.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Highest Rated") list.sort((a, b) => b.rating - a.rating);
    if (sort === "Most Reviews") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [search, activeCategory, sort]);

  return (
    <>
      {/* Page header */}
      <div className="pt-25">
        {/* Hero banner */}
        <div className="relative overflow-hidden py-14 px-4"
          style={{ background: "linear-gradient(150deg, #0E3317 0%, #1B5E28 55%, #2D7A3A 100%)" }}
        >
          <div className="hero-pattern absolute inset-0" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="section-label text-accent-400 mb-3">Fresh from the Farm</p>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">Produce Marketplace</h1>
                <p className="text-white/60 text-sm max-w-md leading-relaxed">
                  Sourced directly from <strong className="text-white/85">{PRODUCTS.length}+ verified farmers</strong> across Nigeria and Africa. No middlemen, no markups.
                </p>
              </div>

              {/* Search */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/18 rounded-2xl px-4 py-3 w-full max-w-md focus-within:border-white/35 transition-colors">
                <Search size={17} className="text-white/55 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search produce, farmers, locations..."
                  className="bg-transparent text-white placeholder-white/40 text-sm flex-1 outline-none"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-white/50 hover:text-white transition-colors">
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Price alert */}
            <div className="mt-8 inline-flex items-center gap-2.5 bg-accent-500/15 border border-accent-400/25 text-white px-4 py-2.5 rounded-xl text-sm">
              <div className="w-6 h-6 bg-accent-500/20 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp size={13} className="text-accent-400" />
              </div>
              <span><strong className="text-accent-400">Tomato prices</strong> are up 12% this week in Lagos. Lock in direct-farmer rates now.</span>
            </div>
          </div>
        </div>

        {/* Filters row */}
        <div className="sticky top-25 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("All")}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === "All" ? "bg-primary-500 text-white shadow-green" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              All ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat).length;
              const active = activeCategory === cat;
              return (
                <button key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${active ? "bg-primary-500 text-white shadow-green" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                >
                  {(() => { const Icon = CATEGORY_ICON[cat]; return <Icon size={11} />; })()} {cat} ({count})
                </button>
              );
            })}

            <div className="ml-auto shrink-0 flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-gray-400" />
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl px-3 py-2 bg-white outline-none focus:border-primary-400 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 font-medium">
              Showing <strong className="text-gray-900">{filtered.length}</strong> {filtered.length === 1 ? "result" : "results"}
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {search && ` for "${search}"`}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} className="text-primary-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No produce found</h3>
              <p className="text-gray-400 mb-6">Try a different search term or clear the filters</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold text-sm hover:bg-primary-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
