import React from 'react';
import { Heart, MapPin, Phone, Clock, ArrowUp } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <span className="text-3xl">🏪</span>
              </div>
              <div>
                <h3 className="font-bold text-2xl">ARAVINTH.S</h3>
                <p className="text-red-400 text-sm">Poultry Shop</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Your trusted source for fresh poultry, meat, and eggs in Erode. We deliver premium quality products directly from farm to your table.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/918778017989" className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">📘</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-slate-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#specials" className="text-slate-400 hover:text-white transition-colors">Specials</a></li>
              <li><a href="#reviews" className="text-slate-400 hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-red-400" />
                Erode, Tamil Nadu
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-red-400" />
                +91 87780 17989
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Clock className="w-5 h-5 text-red-400" />
                6 AM - 9 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 ARAVINTH.S Poultry Shop, Erode. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Erode
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
