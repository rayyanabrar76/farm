"use client";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useToast } from "@/context/ToastContext";

const ICON_MAP = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
};

const COLOR_MAP = {
  success: "bg-primary-500 text-white",
  error:   "bg-red-600 text-white",
  info:    "bg-sky-600 text-white",
};

export default function Toast() {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-6 right-6 z-400 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => {
        const Icon = ICON_MAP[t.type];
        return (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold animate-slide-in max-w-sm ${COLOR_MAP[t.type]}`}
          >
            <Icon size={16} className="shrink-0" />
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
