import React from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

function Reviews() {
  const reviews = [
    {
      name: 'Rajesh Kumar',
      location: 'Erode Central',
      rating: 5,
      text: 'Best poultry shop in Erode! The Naatu Koli is extremely fresh and the prices are very reasonable. Highly recommended!',
      date: '2 days ago'
    },
    {
      name: 'Priya Venkatesh',
      location: 'Surampatti',
      rating: 5,
      text: 'I have been buying from Aravinth for the past 2 years. Always fresh products and excellent service. The duck eggs are amazing!',
      date: '1 week ago'
    },
    {
      name: 'Muthu Selvam',
      location: 'Bhavani',
      rating: 5,
      text: 'Finally found a reliable poultry shop with consistent quality. The mutton is always fresh and cleanly cut. Thank you!',
      date: '2 weeks ago'
    },
    {
      name: 'Kavitha Lakshmi',
      location: 'Perundurai Road',
      rating: 5,
      text: 'Great quality chicken at wholesale prices. The owner is very honest and provides good weight. Best shop in the area!',
      date: '3 weeks ago'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-stone-800 to-stone-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-yellow-400 font-semibold mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400" />
            ))}
            <span className="text-white ml-2">4.9 out of 5</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Customer Reviews</h2>
          <p className="text-stone-400">What our customers say about us</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-stone-800/50 backdrop-blur rounded-2xl p-6 border border-stone-700/50 hover:border-red-500/30 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-stone-300 text-sm mb-4 leading-relaxed">"{review.text}"</p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{review.name}</p>
                  <p className="text-stone-400 text-xs">{review.location} • {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://wa.me/918778017989?text=Hi%2C%20I%20want%20to%20give%20feedback" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stone-700 hover:bg-stone-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
