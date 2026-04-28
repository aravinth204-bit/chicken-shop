import React from 'react';
import { Bell, Search, Moon, Sun, Menu } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

function Topbar({ isStaff, onSidebarToggle, onLogout }) {
  const { theme, setTheme } = useAdmin();

  return (
    <div className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-xl border-b border-stone-800 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-2xl bg-stone-800 text-amber-100 hover:bg-stone-700 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-amber-100/40" />
            <input
              type="search"
              placeholder="Search orders, products, customers"
              className="w-full min-w-[260px] rounded-3xl border border-stone-700 bg-stone-900/80 py-3 pl-12 pr-4 text-sm text-white placeholder:text-amber-100/40 focus:border-fire-red focus:outline-none focus:ring-2 focus:ring-fire-red/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 rounded-3xl border border-stone-700 bg-stone-800 px-4 py-2 text-sm text-white transition hover:border-fire-red"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
          <button className="relative p-3 rounded-3xl bg-stone-800 hover:bg-stone-700 transition">
            <Bell className="w-5 h-5 text-amber-100" />
            <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 rounded-full bg-fire-red" />
          </button>
          <button
            onClick={onLogout}
            className="rounded-3xl bg-fire-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
