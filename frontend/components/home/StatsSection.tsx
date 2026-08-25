"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Package, Globe, Award, TrendingUp, Shield } from "lucide-react";

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Active Customers", color: "from-royal-500/20 to-royal-600/5" },
  { icon: Package, value: 10000, suffix: "+", label: "Digital Products", color: "from-gold-500/20 to-gold-600/5" },
  { icon: Globe, value: 150, suffix: "+", label: "Countries Served", color: "from-emerald-500/20 to-emerald-600/5" },
  { icon: Award, value: 99.9, suffix: "%", label: "Satisfaction Rate", color: "from-purple-500/20 to-purple-600/5" },
  { icon: TrendingUp, value: 2, suffix: "M+", label: "Orders Delivered", color: "from-cyan-500/20 to-cyan-600/5" },
  { icon: Shield, value: 24, suffix: "/7", label: "Support Available", color: "from-red-500/20 to-red-600/5" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-white">
      {value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-royal-950/50 via-transparent to-royal-950/50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-royal-400 text-sm font-medium uppercase tracking-widest mb-3 block">Our Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-gradient">Thousands</span> Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br border border-white/5 hover:border-white/10 transition-all"
              style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white/80" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-white/50 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
