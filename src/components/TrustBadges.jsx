import React from 'react';
import { ShieldCheck, Droplet, Clock, Award } from 'lucide-react';

function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, label: 'FSSAI Certified', color: 'text-green-400' },
    { icon: Droplet, label: '100% Hygienic', color: 'text-blue-400' },
    { icon: Clock, label: 'Same Day Delivery', color: 'text-amber-400' },
    { icon: Award, label: 'Premium Quality', color: 'text-purple-400' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 py-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-amber-100/80"
        >
          <badge.icon className={`w-5 h-5 ${badge.color}`} />
          <span className="text-sm font-medium">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;
