import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/menuItems';
import ProductSkeleton from './ProductSkeleton';
import { Heart, Search, ShoppingCart, Info, Star } from 'lucide-react';

function SpiceMeter({ level }) {
  if (!level || level === 0) return null;
  return (
    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
      {[...Array(3)].map((_, i) => (
        <span 
          key={i} 
          className={`text-[10px] transform transition-transform ${i < level ? 'opacity-100 scale-110' : 'opacity-20 scale-90'}`}
        >
          🌶️
        </span>
      ))}
    </div>
  );
}

function Menu({ items, addToCart, isLoading = false }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [selectedWeights, setSelectedWeights] = useState({});
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (itemId) => {
    setWishlist(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      chicken: 'from-red-500 to-red-700',
      goat: 'from-amber-700 to-orange-900',
      duck: 'from-red-600 to-red-800',
      eggs: 'from-yellow-400 to-yellow-600'
    };
    return colors[categoryId] || 'from-stone-600 to-stone-800';
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
    <section id="menu" className="py-24 bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight"
            >
              PREMIUM <span className="text-fire-red">CUTS</span>
            </motion.h2>
            <p className="text-amber-100/60 font-sans max-w-lg text-lg">
              Explore our selection of farm-fresh poultry and premium meats, processed with the highest hygiene standards.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-fire-red transition-colors" />
            <input 
              type="text"
              placeholder="Search chicken, eggs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-800/50 backdrop-blur-xl border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-fire-red/50 focus:ring-1 focus:ring-fire-red/20 transition-all font-sans"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 text-sm tracking-wide flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-fire-red text-white shadow-2xl shadow-red-900/40'
                : 'bg-stone-800/50 text-amber-100/50 hover:bg-stone-800 hover:text-amber-100 border border-white/5'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 text-sm tracking-wide flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-red-900 text-white border border-red-500/30'
                  : 'bg-stone-800/50 text-amber-100/50 hover:bg-stone-800 hover:text-amber-100 border border-white/5'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {isLoading && <ProductSkeleton />}

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {!isLoading && filteredItems.map((item) => {
              const weightOptions = getWeightOptions(item);
              const defaultWeight = getDefaultWeight(item);
              const currentWeight = selectedWeights[item.id] || defaultWeight;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative bg-stone-900 border border-white/5 rounded-[2rem] overflow-hidden transition-all hover:border-fire-red/30 shadow-xl ${
                    !item.inStock ? 'opacity-80 grayscale-[0.5]' : ''
                  }`}
                >
                  {/* Image Section */}
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent z-10" />
                    
                    {item.image && !imageErrors[item.id] ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-800 flex items-center justify-center text-7xl">
                        {item.emoji || '🍗'}
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                       {item.popular && (
                        <div className="bg-fire-yellow text-stone-950 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-lg ring-1 ring-white/20">
                          <Star className="w-3 h-3 fill-current" />
                          Best Seller
                        </div>
                      )}
                      <div className={`bg-gradient-to-r ${getCategoryColor(item.category)} text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-lg`}>
                        {item.category}
                      </div>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className={`absolute top-4 right-4 z-20 p-2.5 rounded-xl transition-all backdrop-blur-md border border-white/10 ${
                        wishlist[item.id]
                          ? 'bg-red-500 text-white'
                          : 'bg-black/30 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist[item.id] ? 'fill-current' : ''}`} />
                    </button>

                    {/* Price Overlay */}
                    <div className="absolute bottom-4 left-4 z-20">
                       <p className="text-white font-display text-2xl font-black">
                         {formatPrice(item)}
                       </p>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-fire-red transition-colors">{item.name}</h3>
                      <SpiceMeter level={item.spiceLevel} />
                    </div>
                    
                    <p className="text-amber-100/50 text-sm font-sans leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Weight Selector */}
                    {item.inStock && (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {weightOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleWeightSelect(item.id, opt)}
                              className={`flex-1 min-w-[70px] py-2 rounded-xl text-[11px] font-bold transition-all active:scale-95 border ${
                                currentWeight === opt
                                  ? 'bg-white text-black border-white'
                                  : 'bg-stone-800 text-amber-100/40 border-white/5 hover:border-white/20'
                              }`}
                            >
                              {opt}{item.unit === 'piece' ? 'pc' : 'kg'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Add to Cart Button */}
                    <div className="pt-2">
                      {item.inStock ? (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-fire-red hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-2xl hover:shadow-red-900/40 active:scale-95 flex items-center justify-center gap-3"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart • ₹{(item.price * currentWeight).toFixed(0)}</span>
                        </button>
                      ) : (
                        <div className="w-full bg-stone-800/50 border border-white/5 px-6 py-4 rounded-2xl font-bold text-sm text-amber-100/20 text-center cursor-not-allowed">
                          SOLD OUT
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 space-y-6"
          >
            <div className="w-24 h-24 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold text-white">No items found</h3>
            <p className="text-amber-100/50 max-w-xs mx-auto">
              We couldn't find anything matching "{searchQuery}". Try a different category or clear the search.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
              className="text-fire-red font-bold hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Menu;
