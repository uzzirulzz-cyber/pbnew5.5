"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

const trendingProducts: Product[] = [
  {
    id: "1",
    name: "Netflix Premium 4K",
    slug: "netflix-premium-4k",
    description: "4K Ultra HD streaming with 4 simultaneous screens. Instant activation worldwide.",
    price: 15.99,
    originalPrice: 22.99,
    category: "Streaming",
    images: [],
    rating: 4.9,
    reviewCount: 2847,
    stock: 156,
    tags: ["streaming", "netflix", "4k"],
    features: ["4K Ultra HD", "4 Screens", "Dolby Atmos", "No Ads"],
    specifications: { "Duration": "1 Month", "Region": "Global", "Type": "Shared" },
    isTrending: true,
    isOnSale: true,
    discount: 30,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Windows 11 Pro License",
    slug: "windows-11-pro",
    description: "Genuine Windows 11 Pro activation key. Lifetime license. Instant delivery.",
    price: 29.99,
    originalPrice: 199.99,
    category: "Software",
    images: [],
    rating: 4.8,
    reviewCount: 1523,
    stock: 89,
    tags: ["windows", "os", "microsoft"],
    features: ["Lifetime", "Genuine Key", "Instant Delivery", "All Languages"],
    specifications: { "Version": "Pro", "Architecture": "64-bit", "Activation": "Online" },
    isTrending: true,
    isOnSale: true,
    discount: 85,
    deliveryType: "instant",
    licenseType: "lifetime",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "ChatGPT Plus Subscription",
    slug: "chatgpt-plus",
    description: "Full access to GPT-4, DALL-E, and advanced features. 1-month subscription.",
    price: 19.99,
    originalPrice: 25.99,
    category: "AI Services",
    images: [],
    rating: 4.9,
    reviewCount: 3421,
    stock: 234,
    tags: ["ai", "chatgpt", "gpt-4"],
    features: ["GPT-4 Access", "DALL-E", "Plugins", "Priority Access"],
    specifications: { "Duration": "1 Month", "Model": "GPT-4", "API": "Included" },
    isTrending: true,
    isOnSale: true,
    discount: 23,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    name: "Spotify Premium Family",
    slug: "spotify-premium-family",
    description: "6 accounts for family members living under one roof. Ad-free music streaming.",
    price: 12.99,
    originalPrice: 16.99,
    category: "Streaming",
    images: [],
    rating: 4.7,
    reviewCount: 1987,
    stock: 112,
    tags: ["streaming", "spotify", "music"],
    features: ["6 Accounts", "Ad-Free", "Offline Mode", "High Quality"],
    specifications: { "Duration": "1 Month", "Accounts": "6", "Quality": "320kbps" },
    isTrending: true,
    isOnSale: true,
    discount: 24,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "5",
    name: "NordVPN 2-Year Plan",
    slug: "nordvpn-2-year",
    description: "Military-grade encryption, 6000+ servers, no logs policy. 2-year subscription.",
    price: 79.99,
    originalPrice: 198.00,
    category: "Software",
    images: [],
    rating: 4.8,
    reviewCount: 2156,
    stock: 67,
    tags: ["vpn", "security", "privacy"],
    features: ["6000+ Servers", "No Logs", "6 Devices", "Kill Switch"],
    specifications: { "Duration": "2 Years", "Devices": "6", "Protocol": "NordLynx" },
    isTrending: true,
    isOnSale: true,
    discount: 60,
    deliveryType: "instant",
    licenseType: "subscription",
    createdAt: "2024-01-01",
  },
  {
    id: "6",
    name: "Steam $50 Gift Card",
    slug: "steam-50-gift-card",
    description: "Instant digital delivery. Redeem on Steam for games, software, and hardware.",
    price: 45.99,
    originalPrice: 50.00,
    category: "Gift Cards",
    images: [],
    rating: 4.9,
    reviewCount: 5621,
    stock: 445,
    tags: ["gaming", "steam", "gift-card"],
    features: ["Instant Delivery", "Global", "No Expiry", "Digital Code"],
    specifications: { "Value": "$50", "Region": "Global", "Format": "Digital" },
    isTrending: true,
    isOnSale: true,
    discount: 8,
    deliveryType: "instant",
    licenseType: "one-time",
    createdAt: "2024-01-01",
  },
];

export default function TrendingProducts() {
  return (
    <section className="section-padding section-padding-y relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-950/5 via-transparent to-royal-950/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="badge-gold uppercase text-xs font-bold">Trending Now</span>
            </motion.div>
            <h2 className="heading-secondary">
              Most <span className="text-gradient">Popular</span> Products
            </h2>
          </div>
          <motion.div
            whileHover={{ x: 4 }}
            className="hidden sm:block"
          >
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all font-medium text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div
          whileHover={{ x: 4 }}
          className="sm:hidden mt-8"
        >
          <Link
            href="/trending"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-royal-500 to-royal-600 text-white font-semibold hover:from-royal-600 hover:to-royal-700 transition-all shadow-lg border border-white/[0.1]"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
