import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const locations = ['Chennai', 'Erode', 'Salem', 'Coimbatore', 'Madurai', 'Trichy'];
const orders = ['Farm Fresh Chicken', 'Organic Brown Eggs', 'Premium Goat Meat', 'Country Chicken'];

function RecentOrderToast() {
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const showOrder = () => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const item = orders[Math.floor(Math.random() * orders.length)];
      const time = Math.floor(Math.random() * 50) + 2;
      
      setCurrentOrder({ location, item, time });
      
      setTimeout(() => {
        setCurrentOrder(null);
      }, 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        showOrder();
      }
    }, 15000);

    // Show one after 3 seconds
    const initialTimeout = setTimeout(showOrder, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {currentOrder && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          className="fixed bottom-24 left-4 md:left-8 z-[100]"
        >
          <div className="bg-stone-900 shadow-2xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-fire-red/20 flex items-center justify-center text-fire-red">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">
                Someone in <span className="text-fire-red">{currentOrder.location}</span>
              </p>
              <p className="text-amber-100/60 text-xs">
                just bought {currentOrder.item}
              </p>
              <p className="text-fire-yellow/40 text-[10px] mt-1 font-bold">
                {currentOrder.time} mins ago
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RecentOrderToast;
