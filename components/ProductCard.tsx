"use client";
import Link from "next/link";
import { MapPin, ShoppingCart, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
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
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(p);
    showToast(`${p.name} added to cart`, "success");
  };

  return (
    <div className="flex flex-col">
      {/* Image area */}
      <Link href={`/marketplace/${p.id}`} className="group block relative rounded-2xl overflow-hidden mb-2 sm:mb-3"
        style={{ aspectRatio: "3/4", background: CARD_BG[p.category] ?? CARD_BG.Vegetables }}>

        {/* Badge — top left */}
        {p.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span className="text-[10px] sm:text-[11px] font-bold text-white bg-black/35 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/12">
              {p.badge}
            </span>
          </div>
        )}

        {/* Verified — top right */}
        {p.verified && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-white bg-primary-600/70 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <ShieldCheck size={8} /> <span className="hidden xs:inline">Verified</span>
          </div>
        )}

        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={p.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />

        {/* Mobile: always-visible cart button (bottom-right corner) */}
        <button
          onClick={handleAdd}
          className="sm:hidden absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-900 hover:bg-accent-400 transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingCart size={13} />
        </button>

        {/* Desktop: hover-reveal Add to Cart bar */}
        <div className="hidden sm:block absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
          <button
            onClick={handleAdd}
            className="w-full py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-accent-400 transition-colors"
          >
            <ShoppingCart size={13} /> Add to Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <Link href={`/marketplace/${p.id}`} className="block px-0.5">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight line-clamp-1">{p.name}</h3>
        <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 flex items-center gap-1 truncate">
          <MapPin size={9} className="shrink-0" />
          {p.farmer} · {p.state}
        </p>
        <p className="font-black text-gray-900 text-sm sm:text-base mt-1">
          ₦{p.price.toLocaleString()}
          <span className="text-gray-400 font-normal text-[10px] sm:text-xs ml-0.5">/{p.unit}</span>
        </p>
      </Link>
    </div>
  );
}
