import React, { useEffect, useMemo, useState } from 'react';
import { storageService } from '../../services/storageService';
import { Search, ChevronRight, UserPlus, Users } from 'lucide-react';

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [customerData, orderData] = await Promise.all([
      storageService.getCustomers(),
      storageService.getOrders()
    ]);
    setCustomers(customerData);
    setOrders(orderData);
    setLoading(false);
  };

  const filtered = useMemo(() => {
    return customers.filter((customer) => {
      const term = query.toLowerCase();
      return (
        customer.name.toLowerCase().includes(term) ||
        customer.phone.includes(term) ||
        (customer.email || '').toLowerCase().includes(term)
      );
    });
  }, [customers, query]);

  const getOrderCount = (customer) => {
    return orders.filter((order) => order.customerId === customer.id).length;
  };

  const getLifetimeValue = (customer) => {
    return orders
      .filter((order) => order.customerId === customer.id)
      .reduce((sum, order) => sum + order.total, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Customer Book</p>
              <h2 className="text-3xl font-bold text-white">Customers</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-fire-red px-4 py-3 text-white font-semibold shadow-lg shadow-fire-red/20">
              <Users className="w-5 h-5" /> {customers.length}
            </div>
          </div>
          <p className="text-amber-100/70">Track frequent buyers, review order history, and keep service personal.</p>
        </div>

        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-100/60">Lifetime value</p>
              <p className="text-3xl font-bold text-white">₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-stone-900 rounded-3xl px-4 py-3 text-amber-100">All time</div>
          </div>
          <p className="text-amber-100/60">Customer loyalty and average order insights help you plan offers and bulk deals.</p>
        </div>
      </div>

      <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Customer list</h3>
            <p className="text-amber-100/60">Search customers and open order history with one click.</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-amber-100/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone or email"
              className="w-full bg-stone-900 border border-stone-700 text-white rounded-3xl py-3 pl-12 pr-4 focus:outline-none focus:border-fire-red"
            />
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-20 rounded-3xl bg-stone-900" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-stone-700 bg-stone-900/60 p-8 text-center text-amber-100/50">
                No customers found.
              </div>
            ) : (
              filtered.map((customer) => (
                <div key={customer.id} className="rounded-3xl border border-stone-700 bg-stone-900/60 p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{customer.name}</p>
                    <p className="text-amber-100/60 text-sm">{customer.phone} · {customer.email || 'No email'}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="rounded-2xl bg-stone-800 px-4 py-2 text-sm text-amber-100/70">Orders {getOrderCount(customer)}</span>
                    <span className="rounded-2xl bg-stone-800 px-4 py-2 text-sm text-fire-yellow">₹{getLifetimeValue(customer).toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="inline-flex items-center gap-2 rounded-3xl bg-fire-red px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
                    >
                      View history <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedCustomer && (
        <div className="rounded-3xl border border-fire-red/20 bg-stone-900/80 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Order history</p>
              <h3 className="text-2xl font-bold text-white">{selectedCustomer.name}</h3>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="rounded-3xl bg-stone-800 px-4 py-3 text-sm text-amber-100/70 hover:bg-stone-700 transition"
            >
              Close
            </button>
          </div>
          <div className="space-y-4">
            {orders.filter((order) => order.customerId === selectedCustomer.id).map((order) => (
              <div key={order.id} className="rounded-3xl border border-stone-700 bg-stone-800/60 p-4">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold">Order #{order.id.slice(-6)}</p>
                    <p className="text-amber-100/60 text-sm">{new Date(order.timestamp).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-fire-yellow font-bold">₹{order.total}</p>
                    <p className="text-amber-100/70 text-sm uppercase tracking-[0.25em]">{order.status}</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="rounded-2xl bg-stone-900 p-3 text-sm text-amber-100/70">
                      {item.quantity} x {item.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {orders.filter((order) => order.customerId === selectedCustomer.id).length === 0 && (
              <p className="text-amber-100/60">No order history found for this customer.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCustomers;
