import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, CheckCircle2, Gift } from 'lucide-react';
import { storageService } from '../services/storageService';

function CartPage() {
  const navigate = useNavigate();
  const {
    cart = [],
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
    shopSettings,
    setToast,
  } = useOutletContext();

  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    storageService.getCoupons().then(setAvailableCoupons).catch(() => setAvailableCoupons([]));
  }, []);

  const discountAmount = useMemo(() => {
    if (!activeCoupon) return 0;
    const discount = activeCoupon.type === 'percent'
      ? (cartTotal * activeCoupon.value) / 100
      : activeCoupon.value;
    return Math.min(discount, cartTotal);
  }, [activeCoupon, cartTotal]);

  const payable = Math.max(cartTotal - discountAmount, 0);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponMessage('Enter a valid coupon code.');
      return;
    }

    const coupon = availableCoupons.find((entry) => entry.code === code);
    if (!coupon) {
      setCouponMessage('Coupon not recognized. Try a valid code.');
      setActiveCoupon(null);
      setToast?.('Invalid coupon code', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!coupon.enabled) {
      setCouponMessage('This coupon has been disabled.');
      setActiveCoupon(null);
      setToast?.('Disabled coupon', 'error');
      return;
    }

    if (coupon.expiry && coupon.expiry < today) {
      setCouponMessage('Coupon expired. Please choose a fresh offer.');
      setActiveCoupon(null);
      setToast?.('Expired coupon', 'error');
      return;
    }

    setActiveCoupon(coupon);
    setCouponMessage(
      coupon.type === 'percent'
        ? `Coupon applied: ${coupon.value}% off`
        : `Coupon applied: ₹${coupon.value} off`
    );
    setToast?.(`Coupon ${coupon.code} applied`, 'success');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setToast?.('Your cart is empty. Add items before checkout.', 'warning');
      return;
    }
    const phone = (shopSettings?.phone || '+918778017989').replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`*NEW ORDER*\n\n${cart
      .map((item) => {
        const lineTotal = item.price * (item.selectedWeight || 1) * item.quantity;
        const weightLabel = item.selectedWeight && item.selectedWeight !== 1 ? ` x ${item.selectedWeight}${item.unit}` : '';
        return `• ${item.name} x ${item.quantity}${weightLabel} = ₹${lineTotal.toFixed(0)}`;
      })
      .join('\n')}
\nSubtotal: ₹${cartTotal.toFixed(0)}\n${discountAmount > 0 ? `Discount: ₹${discountAmount.toFixed(0)}\n` : ''}Total: ₹${payable.toFixed(0)}\n\nCustomer is ready to order!`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    setOrderSuccess(true);
    clearCart();
    setActiveCoupon(null);
    setCouponCode('');
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <div className="bg-dark-bg text-white">
      <section className="border-b border-white/10 bg-stone-950/95 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">
            Checkout page
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            Confirm your order and checkout.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-amber-100/70 leading-relaxed">
            Review your cart, apply a coupon, and send your order directly through WhatsApp for fast confirmation.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Your cart</p>
                  <h2 className="mt-3 text-2xl font-black">{cart.length} item{cart.length === 1 ? '' : 's'} in cart</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-stone-950/90 px-4 py-3 text-sm text-amber-100/80">
                  <ShoppingCart className="h-5 w-5 text-fire-yellow" />
                  {cart.length} items
                </div>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-stone-900/70 p-12 text-center text-amber-100/70">
                <p className="mb-4 text-lg font-bold text-white">Your cart is empty.</p>
                <button onClick={() => navigate('/menu')} className="rounded-full bg-fire-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
                  Explore menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedWeight || 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl shadow-black/15"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">{item.category.replace('-', ' ')}</p>
                      <h3 className="mt-3 text-xl font-bold text-white">{item.name}</h3>
                      <p className="mt-2 text-amber-100/70 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-stone-950/80 p-4 text-right">
                      <p className="text-lg font-bold text-white">₹{item.price.toFixed(0)}{item.selectedWeight && item.selectedWeight !== 1 ? ` x ${item.selectedWeight}` : ''}</p>
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => updateQuantity(item.id, -1, item.selectedWeight)} className="h-10 w-10 rounded-xl bg-stone-800 text-white transition hover:bg-stone-700">-</button>
                        <span className="min-w-[2rem] text-center text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1, item.selectedWeight)} className="h-10 w-10 rounded-xl bg-stone-800 text-white transition hover:bg-stone-700">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 text-sm text-amber-100/70">
                    <p>Total: ₹{(item.price * (item.selectedWeight || 1) * item.quantity).toFixed(0)}</p>
                    <button onClick={() => removeFromCart(item.id, item.selectedWeight)} className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 text-red-300 transition hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Coupon code</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code: CRISPY20"
                  className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-stone-950/80 px-5 py-4 text-white outline-none transition focus:border-fire-red focus:ring-2 focus:ring-fire-red/20"
                />
                <button onClick={handleApplyCoupon} type="button" className="rounded-3xl bg-fire-red px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700">
                  Apply
                </button>
              </div>
              {couponMessage && <p className="mt-3 text-sm text-amber-100/70">{couponMessage}</p>}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl shadow-black/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-amber-100/70">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between text-amber-100/70">
                  <span>Discount</span>
                  <span>₹{discountAmount.toFixed(0)}</span>
                </div>
                <div className="border-t border-white/10 pt-4 text-lg font-bold text-white flex items-center justify-between">
                  <span>Total</span>
                  <span>₹{payable.toFixed(0)}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="mt-6 w-full rounded-3xl bg-fire-red px-6 py-4 text-base font-bold text-white transition hover:bg-red-700">
                Checkout with WhatsApp
              </button>
              <p className="mt-4 text-sm text-amber-100/70">Your order will be sent directly to {shopSettings?.phone || '+91 87780 17989'}.</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fire-red/15 text-fire-red">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-fire-yellow/80">Need help?</p>
                  <p className="mt-2 text-lg font-bold text-white">Chat with our order team</p>
                </div>
              </div>
              <button onClick={() => window.open(`https://wa.me/${(shopSettings?.phone || '+918778017989').replace(/[^0-9]/g, '')}`, '_blank')} className="mt-6 w-full rounded-3xl bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Open WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xl rounded-[2rem] border border-fire-yellow/20 bg-stone-950/95 p-10 text-center shadow-2xl shadow-black/40">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-fire-yellow/10 text-fire-yellow">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-black text-white">Order sent!</h2>
            <p className="mt-4 text-amber-100/70 leading-relaxed">
              Your message is ready on WhatsApp. Confirm it there to complete checkout and get live updates.
            </p>
            <button onClick={() => setOrderSuccess(false)} className="mt-8 rounded-full bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Continue browsing
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
