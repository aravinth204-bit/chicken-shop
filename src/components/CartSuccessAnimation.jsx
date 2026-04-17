import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

function CartSuccessAnimation({ show, onComplete }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-green-500 text-white p-6 rounded-full shadow-2xl animate-bounce">
        <Check className="w-16 h-16" />
      </div>
    </div>
  );
}

export default CartSuccessAnimation;
