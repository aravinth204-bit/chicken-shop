import React, { useState } from 'react';
import { categories } from '../data/menuItems';
import ProductSkeleton from './ProductSkeleton';
import { Heart } from 'lucide-react';

function SpiceMeter({ level }) {
  if (!level || level === 0) return null;
  return (
    <div className="flex items-center gap-1">
      <span className="text-amber-100/60 text-xs">Spice:</span>
      {[...Array(3)].map((_, i) => (
        <span 
          key={i} 
          className={`text-xs ${i < level ? 'opacity-100' : 'opacity-30'}`}
        >
          🌶️
        </span>
      ))}
    </div>
  );
}

function Menu({ items, addToCart, isLoading = false }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState({});
  const [selectedWeights, setSelectedWeights] = useState({});
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (itemId) => {
    setWishlist(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      chicken: 'bg-fire-red',
      goat: 'bg-red-700',
      duck: 'bg-red-600',
      eggs: 'bg-red-800'
    };
    return colors[categoryId] || 'bg-stone-700';
  };

  const formatPrice = (item) => {
    if (item.unit === 'piece') {
      return `₹${item.price}/pc`;
    }
    return `₹${item.price}/kg`;
  };

  const getWeightOptions = (item) => {
    if (item.unit === 'piece') {
      return item.unitOptions || [1, 2, 3, 6, 12];
    }
    return item.weightOptions || [0.5, 1, 1.5, 2];
  };

  const getDefaultWeight = (item) => {
    if (item.unit === 'piece') {
      return item.defaultUnit || 1;
    }
    return item.defaultWeight || 1;
  };

  const handleWeightSelect = (itemId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [itemId]: weight }));
  };

  const handleAddToCart = (item) => {
    const weight = selectedWeights[item.id] || getDefaultWeight(item);
    addToCart({ ...item, selectedWeight: weight });
  };

  return (
    <section id="menu" className="py-16 md:py-20 bg-gradient-to-b from-dark-bg to-stone-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-4">
            OUR <span className="text-fire-red">PRODUCTS</span>
          </h2>
          <p className="text-amber-100/70 text-base md:text-lg">Fresh poultry & meat delivered to you!</p>
        </div>

        {/* Category Filter */}
        <div className="relative flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
              activeCategory === 'all'
                ? 'bg-fire-red text-white scale-105 shadow-lg shadow-fire-red/30'
                : 'bg-stone-800 text-amber-100/70 hover:bg-stone-700'
            }`}
          >
            🛒 All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base flex items-center gap-2 ${
                activeCategory === cat.id
                  ? `${getCategoryColor(cat.id)} text-white scale-105 shadow-lg ${getCategoryColor(cat.id).replace('bg-', 'shadow-')}/30`
                  : 'bg-stone-800 text-amber-100/70 hover:bg-stone-700'
              }`}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {isLoading && <ProductSkeleton />}

        {/* Products Grid */}
        {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((item, index) => {
            const weightOptions = getWeightOptions(item);
            const defaultWeight = getDefaultWeight(item);
            const currentWeight = selectedWeights[item.id] || defaultWeight;

            return (
              <div
                key={item.id}
                className={`group bg-stone-800/50 border border-stone-700 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] animate-fade-in-up ${
                  !item.inStock ? 'opacity-75' : 'hover:border-fire-red/50'
                }`}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Image Section */}
                <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                  {item.image && !imageErrors[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-700 flex items-center justify-center text-5xl sm:text-6xl">
                      {item.emoji || '🍗'}
                    </div>
                  )}
                  
                  {/* Out of Stock Overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm">
                        OUT OF STOCK
                      </span>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {item.popular && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-fire-yellow text-dark-bg px-2 md:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      🔥 Popular
                    </div>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className={`absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 rounded-full transition-all ${
                      wishlist[item.id]
                        ? 'bg-red-500 text-white'
                        : 'bg-black/50 backdrop-blur-sm text-white hover:bg-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist[item.id] ? 'fill-current' : ''}`} />
                  </button>

                  {/* Price Badge */}
                  <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-dark-bg/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
                    <span className="text-fire-yellow font-bold text-sm md:text-base">
                      {formatPrice(item)}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute bottom-2 left-2 md:bottom-3 md:left-3 px-2 py-0.5 md:py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-3 md:p-4">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-amber-100/60 text-xs md:text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <SpiceMeter level={item.spiceLevel} />
                  
                  {/* Weight/Unit Selector */}
                  {item.inStock && (
                    <div className="mt-3 mb-3">
                      <p className="text-amber-100/60 text-xs mb-2">
                        {item.unit === 'piece' ? 'Select Quantity:' : 'Select Weight:'}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {weightOptions.slice(0, 6).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleWeightSelect(item.id, opt)}
                            className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold transition-all active:scale-95 ${
                              currentWeight === opt
                                ? 'bg-fire-red text-white'
                                : 'bg-stone-700 text-amber-100/70 hover:bg-stone-600'
                            }`}
                          >
                            {opt}{item.unit === 'piece' ? 'pc' : 'kg'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add to Cart Button */}
                  {item.inStock ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-fire-red hover:bg-red-700 px-4 py-2 md:py-3 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>🛒</span>
                      <span>Add ₹{(item.price * currentWeight).toFixed(0)}</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-stone-700 px-4 py-2 md:py-3 rounded-full font-bold text-sm md:text-base text-amber-100/40 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span>🚫</span>
                      <span>Not Available</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📦</p>
            <p className="text-amber-100/60 text-lg">No products in this category</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
