import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, MapPin, Phone } from 'lucide-react';

function MobileBottomNav({ cartCount, onCartOpen }) {
  const navItems = [
    { icon: Home, label: 'Home', href: '#top' },
    { icon: ShoppingBag, label: 'Menu', href: '#menu' },
    {
      icon: null,
      label: 'Order',
      href: '#menu',
      isCart: true,
      count: cartCount,
      action: onCartOpen
    },
    { icon: MapPin, label: 'Location', href: '#location' },
    { icon: Phone, label: 'Call', href: 'tel:+918778017989' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* Backdrop blur bar */}
      <div className="bg-stone-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item, i) => (
            item.isCart ? (
              <button
                key={i}
                onClick={item.action}
                className="relative flex flex-col items-center gap-1 px-3 py-1"
              >
                <div className="w-12 h-12 bg-fire-red rounded-2xl flex items-center justify-center text-xl -mt-5 shadow-2xl shadow-red-900/50 border-2 border-stone-950">
                  🛒
                </div>
                {item.count > 0 && (
                  <span className="absolute top-0 right-1 bg-fire-yellow text-stone-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}
                <span className="text-[10px] text-fire-red font-bold">Order</span>
              </button>
            ) : (
              <a
                key={i}
                href={item.href}
                className="flex flex-col items-center gap-1 px-3 py-1 text-amber-100/40 hover:text-white transition-colors group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            )
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export default MobileBottomNav;
