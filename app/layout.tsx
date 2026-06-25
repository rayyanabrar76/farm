import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Toast from "@/components/Toast";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Agrolync — Farm to Market, Direct",
  description: "Agrolync connects Nigerian and African farmers directly to buyers. Reduce post-harvest losses and earn more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <Nav />
            <main>{children}</main>
            <Toast />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
