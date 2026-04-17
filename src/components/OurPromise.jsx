import React from 'react';
import { motion } from 'framer-motion';

const promises = [
  {
    emoji: '🧼',
    title: 'Hygienic',
    description: 'Cleaned, prepared and packed in a FSSAI-certified hygienic environment every single day.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  {
    emoji: '⚡',
    title: 'Lightning Fast',
    description: 'Your order is processed the moment it is confirmed. Delivery within 45 minutes, always.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  {
    emoji: '🌿',
    title: 'Farm Fresh',
    description: 'Sourced daily from trusted local farms. No frozen products, no chemicals. Just pure freshness.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20'
  },
  {
    emoji: '💰',
    title: 'Fair Price',
    description: 'Transparent pricing with no hidden charges. You always get the best value for quality.',
    color: 'text-fire-yellow',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20'
  }
];

function OurPromise() {
  return (
    <section className="py-24 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fire-red font-bold text-sm uppercase tracking-[0.3em] mb-4"
          >
            Our Values
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold text-white"
          >
            THE <span className="text-fire-red">CHICKEN SEA</span> PROMISE
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`group ${p.bg} border ${p.border} rounded-3xl p-6 md:p-8 text-center transition-all duration-300`}
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${p.bg} border ${p.border} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform`}>
                {p.emoji}
              </div>
              <h3 className={`font-display text-xl font-bold mb-3 ${p.color}`}>{p.title}</h3>
              <p className="text-amber-100/50 text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurPromise;
