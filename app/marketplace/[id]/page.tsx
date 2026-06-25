"use client";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Star, MapPin, ShieldCheck, Minus, Plus, ShoppingCart, Zap, CheckCircle, Award, Leaf, MessageCircle } from "lucide-react";
import { PRODUCTS, CATEGORY_ICON } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ChatModal from "@/components/ChatModal";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return notFound();

  const { addItem } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(product.minOrder);
  const [chatOpen, setChatOpen] = useState(false);

  const adjustQty = (delta: number) => {
    setQty((prev) => Math.max(product.minOrder, prev + delta));
  };

  const handleAddToCart = () => {
    addItem(product, qty);
    showToast(`${product.name} added to cart`, "success");
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    showToast("Order placed! Farmer will confirm shortly.", "success");
  };

  const related = PRODUCTS.filter((p) => p.id !== id && p.category === product.category).slice(0, 4);

  return (
    <>
      <div className="pt-[100px] pb-0">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-5">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-500 transition-colors">
            <ArrowLeft size={15} />
            Back to Marketplace
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT — Images */}
            <div>
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-primary-50 shadow-card-hover">
                <Image src={product.img} alt={product.name} fill className="object-cover" unoptimized priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 glass rounded-xl px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1.5">
                  {(() => { const Icon = CATEGORY_ICON[product.category]; return <Icon size={11} />; })()}
                  {product.category}
                </div>
              </div>

              {/* Quality badges */}
              <div className="flex flex-col xs:flex-row gap-3 mt-4">
                <div className="flex-1 flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center"><Award size={15} className="text-primary-500" /></div>
                  <div><p className="text-[10px] text-gray-400 font-medium">Quality</p><p className="text-xs font-bold">{product.quality}</p></div>
                </div>
                <div className="flex-1 flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center"><Leaf size={15} className="text-primary-500" /></div>
                  <div><p className="text-[10px] text-gray-400 font-medium">Method</p><p className="text-xs font-bold">{product.method}</p></div>
                </div>
                <div className="flex-1 flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center"><CheckCircle size={15} className="text-primary-500" /></div>
                  <div><p className="text-[10px] text-gray-400 font-medium">Harvested</p><p className="text-xs font-bold">{product.harvest}</p></div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 bg-primary-50 rounded-2xl p-5">
                <p className="text-xs font-bold text-primary-600 mb-2 uppercase tracking-wide">Product Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{product.desc}</p>
              </div>
            </div>

            {/* RIGHT — Info */}
            <div>
              {/* Category & Title */}
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                {(() => { const Icon = CATEGORY_ICON[product.category]; return <Icon size={11} />; })()}
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15}
                      className={i < Math.floor(product.rating) ? "fill-accent-500 text-accent-500" : "fill-gray-200 text-gray-200"}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-gray-800">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews} verified reviews)</span>
              </div>

              {/* Price box */}
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 mb-5">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-4xl font-black text-primary-500">₦{product.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm font-medium">per {product.unit}</span>
                </div>
                <p className="text-xs text-gray-500">Minimum order: <strong>{product.minOrder}kg</strong> · <strong>{product.qty.toLocaleString()}kg</strong> available</p>

                {/* Total calc */}
                <div className="mt-3 pt-3 border-t border-primary-100 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Order total ({qty}kg)</span>
                  <span className="font-black text-primary-600 text-base">₦{(product.price * qty).toLocaleString()}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-5">
                <CheckCircle size={16} />
                In Stock · Ready for dispatch
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <MapPin size={14} className="text-gray-400" />
                {product.location}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-gray-700">Quantity (kg):</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => adjustQty(-product.minOrder)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-200"
                  ><Minus size={14} /></button>
                  <span className="w-16 text-center font-bold text-sm">{qty}</span>
                  <button onClick={() => adjustQty(product.minOrder)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-200"
                  ><Plus size={14} /></button>
                </div>
                <span className="text-xs text-gray-400">Min. {product.minOrder}kg</span>
              </div>

              {/* Farmer card */}
              <div className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-2xl mb-6 hover:border-primary-100 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {product.farmerInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{product.farmer}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <MapPin size={11} />{product.location}
                  </div>
                  {product.verified && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary-500 mt-1">
                      <ShieldCheck size={12} /> Verified Farmer · <Star size={10} className="fill-accent-500 text-accent-500" /> {product.rating} · {product.reviews} completed orders
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary-500 border-2 border-primary-100 hover:bg-primary-50 px-3 py-2 rounded-xl transition-colors shrink-0"
                >
                  <MessageCircle size={13} /> Chat
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-5">
                <button onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-primary-500 text-primary-500 hover:bg-primary-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  <ShoppingCart size={17} /> Add to Cart
                </button>
                <button onClick={handleBuyNow}
                  className="flex-2 flex items-center justify-center gap-2 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold text-sm transition-colors shadow-green"
                >
                  <Zap size={17} /> Buy Now
                </button>
              </div>

              {/* Escrow note */}
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <ShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Secure Escrow Payment:</strong> Your funds are held safely until delivery is confirmed by both parties. 100% money-back guarantee on quality issues.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-black text-gray-900 mb-6">More {product.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ChatModal
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        farmerName={product.farmer}
        farmerInitial={product.farmerInitial}
        produceName={product.name}
      />
    </>
  );
}
