import React from 'react';
import { MessageCircle } from 'lucide-react';

function WhatsAppFloatingButton({ phone }) {
  const whatsappNumber = phone?.replace(/[^0-9]/g, '') || '918778017989';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-110 active:scale-95 animate-wa-pulse"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}

export default WhatsAppFloatingButton;
