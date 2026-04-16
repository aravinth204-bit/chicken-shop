import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Location from './components/Location';
import Footer from './components/Footer';
import { storageService } from './services/storageService';
import { initializeDatabase } from './services/initDb';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [shopSettings, setShopSettings] = useState({ shopName: 'Chicken Sea', bannerUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeDatabase();
        const products = await storageService.getProducts();
        setMenuItems(products);
        const settings = await storageService.getSettings();
        setShopSettings(settings);
      } catch (error) {
        console.error("Failed to initialize app:", error);
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  const addToCart = (item) => {
    const weight = item.selectedWeight || item.defaultWeight || 1;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, selectedWeight: weight }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const weight = item.selectedWeight || 1;
    return sum + (item.price * weight * item.quantity);
  }, 0);
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍗</div>
          <div className="text-red-500 text-2xl animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl">🍗</span>
            <span className="font-bold text-2xl md:text-4xl text-red-600">
              {shopSettings.shopName}
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <a 
              href="/admin" 
              className="bg-stone-800 hover:bg-stone-700 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold text-white"
            >
              🔐 Admin
            </a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-red-600 hover:bg-red-700 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 text-sm md:text-base text-white"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Order Now</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-stone-900 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-bold text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <Hero settings={shopSettings} />
      <Menu items={menuItems} addToCart={addToCart} />
      <Location />
      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        cartTotal={cartTotal}
      />
    </div>
  );
}

export default App;
