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
      {/* ── Card image area (Arena Club portrait style) ── */}
      <Link href={`/marketplace/${p.id}`} className="group block relative rounded-2xl overflow-hidden mb-3"
        style={{ aspectRatio: "3/4", background: CARD_BG[p.category] ?? CARD_BG.Vegetables }}>

        {/* Badge chip — top left */}
        {p.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[11px] font-bold text-white bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/12">
              {p.badge}
            </span>
          </div>
        )}

        {/* Verified chip — top right */}
        {p.verified && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10px] font-bold text-white bg-primary-600/70 backdrop-blur-md px-2 py-1 rounded-full">
            <ShieldCheck size={9} /> Verified
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

        {/* Bottom gradient + Add to Cart on hover */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
          <button
            onClick={handleAdd}
            className="w-full py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-accent-400 transition-colors"
          >
            <ShoppingCart size={13} /> Add to Cart
          </button>
        </div>
      </Link>

      {/* ── Info below card (Arena Club style) ── */}
      <Link href={`/marketplace/${p.id}`} className="block px-0.5">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{p.name}</h3>
        <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1 truncate">
          <MapPin size={10} className="shrink-0" />
          {p.farmer} · {p.state}
        </p>
        <p className="font-black text-gray-900 text-base mt-1.5">
          ₦{p.price.toLocaleString()}
          <span className="text-gray-400 font-normal text-xs ml-0.5">/{p.unit}</span>
        </p>
      </Link>
    </div>
  );
}
