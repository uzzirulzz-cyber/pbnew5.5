"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Zap,
  Gamepad2,
  Monitor,
  Shield,
  Wifi,
  CreditCard,
  Palette,
  Bot,
  Tv,
  TrendingUp,
  Gift,
  Globe,
  Server,
  GraduationCap,
  Bitcoin,
  Heart,
  Bell,
  Wallet,
  LogOut,
  Settings,
  Package,
  Ticket,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Gaming",
    icon: Gamepad2,
    slug: "gaming",
    subcategories: ["Steam", "Xbox", "PlayStation", "Nintendo", "In-Game Currency"],
  },
  {
    name: "Software",
    icon: Monitor,
    slug: "software",
    subcategories: ["Windows", "Office", "Antivirus", "VPN", "Design Tools"],
  },
  {
    name: "Streaming",
    icon: Wifi,
    slug: "streaming",
    subcategories: ["Netflix", "Disney+", "Prime Video", "Spotify", "YouTube Premium"],
  },
  {
    name: "AI Services",
    icon: Bot,
    slug: "ai-services",
    subcategories: ["ChatGPT", "Claude", "Gemini", "Midjourney", "API Credits"],
  },
  {
    name: "IPTV",
    icon: Tv,
    slug: "iptv",
    subcategories: ["Sports", "Movies", "Kids", "Documentaries", "Live TV"],
  },
  {
    name: "Gift Cards",
    icon: Gift,
    slug: "gift-cards",
    subcategories: ["Steam", "Google Play", "Apple", "Amazon", "Xbox"],
  },
  {
    name: "Digital Marketing",
    icon: TrendingUp,
    slug: "digital-marketing",
    subcategories: ["SEO", "Web Design", "Hosting", "Domains", "Social Media"],
  },
  {
    name: "Cloud & Servers",
    icon: Server,
    slug: "cloud-servers",
    subcategories: ["VPS", "Dedicated", "CDN", "Storage", "Databases"],
  },
  {
    name: "Education",
    icon: GraduationCap,
    slug: "education",
    subcategories: ["Courses", "Templates", "Ebooks", "Tutorials", "Certifications"],
  },
  {
    name: "Crypto",
    icon: Bitcoin,
    slug: "crypto",
    subcategories: ["Wallets", "Exchange", "Mining", "Staking", "NFTs"],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium Top Bar */}
      <div className="bg-gradient-to-r from-royal-700 via-royal-600 to-royal-700 text-white text-xs py-3 relative z-50 shadow-lg shadow-royal-500/10">
        <div className="section-padding flex items-center justify-between">
          <motion.div 
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-gold-300 fill-gold-300" />
            <span className="font-semibold">Flash Sale: Up to 70% off selected items</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/support" className="hover:text-gold-300 transition-colors font-medium">Support</Link>
            <Link href="/track-order" className="hover:text-gold-300 transition-colors font-medium">Track Order</Link>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> EN / USD
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={cn(
          "sticky top-0 z-40 transition-all duration-500 border-b",
          isScrolled
            ? "bg-navy-950/80 backdrop-blur-3xl border-white/10 shadow-2xl shadow-royal-500/5"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center shadow-lg shadow-royal-500/30 group-hover:shadow-royal-500/50 transition-all border border-white/20"
              >
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white tracking-tight">PlayBeat</span>
                <span className="text-xs text-gold-400 block -mt-1 font-medium tracking-widest uppercase">Digital</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => setActiveCategory("shop")}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  Shop <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeCategory === "shop" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-navy-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-royal-500/20 flex items-center justify-center shrink-0 group-hover:bg-royal-500/30 transition-colors">
                              <cat.icon className="w-5 h-5 text-royal-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">
                                {cat.name}
                              </h4>
                              <p className="text-xs text-white/50 mt-0.5">{cat.subcategories.join(", ")}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {["Deals", "New Arrivals", "IPTV", "Software", "Support"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/dashboard/wishlist"
                className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-navy-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm font-medium text-white/90"
                >
                  <User className="w-4 h-4" />
                  Account
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-navy-900/95 backdrop-blur-2xl"
            >
              <div className="section-padding py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search for products, categories, brands..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-royal-500 focus:ring-1 focus:ring-royal-500 transition-all"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div className="absolute right-0 top-0 h-full w-80 bg-navy-900 border-l border-white/10 shadow-2xl overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold text-white">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <cat.icon className="w-5 h-5 text-royal-400" />
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-2">
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                    <User className="w-5 h-5" /> My Account
                  </Link>
                  <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                    <Package className="w-5 h-5" /> Orders
                  </Link>
                  <Link href="/dashboard/wallet" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                    <Wallet className="w-5 h-5" /> Wallet
                  </Link>
                  <Link href="/dashboard/tickets" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                    <Ticket className="w-5 h-5" /> Support Tickets
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
