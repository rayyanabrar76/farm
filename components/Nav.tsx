"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 bg-white/94 backdrop-blur-xl border-b border-gray-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none" aria-label="Agrolync home">
            <Logo height={38} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href}
                  className={clsx(
                    "relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors",
                    active
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              Login
            </Link>
            <Link href="/register"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors shadow-green"
            >
              Get Started
            </Link>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={19} className="text-gray-600" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {count}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-3 py-3 flex flex-col gap-0.5">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  pathname === l.href ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold"
              >Login</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold"
              >Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
