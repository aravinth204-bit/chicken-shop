import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Search, Package, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';

function OrderTracking() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const allOrders = await storageService.getOrders();
      // Filter orders by phone number (flexible matching)
      const sanitizedSearch = phone.replace(/[^0-9]/g, '');
      const filtered = allOrders.filter(o => 
        o.customerPhone.replace(/[^0-9]/g, '').includes(sanitizedSearch)
      );
      setOrders(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'pending': return { icon: <Clock className="w-6 h-6 text-yellow-500" />, label: 'Order Received', desc: 'Waiting for shop to confirm' };
      case 'preparing': return { icon: <Package className="w-6 h-6 text-orange-500 animate-pulse" />, label: 'Preparing', desc: 'We are cutting and cleaning your meat' };
      case 'ready': return { icon: <CheckCircle2 className="w-6 h-6 text-green-500 shadow-lg shadow-green-500/20" />, label: 'Ready for Pickup', desc: 'Please visit the shop to collect' };
      case 'completed': return { icon: <CheckCircle2 className="w-6 h-6 text-stone-400" />, label: 'Completed', desc: 'Order was successfully delivered/collected' };
      default: return { icon: <Clock className="w-6 h-6 text-stone-500" />, label: status, desc: '' };
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-white font-sans">
      {/* Header */}
      <div className="bg-stone-800/50 backdrop-blur-xl border-b border-stone-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-stone-700 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Track Your Order</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Search Box */}
        <div className="bg-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-700 mb-8">
          <h2 className="text-2xl font-bold mb-2">Check Status 🍗</h2>
          <p className="text-amber-100/60 mb-6 text-sm md:text-base">Enter your mobile number to see your recent orders.</p>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full bg-stone-900 border border-stone-700 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-fire-red text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-fire-red hover:bg-red-700 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-6">
            <h3 className="text-amber-100/40 font-bold uppercase tracking-wider text-xs">Recent Orders ({orders.length})</h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-stone-800/30 rounded-3xl border border-dashed border-stone-700">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="text-amber-100/60 font-medium">No orders found for this number</p>
                <p className="text-amber-100/30 text-xs mt-2">Make sure you entered the correct number used during order.</p>
              </div>
            ) : (
              orders.map(order => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <div key={order.id} className="bg-stone-800 rounded-3xl p-6 border border-stone-700 shadow-xl overflow-hidden relative">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-fire-red font-mono text-xs font-bold block mb-1">ORDER #{order.id.slice(-6)}</span>
                        <h4 className="font-bold text-lg">{new Date(order.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-fire-yellow block">₹{order.total}</span>
                        <span className="text-amber-100/40 text-[10px] uppercase font-bold tracking-tighter">{order.items.length} items</span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-stone-900/50 rounded-2xl mb-4">
                      <div className="p-3 bg-stone-800 rounded-xl">
                        {statusInfo.icon}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-none mb-1">{statusInfo.label}</p>
                        <p className="text-amber-100/60 text-sm leading-tight">{statusInfo.desc}</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-stone-700 pt-4">
                       {order.items.slice(0, 3).map((item, idx) => (
                         <div key={idx} className="flex justify-between text-sm">
                           <span className="text-amber-100/60">{item.quantity}x {item.name}</span>
                           <span className="text-amber-100/40">₹{(item.price * item.quantity).toFixed(0)}</span>
                         </div>
                       ))}
                       {order.items.length > 3 && (
                         <p className="text-fire-red text-[10px] font-bold">+ {order.items.length - 3} more items</p>
                       )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTracking;
