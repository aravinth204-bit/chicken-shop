import React, { useState, useEffect, useRef } from 'react';

function Banner() {
  const [bannerImage, setBannerImage] = useState('');
  const [shopName, setShopName] = useState('ARAVINTH.S POULTRY SHOP');
  const [phone, setPhone] = useState('8778017989');
  const [isEditing, setIsEditing] = useState(false);
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

  const saveSettings = () => {
    localStorage.setItem('poultryShopName', shopName);
    localStorage.setItem('poultryPhone', phone);
    setIsEditing(false);
  };

  return (
    <section className="relative bg-gradient-to-r from-red-700 to-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏪 {shopName}
            </h1>
            <p className="text-xl text-red-100 mb-6">
              Live Poultry & Fresh Meat Shop
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
                <span className="text-lg font-semibold">📍 Erode, Tamil Nadu</span>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full">
                <span className="text-lg font-semibold">📞 {phone}</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {bannerImage ? (
              <div className="relative group">
                <img 
                  src={bannerImage} 
                  alt="Shop" 
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                />
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full text-sm font-semibold text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✏️ Edit
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditing(true)}
                className="w-full h-64 bg-red-800 border-2 border-dashed border-red-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-red-750 transition-colors"
              >
                <span className="text-6xl mb-2">📷</span>
                <p className="text-red-200 font-semibold">Click to upload shop/farm image</p>
                <p className="text-red-300 text-sm mt-1">Max 500KB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-stone-800 mb-4">Edit Shop Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-stone-600 text-sm mb-1">Shop Name</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-stone-100 text-stone-800 px-4 py-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-stone-600 text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-100 text-stone-800 px-4 py-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-stone-600 text-sm mb-1">Banner Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-stone-100 text-stone-800 px-4 py-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white file:font-semibold file:cursor-pointer"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setBannerImage('');
                  localStorage.removeItem('poultryBanner');
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                Remove Image
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
              >
                Save
              </button>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full mt-3 bg-stone-200 hover:bg-stone-300 text-stone-700 py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Banner;
