"use client";
import { useState } from "react";
import { CheckCircle, Tractor, Store, ArrowRight } from "lucide-react";

const FARMER_STEPS = [
  { n: "01", title: "Register & Verify", body: "Create your free farmer profile. We verify your farm location and identity to build buyer trust." },
  { n: "02", title: "List Your Produce", body: "Upload photos, set your price, and specify available quantity. Listings go live in under 30 seconds." },
  { n: "03", title: "Receive Orders", body: "Get notified of buyer orders via SMS or app. Confirm, arrange logistics, and get paid instantly." },
  { n: "04", title: "Get Paid Fast", body: "Funds hit your bank account or mobile wallet within 24 hours of order confirmation. Zero delays." },
];

const BUYER_STEPS = [
  { n: "01", title: "Browse & Search", body: "Explore thousands of verified produce listings from farmers across Nigeria and Africa." },
  { n: "02", title: "Compare & Order", body: "Compare prices, quality ratings, and farmer reputations. Place orders with one click." },
  { n: "03", title: "Track Delivery", body: "Real-time logistics tracking from farm to your door. Know exactly where your order is." },
  { n: "04", title: "Rate & Reorder", body: "Leave a review, save your favourite farmers, and set recurring orders for consistent supply." },
];

export default function HowItWorks() {
  const [tab, setTab] = useState<"farmer" | "buyer">("farmer");
  const steps = tab === "farmer" ? FARMER_STEPS : BUYER_STEPS;

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "radial-gradient(circle, #2D7A3A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto relative">
        <p className="section-label text-primary-500">Simple Process</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">How Agrolync Works</h2>
            <p className="text-gray-500 text-lg max-w-md">Whether you&apos;re a farmer or buyer, getting started takes less than 5 minutes.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setTab("farmer")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                tab === "farmer"
                  ? "bg-primary-500 text-white shadow-green"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <Tractor size={15} /> For Farmers
            </button>
            <button
              onClick={() => setTab("buyer")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                tab === "buyer"
                  ? "bg-primary-500 text-white shadow-green"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <Store size={15} /> For Buyers
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative group">
              {/* Connector arrow — hidden on last item and on mobile */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-6 -right-3 z-10 w-6 h-6 items-center justify-center">
                  <ArrowRight size={14} className="text-primary-200" />
                </div>
              )}

              <div className="relative bg-white border-2 border-gray-100 hover:border-primary-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-card group-hover:-translate-y-0.5 h-full">
                {/* Step number bubble */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black mb-5 transition-all duration-300 ${
                  tab === "farmer"
                    ? "bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white"
                    : "bg-accent-50 text-accent-600 group-hover:bg-accent-500 group-hover:text-white"
                }`}>{s.n}</div>

                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>

                {/* Hover checkmark */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <CheckCircle size={15} className={tab === "farmer" ? "text-primary-400" : "text-accent-400"} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
