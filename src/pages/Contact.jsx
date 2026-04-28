import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

function Contact() {
  const { shopSettings, setToast } = useOutletContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      setToast?.('Please complete all fields before sending.', 'warning');
      return;
    }
    setSubmitted(true);
    setToast?.('Message sent successfully!', 'success');
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-dark-bg text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-stone-950/95 py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-fire-red/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">
            Get in touch
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            Contact the kitchen team.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-amber-100/70 leading-relaxed">
            Questions about your order or a custom meal request? Drop us a message and we’ll get right back to you.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-10 shadow-2xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Contact details</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Reach us directly.</h2>
            <div className="mt-10 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Phone</p>
                <a href={`tel:${shopSettings?.phone || '+918778017989'}`} className="mt-2 block text-lg font-semibold text-white">
                  {shopSettings?.phone || '+91 87780 17989'}
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Address</p>
                <p className="mt-2 text-lg font-semibold text-white">{shopSettings?.address || 'Erode, Tamil Nadu'}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Hours</p>
                <p className="mt-2 text-lg font-semibold text-white">Mon – Sun • 6 AM – 9 PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-10 shadow-2xl shadow-black/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-amber-100/70">Your name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-stone-950/80 px-5 py-4 text-white outline-none transition focus:border-fire-red focus:ring-2 focus:ring-fire-red/20"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-amber-100/70">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-stone-950/80 px-5 py-4 text-white outline-none transition focus:border-fire-red focus:ring-2 focus:ring-fire-red/20"
                  placeholder="Enter a mobile number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-amber-100/70">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-stone-950/80 px-5 py-4 text-white outline-none transition focus:border-fire-red focus:ring-2 focus:ring-fire-red/20"
                  placeholder="Tell us your order or question"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-fire-red px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Send message
              </button>
              {submitted && (
                <p className="text-sm text-green-400">Thank you! We’ll respond shortly via WhatsApp or phone.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-950/80">
        <div className="max-w-7xl mx-auto px-4 rounded-[2rem] border border-white/10 bg-stone-900/70 p-10 shadow-2xl shadow-black/20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Need support?</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Order directly and stay updated.</h2>
              <p className="mt-6 max-w-xl text-amber-100/70 leading-relaxed">
                Use WhatsApp to confirm custom meal add-ons, delivery preferences, and live updates from our team.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Quick chat</p>
                <p className="mt-3 text-lg font-semibold text-white">Order support via WhatsApp</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Fast updates</p>
                <p className="mt-3 text-lg font-semibold text-white">Order status in real time</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
