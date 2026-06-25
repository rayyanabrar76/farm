"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartSidebar from "./CartSidebar";
import Logo from "./Logo";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/register", label: "List Produce" },
];

export default function Nav() {
  const pathname = usePathname();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none shrink-0" aria-label="Agrolync home">
            <Logo height={48} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href}
                  className={clsx(
                    "px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors",
                    active
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search bar — desktop */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-64 hover:border-gray-300 transition-colors">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search produce..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Login */}
            <Link href="/login"
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              Login
            </Link>

            {/* Sign up */}
            <Link href="/register"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #2D7A3A, #4CAF72)", boxShadow: "0 2px 12px rgba(45,122,58,0.35)" }}
            >
              <span className="text-base leading-none">+</span> Get Started
            </Link>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={17} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: search + cart + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Search size={17} />
            </button>
            <button onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <ShoppingCart size={17} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu">
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mt-2">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search produce..."
                autoFocus
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-3 py-3 flex flex-col gap-0.5">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className={clsx("px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                pathname === "/" ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-50")}>
              Home
            </Link>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                onClick={() => setMobileOpen(false)}
                className={clsx("px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                  pathname === l.href ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-50"
                )}>
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold">
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-3 rounded-xl text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #2D7A3A, #4CAF72)" }}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
