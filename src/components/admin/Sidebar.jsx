import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Eye, Home, ShoppingBag, Users, Ticket, BarChart3, Settings, Menu, X, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'products', label: 'Products', icon: Box, adminOnly: true },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customer', label: 'Customer View', icon: Eye },
  { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true }
];

function Sidebar({ activeTab, setActiveTab, isStaff }) {
  const { sidebarOpen, setSidebarOpen, theme, setTheme } = useAdmin();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <aside className="hidden lg:flex lg:w-72 xl:w-80 flex-col bg-stone-950 border-r border-stone-800 min-h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-3xl bg-fire-red flex items-center justify-center shadow-xl shadow-fire-red/20 text-white text-2xl">🍗</div>
            <div>
              <p className="text-sm uppercase text-amber-100/60 tracking-[0.35em]">Chicken Sea</p>
              <h1 className="text-xl font-black text-white">Admin Portal</h1>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            if (item.adminOnly && isStaff) return null;
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition-all text-left ${active ? 'bg-fire-red text-white shadow-xl shadow-fire-red/20' : 'text-amber-100/70 hover:bg-stone-900 hover:text-white'}`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-stone-800">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center justify-between gap-3 rounded-3xl border border-stone-700 bg-stone-900 px-4 py-3 text-white hover:border-fire-red transition"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-fire-yellow" />
              Theme
            </span>
            <span className="text-amber-100/70">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="w-80 h-full bg-stone-950 border-r border-stone-800 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="px-6 py-6 border-b border-stone-800 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">Admin Menu</p>
                  <h2 className="text-xl font-black text-white">Dashboard</h2>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-2xl bg-stone-900 text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="px-5 py-6 space-y-2">
                {navItems.map((item) => {
                  if (item.adminOnly && isStaff) return null;
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-left ${active ? 'bg-fire-red text-white' : 'text-amber-100/70 hover:bg-stone-900 hover:text-white'}`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
