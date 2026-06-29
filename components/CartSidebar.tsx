"use client";
import { X, ClipboardList, Trash2, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props { open: boolean; onClose: () => void; }

export default function CartSidebar({ open, onClose }: Props) {
  const { items, removeItem, total, count } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const goToCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-150 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-full max-w-100 h-full bg-white z-151 shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <ClipboardList size={20} className="text-primary-500" />
            <h2 className="font-bold text-lg">Order List</h2>
            {count > 0 && (
              <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
            )}
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Package size={32} className="text-gray-400" />
              </div>
              <p className="font-semibold text-gray-700">Your order list is empty</p>
              <p className="text-sm text-gray-400">Source produce from verified farmers to start your order</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200 shrink-0 relative">
                    <Image src={item.img} alt={item.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.farmer.split(" ")[0]} · {item.cartQty}kg</p>
                    <p className="text-sm font-bold text-primary-500 mt-1">
                      ₦{(item.price * item.cartQty).toLocaleString()}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="w-9 h-9 rounded-lg hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-400 transition-colors shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Logistics fee</span>
                <span className="font-semibold">₦1,500</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-primary-500">₦{(total + 1500).toLocaleString()}</span>
              </div>
            </div>
            <button onClick={goToCheckout} className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors shadow-green">
              <Package size={18} />
              Submit Order Request
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Escrow-protected. Funds released on delivery confirmation.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
