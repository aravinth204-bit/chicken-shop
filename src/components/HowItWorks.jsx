import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    emoji: '🛒',
    title: 'Browse & Select',
    description: 'Pick from our premium selection of fresh chicken, mutton, duck, and eggs. Choose your weight and quantity.',
    color: 'from-fire-red/20 to-fire-red/5',
    borderColor: 'border-fire-red/30',
    glowColor: 'shadow-fire-red/20'
  },
  {
    number: '02',
    emoji: '📱',
    title: 'Order via WhatsApp',
    description: 'Confirm your order instantly via WhatsApp. No app downloads, no accounts — just a simple message.',
    color: 'from-green-500/20 to-green-500/5',
    borderColor: 'border-green-500/30',
    glowColor: 'shadow-green-500/20'
  },
  {
    number: '03',
    emoji: '🚚',
    title: 'Fresh Delivery',
    description: 'Your order is freshly cut and delivered within 45 minutes. Farm-fresh quality, guaranteed every time.',
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/20'
  }
];

function HowItWorks() {
  return (
    <section className="py-24 bg-stone-900 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fire-red/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fire-red font-bold text-sm uppercase tracking-[0.3em] mb-4"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-white font-bold mb-4"
          >
            HOW IT <span className="text-fire-red">WORKS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-amber-100/50 text-lg max-w-md mx-auto"
          >
            From browsing to doorstep in 3 simple steps
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector Line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-fire-red/0 via-fire-red/30 to-fire-red/0 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`relative bg-gradient-to-b ${step.color} backdrop-blur-xl border ${step.borderColor} rounded-3xl p-8 text-center transition-all duration-300 group-hover:shadow-2xl group-hover:${step.glowColor} group-hover:-translate-y-2`}>
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-stone-900 border border-white/10 text-amber-100/40 text-xs font-black tracking-widest px-3 py-1 rounded-full">
                    STEP {step.number}
                  </div>
                </div>

                {/* Emoji Icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  className="text-6xl md:text-7xl mb-6 mt-2"
                >
                  {step.emoji}
                </motion.div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-amber-100/60 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for mobile connection */}
                {i < steps.length - 1 && (
                  <div className="md:hidden text-center mt-6 text-fire-red/40 text-2xl">↓</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#menu"
            className="inline-flex items-center gap-3 bg-fire-red hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-900/30"
          >
            🛒 Start Ordering Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
