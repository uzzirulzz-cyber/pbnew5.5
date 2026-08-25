"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Zap, Clock, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "compact" | "featured";
}

export default function ProductCard({ product, index = 0, variant = "default" }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative card-premium overflow-hidden rounded-3xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950">
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent z-10" />
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            style={{
              background: `linear-gradient(135deg, ${product.category === "gaming" ? "#4c1d95" : product.category === "streaming" ? "#991b1b" : product.category === "software" ? "#1e40af" : "#0f766e"} 0%, #071326 100%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-15 font-bold">{product.name.charAt(0)}</span>
            </div>
          </div>

          {discount > 0 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-xs font-bold rounded-xl shadow-lg shadow-gold-500/20 border border-gold-400/20"
            >
              -{discount}% OFF
            </motion.div>
          )}

          {product.deliveryType === "instant" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-500/30 backdrop-blur-md"
            >
              <Zap className="w-4 h-4 fill-current" /> Instant
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 shadow-lg"
          >
            <Heart className={cn("w-5 h-5 transition-all", isLiked ? "text-red-400 fill-red-400" : "text-white")} />
          </motion.button>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="badge-royal uppercase text-xs font-semibold tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 rounded-lg border border-gold-500/20">
              <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              <span className="text-xs font-semibold text-gold-300">{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{product.description}</p>

          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-0.5">
                <span className="text-2xl font-bold text-white block">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-white/40 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className="text-right text-xs text-white/50">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>{product.stock} in stock</span>
                  </div>
                ) : (
                  <span className="text-red-400 font-medium">Out of stock</span>
                )}
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-royal-500 to-royal-600 text-white font-semibold hover:from-royal-600 hover:to-royal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-royal-500/20 border border-white/10"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative card-premium overflow-hidden rounded-2xl flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950 flex-shrink-0">
        <div
          className={cn(
            "w-full h-full bg-gradient-to-br transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
          style={{
            background: `linear-gradient(135deg, ${product.category === "gaming" ? "#4c1d95" : product.category === "streaming" ? "#991b1b" : product.category === "software" ? "#1e40af" : "#0f766e"} 0%, #071326 100%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-15 font-bold">{product.name.charAt(0)}</span>
          </div>
        </div>

        {discount > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-[11px] font-bold rounded-lg shadow-lg shadow-gold-500/20"
          >
            -{discount}%
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 opacity-0 group-hover:opacity-100 shadow-lg"
        >
          <Heart className={cn("w-4 h-4 transition-all", isLiked ? "text-red-400 fill-red-400" : "text-white")} />
        </motion.button>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none group-hover:pointer-events-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-royal-500 to-royal-600 text-white text-sm font-semibold hover:from-royal-600 hover:to-royal-700 transition-all flex items-center justify-center gap-2 shadow-lg border border-white/10"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </motion.button>
        </motion.div>
      </div>

      <div className="p-3.5 space-y-2.5 flex-grow flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-royal-300 font-bold uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gold-500/10 rounded-md border border-gold-500/20">
            <Star className="w-2.5 h-2.5 text-gold-400 fill-gold-400" />
            <span className="text-[10px] font-semibold text-gold-300">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="flex-grow">
          <h3 className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.deliveryType === "instant" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span className="text-[10px] font-semibold text-emerald-300">Instant</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
