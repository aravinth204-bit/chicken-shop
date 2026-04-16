import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import AdminDashboard from './AdminDashboard';
import AdminMenu from './AdminMenu';

function Admin() {
  const [auth, setAuth] = useState({ authenticated: false, role: null });
  const [loginType, setLoginType] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authStatus = await storageService.checkAuth();
    setAuth(authStatus);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    let result;
    if (loginType === 'admin') {
      result = await storageService.adminLogin(username, password);
    } else {
      result = await storageService.staffLogin(username, password);
    }
    
    if (result.success) {
      setAuth({ authenticated: true, role: result.role });
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  const handleLogout = async () => {
    await storageService.logout(auth.role);
    setAuth({ authenticated: false, role: null });
    setUsername('');
    setPassword('');
  };

  if (!auth.authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fire-red rounded-full filter blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-[128px]" />
        </div>
        
        <div className="relative bg-stone-800/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-stone-700">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-fire-red to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-fire-red/25">
              <span className="text-4xl">🍗</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="text-amber-100/60 mt-2">Chicken Sea - Admin Panel</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                loginType === 'admin' 
                  ? 'bg-fire-red text-white' 
                  : 'bg-stone-700 text-amber-100/60'
              }`}
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => setLoginType('staff')}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                loginType === 'staff' 
                  ? 'bg-fire-red text-white' 
                  : 'bg-stone-700 text-amber-100/60'
              }`}
            >
              👤 Staff
            </button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">
                {loginType === 'admin' ? 'Admin Username' : 'Staff Username'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={loginType === 'admin' ? 'admin' : 'staff'}
                className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red text-lg"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fire-red to-red-700 hover:from-red-600 hover:to-red-700 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-fire-red/25"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-amber-100/40">
              {loginType === 'admin' ? (
                <>Default: admin / admin123</>
              ) : (
                <>Default: staff / staff123</>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isStaff = auth.role === 'staff';

  return (
    <div className="min-h-screen bg-dark-bg">
      <nav className="bg-stone-900/95 backdrop-blur-xl border-b border-stone-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-fire-red to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">🍗</span>
              </div>
              <div>
                <span className="font-bold text-white">CHICKEN SEA</span>
                <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                  isStaff ? 'bg-blue-500/20 text-blue-400' : 'bg-fire-red/20 text-fire-red'
                }`}>
                  {isStaff ? 'STAFF' : 'ADMIN'}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-xl font-medium text-sm text-amber-100/60 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="flex gap-1 py-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === 'orders' 
                  ? 'bg-fire-red text-white' 
                  : 'text-amber-100/60 hover:bg-stone-800 hover:text-white'
              }`}
            >
              📦 Orders
            </button>
            
            {!isStaff && (
              <>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === 'menu' 
                      ? 'bg-fire-red text-white' 
                      : 'text-amber-100/60 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  🍽️ Products
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === 'settings' 
                      ? 'bg-fire-red text-white' 
                      : 'text-amber-100/60 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  ⚙️ Settings
                </button>
              </>
            )}
            
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === 'customer' 
                  ? 'bg-fire-red text-white' 
                  : 'text-amber-100/60 hover:bg-stone-800 hover:text-white'
              }`}
            >
              👁️ Customer View
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 md:p-6">
        {activeTab === 'orders' && <AdminDashboard isStaff={isStaff} />}
        {activeTab === 'menu' && !isStaff && <AdminMenu />}
        {activeTab === 'settings' && !isStaff && <SettingsPanel />}
        {activeTab === 'customer' && (
          <div className="p-8 text-center bg-stone-800/50 rounded-2xl border border-stone-700">
            <div className="w-20 h-20 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👁️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Customer View</h2>
            <p className="text-amber-100/60 mb-6">Click below to view the customer website</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-fire-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Open Customer Website
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [settings, setSettings] = useState({
    shopName: 'Chicken Sea',
    phone: '+91 98765 43210',
    address: 'Erode, Tamil Nadu',
    bannerUrl: ''
  });
  const [priceLogs, setPriceLogs] = useState([]);
  const [saved, setSaved] = useState(false);
  const [bannerPreview, setBannerPreview] = useState('');
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    loadSettings();
    loadPriceLogs();
  }, []);

  const loadSettings = async () => {
    const data = await storageService.getSettings();
    setSettings(data);
    setBannerPreview(data.bannerUrl || '');
  };

  const loadPriceLogs = async () => {
    const logs = await storageService.getPriceLogs();
    setPriceLogs(logs);
  };

  const handleSave = async () => {
    await storageService.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
      const base64 = reader.result;
      setSettings({ ...settings, bannerUrl: base64 });
      setBannerPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const removeBanner = () => {
    setSettings({ ...settings, bannerUrl: '' });
    setBannerPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Shop Settings */}
      <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          ⚙️ Shop Settings
        </h2>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Shop Name</label>
              <input
                type="text"
                value={settings.shopName}
                onChange={(e) => setSettings({...settings, shopName: e.target.value})}
                className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
              />
            </div>
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">WhatsApp Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <label className="block text-amber-100/60 text-sm mb-2">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
        </div>
      </div>

      {/* Banner Upload */}
      <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          🖼️ Shop Banner
        </h2>
        
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-fire-red file:text-white file:font-semibold file:cursor-pointer"
          />
          <p className="text-amber-100/40 text-sm">Max 500KB - JPG, PNG supported</p>
          
          {bannerPreview && (
            <div className="relative">
              <img src={bannerPreview} alt="Banner" className="w-full h-48 object-cover rounded-xl" />
              <button
                onClick={removeBanner}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price Update Logs */}
      <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          📊 Price Update History
        </h2>
        
        {priceLogs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-amber-100/60">No price updates yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {priceLogs.slice(0, 20).map((log, index) => (
              <div key={index} className="bg-stone-900/50 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{log.itemName}</p>
                  <p className="text-amber-100/40 text-xs">
                    {new Date(log.timestamp).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-red-400 line-through">₹{log.oldPrice}</span>
                  <span className="text-green-400 font-bold ml-2">₹{log.newPrice}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          saved 
            ? 'bg-stone-600 text-white' 
            : 'bg-gradient-to-r from-fire-red to-red-700 hover:from-red-600 hover:to-red-700 text-white'
        }`}
      >
        {saved ? '✓ Saved!' : 'Save All Settings'}
      </button>
    </div>
  );
}

export default Admin;
