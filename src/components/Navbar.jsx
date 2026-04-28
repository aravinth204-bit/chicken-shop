import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Admin', to: '/admin' },
  { label: 'Cart', to: '/cart' },
];

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-stone-950/95 backdrop-blur-xl text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {navLinks.slice(0, 5).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                  isActive ? 'bg-fire-red text-white shadow-lg shadow-red-900/20' : 'text-amber-100/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fire-red to-red-700 px-5 py-2 text-sm font-bold text-white shadow-2xl shadow-red-900/25 transition-all hover:scale-[1.01]"
          >
            <ShoppingCart className="h-4 w-4" />
            Order
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-fire-yellow px-1.5 text-[10px] font-black text-stone-950">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-stone-900/80 text-white transition-all hover:bg-stone-800 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-stone-950/95 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive ? 'bg-fire-red text-white' : 'text-amber-100/80 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
