"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone, Lock, Star } from "lucide-react";
import Logo from "@/components/Logo";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.password) { showToast("Please fill in all fields", "error"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    showToast("Welcome back, Alhaji Musa!", "success");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen pt-[100px] flex bg-surface">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between flex-1 relative overflow-hidden p-12"
        style={{ background: "linear-gradient(150deg, #071809 0%, #0E3317 45%, #1B5E28 100%)" }}
      >
        <div className="hero-pattern absolute inset-0" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(76,175,114,0.08) 0%, transparent 70%)" }} />

        {/* Logo */}
        <div className="relative">
          <Logo height={36} onDark />
        </div>

        {/* Quote */}
        <div className="relative">
          <div className="text-7xl font-black text-white/6 leading-none mb-2 select-none" style={{ fontFamily: "Georgia, serif" }}>&ldquo;</div>
          <p className="text-4xl font-black text-white/90 leading-tight mb-8 -mt-4">
            From farm<br />to market,<br /><span className="gradient-text">direct.</span>
          </p>
          <div className="flex gap-10">
            {[["₦2.8B+", "Processed"], ["12k+", "Farmers"], ["67%", "Less Waste"]].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-accent-400">{n}</p>
                <p className="text-[11px] text-white/45 mt-0.5 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative glass rounded-2xl p-5">
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-accent-400 text-accent-400" />)}
          </div>
          <p className="text-white/72 text-sm italic leading-relaxed">
            &ldquo;My income tripled in one year. Agrolync changed everything for my family.&rdquo;
          </p>
          <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/10">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">AK</div>
            <div>
              <p className="text-white text-xs font-semibold">Aisha Kano</p>
              <p className="text-white/40 text-[10px] mt-0.5">Tomato Farmer, Kaduna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex items-center justify-center w-full lg:w-120 shrink-0 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-card-hover overflow-hidden border border-gray-100">
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #2D7A3A 0%, #4CAF72 50%, #F5A623 100%)" }} />

            <div className="p-8">
              {/* Logo (mobile only) */}
              <div className="lg:hidden flex justify-center mb-6">
                <Logo height={36} />
              </div>

              <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome back</h1>
              <p className="text-gray-400 text-sm mb-7">Login to your Agrolync account</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="phone" value={form.phone} onChange={handleChange} type="tel"
                      className="w-full pl-9 pr-4 py-3.5 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors"
                      placeholder="+234 800 000 0000" required />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-gray-700">Password</label>
                    <Link href="#" className="text-xs text-primary-500 font-semibold hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="password" value={form.password} onChange={handleChange} type={showPw ? "text" : "password"}
                      className="w-full pl-9 pr-11 py-3.5 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors"
                      placeholder="Your password" required />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-green hover:-translate-y-0.5 disabled:transform-none"
                >
                  {loading ? (
                    <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Logging in…</>
                  ) : "Login →"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-5">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary-500 font-semibold hover:underline">Sign up free</Link>
              </p>

              {/* USSD divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
                <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or login without internet</span></div>
              </div>

              <div className="text-center bg-primary-50 rounded-2xl p-5">
                <p className="text-xs text-gray-400 mb-1.5">No smartphone or data? Use USSD</p>
                <p className="text-2xl font-black text-primary-500 tracking-widest">*347#</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Works on any mobile network · No internet required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
