"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Shield, Zap, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import ParticleBackground from "./ParticleBackground";

const stats = [
  { icon: Users, value: "50K+", label: "Active Customers" },
  { icon: Zap, value: "99.9%", label: "Uptime" },
  { icon: Shield, value: "100%", label: "Secure" },
  { icon: TrendingUp, value: "24/7", label: "Support" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/40 to-navy-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(10,77,255,0.15),rgba(245,183,0,0.05),transparent)]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          y: [0, 50, 0],
          x: [0, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-500/20 rounded-full blur-[150px]" 
      />
      <motion.div 
        animate={{ 
          y: [0, -50, 0],
          x: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px]" 
      />
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 section-padding w-full py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="badge-royal"
              >
                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                #1 Digital Marketplace Worldwide
              </motion.div>

              <div className="space-y-4">
                <h1 className="heading-primary">
                  Your Digital
                  <span className="block text-gradient">Universe Awaits</span>
                </h1>
                <p className="text-body max-w-lg text-lg">
                  Premium digital products, streaming subscriptions, software licenses, and AI services — 
                  all in one powerful, secure marketplace. Instant delivery. Global access. Premium experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link href="/category/gaming" className="btn-gold flex items-center justify-center gap-2 text-base px-8 py-4 rounded-2xl">
                    Explore Store <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl"
                >
                  <Play className="w-5 h-5 text-royal-400 fill-royal-400" /> Watch Demo
                </motion.button>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="glass p-4 rounded-2xl text-center sm:text-left group hover:glow-royal"
                  >
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-royal-500/20 flex items-center justify-center group-hover:bg-royal-500/30 transition-colors">
                        <stat.icon className="w-4 h-4 text-royal-400" />
                      </div>
                      <span className="text-lg font-bold text-white">{stat.value}</span>
                    </div>
                    <span className="text-xs text-white/50 font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Featured Cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative hidden lg:block h-[600px]"
            >
              <div className="relative w-full h-full max-w-lg mx-auto">
                {/* Orbiting Cards with premium styling */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <FloatingCard icon="🎮" title="Gaming" color="from-purple-600/30 to-purple-700/10" />
                  </div>
                  <div className="absolute top-1/4 right-0 translate-x-1/2">
                    <FloatingCard icon="🎬" title="Streaming" color="from-red-600/30 to-red-700/10" />
                  </div>
                  <div className="absolute bottom-1/4 right-0 translate-x-1/2">
                    <FloatingCard icon="🤖" title="AI Services" color="from-emerald-600/30 to-emerald-700/10" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <FloatingCard icon="💳" title="Gift Cards" color="from-gold-600/30 to-gold-700/10" />
                  </div>
                  <div className="absolute bottom-1/4 left-0 -translate-x-1/2">
                    <FloatingCard icon="📺" title="IPTV" color="from-blue-600/30 to-blue-700/10" />
                  </div>
                  <div className="absolute top-1/4 left-0 -translate-x-1/2">
                    <FloatingCard icon="💻" title="Software" color="from-cyan-600/30 to-cyan-700/10" />
                  </div>
                </motion.div>

                {/* Center Premium Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-56 h-56 rounded-full bg-gradient-to-br from-royal-500/25 via-gold-500/10 to-transparent blur-3xl"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] flex items-center justify-center card-premium shadow-2xl"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl font-bold text-gold-400 mb-1"
                      >
                        10K+
                      </motion.div>
                      <div className="text-xs text-white/60 font-medium">Premium Products</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ icon, title, color }: { icon: string; title: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-2xl border border-white/15 flex flex-col items-center justify-center gap-2 shadow-2xl shadow-black/20 hover:shadow-2xl hover:shadow-royal-500/20 card-premium`}
    >
      <span className="text-3xl drop-shadow-lg">{icon}</span>
      <span className="text-xs font-semibold text-white/90 text-center leading-tight">{title}</span>
    </motion.div>
  );
}
