"use client";
import {
  Bell, ArrowLeft, Search, Package, Truck, Send, LayoutGrid,
  Home, BarChart3, LifeBuoy, Settings, ArrowDownLeft,
} from "lucide-react";

/* Two-phone hero composition (Kasuwa-style): a wallet phone in front and an
   orders phone angled behind. Each phone gently floats (mkFloat), with rotation
   on an outer wrapper so the float's translate composes cleanly. Frozen under
   prefers-reduced-motion via the .persona-phone rule in globals.css. */

const QUICK = [
  { Icon: Package, label: "Orders" },
  { Icon: Truck, label: "Delivery" },
  { Icon: Send, label: "Send" },
  { Icon: LayoutGrid, label: "More" },
];

const TX = [
  { name: "agriarche limited", date: "Thu Nov 16, 11:08am", amt: "₦100" },
  { name: "agriarche limited", date: "Thu Nov 16, 9:30am", amt: "₦100" },
  { name: "olatunde petwilson", date: "Mon Nov 13, 9:07am", amt: "₦500" },
];

const ORDERS = [
  { name: "Maize",        status: "Available", color: "#E0820A" },
  { name: "Sorghum",      status: "Accepted",  color: "#1A8A3A" },
  { name: "Cashew",       status: "Closed",    color: "#DC2626" },
  { name: "Rice paddy",   status: "Available", color: "#E0820A" },
  { name: "Sesame seeds", status: "Available", color: "#E0820A" },
  { name: "Almond",       status: "Accepted",  color: "#1A8A3A" },
];

function Phone({
  w, h, rotate, z, delay, posClass, children,
}: {
  w: number; h: number; rotate: number; z: number; delay: string; posClass: string; children: React.ReactNode;
}) {
  return (
    <div className={`absolute ${posClass}`} style={{ zIndex: z, transform: `rotate(${rotate}deg)` }}>
      <div style={{ animation: "mkFloat 6.5s ease-in-out infinite", animationDelay: delay }}>
        <div className="relative rounded-[1.9rem] p-[5px]" style={{ background: "#141414", boxShadow: "0 28px 60px rgba(0,0,0,0.32)" }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-11 h-3 bg-black rounded-full z-20" />
          <div className="relative bg-white rounded-[1.55rem] overflow-hidden" style={{ width: w, height: h }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-7 flex items-end justify-between px-3.5 pb-1">
      <span className="text-[8px] font-bold text-gray-900">9:41</span>
      <span className="text-[7px] text-gray-500">▦ ▮ 100%</span>
    </div>
  );
}

function WalletScreen() {
  return (
    <div className="h-full flex flex-col">
      <StatusBar />
      <div className="px-3.5 pt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-200 to-primary-400" />
          <div className="leading-none">
            <p className="text-[7px] text-gray-400">Hello,</p>
            <p className="text-[11px] font-black text-gray-900">Test</p>
          </div>
        </div>
        <Bell size={13} className="text-gray-400" />
      </div>

      {/* balance card */}
      <div className="mx-3.5 mt-2.5 rounded-2xl p-3 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg,#F5A623,#E0820A)" }}>
        <p className="text-[15px] font-black">₦1,046.9</p>
        <div className="flex justify-between mt-3.5 text-[7px]">
          <div><p className="opacity-75">Account Status</p><p className="font-bold mt-0.5">ACTIVE</p></div>
          <div className="text-right"><p className="opacity-75">Account Number</p><p className="font-bold mt-0.5">8900355016</p></div>
        </div>
      </div>

      {/* quick access */}
      <div className="px-3.5 mt-3">
        <p className="text-[9px] font-bold text-gray-700 mb-2">Quick Access</p>
        <div className="flex justify-between">
          {QUICK.map((q) => (
            <div key={q.label} className="flex flex-col items-center gap-1">
              <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                <q.Icon size={13} style={{ color: "#E0820A" }} />
              </span>
              <span className="text-[7px] text-gray-500">{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* recent transactions */}
      <div className="px-3.5 mt-3 flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-bold text-gray-700">Recent Transactions</p>
          <p className="text-[7px] font-bold text-primary-600">See all</p>
        </div>
        <div className="space-y-2.5">
          {TX.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <ArrowDownLeft size={11} className="text-green-600" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-bold text-gray-800 truncate">{t.name}</p>
                <p className="text-[6.5px] text-gray-400">{t.date}</p>
              </div>
              <span className="text-[9px] font-black text-gray-900">{t.amt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom nav */}
      <div className="border-t border-gray-100 flex justify-around py-2">
        {[[Home, true], [BarChart3, false], [LifeBuoy, false], [Settings, false]].map(([Ic, a], i) => {
          const Icon = Ic as typeof Home;
          return <Icon key={i} size={13} style={{ color: a ? "#E0820A" : "#cbd5e1" }} />;
        })}
      </div>
    </div>
  );
}

function OrdersScreen() {
  return (
    <div className="h-full flex flex-col">
      <StatusBar />
      <div className="px-3.5 pt-1 flex items-center justify-between border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-2">
          <ArrowLeft size={13} className="text-gray-700" />
          <span className="text-[12px] font-black text-gray-900">Orders</span>
        </div>
      </div>
      <div className="px-3.5 py-2.5">
        <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5">
          <Search size={11} className="text-gray-400" />
          <span className="text-[8px] text-gray-400">Name, commodity, price</span>
        </div>
      </div>
      <div className="px-3.5 flex-1 overflow-hidden">
        {ORDERS.map((o) => (
          <div key={o.name} className="flex items-center justify-between py-2.5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gray-100" />
              <div className="leading-tight">
                <p className="text-[9px] font-bold text-gray-900">{o.name}</p>
                <p className="text-[6.5px] text-gray-400">Mubi, Adamawa</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black" style={{ color: o.color }}>{o.status}</p>
              <p className="text-[8px] font-bold text-gray-700 mt-0.5">₦345/KG</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroDualPhones() {
  return (
    <div className="persona-phone relative scale-[0.78] xs:scale-90 sm:scale-100" style={{ width: 340, height: 430 }}>
      {/* Back phone — Orders, angled right */}
      <Phone w={184} h={392} rotate={7} z={10} delay="0s" posClass="right-0 top-0">
        <OrdersScreen />
      </Phone>
      {/* Front phone — Wallet, angled left */}
      <Phone w={196} h={404} rotate={-5} z={20} delay="0.7s" posClass="left-0 top-6">
        <WalletScreen />
      </Phone>
    </div>
  );
}
