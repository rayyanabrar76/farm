"use client";
import { useState } from "react";
import { X, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { NIGERIAN_STATES } from "@/lib/data";

interface Props { open: boolean; onClose: () => void; }

export default function AddListingModal({ open, onClose }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", category: "Vegetables", qty: "", price: "", minOrder: "", location: "", harvest: "", desc: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) { showToast("Please enter a produce name", "error"); return; }
    if (!form.price) { showToast("Please set a price per kg", "error"); return; }
    onClose();
    showToast(`"${form.name}" listed successfully! Buyers can now find your produce. ✓`, "success");
    setForm({ name: "", category: "Vegetables", qty: "", price: "", minOrder: "", location: "", harvest: "", desc: "" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold">List New Produce</h2>
            <p className="text-sm text-gray-400 mt-0.5">Your listing goes live in under 30 seconds</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Produce Name *</label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              placeholder="e.g. Fresh Roma Tomatoes" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none bg-white transition-colors"
            >
              {["Vegetables", "Grains & Cereals", "Tubers & Roots", "Fruits", "Legumes", "Cash Crops"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Available Quantity (kg) *</label>
            <input name="qty" type="number" value={form.qty} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              placeholder="500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Price per kg (₦) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              placeholder="350" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Minimum Order (kg)</label>
            <input name="minOrder" type="number" value={form.minOrder} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              placeholder="50" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Harvest Date</label>
            <input name="harvest" type="date" value={form.harvest} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Farm Location</label>
            <select name="location" value={form.location} onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-3 text-sm outline-none bg-white transition-colors"
            >
              <option value="">-- Select State --</option>
              {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Product Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
              className="w-full border-2 border-gray-200 focus:border-primary-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
              placeholder="Describe quality, farming method, packaging, certifications..." />
          </div>

          {/* Upload zone */}
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Product Photos</label>
            <div
              onClick={() => showToast("Photo upload available in the full version", "info")}
              className="border-2 border-dashed border-gray-200 hover:border-primary-400 hover:bg-primary-50 rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors group"
            >
              <Upload size={22} className="mx-auto text-gray-300 group-hover:text-primary-400 mb-2 transition-colors" />
              <p className="text-sm text-gray-400 group-hover:text-primary-500 font-medium transition-colors">Click to upload photos (JPG, PNG)</p>
              <p className="text-xs text-gray-300 mt-1">High quality photos get 3× more orders</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex-2 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-green"
          >
            <CheckCircle size={16} />
            List Produce Now
          </button>
        </div>
      </div>
    </div>
  );
}
