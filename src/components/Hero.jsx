import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Phone, Clock, ShoppingCart } from 'lucide-react';

function Hero({ settings }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerUrls = settings?.bannerUrls || [];

  useEffect(() => {
    if (bannerUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerUrls.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [bannerUrls.length]);

  const shopName = settings?.shopName || 'Chicken Sea';
  const phone = settings?.phone || '+91 98765 43210';
  const address = settings?.address || 'Erode, Tamil Nadu';

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-dark-bg">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-fire-red rounded-full filter blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] bg-fire-yellow rounded-full filter blur-[100px]" 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-stone-900/50 backdrop-blur-md border border-white/10 rounded-full px-5 py-2"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-amber-100 text-sm font-semibold tracking-wide uppercase">Open Now • Fresh Selection</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] font-display"
            >
              <span className="text-fire-red drop-shadow-sm">{shopName}</span>
              <br />
              <span className="text-white">POULTRY</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-amber-100/70 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
            >
              Experience the pinnacle of freshness. Premium quality poultry, farm-fresh eggs, and artisanal cuts delivered straight to your home.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#menu"
                className="group relative bg-fire-red hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-red-900/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <ShoppingCart className="w-5 h-5" />
                Shop Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900/80 backdrop-blur-md border border-white/5 hover:bg-stone-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 text-fire-red" />
                Contact Us
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-white/5"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-fire-red">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Location</span>
                </div>
                <span className="text-amber-100/90 text-sm font-medium">{address}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-fire-red">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Hours</span>
                </div>
                <span className="text-amber-100/90 text-sm font-medium">6 AM - 9 PM</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-80 sm:h-[400px] lg:h-[550px]"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-fire-red/20 to-fire-yellow/20 rounded-[3rem] blur-2xl opacity-40 animate-pulse" />
            
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              {bannerUrls.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIndex}
                    src={bannerUrls[currentIndex]} 
                    alt="Latest Deals"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 flex flex-col items-center justify-center">
                   <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl md:text-9xl filter drop-shadow-2xl"
                   >
                    🍗
                   </motion.div>
                   <p className="mt-8 text-white/40 font-display text-xl">Fresh & Organic</p>
                </div>
              )}

              {/* Slider Controls */}
              {bannerUrls.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {bannerUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-3 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Floating Status Card */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-8 right-8 bg-stone-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fire-red/20 flex items-center justify-center text-fire-red">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Lightning Fast</p>
                    <p className="text-amber-100/50 text-xs font-medium">Under 45 Mins Delivery</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Decorative Text */}
            <div className="absolute -bottom-12 -right-12 text-[120px] font-black text-white/[0.03] pointer-events-none select-none font-display">
              FRESH
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
