import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Customers', emoji: '😊' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', emoji: '⭐' },
  { value: 45, suffix: ' Min', label: 'Avg. Delivery', emoji: '🚚' },
  { value: 20, suffix: '+', label: 'Product Varieties', emoji: '🍗' },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index, inView }) {
  const count = useCountUp(stat.value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="text-center group"
    >
      <div className="text-4xl mb-3">{stat.emoji}</div>
      <div className="font-display text-5xl md:text-6xl font-black text-white leading-none">
        {count.toLocaleString()}
        <span className="text-fire-red">{stat.suffix}</span>
      </div>
      <p className="text-amber-100/50 font-semibold mt-2 text-sm uppercase tracking-widest">{stat.label}</p>
    </motion.div>
  );
}

function Stats() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-stone-950 to-stone-900 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
