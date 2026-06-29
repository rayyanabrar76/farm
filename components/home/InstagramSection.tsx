import { ArrowRight } from "lucide-react";

const IG_POSTS = [
  { img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400&h=400&fit=crop&auto=format", alt: "Farmer harvesting strawberries" },
  { img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop&auto=format", alt: "Farmland rows at sunrise" },
  { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&auto=format", alt: "Fresh vegetables at market" },
  { img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&auto=format", alt: "Chef with fresh produce" },
  { img: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=400&h=400&fit=crop&auto=format", alt: "Ripe mangoes" },
  { img: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=400&h=400&fit=crop&auto=format", alt: "Fresh pineapples" },
];

export default function InstagramSection() {
  return (
    <section className="py-16 sm:py-20 px-4" style={{ background: "linear-gradient(135deg, #0E2A12 0%, #1A5514 55%, #2D7A3A 100%)" }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/55 uppercase mb-3">Follow us on Instagram</p>
        <p className="text-2xl sm:text-3xl font-black text-white mb-8">@agrolync</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-8">
          {IG_POSTS.map((post, i) => (
            <a key={i} href="https://instagram.com/agrolync" target="_blank" rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group block bg-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.img} alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
            </a>
          ))}
        </div>
        <a href="https://instagram.com/agrolync" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white/80 transition-colors">
          View all posts <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
