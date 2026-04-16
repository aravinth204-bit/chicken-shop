import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function Categories({ activeCategory, onCategoryChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    { id: 'all', label: 'All', icon: '🍽️', color: 'from-slate-500 to-slate-600' },
    { id: 'chicken', label: 'Chicken', icon: '🐔', color: 'from-amber-500 to-orange-500' },
    { id: 'goat', label: 'Mutton', icon: '🐐', color: 'from-red-500 to-red-600' },
    { id: 'duck', label: 'Duck', icon: '🦆', color: 'from-blue-500 to-blue-600' },
    { id: 'eggs', label: 'Eggs', icon: '🥚', color: 'from-yellow-500 to-amber-500' }
  ];

  const activeCat = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <section className="sticky top-14 md:top-16 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-2">
        
        {/* Mobile: Horizontal Scrollable */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Full display */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 py-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default Categories;
