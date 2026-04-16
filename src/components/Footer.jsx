import React from 'react';
import { Heart } from 'lucide-react';
import { storageService } from '../services/storageService';

function Footer() {
  return (
    <footer className="bg-stone-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-fire-red to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍗</span>
              </div>
              <div>
                <h3 className="font-bold text-2xl text-white">Chicken Sea</h3>
                <p className="text-fire-red text-sm">Poultry Shop</p>
              </div>
            </div>
            <p className="text-amber-100/60 mb-6 max-w-md">
              Your trusted source for fresh poultry, meat, and eggs in Erode. We deliver premium quality products directly from farm to your table.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-stone-800 hover:bg-fire-red rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-stone-800 hover:bg-fire-red rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-stone-800 hover:bg-fire-red rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-amber-100/60 hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="text-amber-100/60 hover:text-white transition-colors">Products</a></li>
              <li><a href="#location" className="text-amber-100/60 hover:text-white transition-colors">Location</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-amber-100/60">
                <span className="text-lg">📍</span>
                Erode, Tamil Nadu
              </li>
              <li className="flex items-center gap-3 text-amber-100/60">
                <span className="text-lg">📞</span>
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-amber-100/60">
                <span className="text-lg">⏰</span>
                6 AM - 9 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-amber-100/40 text-sm">
            © 2024 Chicken Sea, Erode. All rights reserved.
          </p>
          <p className="text-amber-100/40 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-fire-red fill-fire-red" /> in Erode
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
