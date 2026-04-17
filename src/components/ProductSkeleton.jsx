import React from 'react';

function ProductSkeleton() {
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {skeletonItems.map((i) => (
        <div
          key={i}
          className="bg-stone-800/50 rounded-2xl overflow-hidden border border-stone-700/50"
        >
          {/* Image skeleton */}
          <div className="h-36 sm:h-40 md:h-44 skeleton" />

          {/* Content skeleton */}
          <div className="p-3 md:p-4 space-y-3">
            <div className="h-5 w-3/4 skeleton rounded" />
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-2/4 skeleton rounded" />

            {/* Weight options skeleton */}
            <div className="flex gap-2 pt-2">
              <div className="h-7 w-12 skeleton rounded-lg" />
              <div className="h-7 w-12 skeleton rounded-lg" />
              <div className="h-7 w-12 skeleton rounded-lg" />
            </div>

            {/* Button skeleton */}
            <div className="h-10 w-full skeleton rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;
