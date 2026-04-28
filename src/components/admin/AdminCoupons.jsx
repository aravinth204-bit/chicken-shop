import React, { useEffect, useMemo, useState } from 'react';
import { storageService } from '../../services/storageService';
import { Plus, Edit2, Trash2, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react';

const defaultForm = {
  code: '',
  type: 'percent',
  value: 10,
  expiry: '',
  enabled: true,
  description: ''
};

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    const data = await storageService.getCoupons();
    setCoupons(data);
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingCoupon(null);
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.code) {
      setMessage('Coupon code is required.');
      return;
    }

    if (editingCoupon) {
      await storageService.updateCoupon(editingCoupon.id, form);
      setMessage('Coupon updated successfully!');
    } else {
      await storageService.addCoupon({ ...form });
      setMessage('Coupon created successfully!');
    }

    resetForm();
    await loadCoupons();
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      expiry: coupon.expiry,
      enabled: coupon.enabled,
      description: coupon.description || ''
    });
    setMessage('');
  };

  const handleDelete = async (couponId) => {
    if (window.confirm('Delete coupon permanently?')) {
      await storageService.deleteCoupon(couponId);
      await loadCoupons();
    }
  };

  const activeCoupons = useMemo(() => coupons.filter((coupon) => coupon.enabled), [coupons]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <h2 className="text-2xl font-bold text-white mb-3">Coupon Manager</h2>
          <p className="text-amber-100/60">Create promotional codes, set discounts, and manage expiry with one dashboard.</p>
        </div>
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-100/60 mb-3">Active coupons</p>
          <div className="space-y-3">
            {activeCoupons.length === 0 ? (
              <p className="text-amber-100/50">No active coupons right now.</p>
            ) : (
              activeCoupons.map((coupon) => (
                <div key={coupon.id} className="rounded-3xl bg-stone-900/60 p-4 border border-stone-700">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">{coupon.code}</p>
                      <p className="text-amber-100/60 text-sm">{coupon.type === 'percent' ? `${coupon.value}% off` : `₹${coupon.value} off`}</p>
                    </div>
                    <span className="text-amber-100/60 text-sm">Expires {coupon.expiry || 'never'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700">
          <h3 className="text-xl font-bold text-white mb-4">Create / Edit Coupon</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Code</label>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                className="w-full bg-stone-900 border border-stone-700 px-4 py-3 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-fire-red"
                placeholder="EXTRA10"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-100/60 text-sm mb-2">Discount type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 px-4 py-3 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-fire-red"
                >
                  <option value="percent">Percent</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div>
                <label className="block text-amber-100/60 text-sm mb-2">Value</label>
                <input
                  type="number"
                  min="1"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                  className="w-full bg-stone-900 border border-stone-700 px-4 py-3 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-fire-red"
                />
              </div>
            </div>
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Expiry date</label>
              <input
                type="date"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 px-4 py-3 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-fire-red"
              />
            </div>
            <div>
              <label className="block text-amber-100/60 text-sm mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="3"
                className="w-full bg-stone-900 border border-stone-700 px-4 py-3 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-fire-red"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 text-amber-100/70">
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                  className="accent-fire-red"
                />
                Enabled
              </label>
            </div>
            {message && <p className="text-amber-100/60 text-sm">{message}</p>}
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-fire-red px-6 py-3 rounded-3xl font-bold text-white hover:bg-red-700 transition"
            >
              <Plus className="w-4 h-4" /> {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
            </button>
          </form>
        </div>

        <div className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">Coupon list</h3>
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="rounded-3xl bg-stone-900/60 border border-stone-700 p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{coupon.code}</p>
                  <p className="text-amber-100/60 text-sm">{coupon.type === 'percent' ? `${coupon.value}% off` : `₹${coupon.value} off`} · Expires {coupon.expiry || 'never'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="rounded-3xl bg-stone-700 px-3 py-2 text-sm text-white hover:bg-stone-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="rounded-3xl bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      await storageService.toggleCoupon(coupon.id);
                      loadCoupons();
                    }}
                    className={`rounded-3xl px-3 py-2 text-sm font-semibold transition ${coupon.enabled ? 'bg-green-500 text-white' : 'bg-stone-700 text-amber-100'}`}
                  >
                    {coupon.enabled ? <CheckCircle2 className="inline w-4 h-4" /> : <ToggleLeft className="inline w-4 h-4" />} {coupon.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            ))}
            {coupons.length === 0 && <p className="text-amber-100/60">No coupons have been created yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCoupons;
