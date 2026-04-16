import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Minus, Plus, Trash2, MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import { defaultProducts } from '../data/menuItems';

function WhatsAppOrder({ isOpen, onClose, cart, removeFromCart, updateQuantity, cartTotal }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shopName, setShopName] = useState('ARAVINTH.S POULTRY SHOP');

  useEffect(() => {
    const saved = localStorage.getItem('poultryShopName');
    if (saved) setShopName(saved);
  }, []);

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    if (!customerName || !customerPhone || !customerLocation) {
      alert('Please fill in all fields');
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total: cartTotal,
      customerName,
      customerPhone,
      customerLocation,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('poultryOrders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('poultryOrders', JSON.stringify(existingOrders));

    const itemsText = cart.map(item => {
      const price = item.unit === 'piece' 
        ? (item.pricePerDozen / 12) 
        : item.pricePerKg;
      const itemTotal = (price * item.weight * item.quantity).toFixed(0);
      return `• ${item.quantity}x ${item.name} (${item.weight}${item.unit}) = ₹${itemTotal}`;
    }).join('\n');

    const message = encodeURIComponent(`*🏪 ${shopName}*

━━━━━━━━━━━━━━━━━
📋 ORDER DETAILS
━━━━━━━━━━━━━━━━━

👤 Name: ${customerName}
📱 Phone: ${customerPhone}
📍 Location: ${customerLocation}

━━━━━━━━━━━━━━━━━
🛒 ITEMS
━━━━━━━━━━━━━━━━━
${itemsText}

━━━━━━━━━━━━━━━━━
💰 TOTAL: ₹${cartTotal.toFixed(0)}
━━━━━━━━━━━━━━━━━

📍 Pickup from Shop
🕐 Ordered: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

    window.open(`https://wa.me/918778017989?text=${message}`, '_blank');

    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerLocation('');
      localStorage.removeItem('poultryCart');
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 h-full shadow-2xl border-l border-slate-700 flex flex-col">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">My Cart</h2>
              <p className="text-red-200 text-sm">{cart.length} items</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Order Sent!</h3>
              <p className="text-slate-400 mb-4">Redirecting to WhatsApp...</p>
              <p className="text-sm text-slate-500">Please send the message to complete your order</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <span className="text-5xl">🛒</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cart is Empty</h3>
              <p className="text-slate-400 mb-6">Add some products to get started</p>
              <button
                onClick={onClose}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{item.name}</h4>
                        <p className="text-red-400 font-bold">
                          ₹{((item.unit === 'piece' ? item.pricePerDozen / 12 : item.pricePerKg) * item.weight * item.quantity).toFixed(0)}
                        </p>
                        <p className="text-slate-400 text-sm">{item.weight}{item.unit} × {item.quantity}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Delivery Details</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-400"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-400"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Your Location in Erode *"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="w-full bg-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-red-500/30 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-3xl font-bold text-red-400">₹{cartTotal.toFixed(0)}</span>
                </div>
                
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <Phone className="w-6 h-6" />
                  Order via WhatsApp
                </button>
                
                <p className="text-center text-slate-500 text-sm mt-4">
                  Order will be sent to shop via WhatsApp
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WhatsAppOrder;
