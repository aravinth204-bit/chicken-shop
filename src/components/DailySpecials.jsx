import React from 'react';
import { Flame, Plus, Star, Share2 } from 'lucide-react';

function DailySpecials({ products, addToCart }) {
  const specials = products.filter(p => 
    ['Naatu Koli', 'Kili Raja', 'Duck'].some(name => p.name.includes(name))
  ).slice(0, 3);

  if (specials.length === 0) return null;

  const shareProduct = (product) => {
    const message = encodeURIComponent(`Check out this product from ARAVINTH.S Poultry Shop!\n\n${product.name}\nPrice: ₹${product.pricePerKg}/kg\n\nOrder now: https://wa.me/918778017989`);
    window.open(`https://wa.me/918778017989?text=${message}`, '_blank');
  };

  return (
    <section id="specials" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
              <Flame className="w-5 h-5" />
              <span>LIMITED TIME</span>
            </div>
            <h2 className="text-4xl font-bold text-white">Daily Specials</h2>
            <p className="text-slate-400 mt-2">Best deals on premium products</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-red-300 font-medium">Premium Quality</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specials.map((product, index) => (
            <div 
              key={product.id}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <Flame className="w-4 h-4" />
                HOT DEAL
              </div>
              
              <div className="relative h-48 bg-slate-800 flex items-center justify-center overflow-hidden">
                <span className="text-8xl group-hover:scale-125 transition-transform duration-500">
                  {product.emoji}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-white">₹{product.pricePerKg}</span>
                    <span className="text-slate-400">/kg</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <Plus className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => shareProduct(product)}
                    className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
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

export default DailySpecials;
