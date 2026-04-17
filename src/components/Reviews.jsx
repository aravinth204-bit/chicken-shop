import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Rajesh Kumar',
    location: 'Erode Central',
    rating: 5,
    text: 'Best poultry shop in Erode! The Naatu Koli is extremely fresh and the prices are very reasonable. Highly recommended!',
    date: '2 days ago',
    verified: true
  },
  {
    name: 'Priya Venkatesh',
    location: 'Surampatti',
    rating: 5,
    text: 'I have been buying from Aravinth for the past 2 years. Always fresh products and excellent service. The duck eggs are amazing!',
    date: '1 week ago',
    verified: true
  },
  {
    name: 'Muthu Selvam',
    location: 'Bhavani',
    rating: 5,
    text: 'Finally found a reliable poultry shop with consistent quality. The mutton is always fresh and cleanly cut. Thank you!',
    date: '2 weeks ago',
    verified: true
  },
  {
    name: 'Kavitha Lakshmi',
    location: 'Perundurai Road',
    rating: 5,
    text: 'Great quality chicken at wholesale prices. The owner is very honest and provides good weight. Best shop in the area!',
    date: '3 weeks ago',
    verified: true
  }
];

function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-fire-yellow font-bold mb-4 bg-white/5 w-max mx-auto px-4 py-2 rounded-full border border-white/5"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-white ml-2 text-sm">4.9/5 Overall Rating</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-4">
            CUSTOMER <span className="text-fire-red">LOVE</span>
          </h2>
          <p className="text-amber-100/50 max-w-lg mx-auto">Hear it from our community of over 5000+ happy customers across Erode.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] transition-all hover:border-fire-red/30"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-fire-red/10 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-fire-yellow fill-current" />
                ))}
              </div>
              
              <p className="text-amber-100/70 text-base leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-tr from-fire-red to-fire-red/50 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  {review.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-0.5 rounded-full border-2 border-stone-900">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-sm">{review.name}</p>
                  </div>
                  <p className="text-amber-100/40 text-[10px] uppercase font-bold tracking-widest leading-none mt-1">
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/918778017989?text=Hi%2C%20I%20want%20to%20give%20feedback" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:border-fire-red hover:text-fire-red text-white pr-8 pl-6 py-4 rounded-2xl font-bold transition-all"
          >
            <Star className="w-5 h-5 fill-current" />
            Share Your Experience
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
