import React, { useState, useEffect } from 'react';
import { Users, Star, Award, Truck, Clock } from 'lucide-react';

function Stats() {
  const [countersStarted, setCountersStarted] = useState(false);
  const [stats, setStats] = useState({
    orders: 0,
    rating: 0,
    fresh: 0,
    delivery: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [countersStarted]);

  useEffect(() => {
    if (countersStarted) {
      const duration = 2000;
      const steps = 60;
      const targets = { orders: 10500, rating: 4.9, fresh: 100, delivery: 2500 };
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          orders: Math.round(targets.orders * easeOut),
          rating: Math.round(targets.rating * easeOut * 10) / 10,
          fresh: Math.round(targets.fresh * easeOut),
          delivery: Math.round(targets.delivery * easeOut)
        });

        if (step >= steps) clearInterval(interval);
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [countersStarted]);

  const statItems = [
    { 
      icon: Users, 
      value: stats.orders.toLocaleString() + '+', 
      label: 'Happy Customers',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Star, 
      value: stats.rating.toFixed(1), 
      label: 'Customer Rating',
      color: 'from-yellow-500 to-yellow-600',
      suffix: ' ★'
    },
    { 
      icon: Award, 
      value: stats.fresh + '%', 
      label: 'Fresh Products',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Truck, 
      value: stats.delivery.toLocaleString() + '+', 
      label: 'Deliveries Done',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="stats-section" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/50" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <div 
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-stone-700 to-stone-800 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-stone-800/80 backdrop-blur-xl rounded-2xl p-6 border border-stone-700/50 hover:border-red-500/30 transition-all hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-amber-100/60 text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
