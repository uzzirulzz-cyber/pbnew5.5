"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "Software Developer",
    avatar: "MC",
    rating: 5,
    text: "PlayBeat Digital has completely transformed how I purchase software licenses. The instant delivery is no joke — I had my Windows 11 Pro key within seconds. Prices are unbeatable compared to official stores.",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Content Creator",
    avatar: "SW",
    rating: 5,
    text: "As a YouTuber, I need reliable streaming subscriptions and editing software. PlayBeat delivers everything I need at fractions of retail prices. Their customer support is genuinely 24/7 — had an issue resolved at 3 AM.",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    role: "IT Consultant",
    avatar: "AH",
    rating: 5,
    text: "I manage software procurement for multiple clients. The bulk pricing and API access have saved my company thousands monthly. The vendor portal is intuitive and the analytics dashboard is enterprise-grade.",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "Gaming Enthusiast",
    avatar: "ER",
    rating: 5,
    text: "The gaming section is incredible. Steam cards, Xbox Game Pass, in-game currencies — everything is here. Flash sales are insane, got a $50 Steam card for $38 last week. Highly recommend!",
  },
  {
    id: "5",
    name: "James Okonkwo",
    role: "Digital Marketer",
    avatar: "JO",
    rating: 5,
    text: "Their AI services section is a goldmine. ChatGPT Plus, Midjourney credits, API keys — all legit and instant. The referral program has also earned me over $500 in commissions. Brilliant platform.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding py-20 bg-gradient-to-b from-transparent via-royal-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-royal-400 text-sm font-medium uppercase tracking-widest mb-3 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="card-glass p-8 md:p-12 text-center"
          >
            <Quote className="w-10 h-10 text-royal-400/30 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              "{testimonials[activeIndex].text}"
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center text-white font-bold">
                {testimonials[activeIndex].avatar}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">{testimonials[activeIndex].name}</div>
                <div className="text-sm text-white/50">{testimonials[activeIndex].role}</div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-royal-500" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
