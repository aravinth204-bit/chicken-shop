import React from 'react';

/**
 * Chicken Sea Logo Component
 * SVG-based for crisp rendering at any size
 * Usage: <Logo size="sm" | "md" | "lg" | "xl" />
 */
function Logo({ size = 'md', className = '' }) {
  const sizes = {
    xs: { icon: 28, text: 'text-base', sub: 'text-[9px]' },
    sm: { icon: 36, text: 'text-xl', sub: 'text-[10px]' },
    md: { icon: 44, text: 'text-2xl', sub: 'text-xs' },
    lg: { icon: 56, text: 'text-3xl', sub: 'text-sm' },
    xl: { icon: 80, text: 'text-5xl', sub: 'text-base' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon Mark */}
      <div
        style={{ width: s.icon, height: s.icon }}
        className="relative flex-shrink-0"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="48" fill="#1C1917" stroke="#DC2626" strokeWidth="2.5" />

          {/* Body of the chicken */}
          <ellipse cx="50" cy="60" rx="22" ry="18" fill="#DC2626" />

          {/* Head */}
          <circle cx="50" cy="36" r="14" fill="#DC2626" />

          {/* Comb (top) */}
          <path d="M44 24 Q47 16 50 22 Q53 14 56 22 Q59 16 61 22" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Beak */}
          <path d="M58 37 L65 39 L58 41 Z" fill="#F59E0B" />

          {/* Eye */}
          <circle cx="55" cy="34" r="3" fill="white" />
          <circle cx="56" cy="34" r="1.5" fill="#1C1917" />

          {/* Wattle (chin) */}
          <ellipse cx="53" cy="45" rx="4" ry="5" fill="#F59E0B" />

          {/* Wing */}
          <path d="M30 58 Q38 50 50 56 Q38 60 30 58Z" fill="#B91C1C" />

          {/* Tail feathers */}
          <path d="M72 55 Q80 42 76 50 Q84 38 78 48 Q86 36 80 46" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Legs */}
          <line x1="43" y1="76" x2="40" y2="86" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="57" y1="76" x2="60" y2="86" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M37 86 L40 86 L43 82" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M57 82 L60 86 L63 86" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* Wave at bottom (Sea element) */}
          <path
            d="M4 90 Q15 82 26 90 Q37 98 48 90 Q59 82 70 90 Q81 98 96 90"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-black tracking-tight text-white ${s.text}`}>
          CHICKEN
        </span>
        <span className={`font-display font-black tracking-[0.15em] text-fire-red ${s.text}`}>
          SEA
        </span>
        <span className={`font-sans font-medium text-amber-100/40 tracking-widest uppercase ${s.sub}`}>
          Fresh Poultry
        </span>
      </div>
    </div>
  );
}

export default Logo;
