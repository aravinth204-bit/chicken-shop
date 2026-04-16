import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, TrendingUp, DollarSign, Users, Clock,
  CheckCircle, XCircle, ArrowUpRight, Calendar
} from 'lucide-react';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const canvasRef = useRef(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && canvasRef.current) {
      drawChart();
    }
  }, [orders]);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('poultryOrders') || '[]');
    setOrders(savedOrders);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('poultryOrders', JSON.stringify(updatedOrders));
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toDateString());
    }
    
    const dailyRevenue = last7Days.map(day => {
      return orders
        .filter(o => new Date(o.timestamp).toDateString() === day)
        .reduce((sum, o) => sum + o.total, 0);
    });
    
    const maxRevenue = Math.max(...dailyRevenue, 1000);
    const barWidth = (width - 100) / 7;
    const chartHeight = height - 60;
    
    dailyRevenue.forEach((revenue, i) => {
      const barHeight = (revenue / maxRevenue) * chartHeight;
      const x = 50 + i * barWidth + barWidth * 0.15;
      const y = chartHeight - barHeight + 20;
      
      const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
      gradient.addColorStop(0, '#DC2626');
      gradient.addColorStop(1, '#EF4444');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth * 0.7, barHeight, [8, 8, 0, 0]);
      ctx.fill();
      
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`₹${revenue}`, x + (barWidth * 0.7) / 2, y - 8);
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-slate-500';
      default: return 'bg-slate-400';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const pendingCount = orders.filter(o => o.status === 'pending').length;
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
      label: 'Pending Orders', 
      value: pendingCount, 
      icon: Clock, 
      color: 'from-yellow-500 to-yellow-600',
      bg: 'bg-yellow-500/20'
    },
    { 
      label: "Today's Orders", 
      value: todayOrders.length, 
      icon: ShoppingBag, 
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-500/20'
    },
    { 
      label: "Today's Revenue", 
      value: `₹${todayRevenue.toFixed(0)}`, 
      icon: DollarSign, 
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-500/20'
    },
    { 
      label: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(0)}`, 
      icon: TrendingUp, 
      color: 'from-red-500 to-red-600',
      bg: 'bg-red-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color.split('-')[1]}-400`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Revenue Chart (Last 7 Days)</h3>
        <canvas ref={canvasRef} width={700} height={200} className="w-full" />
      </div>

      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex flex-wrap gap-2">
          {['all', 'pending', 'ready', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === status 
                  ? 'bg-red-600 text-white' 
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-slate-400 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-6 hover:bg-slate-700/30 transition-colors">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-white">#{order.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(order.timestamp).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-white font-medium">{order.customerName}</p>
                    <p className="text-slate-400 text-sm">{order.customerPhone} • {order.customerLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-400">₹{order.total.toFixed(0)}</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span>{item.emoji}</span>
                        <span className="text-slate-300">{item.quantity}x</span>
                        <span className="text-slate-400 truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
