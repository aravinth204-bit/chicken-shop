import React, { useEffect, useMemo, useState } from 'react';
import { storageService } from '../../services/storageService';
import { TrendingUp, Activity, PieChart, Sparkles } from 'lucide-react';

function AdminAnalytics() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await storageService.getOrders();
    setOrders(data);
  };

  const last7Days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const weekDay = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateKey = date.toISOString().split('T')[0];
      const total = orders
        .filter((order) => order.timestamp.split('T')[0] === dateKey)
        .reduce((sum, order) => sum + order.total, 0);
      return { label: weekDay, value: total, date: dateKey };
    });
  }, [orders]);

  const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
  const totalOrders = orders.length;
  const avgOrder = totalOrders ? totalRevenue / totalOrders : 0;

  const categorySales = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        map[item.category] = (map[item.category] || 0) + item.quantity;
      });
    });
    return Object.entries(map).sort(([, a], [, b]) => b - a);
  }, [orders]);

  const maxValue = Math.max(...last7Days.map((day) => day.value), 1);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center gap-3 text-fire-yellow mb-4">
            <TrendingUp className="w-6 h-6" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">Revenue</p>
              <p className="text-3xl font-bold text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <p className="text-amber-100/60">Total revenue generated across all orders.</p>
        </div>
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center gap-3 text-fire-red mb-4">
            <Activity className="w-6 h-6" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">Orders</p>
              <p className="text-3xl font-bold text-white">{totalOrders}</p>
            </div>
          </div>
          <p className="text-amber-100/60">Total orders captured through the dashboard.</p>
        </div>
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center gap-3 text-green-400 mb-4">
            <Sparkles className="w-6 h-6" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">Avg order</p>
              <p className="text-3xl font-bold text-white">₹{avgOrder.toFixed(0)}</p>
            </div>
          </div>
          <p className="text-amber-100/60">Average value of orders in the selected dataset.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Sales trend</p>
              <h3 className="text-2xl font-bold text-white">Last 7 days</h3>
            </div>
            <PieChart className="w-6 h-6 text-amber-100/80" />
          </div>
          <div className="space-y-4">
            {last7Days.map((day) => (
              <div key={day.date} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-amber-100/70">
                  <span>{day.label}</span>
                  <span>₹{day.value.toFixed(0)}</span>
                </div>
                <div className="h-3 rounded-full bg-stone-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-fire-red to-red-700"
                    style={{ width: `${(day.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-100/60">Category share</p>
              <h3 className="text-2xl font-bold text-white">Top categories</h3>
            </div>
          </div>
          {categorySales.length === 0 ? (
            <p className="text-amber-100/60">No order data available to calculate categories.</p>
          ) : (
            <div className="space-y-4">
              {categorySales.map(([category, count]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-amber-100/70">
                    <span>{category}</span>
                    <span>{count} items</span>
                  </div>
                  <div className="h-3 rounded-full bg-stone-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-fire-red"
                      style={{ width: `${(count / Math.max(...categorySales.map(([, qty]) => qty))) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
