import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, MapPin, Phone, Clock, Image, Edit3, Save, X, Camera,
  Leaf, Heart, Users, TrendingUp
} from 'lucide-react';

function Hero() {
  const [bannerImage, setBannerImage] = useState('');
  const [shopName, setShopName] = useState('ARAVINTH.S POULTRY SHOP');
  const [phone, setPhone] = useState('8778017989');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedBanner = localStorage.getItem('poultryBanner');
    const savedName = localStorage.getItem('poultryShopName');
    const savedPhone = localStorage.getItem('poultryPhone');
    if (savedBanner) setBannerImage(savedBanner);
    if (savedName) setShopName(savedName);
    if (savedPhone) setPhone(savedPhone);
  }, []);

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
      setBannerImage(base64);
      localStorage.setItem('poultryBanner', base64);
    };
    reader.readAsDataURL(file);
  };

  const startEditing = () => {
    setEditData({ name: shopName, phone: phone });
    setIsEditing(true);
  };

  const saveSettings = () => {
    setShopName(editData.name);
    setPhone(editData.phone);
    localStorage.setItem('poultryShopName', editData.name);
    localStorage.setItem('poultryPhone', editData.phone);
    setIsEditing(false);
  };

  return (
    <section id="home" className="relative py-16 md:py-20 lg:min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-slate-900 to-slate-900" />
      <div className="absolute inset-0 opacity-10 md:opacity-20">
        <div className="absolute top-10 md:top-20 left-0 md:left-20 w-48 md:w-96 h-48 md:h-96 bg-red-500 rounded-full filter blur-[64px] md:blur-[128px] animate-pulse" />
        <div className="absolute bottom-10 md:bottom-20 right-0 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-red-600 rounded-full filter blur-[64px] md:blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 md:px-6 py-1.5 md:py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-red-300 text-xs md:text-sm font-medium">Open Now • Fresh Daily</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {shopName}
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0">
              Premium quality live poultry, fresh meat & farm eggs delivered to your doorstep in Erode.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <a href="#products" className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg transition-all hover:shadow-xl hover:shadow-red-500/25 flex items-center justify-center gap-2">
                View Products
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://wa.me/918778017989" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg transition-all hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-6 justify-center lg:justify-start pt-2 md:pt-4">
              <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <span>Erode</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <span>6 AM - 9 PM</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <span>+91 {phone}</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            {bannerImage ? (
              <div className="relative group">
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl md:rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <img 
                  src={bannerImage} 
                  alt="Shop" 
                  className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                />
                <button
                  onClick={startEditing}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 p-2 md:p-3 rounded-lg md:rounded-xl text-white transition-all"
                >
                  <Edit3 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            ) : (
              <div 
                onClick={startEditing}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl md:rounded-3xl blur-xl opacity-30" />
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-dashed border-red-500/50 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center hover:border-red-400 transition-colors">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 md:w-12 md:h-12 text-red-400" />
                  </div>
                  <p className="text-white font-semibold text-sm md:text-lg">Upload Shop Image</p>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">Max 500KB</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Edit Shop Details</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Shop Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Phone Number</label>
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Banner Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:font-semibold file:cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
