"use client";
import { useState } from "react";
import { X, ShieldCheck, CheckCircle, Package, Phone, MapPin, MessageSquare, User, ChevronDown } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/lib/data";

const NG_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product;
  qty: number;
}

type Step = "form" | "confirm";

export default function OrderRequestModal({ open, onClose, product, qty: initialQty }: Props) {
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>("form");
  const [orderId] = useState(() => "AGR-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  const [form, setForm] = useState({
    name: "",
    phone: "",
    state: "",
    address: "",
    qty: initialQty,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string | number) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.phone.trim())   e.phone   = "Phone number is required";
    if (!form.state)          e.state   = "Select a delivery state";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (form.qty < product.minOrder) e.qty = `Minimum order is ${product.minOrder}${product.unit}`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Mock submit — persist the request locally until a backend exists.
    try {
      const req = {
        orderId,
        produce: product.name,
        farmer: product.farmer,
        ...form,
        submittedAt: new Date().toISOString(),
      };
      const key = "agrolync_order_requests";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([...existing, req]));
    } catch { /* ignore storage errors */ }
    showToast(`Request sent to ${product.farmer.split(" ")[0]}`, "success");
    setStep("confirm");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep("form"); }, 400);
  };

  if (!open) return null;

  const total = product.price * form.qty;

  return (
    <div className="fixed inset-0 z-300 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "92vh" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-black text-gray-900 text-lg">
              {step === "form" ? "Request this produce" : "Request Sent!"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {step === "form" ? `Ordering from ${product.farmer}` : `Order ID: ${orderId}`}
            </p>
          </div>
          <button onClick={handleClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <X size={17} />
          </button>
        </div>

        {/* ── FORM STEP ── */}
        {step === "form" && (
          <>
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

              {/* Product summary */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-primary-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.farmer} · {product.state}</p>
                  <p className="text-xs text-gray-400 mt-0.5">from ₦{product.price.toLocaleString()}/{product.unit}</p>
                </div>
                {product.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-primary-500 shrink-0">
                    <ShieldCheck size={11} /> Verified
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Quantity ({product.unit}) <span className="text-gray-400 font-normal">· Min. {product.minOrder}{product.unit}</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => set("qty", Math.max(product.minOrder, form.qty - product.minOrder))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 border-r border-gray-200 font-bold text-lg transition-colors">−</button>
                    <span className="w-16 text-center font-black text-sm">{form.qty}</span>
                    <button onClick={() => set("qty", form.qty + product.minOrder)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 border-l border-gray-200 font-bold text-lg transition-colors">+</button>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5">
                    <p className="text-[10px] text-gray-400 font-medium">Est. value · no payment now</p>
                    <p className="font-semibold text-gray-600 text-sm">₦{total.toLocaleString()}</p>
                  </div>
                </div>
                {errors.qty && <p className="text-red-500 text-xs mt-1">{errors.qty}</p>}
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
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
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
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
                <div className={`relative flex items-center border-2 rounded-xl px-3 py-2.5 transition-colors ${errors.state ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
                  <MapPin size={14} className="text-gray-400 shrink-0 mr-2" />
                  <select value={form.state} onChange={e => set("state", e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none appearance-none cursor-pointer">
                    <option value="">Select state</option>
                    {NG_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={13} className="text-gray-400 shrink-0 pointer-events-none" />
                </div>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Delivery Address</label>
                <div className={`flex items-start gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors ${errors.address ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-primary-400"}`}>
                  <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <textarea value={form.address} onChange={e => set("address", e.target.value)}
                    placeholder="Street, area, city..."
                    rows={2}
                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none resize-none" />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Message to Farmer <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-start gap-2 border-2 border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-primary-400 transition-colors">
                  <MessageSquare size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <textarea value={form.message} onChange={e => set("message", e.target.value)}
                    placeholder="Any special requirements, preferred harvest date..."
                    rows={2}
                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none resize-none" />
                </div>
              </div>

              {/* No-payment request note */}
              <div className="flex items-start gap-2.5 bg-primary-50 border border-primary-100 rounded-xl p-3">
                <ShieldCheck size={15} className="text-primary-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-primary-800 leading-relaxed">
                  <strong>No payment now.</strong> Send your request and the farmer will reach out to confirm availability, pricing and delivery directly with you.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-3 border-t border-gray-100 shrink-0 flex gap-3">
              <button onClick={handleClose}
                className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex-2 py-3.5 rounded-2xl text-white font-black text-sm transition-all hover:brightness-110 active:scale-95"
                style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)", boxShadow: "0 4px 20px rgba(45,122,58,0.35)", flex: 2 }}>
                Send Order Request
              </button>
            </div>
          </>
        )}

        {/* ── CONFIRM STEP ── */}
        {step === "confirm" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)" }}>
              <CheckCircle size={38} className="text-white" />
            </div>
            <h3 className="font-black text-gray-900 text-xl mb-2">Request Sent!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Your order request has been sent to <strong className="text-gray-800">{product.farmer}</strong>.
              They will contact you on <strong className="text-gray-800">+234 {form.phone}</strong> within 24 hours.
            </p>

            {/* Order summary card */}
            <div className="w-full bg-gray-50 rounded-2xl p-4 text-left space-y-2.5 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Order ID</span>
                <span className="font-black text-gray-900 font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Produce</span>
                <span className="font-semibold text-gray-900">{product.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Quantity</span>
                <span className="font-semibold text-gray-900">{form.qty}{product.unit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Est. value</span>
                <span className="font-semibold text-gray-600">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery</span>
                <span className="font-semibold text-gray-900">{form.state}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex items-center gap-2">
                <Package size={13} className="text-primary-500 shrink-0" />
                <span className="text-xs text-gray-500">Estimated delivery: <strong>3–5 business days</strong> after confirmation</span>
              </div>
            </div>

            <button onClick={handleClose}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm"
              style={{ background: "linear-gradient(135deg, #1B5E28, #4CAF72)" }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
