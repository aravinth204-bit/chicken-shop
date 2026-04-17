import React from 'react';
import { motion } from 'framer-motion';
import { Users, Truck, ShoppingBag, Star } from 'lucide-react';

const stats = [
  { label: 'Happy Customers', value: '5000+', icon: Users, color: 'text-blue-400' },
  { label: 'Daily Deliveries', value: '200+', icon: Truck, color: 'text-green-400' },
  { label: 'Product Varieties', value: '50+', icon: ShoppingBag, color: 'text-fire-yellow' },
  { label: 'Average Rating', value: '4.9/5', icon: Star, color: 'text-red-400' },
];

function Stats() {
  return (
    <section className="py-20 bg-stone-900 border-y border-stone-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-stone-800 border border-stone-700 mb-4 group-hover:border-fire-red/50 transition-colors">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-amber-100/60 text-sm md:text-base font-sans font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
