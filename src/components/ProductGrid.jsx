import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Minus, Share2, ShoppingCart, Check } from 'lucide-react';

function ProductGrid({ products, addToCart, searchQuery, setSearchQuery, sortBy, setSortBy, showToast }) {
  const [selectedWeights, setSelectedWeights] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const weights = ['0.5', '1', '1.5', '2', '2.5', '3'];
  const dozenOptions = ['1', '2', '3', '6', '12'];

  const handleWeightSelect = (productId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: parseFloat(weight) }));
  };

  const handleAddToCart = (product) => {
    const weight = selectedWeights[product.id] || (product.unit === 'piece' ? 1 : 1);
    addToCart(product, weight);
    setSelectedWeights(prev => ({ ...prev, [product.id]: undefined }));
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const shareProduct = (product) => {
    const message = encodeURIComponent(`*${product.name}*\n\nPrice: ₹${product.pricePerKg}/kg\n${product.description}\n\nOrder from ARAVINTH.S Poultry Shop\n📞 +91 8778017989`);
    window.open(`https://wa.me/918778017989?text=${message}`, '_blank');
  };

  if (products.length === 0) {
    return (
      <section id="products" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📦</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
          <p className="text-slate-400">Try adjusting your search or filters</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Products</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">{products.length} items</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 lg:w-64 bg-slate-700/50 border border-slate-600 text-white pl-10 pr-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl focus:outline-none focus:border-red-500 text-sm"
              />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-40 bg-slate-700/50 border border-slate-600 text-white pl-3 pr-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl focus:outline-none focus:border-red-500 appearance-none cursor-pointer text-sm"
              >
                <option value="name">Name</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group bg-slate-900/80 backdrop-blur rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-32 sm:h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                {product.image && !imageErrors[product.id] ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                )}
                
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  ₹{product.pricePerKg}/kg
                </div>

                <button
                  onClick={() => shareProduct(product)}
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/50 backdrop-blur-sm hover:bg-black/70 p-1.5 sm:p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-white text-sm sm:text-lg mb-1">{product.name}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-1">{product.description}</p>

                <div className="mb-3 sm:mb-4">
                  <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">
                    Select {product.unit === 'piece' ? 'Dozens' : 'Weight'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(product.unit === 'piece' ? dozenOptions : weights).map(w => (
                      <button
                        key={w}
                        onClick={() => handleWeightSelect(product.id, w)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                          selectedWeights[product.id] === parseFloat(w)
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {w} {product.unit === 'piece' ? 'dz' : 'kg'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="text-base sm:text-lg font-bold text-white">
                    ₹
                    {product.unit === 'piece'
                      ? ((selectedWeights[product.id] || 1) * 12 * product.pricePerKg).toFixed(0)
                      : ((selectedWeights[product.id] || 1) * product.pricePerKg).toFixed(0)
                    }
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1 sm:gap-2"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    Add
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

export default ProductGrid;
