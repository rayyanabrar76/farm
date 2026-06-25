"use client";
import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Package, DollarSign, Star, Leaf, Bell, CheckCircle, Eye, Edit3, Trash2, Hand, X } from "lucide-react";
import AddListingModal from "@/components/AddListingModal";
import { useToast } from "@/context/ToastContext";

const KPIs = [
  { label: "Monthly Earnings", value: "₦384,500", change: "+23%", trend: "up", icon: DollarSign, color: "from-primary-500 to-primary-400" },
  { label: "Active Orders", value: "7", change: "+2 today", trend: "up", icon: Package, color: "from-blue-500 to-blue-400" },
  { label: "Listed Produce", value: "4", change: "2,100 kg total", trend: "neutral", icon: Leaf, color: "from-teal-500 to-teal-400" },
  { label: "Farmer Rating", value: "4.8", change: "Top 5% on platform", trend: "up", icon: Star, color: "from-accent-500 to-accent-400" },
  { label: "Waste Reduction", value: "91%", change: "vs 52% before", trend: "up", icon: TrendingUp, color: "from-green-500 to-green-400" },
];

const MY_LISTINGS = [
  { name: "Tumatir (Tomato)", category: "Vegetables", qty: 1200, price: 380, status: "active", stock: "ok" },
  { name: "Masara (Maize)", category: "Grains", qty: 800, price: 170, status: "active", stock: "ok" },
  { name: "Tatasai (Scotch Bonnet)", category: "Vegetables", qty: 80, price: 1200, status: "active", stock: "low" },
  { name: "Albasa (Onion)", category: "Vegetables", qty: 0, price: 290, status: "paused", stock: "out" },
];

const ORDERS_INITIAL = [
  { id: 1, name: "Tumatir — 300kg", buyer: "Chidi Restaurants, Lagos", amount: "₦114,000", status: "pending", time: "2 hours ago" },
  { id: 2, name: "Masara — 500kg", buyer: "Flour Mills Nigeria Ltd", amount: "₦85,000", status: "confirmed", time: "Yesterday" },
  { id: 3, name: "Alayyahu — 80kg", buyer: "FoodCo Supermarket", amount: "₦28,000", status: "delivered", time: "3 days ago" },
  { id: 4, name: "Albasa — 200kg", buyer: "Market Vendor, Kano", amount: "₦58,000", status: "delivered", time: "5 days ago" },
];

const PRICES = [
  { name: "Tumatir", price: 380, change: 12, trend: "up" },
  { name: "Masara", price: 170, change: 3, trend: "down" },
  { name: "Ji Ocha", price: 450, change: 5, trend: "up" },
  { name: "Wake", price: 520, change: 8, trend: "up" },
  { name: "Manja (1L)", price: 1800, change: 2, trend: "down" },
];

const SALES_BARS = [
  { label: "Tumatir", amount: "₦198k", pct: 85 },
  { label: "Masara", amount: "₦85k", pct: 55 },
  { label: "Tatasai", amount: "₦62k", pct: 40 },
  { label: "Alayyahu", amount: "₦28k", pct: 22 },
  { label: "Albasa", amount: "₦11.5k", pct: 12 },
];

const ACTIVITY = [
  { dot: "bg-accent-500", text: "New buyer inquiry on your Tomato listing", time: "5 minutes ago" },
  { dot: "bg-primary-500", text: "₦85,000 payment confirmed — Maize order #2847", time: "2 hours ago" },
  { dot: "bg-blue-400", text: "New 5-star review from Chidi Restaurants", time: "Yesterday 14:30" },
  { dot: "bg-primary-400", text: "Tomato price alert: market rate up to ₦410/kg", time: "Yesterday 09:00" },
  { dot: "bg-green-400", text: "Profile verified — Tier 2 farmer badge earned", time: "3 days ago" },
];

