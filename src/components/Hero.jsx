import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Clock, ShoppingCart } from 'lucide-react';

const defaultBanners = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80',
  'https://images.unsplash.com/photo-1555992336-cbf8a78d4c2f?w=1200&q=80',
  'https://images.unsplash.com/photo-1514516870924-58dc00173397?w=1200&q=80',
];

function Hero({ settings }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerUrls = settings?.bannerUrls?.length ? settings.bannerUrls : defaultBanners;

  useEffect(() => {
    if (bannerUrls.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerUrls.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [bannerUrls.length]);

  const shopName = settings?.shopName || 'Chicken Sea';
  const phone = settings?.phone || '+91 87780 17989';
  const address = settings?.address || 'Erode, Tamil Nadu';

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.12),_transparent_35%),#0C0A09] pt-24 pb-24 md:pb-32">
      <div className="absolute inset-0 opacity-60 blur-3xl">
        <div className="absolute -top-16 -right-16 h-80 w-80 rounded-full bg-fire-red/20" />
        <div className="absolute -bottom-16 left-0 h-72 w-72 rounded-full bg-fire-yellow/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 rounded-full border border-fire-red/20 bg-stone-900/70 px-5 py-3 text-sm uppercase tracking-[0.35em] text-fire-yellow"
            >
              <span className="h-2 w-2 rounded-full bg-fire-yellow animate-pulse" />
              Fresh chicken delivered fast
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Hot. Fresh. Crispy Chicken Delivered Fast
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-base text-amber-100/70 leading-relaxed sm:text-lg lg:mx-0"
            >
              Order your favorite meals anytime — premium chicken combos, buckets, grills and crispy fried specialties built for delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start"
            >
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-full bg-fire-red px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-red-900/25 transition hover:bg-red-700"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Now
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-fire-red hover:bg-stone-900"
              >
                View Menu
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              <div className="rounded-[2rem] bg-stone-900/80 p-5 border border-white/10">
                <p className="text-xs uppercase tracking-[0.35em] text-fire-yellow/80">Location</p>
                <p className="mt-3 text-sm font-semibold text-white">{address}</p>
              </div>
              <div className="rounded-[2rem] bg-stone-900/80 p-5 border border-white/10">
                <p className="text-xs uppercase tracking-[0.35em] text-fire-yellow/80">Phone</p>
                <p className="mt-3 text-sm font-semibold text-white">{phone}</p>
              </div>
              <div className="rounded-[2rem] bg-stone-900/80 p-5 border border-white/10">
                <p className="text-xs uppercase tracking-[0.35em] text-fire-yellow/80">Hours</p>
                <p className="mt-3 text-sm font-semibold text-white">6 AM - 9 PM</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-stone-900/70 shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fire-red/10 via-transparent to-fire-yellow/10" />
            <div className="relative h-96 sm:h-[520px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={bannerUrls[currentIndex]}
                  alt="Premium chicken hero"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="absolute bottom-6 left-6 rounded-[2rem] border border-white/10 bg-stone-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-fire-red/10 text-fire-red">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-fire-yellow/80">Fast delivery</p>
                  <p className="text-sm font-semibold text-white">Ready under 45 minutes</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 hidden text-[120px] font-black text-white/10 lg:block">FRESH</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
