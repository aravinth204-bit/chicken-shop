import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Phone, Clock } from 'lucide-react';
import { storageService } from '../services/storageService';

function Hero({ settings }) {
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    if (settings?.bannerUrl) {
      setBannerUrl(settings.bannerUrl);
    }
  }, [settings]);

  const shopName = settings?.shopName || 'Chicken Sea';
  const phone = settings?.phone || '+91 98765 43210';
  const address = settings?.address || 'Erode, Tamil Nadu';

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fire-red/30 via-dark-bg to-dark-bg" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-0 w-64 md:w-96 h-64 md:h-96 bg-fire-red rounded-full filter blur-[100px] md:blur-[150px] animate-pulse" />
        <div className="absolute bottom-10 right-0 w-64 md:w-96 h-64 md:h-96 bg-orange-600 rounded-full filter blur-[100px] md:blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-fire-red/20 border border-fire-red/30 rounded-full px-4 md:px-6 py-2 animate-fade-in-up stagger-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-fire-yellow text-sm md:text-base font-medium">Open Now • Fresh Daily</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-display animate-fade-in-up stagger-2">
              <span className="text-fire-red">{shopName}</span>
              <br />
              <span className="text-amber-100">Poultry Shop</span>
            </h1>

            <p className="text-lg md:text-xl text-amber-100/70 max-w-xl mx-auto lg:mx-0 animate-fade-in-up stagger-3">
              Premium quality live poultry, fresh meat & farm eggs delivered to your doorstep in Erode.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-in-up stagger-4">
              <a
                href="#menu"
                className="bg-fire-red hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                View Products
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-fire-red hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start pt-4 animate-fade-in-up stagger-5">
              <div className="flex items-center gap-2 text-amber-100/80 text-sm md:text-base">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-fire-red" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-100/80 text-sm md:text-base">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-fire-red" />
                <span>6 AM - 9 PM</span>
              </div>
              <div className="flex items-center gap-2 text-amber-100/80 text-sm md:text-base">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-fire-red" />
                <span>{phone}</span>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative animate-fade-in-up">
            {bannerUrl ? (
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-fire-red to-orange-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <img 
                  src={bannerUrl} 
                  alt={shopName}
                  className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                />
              </div>
            ) : (
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-dashed border-fire-red/50 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-fire-red/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-5xl md:text-7xl">🐔</span>
                </div>
                <p className="text-amber-100/60 text-base md:text-lg font-semibold">Shop Banner</p>
                <p className="text-amber-100/40 text-sm mt-1">Upload from Admin Settings</p>
              </div>
            )}

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-fire-yellow text-dark-bg px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg animate-bounce">
              Fresh Daily! 🐔
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-amber-100/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-amber-100/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
