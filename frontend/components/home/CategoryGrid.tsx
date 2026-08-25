"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Gamepad2,
  Monitor,
  Wifi,
  Bot,
  Tv,
  Gift,
  TrendingUp,
  Server,
  GraduationCap,
  Bitcoin,
  ArrowRight,
} from "lucide-react";

const categories = [
  { name: "Gaming", icon: Gamepad2, slug: "gaming", count: 1250, color: "from-purple-500/20 to-purple-600/5", iconColor: "text-purple-400" },
  { name: "Software", icon: Monitor, slug: "software", count: 890, color: "from-cyan-500/20 to-cyan-600/5", iconColor: "text-cyan-400" },
  { name: "Streaming", icon: Wifi, slug: "streaming", count: 650, color: "from-red-500/20 to-red-600/5", iconColor: "text-red-400" },
  { name: "AI Services", icon: Bot, slug: "ai-services", count: 420, color: "from-emerald-500/20 to-emerald-600/5", iconColor: "text-emerald-400" },
  { name: "IPTV", icon: Tv, slug: "iptv", count: 380, color: "from-blue-500/20 to-blue-600/5", iconColor: "text-blue-400" },
  { name: "Gift Cards", icon: Gift, slug: "gift-cards", count: 720, color: "from-gold-500/20 to-gold-600/5", iconColor: "text-gold-400" },
  { name: "Marketing", icon: TrendingUp, slug: "digital-marketing", count: 340, color: "from-orange-500/20 to-orange-600/5", iconColor: "text-orange-400" },
  { name: "Cloud", icon: Server, slug: "cloud-servers", count: 280, color: "from-indigo-500/20 to-indigo-600/5", iconColor: "text-indigo-400" },
  { name: "Education", icon: GraduationCap, slug: "education", count: 560, color: "from-pink-500/20 to-pink-600/5", iconColor: "text-pink-400" },
  { name: "Crypto", icon: Bitcoin, slug: "crypto", count: 190, color: "from-yellow-500/20 to-yellow-600/5", iconColor: "text-yellow-400" },
];

export default function CategoryGrid() {
  return (
    <section className="section-padding section-padding-y relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-950/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge-royal mb-4 block"
          >
            Browse Categories
          </motion.span>
          <h2 className="heading-secondary mb-6">
            Explore Our <span className="text-gradient">Digital Ecosystem</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            From gaming to AI, streaming to cloud infrastructure — discover premium digital products across diverse categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group card-premium p-6 rounded-2xl flex flex-col items-start h-full hover:glow-royal"
              >
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all border border-white/10`}
                >
                  <cat.icon className={`w-7 h-7 ${cat.iconColor}`} />
                </motion.div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/50 font-medium">{cat.count.toLocaleString()} products</p>
                <motion.div 
                  className="mt-auto pt-4 text-royal-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
