import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import BackToTopButton from './components/BackToTopButton';
import Toast from './components/Toast';
import { storageService } from './services/storageService';
import { initializeDatabase } from './services/initDb';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [shopSettings, setShopSettings] = useState({ shopName: 'Chicken Sea', address: 'Erode, Tamil Nadu', phone: '+91 87780 17989', bannerUrls: [] });
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeDatabase();
        const products = await storageService.getProducts();
        setMenuItems(products);
        const settings = await storageService.getSettings();
        setShopSettings(settings);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('chicken_sea_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chicken_sea_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (entry) => entry.id === item.id && entry.selectedWeight === item.selectedWeight,
      );
      if (existingIndex !== -1) {
        return prev.map((entry, index) =>
          index === existingIndex ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart`, 'success');
  };

  const removeFromCart = (itemId, selectedWeight) => {
    setCart((prev) =>
      prev.filter((entry) =>
        entry.id !== itemId || (selectedWeight != null && entry.selectedWeight !== selectedWeight),
      ),
    );
    showToast('Item removed from cart', 'warning');
  };

  const updateQuantity = (itemId, delta, selectedWeight) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId && (selectedWeight == null || item.selectedWeight === selectedWeight)) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'success');
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.selectedWeight || 1) * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar cartCount={cartCount} />

      <main className="pt-24">
        <Outlet
          context={{
            menuItems,
            addToCart,
            cart,
            cartTotal,
            cartCount,
            removeFromCart,
            updateQuantity,
            clearCart,
            shopSettings,
            loading,
            setToast: showToast,
          }}
        />
      </main>

      <Footer />
      <WhatsAppFloatingButton phone={shopSettings.phone} />
      <BackToTopButton />
      <MobileBottomNav cartCount={cartCount} />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
