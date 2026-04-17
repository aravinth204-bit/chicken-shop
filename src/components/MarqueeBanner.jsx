import React from 'react';
import { motion } from 'framer-motion';

const items = [
  '⭐ "Best Shop in Erode" — Rajesh K.',
  '🍗 "Always Fresh & Hygienic" — Priya V.',
  '🥇 FSSAI Certified Quality',
  '🚀 Under 45 Minutes Delivery',
  '💚 5000+ Happy Customers',
  '🐔 "Naatu Koli is Excellent!" — Muthu S.',
  '🏆 #1 Rated Poultry in Erode',
  '🥩 "Best Mutton in Town" — Kavitha L.',
  '🌿 Farm Fresh, No Chemicals',
  '📦 Cleanly Packed & Hygienically Cut',
];

function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="py-5 bg-fire-red/10 border-y border-fire-red/20 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-amber-100/80 font-semibold text-sm md:text-base flex-shrink-0"
          >
            {item}
            <span className="mx-6 text-fire-red/40">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default MarqueeBanner;
