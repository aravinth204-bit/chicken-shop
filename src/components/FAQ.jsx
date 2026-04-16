import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What are your shop timings?',
      answer: 'We are open from 6:00 AM to 9:00 PM, all 7 days of the week. We are closed only on major public holidays.'
    },
    {
      question: 'Do you provide home delivery?',
      answer: 'Yes! We provide same-day delivery within Erode. Delivery charges may vary based on your location. Contact us via WhatsApp for delivery details.'
    },
    {
      question: 'How fresh are your products?',
      answer: 'All our products are sourced fresh daily from verified farms. We maintain strict quality standards and ensure proper storage. Most products are processed on the same day of delivery.'
    },
    {
      question: 'Can I order via WhatsApp?',
      answer: 'Absolutely! You can send your order list to +91 8778017989 on WhatsApp. We will confirm the availability and total amount. Payment can be made on delivery.'
    },
    {
      question: 'Do you offer bulk orders?',
      answer: 'Yes, we offer special pricing for bulk orders. Whether its for a wedding, function, or restaurant supply, contact us for competitive bulk rates.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm), and bank transfers. For first-time customers, we recommend paying on delivery.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-red-400 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">HELP CENTER</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Find answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden hover:border-red-500/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  openIndex === index ? 'bg-red-600 text-white rotate-180' : 'bg-slate-700 text-slate-400'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
