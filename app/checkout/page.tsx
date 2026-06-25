"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle, Package, Phone, MapPin, User, ChevronDown, Trash2, CreditCard, Banknote } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

const NG_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];

const DELIVERY_FEE = 1500;

export default function CheckoutPage() {
  const { items, total, removeItem, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", state: "", address: "", payment: "escrow" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => "AGR-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Full name required";
    if (!form.phone.trim())   e.phone   = "Phone number required";
    if (!form.state)          e.state   = "Select a delivery state";
    if (!form.address.trim()) e.address = "Delivery address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    clearCart();
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const grandTotal = total + DELIVERY_FEE;

  /* ── ORDER SUCCESS ── */
  if (placed) {
    return (
      <>
        <div className="pt-25 min-h-screen flex items-center justify-center px-4" style={{ background: "#F4F7F4" }}>
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)" }}>
              <CheckCircle size={46} className="text-white" />
            </div>
            <h1 className="font-black text-2xl text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Your order has been sent to the farmers. They will contact you on{" "}
              <strong className="text-gray-800">+234 {form.phone}</strong> to confirm and arrange delivery.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2.5 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Order ID</span>
                <span className="font-black text-gray-900 font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery to</span>
                <span className="font-semibold text-gray-900">{form.state}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment</span>
                <span className="font-semibold text-gray-900">
                  {form.payment === "escrow" ? "Escrow (Protected)" : "Bank Transfer"}
                </span>
              </div>
              <div className="flex justify-between font-black text-base pt-2 border-t border-gray-200">
                <span>Total Paid</span>
                <span className="text-primary-600">₦{grandTotal.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex items-center gap-2">
                <Package size={13} className="text-primary-500 shrink-0" />
                <span className="text-xs text-gray-500">Estimated delivery: <strong>3–5 business days</strong></span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/marketplace"
                className="block w-full py-3.5 rounded-2xl text-white font-black text-sm text-center"
                style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)" }}>
                Continue Shopping
              </Link>
              <Link href="/dashboard"
                className="block w-full py-3 rounded-2xl text-gray-600 font-semibold text-sm text-center border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── EMPTY CART ── */
  if (items.length === 0) {
    return (
      <>
        <div className="pt-25 min-h-screen flex items-center justify-center px-4" style={{ background: "#F4F7F4" }}>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-primary-300" />
            </div>
            <h2 className="font-black text-xl text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Add some produce before checking out</p>
            <Link href="/marketplace"
              className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)" }}>
              Browse Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── CHECKOUT FORM ── */
  return (
    <>
      <div className="pt-25 min-h-screen" style={{ background: "#F4F7F4" }}>
        <div className="max-w-6xl mx-auto px-4 py-8">

          {/* Back */}
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-500 transition-colors mb-6">
            <ArrowLeft size={15} /> Back to Marketplace
          </Link>

          <h1 className="text-2xl font-black text-gray-900 mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── LEFT: form ── */}
            <div className="lg:col-span-3 space-y-5">

              {/* Delivery details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
                  <MapPin size={17} className="text-primary-500" /> Delivery Details
                </h2>
                <div className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                    <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-3 transition-colors ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
                      <User size={14} className="text-gray-400 shrink-0" />
                      <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
                        placeholder="e.g. Amaka Okonkwo"
                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none" />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                    <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-3 transition-colors ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
                      <Phone size={14} className="text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-400 font-semibold shrink-0">+234</span>
                      <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                        placeholder="080 0000 0000"
                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Delivery State</label>
                    <div className={`relative flex items-center border-2 rounded-xl px-3 py-3 transition-colors ${errors.state ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
                      <MapPin size={14} className="text-gray-400 shrink-0 mr-2" />
                      <select value={form.state} onChange={e => set("state", e.target.value)}
                        className="flex-1 bg-transparent text-sm text-gray-900 outline-none appearance-none cursor-pointer">
                        <option value="">Select state</option>
                        {NG_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={13} className="text-gray-400 pointer-events-none shrink-0" />
                    </div>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Delivery Address</label>
                    <div className={`flex items-start gap-2 border-2 rounded-xl px-3 py-3 transition-colors ${errors.address ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
                      <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                      <textarea value={form.address} onChange={e => set("address", e.target.value)}
                        placeholder="Street, area, city..."
                        rows={2}
                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none resize-none" />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
                  <CreditCard size={17} className="text-primary-500" /> Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "escrow", icon: ShieldCheck, title: "Escrow (Recommended)", desc: "Funds held securely and released to farmer only after you confirm delivery.", color: "text-primary-500" },
                    { id: "bank", icon: Banknote, title: "Bank Transfer", desc: "Pay directly to farmer's verified bank account via Paystack.", color: "text-blue-500" },
                  ].map((m) => (
                    <label key={m.id} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.payment === m.id ? "border-primary-400 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="payment" value={m.id} checked={form.payment === m.id}
                        onChange={e => set("payment", e.target.value)} className="mt-0.5 accent-primary-500" />
                      <m.icon size={18} className={`shrink-0 mt-0.5 ${m.color}`} />
                      <div>
                        <p className="font-bold text-sm text-gray-900">{m.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: order summary ── */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.farmer.split(" ")[0]} · {item.cartQty}{item.unit}</p>
                        <p className="text-sm font-black text-primary-600 mt-0.5">₦{(item.price * item.cartQty).toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-300 transition-colors shrink-0">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery fee</span>
                    <span className="font-semibold text-gray-900">₦{DELIVERY_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-black text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-primary-600">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place order */}
                <button onClick={handlePlaceOrder}
                  className="mt-5 w-full py-4 rounded-2xl text-white font-black text-sm transition-all hover:brightness-110 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)", boxShadow: "0 4px 20px rgba(45,122,58,0.30)" }}>
                  Place Order · ₦{grandTotal.toLocaleString()}
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                  <ShieldCheck size={12} className="text-primary-400" />
                  Escrow-protected. Funds released only on delivery confirmation.
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: ShieldCheck, label: "Secure\nPayment" },
                    { icon: Package, label: "Tracked\nDelivery" },
                    { icon: CheckCircle, label: "Quality\nGuaranteed" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1.5">
                      <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                        <b.icon size={16} className="text-primary-500" />
                      </div>
                      <p className="text-[10px] font-semibold text-gray-500 whitespace-pre-line leading-tight">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
