import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Logo from './components/Logo';
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
import HowItWorks from './components/HowItWorks';
import MarqueeBanner from './components/MarqueeBanner';
import WhatsAppCTA from './components/WhatsAppCTA';
import OurPromise from './components/OurPromise';
import MobileBottomNav from './components/MobileBottomNav';
import { storageService } from './services/storageService';
import { initializeDatabase } from './services/initDb';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [shopSettings, setShopSettings] = useState({ shopName: 'Chicken Sea', bannerUrl: '' });
  const [loading, setLoading] = useState(true);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for navbar animation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div id="top" className="min-h-screen bg-stone-900 pb-16 md:pb-0">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Floating Buttons (hidden on mobile — bottom nav handles it) */}
      <WhatsAppFloatingButton phone={shopSettings.phone} />
      <BackToTopButton />

      {/* Navbar */}
      <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-white/5'
          : 'bg-stone-900/95 backdrop-blur-sm border-b border-red-700/40'
      }`}>
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size={scrolled ? 'sm' : 'sm'} />
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <Link
              to="/track"
              title="Track Order"
              className="w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 bg-stone-800 hover:bg-stone-700 rounded-lg flex items-center justify-center md:gap-2 text-sm font-semibold text-white transition-colors"
            >
              <span className="text-base">🔍</span>
              <span className="hidden md:inline">Track</span>
            </Link>
            <a
              href="/admin"
              title="Admin Panel"
              className="w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 bg-stone-800 hover:bg-stone-700 rounded-lg flex items-center justify-center md:gap-2 text-sm font-semibold text-white transition-colors"
            >
              <span className="text-base">🔐</span>
              <span className="hidden md:inline">Admin</span>
            </a>
            {/* Cart button — shown on all screens but hidden on mobile (bottom nav handles) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex relative bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-full font-bold items-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm text-white"
            >
              <span>🛒</span>
              <span>Order Now</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-stone-900 w-5 h-5 rounded-full flex items-center justify-center font-black text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Page Sections */}
      <Hero settings={shopSettings} />
      <MarqueeBanner />
      <Stats />
      <HowItWorks />
      <OurPromise />
      <Menu items={menuItems} addToCart={addToCart} isLoading={loading} />
      <WhatsAppCTA />
      {!loading && <Reviews />}
      {!loading && <AdminPreview />}
      {!loading && <FAQ />}
      {!loading && <Location />}
      {!loading && <TrustBadges />}
      <Footer />

      {/* Overlays & Modals */}
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

      {/* Mobile Bottom Nav — replaces floating WhatsApp on mobile */}
      <MobileBottomNav
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Social Proof Toast */}
      <RecentOrderToast />
    </div>
  );
}

export default App;
