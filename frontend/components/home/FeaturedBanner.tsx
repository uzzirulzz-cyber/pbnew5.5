"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, Clock, Headphones } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Shield, title: "100% Secure", desc: "Encrypted transactions" },
  { icon: Clock, title: "Instant Delivery", desc: "Automated 24/7" },
  { icon: Headphones, title: "24/7 Support", desc: "Live chat & tickets" },
];

export default function FeaturedBanner() {
  return (
    <section className="section-padding section-padding-y">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-royal-600 via-royal-700 to-royal-800 p-8 md:p-14"
        >
          {/* Premium Background Effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-[140px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-4 h-4 text-gold-400 fill-gold-400" /> AI-Powered
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Smart Product <span className="text-gold-300">Recommendations</span>
              </h2>
              
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Our advanced AI engine analyzes your preferences and browsing history to recommend the perfect digital products. 
                Get personalized suggestions, exclusive deals, and discovery experiences tailored just for you.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/ai-recommendations"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-royal-700 font-bold hover:bg-white/90 transition-all shadow-2xl shadow-black/30 text-lg"
                >
                  Try It Now <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/[0.08] backdrop-blur-lg border border-white/[0.15] rounded-2xl p-6 hover:bg-white/[0.12] hover:border-white/[0.25] transition-all group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500/30 to-gold-600/10 flex items-center justify-center mb-4 shadow-lg"
                  >
                    <f.icon className="w-7 h-7 text-gold-300" />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gold-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
