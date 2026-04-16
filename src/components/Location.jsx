import React from 'react';

function Location() {
  return (
    <section id="location" className="py-16 bg-stone-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">📍 Visit Our Shop</h2>
          <p className="text-stone-400">Fresh products daily at Erode</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-stone-700 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Address</h3>
                  <p className="text-stone-300">Shop No. 12, Brough Road</p>
                  <p className="text-stone-300">Erode, Tamil Nadu 638001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Phone</h3>
                  <p className="text-red-400 font-semibold">+91 87780 17989</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">⏰</span>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Hours</h3>
                  <p className="text-stone-300">Mon-Sun: 6 AM - 9 PM</p>
                  <p className="text-red-400 font-semibold">Open all days!</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">WhatsApp</h3>
                  <p className="text-stone-300">Order via WhatsApp: 87780 17989</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-700 rounded-2xl overflow-hidden h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19589.52178760293!2d77.71234!3d11.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f2c91b38b7b%3A0x8e8e8e8e8e8e8e8e!2sErode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shop Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
