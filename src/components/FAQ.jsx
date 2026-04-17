import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How fresh is your chicken?",
    answer: "We source our poultry daily from local farms. Our 'Fresh Daily' guarantee means the meat you receive was processed within hours of delivery."
  },
  {
    question: "What are the delivery timings?",
    answer: "We deliver in multiple slots: Morning (8-10 AM), Late Morning (10-12 PM), Afternoon (12-2 PM), and Evening (5-7 PM). You can choose your preferred slot during checkout."
  },
  {
    question: "Do you provide cleaned and cut meat?",
    answer: "Yes, all our products are professionally cleaned and cut according to standard requirements (curry cut, biryani cut, etc.) at no extra cost."
  },
  {
    question: "Is there a minimum order value?",
    answer: "There is no strict minimum order value, but we offer free delivery for orders above ₹500."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-dark-bg/50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            FREQUENTLY <span className="text-fire-red">ASKED</span>
          </h2>
          <p className="text-amber-100/60 font-sans">Everything you need to know about our service</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-900/50 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-stone-800/50"
              >
                <span className="text-lg font-semibold text-amber-100">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-fire-red" />
                ) : (
                  <Plus className="w-5 h-5 text-fire-red" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-amber-100/70 leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
