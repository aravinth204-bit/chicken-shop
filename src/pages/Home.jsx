import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Menu, X, User, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Categories from '../components/Categories';
import ProductGrid from '../components/ProductGrid';
import DailySpecials from '../components/DailySpecials';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import DeliveryInfo from '../components/DeliveryInfo';
import WhatsAppOrder from '../components/WhatsAppOrder';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { defaultProducts } from '../data/menuItems';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('poultryProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('poultryProducts', JSON.stringify(defaultProducts));
    }
    const savedCart = localStorage.getItem('poultryCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('poultryCart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, weight) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.weight === weight);
      if (existing) {
        showToast(`${product.name} quantity updated!`);
        return prev.map(item => 
          item.id === product.id && item.weight === weight 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`${product.name} added to cart!`);
      return [...prev, { ...product, weight, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.unit === 'piece' 
      ? (item.pricePerDozen / 12) 
      : item.pricePerKg;
    return sum + (price * item.weight * item.quantity);
  }, 0);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && p.available;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return (a.pricePerKg || 0) - (b.pricePerKg || 0);
    if (sortBy === 'price-high') return (b.pricePerKg || 0) - (a.pricePerKg || 0);
    return a.name.localeCompare(b.name);
  });

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#specials', label: 'Specials' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏪</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-white leading-tight">ARAVINTH.S</h1>
                <p className="text-[10px] text-red-400 font-medium">Poultry Shop</p>
              </div>
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <Link 
                to="/admin" 
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <button 
                onClick={() => setShowOrderPanel(true)}
                className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden flex justify-between items-center h-14">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-base">🏪</span>
              </div>
              <div>
                <h1 className="font-bold text-sm text-white leading-tight">ARAVINTH.S</h1>
                <p className="text-[8px] text-red-400 font-medium">Poultry Shop</p>
              </div>
            </a>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowOrderPanel(true)}
                className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="bg-slate-800 p-2 rounded-lg text-white"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden bg-slate-900 border-t border-slate-700 ${showMobileMenu ? 'block' : 'hidden'}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 py-3 px-4 rounded-xl font-medium transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-700 pt-3 mt-3">
                  <Link 
                    to="/admin" 
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 py-3 px-4 rounded-xl font-medium transition-all"
                  >
                    Admin Panel
                  </Link>
                  <a 
                    href="https://wa.me/918778017989"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-green-400 hover:text-green-300 hover:bg-slate-800 py-3 px-4 rounded-xl font-medium transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp Order
                  </a>
                </div>
              </div>
            </div>
      </nav>

      {/* Main Content */}
      <main className="pt-14 lg:pt-16">
        <Hero />
        <Stats />
        <Categories 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        <DailySpecials products={products} addToCart={addToCart} />
        <ProductGrid 
          products={sortedProducts} 
          addToCart={addToCart}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showToast={showToast}
        />
        <Reviews />
        <FAQ />
        <DeliveryInfo />
      </main>

      <Footer />

      <WhatsAppOrder
        isOpen={showOrderPanel}
        onClose={() => setShowOrderPanel(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        cartTotal={cartTotal}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default Home;
