"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

const flashProducts: Product[] = [
  {
    id: "f1",
    name: "Disney+ Premium Annual",
    slug: "disney-plus-annual",
    description: "Annual subscription with 4K streaming. Limited time offer.",
    price: 49.99,
    originalPrice: 109.99,
    category: "Streaming",
    images: [],
    rating: 4.8,
    reviewCount: 1234,
    stock: 23,
    tags: ["streaming", "disney", "limited"],
    features: ["4K HDR", "4 Screens", "Downloads", "Marvel & Star Wars"],
    specifications: { "Duration": "1 Year", "Region": "Global" },
    isOnSale: true,
    discount: 55,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "f2",
    name: "Adobe Creative Cloud",
    slug: "adobe-creative-cloud",
    description: "All apps plan. Photoshop, Premiere, Illustrator & more.",
    price: 39.99,
    originalPrice: 84.99,
    category: "Software",
    images: [],
    rating: 4.7,
    reviewCount: 876,
    stock: 15,
    tags: ["software", "adobe", "design"],
    features: ["20+ Apps", "100GB Cloud", "Fonts", "Portfolio"],
    specifications: { "Duration": "1 Month", "Apps": "All" },
    isOnSale: true,
    discount: 53,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "f3",
    name: "Xbox Game Pass Ultimate",
    slug: "xbox-game-pass-ultimate",
    description: "100+ games, Xbox Live Gold, EA Play included. 3 months.",
    price: 24.99,
    originalPrice: 44.99,
    category: "Gaming",
    images: [],
    rating: 4.9,
    reviewCount: 2341,
    stock: 45,
    tags: ["gaming", "xbox", "game-pass"],
    features: ["100+ Games", "Cloud Gaming", "EA Play", "Day One Releases"],
    specifications: { "Duration": "3 Months", "Platform": "Xbox & PC" },
    isOnSale: true,
    discount: 44,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "f4",
    name: "YouTube Premium Family",
    slug: "youtube-premium-family",
    description: "Ad-free YouTube, YouTube Music, background play. Family plan.",
    price: 9.99,
    originalPrice: 17.99,
    category: "Streaming",
    images: [],
    rating: 4.6,
    reviewCount: 1567,
    stock: 34,
    tags: ["streaming", "youtube", "music"],
    features: ["Ad-Free", "Background Play", "Downloads", "YouTube Music"],
    specifications: { "Duration": "1 Month", "Members": "6" },
    isOnSale: true,
    discount: 44,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
];

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.1] rounded-2xl px-6 py-4"
    >
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
        <Clock className="w-5 h-5 text-gold-400 fill-gold-400" />
      </motion.div>
      <div className="flex items-center gap-2">
        {Object.entries(time).map(([key, value], i) => (
          <motion.div 
            key={key} 
            className="flex items-center gap-2"
            animate={{ scale: 1 }}
          >
            <motion.span 
              key={`${key}-${value}`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-2 rounded-lg bg-gradient-to-b from-gold-500/20 to-gold-600/10 border border-gold-500/30 text-gold-400 text-sm font-bold font-mono shadow-lg shadow-gold-500/10"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
            {i < 2 && <span className="text-gold-400/50 text-lg font-bold">:</span>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function FlashSale() {
  return (
    <section className="section-padding section-padding-y relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium p-8 md:p-10 border-gold-500/20 rounded-3xl overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600/10 via-transparent to-gold-600/5 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-5"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/30 to-gold-600/10 flex items-center justify-center shadow-lg border border-gold-500/20"
              >
                <Zap className="w-8 h-8 text-gold-400 fill-gold-400" />
              </motion.div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Flash <span className="text-gradient">Sale</span>
                </h2>
                <p className="text-sm text-white/60 mt-1 font-medium">Exclusive limited-time offers</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <CountdownTimer />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
