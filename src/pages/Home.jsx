import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Menu from '../components/Menu';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import DeliveryInfo from '../components/DeliveryInfo';

function Home() {
  const { menuItems = [], addToCart, loading } = useOutletContext();

  return (
    <div className="bg-dark-bg text-white">
      <Hero />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Premium poultry delivery</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">Fresh chicken, mutton and eggs for every meal.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-amber-100/70 leading-relaxed">
            Order today and get farm-fresh cuts delivered fast. Explore the menu, add your favorites, and checkout through WhatsApp in seconds.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-full bg-fire-red px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fire-red/30 transition hover:bg-red-700"
            >
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </section>

      <Menu items={menuItems} addToCart={addToCart} isLoading={loading} />

      <Stats />
      <Reviews />
      <FAQ />
      <DeliveryInfo />
    </div>
  );
}

export default Home;
