import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, Users, TrendingUp, Settings, Package } from 'lucide-react';

function AdminPreview() {
  return (
    <section className="py-24 bg-stone-900 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Dashboard Mockup UI */}
            <motion.div 
              initial={{ rotateY: 20, rotateX: 10, y: 50, opacity: 0 }}
              whileInView={{ rotateY: 10, rotateX: 5, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative bg-zinc-900 rounded-[2rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Sidebar Mock */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-stone-950 border-r border-white/5 flex flex-col items-center py-6 gap-8">
                <div className="w-10 h-10 rounded-xl bg-fire-red flex items-center justify-center text-white font-bold">C</div>
                <LayoutDashboard className="w-6 h-6 text-fire-red" />
                <ShoppingCart className="w-6 h-6 text-white/20" />
                <Package className="w-6 h-6 text-white/20" />
                <Users className="w-6 h-6 text-white/20" />
                <Settings className="w-6 h-6 text-white/20" />
              </div>

              {/* Content Mock */}
              <div className="ml-16 md:ml-20 p-6 md:p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-bold text-xl">Overview</h4>
                  <div className="bg-fire-red/20 text-fire-red px-3 py-1 rounded-lg text-xs font-bold">LIVE</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-amber-100/40 text-xs font-medium uppercase tracking-wider mb-1">Today's Sales</p>
                    <p className="text-white text-2xl font-bold">₹24,500</p>
                    <div className="mt-2 text-[10px] text-green-400 font-bold">+12% vs yesterday</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-amber-100/40 text-xs font-medium uppercase tracking-wider mb-1">Total Orders</p>
                    <p className="text-white text-2xl font-bold">48</p>
                    <div className="mt-2 text-[10px] text-green-400 font-bold">+5 new in 1h</div>
                  </div>
                </div>

                {/* Chart Mock */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 h-32 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      className="flex-1 bg-gradient-to-t from-fire-red/40 to-fire-red rounded-t-md"
                    />
                  ))}
                </div>

                {/* Recent Orders List */}
                <div className="space-y-3">
                   {[1, 2].map((_, i) => (
                     <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-800" />
                          <div>
                            <p className="text-white text-xs font-bold">Ord #123{i}</p>
                            <p className="text-white/40 text-[10px]">2 mins ago</p>
                          </div>
                        </div>
                        <div className="text-white text-xs font-bold">₹850</div>
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Accents */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 bg-fire-yellow text-stone-950 p-4 rounded-2xl shadow-2xl font-black text-sm rotate-12 hidden md:block"
            >
              Real-time<br/>Inventory!
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
              A COMPLETE <span className="text-fire-red">BUSINESS</span> SOLUTION
            </h2>
            <p className="text-amber-100/60 text-lg font-sans leading-relaxed">
              It's not just a website. It's a powerful tool to grow your poultry business. Manage products, track stock, and process orders from a single intuitive dashboard.
            </p>
            
            <ul className="space-y-4">
              {[
                { icon: Package, title: 'Inventory Management', desc: 'Real-time stock alerts and price updates' },
                { icon: TrendingUp, title: 'Sales Analytics', desc: 'Deep insights into your best selling products' },
                { icon: Users, title: 'Customer Database', desc: 'Maintain history and build loyalty' }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-fire-red group-hover:bg-fire-red group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-amber-100/50 text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPreview;
