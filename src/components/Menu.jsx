import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/menuItems';
import ProductSkeleton from './ProductSkeleton';
import { Heart, Search, ShoppingCart, Star } from 'lucide-react';

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
    setWishlist((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      chicken: 'from-red-500 to-red-700',
      goat: 'from-amber-700 to-orange-900',
      duck: 'from-red-600 to-red-800',
      eggs: 'from-yellow-400 to-yellow-600',
    };
    return colors[categoryId] || 'from-stone-600 to-stone-800';
  };

  const formatPrice = (item) => {
    if (item.unit === 'kg') return `₹${item.price}/kg`;
    if (item.unit === 'dozen') return `₹${item.price}/dozen`;
    return `₹${item.price}/${item.unit || 'item'}`;
  };

  const getWeightOptions = (item) => {
    return item.unitOptions || item.weightOptions || [1];
  };

  const getDefaultWeight = (item) => {
    return item.defaultUnit || item.defaultWeight || 1;
  };

  const handleWeightSelect = (itemId, weight) => {
    setSelectedWeights((prev) => ({ ...prev, [itemId]: weight }));
  };

  const handleAddToCart = (item) => {
    const weight = selectedWeights[item.id] || getDefaultWeight(item);
    addToCart({ ...item, selectedWeight: weight });
  };

  return (
    <section id="menu" className="py-24 bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black tracking-tight"
            >
              Chicken menu made for quick ordering.
            </motion.h2>
            <p className="text-amber-100/70 max-w-xl text-lg">
              Search by category, find the best combos, and add premium meals to your cart with one click.
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search grill, bucket or combo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-stone-950/80 py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-fire-red focus:outline-none focus:ring-2 focus:ring-fire-red/20"
            />
          </div>
        </div>

        <div className="mb-16 flex flex-wrap items-center gap-3 overflow-x-auto pb-2 no-scrollbar scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-2xl px-6 py-3 text-sm font-bold transition ${
              activeCategory === 'all'
                ? 'bg-fire-red text-white shadow-2xl shadow-red-900/30'
                : 'bg-stone-950/80 text-amber-100/80 hover:bg-stone-900'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-2xl px-6 py-3 text-sm font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-fire-red text-white shadow-2xl shadow-red-900/30'
                  : 'bg-stone-950/80 text-amber-100/80 hover:bg-stone-900'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filteredItems.map((item) => {
                const weightOptions = getWeightOptions(item);
                const defaultWeight = getDefaultWeight(item);
                const currentWeight = selectedWeights[item.id] || defaultWeight;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950/80 shadow-2xl shadow-black/20 transition hover:-translate-y-1 ${
                      !item.inStock ? 'opacity-70 grayscale-[0.45]' : ''
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {item.image && !imageErrors[item.id] ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={() => handleImageError(item.id)}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-stone-800 text-6xl">{item.emoji || '🍗'}</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {item.popular && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-fire-yellow px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-stone-950 shadow-lg">
                            <Star className="h-3 w-3" /> Best Seller
                          </span>
                        )}
                        <span className={`inline-flex rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg`}>
                          {item.category}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className={`absolute right-4 top-4 rounded-2xl border border-white/10 bg-black/30 p-3 text-white transition ${wishlist[item.id] ? 'bg-fire-red text-white' : 'hover:bg-white hover:text-black'}`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                          <p className="mt-2 text-sm text-amber-100/70 leading-relaxed">{item.description}</p>
                        </div>
                        <SpiceMeter level={item.spiceLevel} />
                      </div>

                      {item.inStock && (
                        <div className="grid grid-cols-3 gap-2">
                          {weightOptions.slice(0, 6).map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleWeightSelect(item.id, opt)}
                              className={`rounded-2xl border px-3 py-2 text-[12px] font-semibold transition ${
                                currentWeight === opt
                                  ? 'bg-white text-black border-white'
                                  : 'bg-stone-900 text-amber-100/70 border-white/10 hover:border-white/30'
                              }`}
                            >
                              {opt} {item.unit}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="space-y-3">
                        <p className="text-xl font-bold text-white">{formatPrice(item)}</p>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="w-full rounded-3xl bg-fire-red px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700"
                        >
                          Add to cart • ₹{(item.price * currentWeight).toFixed(0)}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-stone-950/80 p-12 text-center text-amber-100/70">
            <p className="text-2xl font-bold text-white">No items match your search</p>
            <p className="mt-4">Try a broader term or choose another category to see more meals.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
