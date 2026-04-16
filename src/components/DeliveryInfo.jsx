import React from 'react';
import { Truck, Clock, MapPin, Phone, CheckCircle, Shield, Leaf } from 'lucide-react';

function DeliveryInfo() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mb-4">
            <Truck className="w-5 h-5" />
            <span className="font-medium">DELIVERY INFO</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400">Simple 3-step process for your order</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Browse & Select</h3>
            <p className="text-slate-400">Choose your products from our wide range of fresh poultry, meat & eggs</p>
          </div>

          <div className="text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-colors" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Order</h3>
            <p className="text-slate-400">Send your order via WhatsApp with your name, phone & location</p>
          </div>

          <div className="text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-colors" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-red-500/25">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
            <p className="text-slate-400">Receive your fresh products at your doorstep on the same day</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 md:p-12 border border-slate-700/50">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: '100% Fresh & Quality Products' },
                  { icon: Shield, text: 'Hygienic Processing & Storage' },
                  { icon: Leaf, text: 'Farm Fresh, No Chemicals' },
                  { icon: Clock, text: 'Same Day Delivery' },
                  { icon: Phone, text: 'Direct WhatsApp Support' },
                  { icon: MapPin, text: 'Serving Erode for Years' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-slate-300 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-2xl p-8 border border-red-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
              
              <div className="space-y-4 mb-8">
                <a href="https://wa.me/918778017989" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">WhatsApp / Call</p>
                    <p className="font-semibold">+91 87780 17989</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="font-semibold">Erode, Tamil Nadu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Working Hours</p>
                    <p className="font-semibold">6:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/918778017989?text=Hi%2C%20I%20want%20to%20place%20an%20order" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white py-4 rounded-xl font-bold text-center transition-all hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryInfo;
