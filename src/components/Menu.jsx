import React, { useState } from 'react';
import { spiceLabels } from '../data/menuItems';

function SpiceMeter({ level }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span 
          key={i} 
          className={`text-lg ${i < level ? 'opacity-100' : 'opacity-30'}`}
        >
          🌶️
        </span>
      ))}
    </div>
  );
}

function Menu({ items, addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState({});
  
  const categories = [
    { id: 'all', label: '🔥 All Items' },
    { id: 'signature', label: '🍗 Signature' },
    { id: 'wings', label: '🍗 Wings' },
    { id: 'boneless', label: '🍛 Curries' },
    { id: 'combo', label: '🍚 Biryani' },
    { id: 'addon', label: '➕ Add-ons' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-dark-bg to-stone-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-6xl md:text-7xl text-white mb-4">
            OUR <span className="text-fire-red">MENU</span>
          </h2>
          <p className="text-amber-100/70 text-lg">Select your spice level 🔥</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === cat.id 
                  ? 'bg-fire-red text-white scale-105' 
                  : 'bg-stone-800 text-amber-100/70 hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-stone-800/50 border border-stone-700 rounded-2xl overflow-hidden hover:border-fire-red/50 transition-all hover:scale-[1.02] group"
            >
              <div className="relative h-48 overflow-hidden">
                {item.image && !imageErrors[item.id] ? (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-stone-700 flex items-center justify-center text-8xl">
                    {item.emoji || '🍗'}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-dark-bg/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-fire-yellow font-bold text-lg">
                    ₹{item.price}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-amber-100/60 text-sm mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <SpiceMeter level={item.spiceLevel} />
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-fire-orange hover:bg-orange-600 px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
