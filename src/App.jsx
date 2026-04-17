import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Location from './components/Location';
import Footer from './components/Footer';
import TrustBadges from './components/TrustBadges';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import BackToTopButton from './components/BackToTopButton';
import AnnouncementBanner from './components/AnnouncementBanner';
import CartSuccessAnimation from './components/CartSuccessAnimation';
import Reviews from './components/Reviews';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import RecentOrderToast from './components/RecentOrderToast';
import AdminPreview from './components/AdminPreview';
import { storageService } from './services/storageService';
import { initializeDatabase } from './services/initDb';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [shopSettings, setShopSettings] = useState({ shopName: 'Chicken Sea', bannerUrl: '' });
  const [loading, setLoading] = useState(true);
  const [showCartSuccess, setShowCartSuccess] = useState(false);

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
    setShowCartSuccess(true);
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

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Floating Buttons */}
      <WhatsAppFloatingButton phone={shopSettings.phone} />
      <BackToTopButton />

      <nav className="fixed top-10 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl">🍗</span>
            <span className="font-bold text-2xl md:text-4xl text-red-600">
              {shopSettings.shopName}
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link 
              to="/track" 
              className="bg-stone-800 hover:bg-stone-700 p-2 md:px-4 md:py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2"
              title="Track Order"
            >
              <span className="text-base md:text-lg">🔍</span>
              <span className="hidden md:inline">Track</span>
            </Link>
            <a 
              href="/admin" 
              className="bg-stone-800 hover:bg-stone-700 p-2 md:px-4 md:py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2"
              title="Admin Login"
            >
              <span className="text-base md:text-lg">🔐</span>
              <span className="hidden md:inline">Admin</span>
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-red-600 hover:bg-red-700 px-3 md:px-6 py-2 md:py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs md:text-base text-white ml-1"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Order Now</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-yellow-500 text-stone-900 w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <Hero settings={shopSettings} />
      <Stats />
      <Menu items={menuItems} addToCart={addToCart} isLoading={loading} />
      {!loading && <Reviews />}
      {!loading && <AdminPreview />}
      {!loading && <FAQ />}
      {!loading && <Location />}
      {!loading && <TrustBadges />}
      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        cartTotal={cartTotal}
      />

      <CartSuccessAnimation
        show={showCartSuccess}
        onComplete={() => setShowCartSuccess(false)}
      />
      <RecentOrderToast />
    </div>
  );
}

export default App;
