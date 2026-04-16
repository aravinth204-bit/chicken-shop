import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Image, Eye, LogOut, 
  Menu, X, ChevronRight, TrendingUp, Users, DollarSign, ShoppingBag
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminMenu from './AdminMenu';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('poultryAdminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('poultryAdminAuth', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('poultryAdminAuth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-[128px]" />
        </div>
        
        <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/25">
              <span className="text-4xl">🏪</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="text-slate-400 mt-2">ARAVINTH.S Poultry Shop</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-500/25"
            >
              Login
            </button>
            <p className="text-center text-slate-500 text-sm mt-4">
              Default password: admin123
            </p>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'menu', label: 'Products', icon: Package },
    { id: 'banner', label: 'Banner', icon: Image },
    { id: 'customer', label: 'Customer View', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏪</span>
              </div>
              <div>
                <span className="font-bold text-white">ARAVINTH.S</span>
                <span className="text-red-400 text-xs ml-2">ADMIN</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden bg-slate-700 p-2 rounded-lg text-white"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl font-medium text-sm text-slate-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
          
          <div className="flex gap-1 py-2 overflow-x-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === item.id 
                    ? 'bg-red-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 p-4 flex justify-between">
          <div className="flex gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setShowMobileMenu(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm ${
                  activeTab === item.id ? 'bg-red-600 text-white' : 'text-slate-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 text-sm"
          >
            Logout
          </button>
        </div>
      )}

      <div className="p-4 md:p-6">
        {activeTab === 'orders' && <AdminDashboard />}
        {activeTab === 'menu' && <AdminMenu />}
        {activeTab === 'banner' && <BannerSettings />}
        {activeTab === 'customer' && (
          <div className="p-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Customer View</h2>
            <p className="text-slate-400 mb-6">Click below to view the customer website</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Open Customer Website
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function BannerSettings() {
  const [shopName, setShopName] = useState('ARAVINTH.S POULTRY SHOP');
  const [phone, setPhone] = useState('8778017989');
  const [bannerImage, setBannerImage] = useState('');
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('poultryShopName');
    const savedPhone = localStorage.getItem('poultryPhone');
    const savedBanner = localStorage.getItem('poultryBanner');
    if (saved) setShopName(saved);
    if (savedPhone) setPhone(savedPhone);
    if (savedBanner) setBannerImage(savedBanner);
  }, []);

  const handleSave = () => {
    localStorage.setItem('poultryShopName', shopName);
    localStorage.setItem('poultryPhone', phone);
    alert('Settings saved successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      alert('Image size should be less than 500KB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(reader.result);
      localStorage.setItem('poultryBanner', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Image className="w-6 h-6 text-red-400" />
          Banner Settings
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-2">Banner Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:font-semibold file:cursor-pointer"
            />
            <p className="text-slate-500 text-xs mt-1">Max 500KB - JPG, PNG supported</p>
          </div>
          {bannerImage && (
            <div>
              <p className="text-slate-400 text-sm mb-2">Current Banner:</p>
              <div className="relative">
                <img src={bannerImage} alt="Banner" className="w-full h-48 object-cover rounded-xl" />
                <button
                  onClick={() => {
                    setBannerImage('');
                    localStorage.removeItem('poultryBanner');
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSave}
          className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Admin;
