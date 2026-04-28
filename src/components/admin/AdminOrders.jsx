import React, { useEffect, useMemo, useState } from 'react';
import { storageService } from '../../services/storageService';
import { ArrowDownRight, Download, Search, RefreshCcw } from 'lucide-react';

const STATUS_LABELS = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Out for Delivery',
  completed: 'Delivered'
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await storageService.getOrders();
    setOrders(data);
    setLoading(false);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter = filter === 'all' || order.status === filter;
      const query = search.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [orders, filter, search]);

  const exportCsv = () => {
    const rows = [
      ['Order ID', 'Customer', 'Phone', 'Items', 'Total', 'Status', 'Date']
    ];
    filteredOrders.forEach((order) => {
      rows.push([
        order.id,
        order.customerName,
        order.customerPhone,
        order.items.map((item) => `${item.quantity}x ${item.name}`).join(' | '),
        order.total,
        STATUS_LABELS[order.status] || order.status,
        new Date(order.timestamp).toLocaleString('en-IN')
      ]);
    });

    const csvContent = rows.map((row) => row.map((value) => `"${value}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateStatus = async (id, status) => {
    await storageService.updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <div className="space-y-6">
      <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Order operations</p>
            <h2 className="text-3xl font-bold text-white">Order management</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-3xl bg-fire-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              type="button"
              onClick={loadOrders}
              className="inline-flex items-center gap-2 rounded-3xl border border-stone-700 bg-stone-900 px-5 py-3 text-sm text-amber-100 hover:bg-stone-800 transition"
            >
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {['all', 'pending', 'preparing', 'ready', 'completed'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-3xl px-4 py-3 text-left text-sm font-semibold transition ${filter === key ? 'bg-fire-red text-white' : 'bg-stone-900 text-amber-100/70 hover:bg-stone-700'}`}
              >
                {key === 'all' ? 'All orders' : STATUS_LABELS[key]}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order, customer or phone"
              className="w-full bg-stone-900 border border-stone-700 rounded-3xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
        </div>

        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <h3 className="text-xl font-bold text-white mb-4">Quick summary</h3>
          <div className="space-y-3">
            <div className="rounded-3xl bg-stone-900/60 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-100/60">Total orders</p>
              <p className="text-3xl font-bold text-white">{orders.length}</p>
            </div>
            <div className="rounded-3xl bg-stone-900/60 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-100/60">Filtered orders</p>
              <p className="text-3xl font-bold text-white">{filteredOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-800/60 rounded-3xl border border-stone-700 overflow-hidden">
        {loading ? (
          <div className="space-y-4 p-6 animate-pulse">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-24 rounded-3xl bg-stone-900" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-amber-100/60">No matching orders found.</div>
        ) : (
          <div className="divide-y divide-stone-700">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-stone-900/60 transition">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">Order ID</p>
                    <p className="text-lg font-bold text-white">#{order.id.slice(-6)}</p>
                    <p className="text-amber-100/70 text-sm">{order.customerName} · {order.customerPhone}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="rounded-3xl bg-stone-900 px-4 py-2 text-sm text-amber-100/70">{STATUS_LABELS[order.status] || order.status}</span>
                    <span className="rounded-3xl bg-fire-red/10 px-4 py-2 text-sm font-semibold text-fire-red">₹{order.total}</span>
                    <span className="rounded-3xl bg-stone-900 px-4 py-2 text-sm text-amber-100/70">{new Date(order.timestamp).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="rounded-3xl bg-stone-900/80 p-4 text-sm text-amber-100/70">
                      <div className="flex justify-between gap-2">
                        <span>{item.name}</span>
                        <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                      </div>
                      <p className="mt-2 text-xs text-amber-100/50">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {order.status !== 'preparing' && (
                    <button
                      onClick={() => updateStatus(order.id, 'preparing')}
                      className="inline-flex items-center gap-2 rounded-3xl bg-fire-red px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
                    >
                      <ArrowDownRight className="w-4 h-4" /> Mark Preparing
                    </button>
                  )}
                  {order.status !== 'ready' && order.status !== 'pending' && (
                    <button
                      onClick={() => updateStatus(order.id, 'ready')}
                      className="inline-flex items-center gap-2 rounded-3xl bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-400/20 transition"
                    >
                      Mark Out for Delivery
                    </button>
                  )}
                  {order.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(order.id, 'completed')}
                      className="inline-flex items-center gap-2 rounded-3xl bg-stone-700 px-4 py-3 text-sm font-semibold text-white hover:bg-stone-600 transition"
                    >
                      Complete Order
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

export default AdminOrders;
