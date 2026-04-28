import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import Menu from '../components/Menu';

function MenuPage() {
  const { menuItems = [], addToCart, loading } = useOutletContext();

  return (
    <div className="bg-dark-bg text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-stone-950/95 py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-fire-red/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">
            Explore the full menu
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            Every meal ready for click-to-order.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-amber-100/70 leading-relaxed">
            Browse premium chicken combos, grills, fried classics and bucket meals designed to convert visitors into hungry customers.
          </motion.p>
        </div>
      </section>
      <Menu items={menuItems} addToCart={addToCart} isLoading={loading} />
    </div>
  );
}

export default MenuPage;
