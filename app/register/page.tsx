"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, Phone, User, MapPin, Lock, Tractor, Store } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { NIGERIAN_STATES } from "@/lib/data";
import Logo from "@/components/Logo";

type Role = "farmer" | "buyer";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [role, setRole] = useState<Role>("farmer");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", state: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.phone || !form.state || !form.password) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    showToast(`Welcome to Agrolync, ${form.firstName}!`, "success");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen pt-25 flex items-center justify-center px-4 py-12 bg-surface">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-card-hover overflow-hidden border border-gray-100">
          {/* Top bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #2D7A3A 0%, #4CAF72 50%, #F5A623 100%)" }} />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Logo height={38} />
              </div>
              <p className="text-gray-400 text-sm">Create your free account in under 2 minutes</p>
            </div>

            {/* Role picker */}
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">I want to join as a…</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {([
                { id: "farmer" as Role, Icon: Tractor, title: "Farmer", sub: "Sell my produce directly" },
                { id: "buyer"  as Role, Icon: Store,   title: "Buyer",  sub: "Source directly from farms" },
              ] as const).map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    role === r.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === r.id ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"} transition-colors`}>
                    <r.Icon size={22} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.sub}</p>
                  </div>
                  {role === r.id && (
                    <CheckCircle size={15} className="text-primary-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">First Name *</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="firstName" value={form.firstName} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors"
                      placeholder="Musa" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="lastName" value={form.lastName} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors"
                      placeholder="Ibrahim" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel"
                    className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors"
                    placeholder="+234 800 000 0000" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">State / Location *</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select name="state" value={form.state} onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none bg-white transition-colors appearance-none cursor-pointer"
                    required
                  >
                    <option value="">-- Select your state --</option>
                    {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="password" value={form.password} onChange={handleChange} type={showPw ? "text" : "password"}
                    className="w-full pl-9 pr-11 py-3 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors"
                    placeholder="Minimum 8 characters" required minLength={8} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-primary-50 rounded-xl p-4">
                <p className="text-xs font-bold text-primary-600 mb-2 flex items-center gap-1.5"><CheckCircle size={12} /> What you get for free:</p>
                <ul className="space-y-1">
                  {(role === "farmer"
                    ? ["Unlimited produce listings", "Real-time market price alerts", "Direct buyer connections", "Escrow payment protection"]
                    : ["Access to 12,400+ verified farmers", "Competitive direct-from-farm prices", "Quality guarantee on orders", "Real-time delivery tracking"]
                  ).map((b) => (
                    <li key={b} className="text-xs text-primary-700 flex items-center gap-1.5">
                      <CheckCircle size={11} className="text-primary-500 shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-green hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? (
                  <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Creating Account…</>
                ) : (
                  <>Create Free Account →</>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-500 font-semibold hover:underline">Login here</Link>
            </p>

            <div className="mt-5 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-2">No smartphone? No problem.</p>
              <p className="text-sm font-black text-primary-500 tracking-wider">Dial *347# on any phone</p>
              <p className="text-[10px] text-gray-400 mt-1">USSD service — works without internet or data</p>
            </div>

            <p className="text-center text-[11px] text-gray-300 mt-4">
              By signing up you agree to our{" "}
              <Link href="#" className="underline">Terms</Link> and{" "}
              <Link href="#" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