const STATUS_STYLES = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  delivered: "bg-blue-100 text-blue-700",
};
const STOCK_DOT = { ok: "bg-green-500", low: "bg-amber-400", out: "bg-red-400" };
const STOCK_LABEL = { ok: "In Stock", low: "Low Stock", out: "Out of Stock" };

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [listings, setListings] = useState(MY_LISTINGS);
  const [orders, setOrders] = useState(ORDERS_INITIAL);
  const { showToast } = useToast();

  const confirmOrder = () => {
    setAlertVisible(false);
    setOrders((prev) =>
      prev.map((o) => (o.id === 1 ? { ...o, status: "confirmed" } : o))
    );
    showToast("Order confirmed! Chidi Restaurants notified.", "success");
  };

  const deleteListing = (name: string) => {
    setListings((prev) => prev.filter((l) => l.name !== name));
    showToast(`"${name}" removed from listings.`, "info");
  };

  const editListing = (name: string) => {
    showToast(`Opening editor for "${name}"…`, "info");
    setModalOpen(true);
  };

  return (
    <>
      <div className="pt-16 min-h-screen" style={{ background: "#F4F7F4" }}>
        {/* Dashboard header band */}
        <div className="relative overflow-hidden px-4 py-8" style={{ background: "linear-gradient(135deg, #0E3317 0%, #1B5E28 60%, #2D7A3A 100%)" }}>
          <div className="hero-pattern absolute inset-0 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)" }} />
          <div className="max-w-7xl mx-auto relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-white/55 text-xs font-semibold uppercase tracking-widest mb-1">Farmer Dashboard</p>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Good morning, <span className="text-accent-400">Alhaji Musa</span>
              </h1>
              <p className="text-white/45 text-sm mt-1 flex items-center gap-2">
                Kano State · Member since Jan 2024 · <Star size={11} className="inline fill-accent-400 text-accent-400" /> 4.8 · Tier 2 Verified
              </p>
            </div>
            <button onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-accent-500 hover:bg-accent-400 text-gray-900 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ boxShadow: "0 4px 20px rgba(245,166,35,0.30)" }}
            >
              <Plus size={16} /> List New Produce
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Alert */}
          {alertVisible && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
              <Bell size={18} className="text-amber-500 shrink-0" />
              <p className="text-sm text-amber-800 flex-1">
                <strong>New order!</strong> Chidi Restaurants requesting <strong>500kg of Tomatoes</strong> at ₦380/kg.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={confirmOrder}
                  className="text-xs font-bold text-white bg-primary-500 hover:bg-primary-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  <CheckCircle size={12} /> Confirm
                </button>
                <button
                  onClick={() => setAlertVisible(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-amber-100 text-amber-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {KPIs.map((kpi) => (
              <div key={kpi.label}
                className={`relative overflow-hidden rounded-2xl p-5 bg-linear-to-br ${kpi.color} text-white shadow-card card-shine`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center mb-4">
                  <kpi.icon size={18} />
                </div>
                <p className="text-2xl font-black mb-0.5 tracking-tight">{kpi.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">{kpi.label}</p>
                <p className="text-[11px] opacity-60 font-medium">{kpi.change}</p>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* My Listings */}
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-50">
                  <h2 className="font-bold text-gray-900">My Active Listings</h2>
                  <button onClick={() => setModalOpen(true)}
                    className="text-xs font-bold text-primary-500 border border-primary-100 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus size={12} /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-50">
                        {["Produce", "Category", "Qty (kg)", "Price/kg", "Stock", "Actions"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {listings.length === 0 && (
                        <tr><td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-400">No listings yet. Add your first produce above.</td></tr>
                      )}
                      {listings.map((l) => (
                        <tr key={l.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3.5 font-semibold text-gray-900 whitespace-nowrap">{l.name}</td>
                          <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{l.category}</td>
                          <td className="px-5 py-3.5 text-gray-700 font-medium">{l.qty.toLocaleString()}</td>
                          <td className="px-5 py-3.5 font-semibold text-gray-900">₦{l.price.toLocaleString()}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-2 h-2 rounded-full ${STOCK_DOT[l.stock as keyof typeof STOCK_DOT]}`} />
                              <span className="text-xs font-medium text-gray-600 whitespace-nowrap">{STOCK_LABEL[l.stock as keyof typeof STOCK_LABEL]}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <button onClick={() => showToast(`Viewing ${l.name} listing`, "info")} className="w-7 h-7 rounded-lg hover:bg-primary-50 hover:text-primary-500 flex items-center justify-center text-gray-400 transition-colors"><Eye size={13} /></button>
                              <button onClick={() => editListing(l.name)} className="w-7 h-7 rounded-lg hover:bg-primary-50 hover:text-primary-500 flex items-center justify-center text-gray-400 transition-colors"><Edit3 size={13} /></button>
                              <button onClick={() => deleteListing(l.name)} className="w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-400 flex items-center justify-center text-gray-400 transition-colors"><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900">Recent Orders</h2>
                  <span className="text-xs font-semibold text-primary-500 cursor-pointer hover:underline">View all →</span>
                </div>
                <div className="flex flex-col gap-3">
                  {orders.map((o) => (
                    <div key={o.id} className="flex items-center gap-3.5 p-3 bg-gray-50 rounded-xl">
                      <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                        <Package size={18} className="text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{o.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{o.buyer} · {o.time}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm text-gray-900">{o.amount}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${STATUS_STYLES[o.status as keyof typeof STATUS_STYLES]}`}>
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT (1 col) */}
            <div className="flex flex-col gap-6">

              {/* Sales chart */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <h2 className="font-bold text-gray-900 mb-4">Sales by Produce (This Month)</h2>
                <div className="flex flex-col gap-3">
                  {SALES_BARS.map((b) => (
                    <div key={b.label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-14 text-right shrink-0">{b.label}</span>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${b.pct}%`, background: "linear-gradient(90deg, #2D7A3A, #4CAF72)" }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-12 shrink-0">{b.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Total this month</span>
                  <span className="font-black text-primary-500 text-base">₦384,500</span>
                </div>
              </div>

              {/* Price tracker */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900">Market Price Tracker</h2>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Live · 1hr ago</span>
                </div>
                <div className="flex flex-col gap-2">
                  {PRICES.map((p) => (
                    <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm font-semibold text-gray-700">{p.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">₦{p.price}/kg</span>
                        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                          {p.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {p.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <h2 className="font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="flex flex-col gap-3">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 shrink-0">
                        <div className={`w-2 h-2 rounded-full ${a.dot}`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-800 leading-relaxed">{a.text}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddListingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
