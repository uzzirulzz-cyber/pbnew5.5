"use client";

import Link from "next/link";
import { Crown, Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Youtube, Github, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  products: [
    { name: "Gaming", href: "/category/gaming" },
    { name: "Software", href: "/category/software" },
    { name: "Streaming", href: "/category/streaming" },
    { name: "IPTV", href: "/category/iptv" },
    { name: "Gift Cards", href: "/category/gift-cards" },
    { name: "AI Services", href: "/category/ai-services" },
  ],
  support: [
    { name: "Help Center", href: "/support" },
    { name: "Track Order", href: "/track-order" },
    { name: "Returns & Refunds", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Stripe", "Crypto", "USDT"];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-navy-950 border-t border-white/5">
      {/* Newsletter Section - Premium */}
      <div className="section-padding py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-600/10 via-transparent to-gold-600/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.span 
                className="badge-gold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Subscribe to Newsletter
              </motion.span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Never Miss a <span className="text-gradient">Deal</span>
            </h3>
            
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Get exclusive access to flash sales, new product launches, insider tips, and premium discounts. 
              Join 50K+ savvy shoppers in our community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-base"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold flex items-center justify-center gap-2 whitespace-nowrap px-8 py-4 rounded-2xl font-bold"
              >
                <Send className="w-5 h-5" /> Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/5" />

      {/* Main Footer Grid */}
      <div className="section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center shadow-lg shadow-royal-500/20 group-hover:shadow-royal-500/40 transition-all border border-white/20"
              >
                <Crown className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight">PlayBeat</span>
                <span className="text-xs text-gold-400 block -mt-1 font-bold tracking-widest uppercase">Digital</span>
              </div>
            </Link>
            
            <p className="text-white/60 leading-relaxed max-w-xs">
              The premier global digital marketplace for gaming, software, streaming, IPTV, gift cards, and AI services. 
              Trusted by millions.
            </p>
            
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "Global Digital Marketplace" },
                { icon: Mail, text: "support@playbeat.digital" },
                { icon: Phone, text: "24/7 Live Support" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-white/60 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-royal-500/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-royal-400" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Links Columns */}
          {[
            { title: "Products", links: footerLinks.products },
            { title: "Support", links: footerLinks.support },
            { title: "Company", links: footerLinks.company },
            { title: "Legal", links: footerLinks.legal },
          ].map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold-400" />
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-gold-400 transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Payment & Social */}
        <div className="border-t border-white/5 pt-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold-400" />
                Payment Methods
              </h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <motion.span
                    key={method}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-br from-white/[0.05] to-white/[0.02] text-xs text-white/70 border border-white/10 hover:border-gold-500/30 transition-all font-semibold"
                  >
                    {method}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <p className="text-sm text-white/40 text-center">
                &copy; {new Date().getFullYear()} PlayBeat Digital. <br /> All rights reserved.
              </p>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold-400" />
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/[0.1] to-white/[0.05] flex items-center justify-center text-white/60 hover:text-gold-400 border border-white/[0.1] hover:border-gold-500/30 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 z-30 flex items-center justify-center font-bold border border-white/10 group"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowUp className="w-6 h-6 group-hover:text-white" />
        </motion.div>
      </motion.button>
    </footer>
  );
}
