import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService, DELIVERY_SLOTS } from '../services/storageService';

function Cart({ isOpen, onClose, cart, removeFromCart, updateQuantity, cartTotal }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shopSettings, setShopSettings] = useState({ shopName: 'Chicken Sea', phone: '+91 98765 43210' });

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await storageService.getSettings();
      setShopSettings(settings);
    };
    loadSettings();
  }, []);

  if (!isOpen) return null;

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone || !customerLocation) {
      alert('Please fill in all fields (Name, Phone, Location)');
      return;
    }

    const selectedSlotData = DELIVERY_SLOTS.find(s => s.id === selectedSlot);
    
    const order = {
      id: uuidv4(),
      items: cart,
      total: cartTotal,
      customerName,
      customerPhone,
      customerLocation,
      deliverySlot: selectedSlotData || null,
      paymentMethod,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    await storageService.saveOrder(order);

    const message = encodeURIComponent(`*NEW ORDER FROM CUSTOMER* \u{1F414}
--------------------------------------------
\u{1F6CD} *${shopSettings.shopName}*
_Fresh Meat & Poultry_
--------------------------------------------

*Order ID:* #${order.id.slice(-6)}
*Date:* ${new Date().toLocaleDateString('en-IN')} | ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}

*\u{1F464} CUSTOMER INFO*
Name     : ${customerName}
Phone    : ${customerPhone}
Location : ${customerLocation}
${selectedSlotData ? `Pickup   : *${selectedSlotData.label} (${selectedSlotData.time})*\n` : ''}
*\u{1F4B3} PAYMENT*
Method   : *${paymentMethod === 'online' ? 'Online (UPI/GPay)' : 'Cash on Delivery (COD)'}*

--------------------------------------------
*\u{1F4E6} ORDERED ITEMS*
--------------------------------------------
${cart.map(item => {
    const weight = item.selectedWeight || 1;
    const unitSuf = item.unit === 'piece' ? 'pc' : 'kg';
    return `*${item.name}*
${item.quantity} × ${weight}${unitSuf} = *₹${(item.price * weight * item.quantity).toFixed(0)}*`;
}).join('\n\n')}

--------------------------------------------
*\u{1F4B5} BILL SUMMARY*
--------------------------------------------
Subtotal : ₹${cartTotal.toFixed(0)}
Delivery : *FREE PICKUP*
*TOTAL AMOUNT : ₹${cartTotal.toFixed(0)}*
--------------------------------------------

_Thank you for choosing ${shopSettings.shopName}!_
_Please confirm this order by replying 'OK'._`);

    const whatsappNumber = shopSettings.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerLocation('');
      setSelectedSlot('');
      onClose();
    }, 4000);
  };

  const formatPrice = (item) => {
    if (item.unit === 'piece') {
      return `₹${item.price}/pc`;
    }
    return `₹${item.price}/kg`;
  };

  const getItemTotal = (item) => {
    const weight = item.selectedWeight || 1;
    return (item.price * weight).toFixed(0);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-stone-900 h-full shadow-2xl border-l border-fire-red/30 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-fire-red to-red-800 text-white p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl md:text-2xl">
              🛒
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">My Cart</h2>
              <p className="text-red-200 text-xs md:text-sm">{cart.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors text-xl active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce text-5xl md:text-6xl">
                ✅
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Order Sent!</h3>
              <p className="text-amber-100/60 mb-4">Redirecting to WhatsApp...</p>
              <p className="text-sm text-amber-100/40">Please send the message to complete your order</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-5xl md:text-6xl">
                🛒
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Cart is Empty</h3>
              <p className="text-amber-100/60 mb-6">Add some products to get started</p>
              <button
                onClick={onClose}
                className="bg-stone-700 hover:bg-stone-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3 md:space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="bg-stone-800/50 rounded-2xl p-3 md:p-4 border border-stone-700/50">
                    <div className="flex gap-3 md:gap-4">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 md:w-16 md:h-16 bg-stone-700 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-700 rounded-xl flex items-center justify-center text-2xl md:text-3xl flex-shrink-0">
                          {item.emoji}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm md:text-base truncate">{item.name}</h4>
                        <p className="text-fire-yellow font-bold text-sm md:text-base">{formatPrice(item)}</p>
                        <p className="text-amber-100/60 text-xs md:text-sm">
                          {item.selectedWeight || 1}{item.unit === 'piece' ? ' pcs' : ' kg'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-fire-yellow font-bold text-lg md:text-xl">₹{getItemTotal(item)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone-700/50">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 md:w-8 md:h-8 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center text-white transition-colors font-bold text-sm md:text-base"
                        >
                          -
                        </button>
                        <span className="text-white font-bold w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 md:w-8 md:h-8 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center text-white transition-colors font-bold text-sm md:text-base"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors text-xs md:text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details */}
              <div className="bg-stone-800/50 rounded-2xl p-4 md:p-6 border border-stone-700/50 mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">📝 Your Details</h3>
                <div className="space-y-2 md:space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red placeholder-amber-100/40 text-sm md:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red placeholder-amber-100/40 text-sm md:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Your Location in Erode *"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    className="w-full bg-stone-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red placeholder-amber-100/40 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-stone-800/50 rounded-2xl p-4 md:p-6 border border-stone-700/50 mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">💳 Payment Method</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'cod' 
                        ? 'bg-fire-red text-white' 
                        : 'bg-stone-700 text-amber-100/70 hover:bg-stone-600'
                    }`}
                  >
                    <span>💵</span>
                    Cash on Delivery
                  </button>
                  <button
                    onClick={() => setPaymentMethod('online')}
                    className={`p-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'online' 
                        ? 'bg-fire-red text-white' 
                        : 'bg-stone-700 text-amber-100/70 hover:bg-stone-600'
                    }`}
                  >
                    <span>📱</span>
                    Online (UPI/GPay)
                  </button>
                </div>
                {paymentMethod === 'online' && (
                  <div className="mt-4 p-3 bg-stone-900/50 rounded-xl border border-fire-red/20 text-center">
                    <p className="text-amber-100/70 text-xs">
                       Scan QR code at shop or pay to<br/>
                       <span className="text-fire-yellow font-bold">{shopSettings.phone}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Pickup Time Slots */}
              <div className="bg-stone-800/50 rounded-2xl p-4 md:p-6 border border-stone-700/50 mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">🕐 Preferred Pickup Time</h3>
                <div className="grid grid-cols-2 gap-2">
                  {DELIVERY_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                        selectedSlot === slot.id 
                          ? 'bg-fire-red text-white' 
                          : 'bg-stone-700 text-amber-100/70 hover:bg-stone-600'
                      }`}
                    >
                      {slot.label}
                      <br />
                      <span className="text-xs opacity-70">{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Order */}
              <div className="border-t-2 border-fire-red/30 pt-4 md:pt-6">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <span className="text-lg md:text-xl font-bold text-white">Total</span>
                  <span className="text-2xl md:text-3xl font-bold text-fire-yellow">₹{cartTotal.toFixed(0)}</span>
                </div>
                
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-fire-red to-red-700 hover:from-red-600 hover:to-red-800 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 md:gap-3"
                >
                  📱 Order via WhatsApp
                </button>
                
                <p className="text-center text-amber-100/40 text-xs md:text-sm mt-4">
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

export default Cart;
