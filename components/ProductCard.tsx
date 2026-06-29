"use client";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Package, ShieldCheck } from "lucide-react";
import OrderRequestModal from "./OrderRequestModal";
import type { Product } from "@/lib/data";

interface Props { product: Product; }

const CARD_BG: Record<string, string> = {
  Vegetables:   "linear-gradient(160deg, #d4edda 0%, #a8d5b5 100%)",
  Grains:       "linear-gradient(160deg, #fdf0d5 0%, #f5d48e 100%)",
  Tubers:       "linear-gradient(160deg, #fde8d4 0%, #f0b07a 100%)",
  Fruits:       "linear-gradient(160deg, #e8f8f0 0%, #9de0bc 100%)",
  Legumes:      "linear-gradient(160deg, #edf7d6 0%, #b8e06a 100%)",
  "Cash Crops": "linear-gradient(160deg, #ecdcc8 0%, #c8956a 100%)",
};

export default function ProductCard({ product: p }: Props) {
  const [requestOpen, setRequestOpen] = useState(false);

  const handleRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRequestOpen(true);
  };

  return (
    <div className="flex flex-col group">
      {/* Image area — editorial, larger */}
      <Link href={`/marketplace/${p.id}`} className="block relative rounded-2xl overflow-hidden mb-3 sm:mb-4"
        style={{ aspectRatio: "4/5", background: CARD_BG[p.category] ?? CARD_BG.Vegetables }}>

        {/* Crop badge — top left */}
        {p.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] sm:text-[11px] font-bold text-white bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/12">
              {p.badge}
            </span>
          </div>
        )}

        {/* Verified — top right */}
        {p.verified && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-white backdrop-blur-md px-2 py-1 rounded-full"
            style={{ background: "rgba(26,85,20,0.72)" }}>
            <ShieldCheck size={9} /> <span className="hidden xs:inline">Verified</span>
          </div>
        )}

        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={`${p.name} — grown by ${p.farmer} in ${p.state}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />

        {/* Mobile: always-visible request button (bottom-right corner) */}
        <button
          onClick={handleRequest}
          className="sm:hidden absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-700 hover:bg-primary-50 transition-colors"
          aria-label="Request this produce"
        >
          <Package size={14} />
        </button>

        {/* Desktop: hover-reveal Request bar */}
        <div className="hidden sm:block absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3"
          style={{ background: "linear-gradient(to top, rgba(7,18,8,0.78) 0%, transparent 100%)" }}>
          <button
            onClick={handleRequest}
            className="w-full py-2.5 rounded-xl bg-white text-primary-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary-50 transition-colors"
          >
            <Package size={13} /> Request this produce
          </button>
        </div>
      </Link>

      {/* Info — crop + farm emphasized, price muted */}
      <Link href={`/marketplace/${p.id}`} className="block px-0.5">
        <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-1">{p.name}</h3>
        <p className="text-primary-700 text-xs sm:text-sm font-semibold mt-1 flex items-center gap-1.5 truncate">
          <MapPin size={12} className="shrink-0 text-primary-500" />
          {p.farmer} · {p.state}
        </p>
        <div className="flex items-center justify-between mt-2.5 gap-2">
          <p className="text-gray-500 text-xs sm:text-sm">
            <span className="text-gray-400">from</span>{" "}
            <span className="font-semibold text-gray-600">₦{p.price.toLocaleString()}</span>
            <span className="text-gray-400">/{p.unit}</span>
          </p>
          {p.quality && (
            <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full shrink-0">
              {p.quality}
            </span>
          )}
        </div>
      </Link>

      {/* Order request flow (replaces cart) */}
      <OrderRequestModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        product={p}
        qty={p.minOrder}
      />
    </div>
  );
}
