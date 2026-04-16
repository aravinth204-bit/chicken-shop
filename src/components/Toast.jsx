import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

function Toast({ message, type = 'success' }) {
  const icons = {
    success: <CheckCircle className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    warning: <AlertCircle className="w-6 h-6" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className={`${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3`}>
        {icons[type]}
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
