import React, { useState, useEffect, useRef } from 'react';
import { storageService, DELIVERY_SLOTS } from '../services/storageService';

function AdminDashboard({ isStaff = false }) {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const canvasRef = useRef(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await storageService.getOrders();
    setOrders(data);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await storageService.updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-fire-red';
      case 'preparing': return 'bg-red-700';
      case 'ready': return 'bg-red-800';
      case 'completed': return 'bg-stone-600';
      default: return 'bg-stone-500';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return '🟠 Pending';
      case 'preparing': return '🔴 Preparing';
      case 'ready': return '🟢 Ready';
      case 'completed': return '⚫ Completed';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  
  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.timestamp).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  });
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statCards = [
    { 
      label: 'Pending', 
      value: pendingCount, 
      bg: 'bg-red-500/20',
      text: 'text-red-400'
    },
    { 
      label: 'Preparing', 
      value: preparingCount, 
      bg: 'bg-red-700/20',
      text: 'text-red-500'
    },
    { 
      label: 'Ready', 
      value: readyCount, 
      bg: 'bg-red-800/20',
      text: 'text-red-600'
    },
    { 
      label: "Today's Revenue", 
      value: `₹${todayRevenue.toFixed(0)}`, 
      bg: 'bg-fire-red/20',
      text: 'text-fire-red'
    }
  ];

  const formatPrice = (item) => {
    if (item.unit === 'piece') {
      return `₹${item.price}/pc`;
    }
    return `₹${item.price}/kg`;
  };

  const getSlotTime = (slot) => {
    if (!slot) return null;
    const found = DELIVERY_SLOTS.find(s => s.id === slot.id);
    return found ? found.time : '';
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-stone-800/50 rounded-2xl p-5 border border-stone-700/50">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <span className="text-lg">
                {index === 0 ? '⏳' : index === 1 ? '🔥' : index === 2 ? '✅' : '💰'}
              </span>
            </div>
            <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
            <p className="text-amber-100/60 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className="bg-stone-800/50 rounded-2xl border border-stone-700/50 overflow-hidden">
        <div className="p-4 border-b border-stone-700 flex flex-wrap gap-2">
          {['all', 'pending', 'preparing', 'ready', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === status 
                  ? 'bg-fire-red text-white' 
                  : 'bg-stone-700 text-amber-100/60 hover:bg-stone-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'pending' && pendingCount > 0 && ` (${pendingCount})`}
            </button>
          ))}
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <p className="text-amber-100/60 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-700">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-6 hover:bg-stone-700/30 transition-colors">
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-bold text-white text-lg">#{order.id.slice(-6)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-white font-medium">{order.customerName}</p>
                    <p className="text-amber-100/60 text-sm">📱 {order.customerPhone}</p>
                    <p className="text-amber-100/60 text-sm">📍 {order.customerLocation}</p>
                    {order.deliverySlot && (
                      <p className="text-blue-400 text-sm mt-1">🕐 Pickup: {getSlotTime(order.deliverySlot)}</p>
                    )}
                    <p className="text-amber-100/40 text-xs mt-1">
                      {new Date(order.timestamp).toLocaleString('en-IN')}
                    </p>
                  </div>
                <div className="text-right">
                  <span className="text-fire-yellow font-bold text-xl">₹{order.total}</span>
                </div>
                </div>

                {/* Order Items */}
                <div className="bg-stone-900/50 rounded-xl p-4 mb-4">
                  <h4 className="text-amber-100/60 text-sm mb-3">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <span className="text-xl">{item.emoji || '🍗'}</span>
                        )}
                        <span className="text-amber-100/80 flex-1">{item.quantity}x {item.name}</span>
                        <span className="text-fire-yellow font-bold">₹{(item.price * item.quantity).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {!isStaff && (
                  <div className="flex flex-wrap gap-2">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                        >
                          🔴 Start Preparing
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-fire-red hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                        >
                          ✅ Mark Ready
                        </button>
                      </>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="bg-fire-red hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                      >
                        ✅ Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="bg-stone-600 hover:bg-stone-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                      >
                        ✓ Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
