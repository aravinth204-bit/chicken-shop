import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-dark-bg text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-stone-950/95 py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-fire-red/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">
            About Chicken Sea
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            The premium chicken brand built for convenience and trust.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-amber-100/70 leading-relaxed">
            We combine modern delivery design with recipes curated for local tastes, hygienic kitchens, and high-quality chicken sourced from trusted farmers.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-10 shadow-2xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Our story</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Hand-selected ingredients, premium preparation.</h2>
            <p className="mt-6 text-amber-100/70 leading-relaxed">
              We started with a simple promise: deliver fresh chicken meals with consistent taste, beautiful presentation, and fast service. Our kitchen team follows rigorous hygiene standards and every order is built to impress.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-6">
                <h3 className="text-lg font-bold text-white">Quality sourcing</h3>
                <p className="mt-3 text-amber-100/70">Local farms and trusted suppliers keep every bite fresh and flavorful.</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-6">
                <h3 className="text-lg font-bold text-white">Fast delivery</h3>
                <p className="mt-3 text-amber-100/70">Our packaging and routes are optimized for hot arrival every time.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {[
              {
                title: 'Restaurant-grade taste',
                description: 'Every dish is balanced for bold, premium flavor.',
                icon: Flame,
              },
              {
                title: 'Hygiene-first operation',
                description: 'Sanitized kitchens, fresh prep, and trusted cook staff.',
                icon: ShieldCheck,
              },
              {
                title: 'Customer-first service',
                description: 'Easy ordering, fast replies, and trackable delivery.',
                icon: Users,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-8 shadow-2xl shadow-black/20"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fire-red/15 text-fire-red">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-amber-100/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-950/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Our promise</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight">Fresh meals with every single order.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-amber-100/70 leading-relaxed">
            We are committed to fast turnaround, premium packaging, and a memorable foodie experience. Whether you order a solo meal or a family bucket, our team delivers quality that keeps customers coming back.
          </p>
          <Link to="/menu" className="mt-10 inline-flex rounded-full bg-fire-red px-8 py-4 text-sm font-semibold text-white transition hover:bg-red-700">
            See menu and order
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
