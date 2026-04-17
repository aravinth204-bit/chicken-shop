import React, { useState } from 'react';
import { X } from 'lucide-react';

function AnnouncementBanner({ message = "🎉 Fresh Stock Available! Order now via WhatsApp" }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-fire-red to-red-700 text-white py-2 px-4 relative animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-sm md:text-base font-medium text-center">
          {message}
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default AnnouncementBanner;
