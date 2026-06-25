import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import AnnouncementBar from "@/components/AnnouncementBar";
import Toast from "@/components/Toast";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Agrolync - Farm to Market, Direct",
  description: "Agrolync connects Nigerian and African farmers directly to buyers. Reduce post-harvest losses and earn more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <div className="fixed top-0 left-0 right-0 z-200 flex flex-col">
              <AnnouncementBar />
              <Nav />
            </div>
            <main>{children}</main>
            <Toast />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
