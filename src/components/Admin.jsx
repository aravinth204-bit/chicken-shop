import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import AdminDashboard from './AdminDashboard';
import AdminMenu from './AdminMenu';
import AdminCustomers from './admin/AdminCustomers';
import AdminCoupons from './admin/AdminCoupons';
import AdminAnalytics from './admin/AdminAnalytics';
import AdminOrders from './admin/AdminOrders';
import Sidebar from './admin/Sidebar';
import Topbar from './admin/Topbar';
import Toast from './Toast';
import { AdminProvider, useAdmin } from '../context/AdminContext';

function Admin() {
  const [auth, setAuth] = useState({ authenticated: false, role: null });
  const [loginType, setLoginType] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
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
      setUsername('');
      setPassword('');
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  const handleLogout = async () => {
    await storageService.logout(auth.role);
    setAuth({ authenticated: false, role: null });
    setActiveTab('dashboard');
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
            <p className="text-amber-100/60 mt-2">Chicken Sea Admin Portal</p>
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
              {loginType === 'admin' ? 'Default: admin / admin123' : 'Default: staff / staff123'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isStaff = auth.role === 'staff';

  return (
    <AdminProvider>
      <AdminPageContent
        auth={auth}
        isStaff={isStaff}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />
    </AdminProvider>
  );
}

function AdminPageContent({ isStaff, activeTab, setActiveTab, handleLogout }) {
  const { toast, setSidebarOpen } = useAdmin();

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="lg:flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isStaff={isStaff} />
        <div className="flex-1">
          <Topbar isStaff={isStaff} onSidebarToggle={() => setSidebarOpen((prev) => !prev)} onLogout={handleLogout} />
          <main className="p-4 md:p-6">
            {activeTab === 'dashboard' && <AdminDashboard isStaff={isStaff} />}
            {activeTab === 'products' && !isStaff && <AdminMenu />}
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'customers' && <AdminCustomers />}
            {activeTab === 'coupons' && <AdminCoupons />}
            {activeTab === 'analytics' && <AdminAnalytics />}
            {activeTab === 'settings' && !isStaff && <SettingsPanel />}
            {activeTab === 'customer' && (
              <div className="p-8 text-center bg-stone-800/50 rounded-3xl border border-stone-700">
                <div className="w-20 h-20 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👁️</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Customer View</h2>
                <p className="text-amber-100/70 mb-6">Open the storefront in a new tab to preview the live customer experience.</p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-3xl bg-fire-red px-8 py-4 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Open Customer Website
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

function SettingsPanel() {
  const [settings, setSettings] = useState({
    shopName: 'Chicken Sea',
    phone: '+91 98765 43210',
    address: 'Erode, Tamil Nadu',
    bannerUrls: []
  });
  const [priceLogs, setPriceLogs] = useState([]);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadSettings();
    loadPriceLogs();
  }, []);

  const loadSettings = async () => {
    const data = await storageService.getSettings();
    if (data.bannerUrl && (!data.bannerUrls || data.bannerUrls.length === 0)) {
      data.bannerUrls = [data.bannerUrl];
      delete data.bannerUrl;
    }
    setSettings({ ...data, bannerUrls: data.bannerUrls || [] });
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
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    if (settings.bannerUrls.length >= 3) {
      alert('Max 3 banner images allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setSettings((prev) => ({ ...prev, bannerUrls: [...prev.bannerUrls, base64] }));
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removeBanner = (index) => {
    setSettings((prev) => ({
      ...prev,
      bannerUrls: prev.bannerUrls.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-stone-800/50 rounded-3xl p-6 border border-stone-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">⚙️ Shop Settings</h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Shop Name</label>
              <input
                type="text"
                value={settings.shopName}
                onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-fire-red"
              />
            </div>
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">WhatsApp Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <label className="block text-amber-100/60 text-sm mb-2">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-stone-700 border border-stone-600 text-white px-4 py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
        </div>
      </div>

      <div className="bg-stone-800/50 rounded-3xl p-6 border border-stone-700">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">🖼️ Shop Banner Slideshow ({settings.bannerUrls.length}/3)</h2>
          {settings.bannerUrls.length < 3 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="rounded-3xl bg-fire-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              + Add Image
            </button>
          )}
        </div>
        <p className="text-amber-100/40 text-sm mb-4">Add up to 3 slider images for the home page. Max 2MB each.</p>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {settings.bannerUrls.map((url, index) => (
            <div key={index} className="relative group rounded-3xl overflow-hidden border border-stone-600 bg-stone-900 aspect-video">
              <img src={url} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeBanner(index)}
                  className="rounded-3xl bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Slide {index + 1}</div>
            </div>
          ))}
          {settings.bannerUrls.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-stone-700 bg-stone-900/50 p-12 text-center text-amber-100/50">
              <p>No banners uploaded yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-stone-800/50 rounded-3xl p-6 border border-stone-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">📊 Price Update History</h2>
        {priceLogs.length === 0 ? (
          <div className="py-8 text-center text-amber-100/60">No price updates yet.</div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {priceLogs.slice(0, 20).map((log, index) => (
              <div key={index} className="rounded-3xl bg-stone-900/70 p-4 border border-stone-700 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold">{log.itemName}</p>
                  <p className="text-amber-100/50 text-xs">{new Date(log.timestamp).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <span className="text-red-400 line-through">₹{log.oldPrice}</span>
                  <span className="ml-2 text-green-400 font-bold">₹{log.newPrice}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleSave}
        className={`w-full rounded-3xl py-4 text-lg font-bold transition ${
          saved ? 'bg-stone-600 text-white' : 'bg-gradient-to-r from-fire-red to-red-700 text-white hover:from-red-600 hover:to-red-700'
        }`}
      >
        {saved ? '✓ Saved!' : 'Save All Settings'}
      </button>
    </div>
  );
}

export default Admin;
