import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface TrendingNowProps {
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, size?: string) => void;
  onViewAll?: () => void;
}

export const TrendingNow: React.FC<TrendingNowProps> = ({
  onSelectProduct,
  onQuickAddToCart,
  onViewAll,
}) => {
  // Find fallback matching products from catalog for full interaction (sizes, reviews, details)
  const prodTee = PRODUCTS.find((p) => p.id === 'prod-013') || PRODUCTS[0];
  const prodPullover = PRODUCTS.find((p) => p.id === 'prod-016') || PRODUCTS[1];
  const prodSweatshirt = PRODUCTS.find((p) => p.id === 'prod-003') || PRODUCTS[2];
  const prodBottle = PRODUCTS.find((p) => p.id === 'prod-005') || PRODUCTS[4];

  const trendingItems = [
    {
      id: 'trending-1',
      name: 'Super G Gradient Tee',
      price: 28.0,
      badge: 'TRENDING',
      badgeClass: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80',
      productRef: { ...prodTee, name: 'Super G Gradient Tee', price: 28.0 },
    },
    {
      id: 'trending-2',
      name: 'Google Marine Layer 1998 Pullover',
      price: 68.0,
      badge: 'RETRO',
      badgeClass: 'bg-amber-600 text-white',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=700&auto=format&fit=crop&q=80',
      productRef: { ...prodPullover, name: 'Google Marine Layer 1998 Pullover', price: 68.0 },
    },
    {
      id: 'trending-3',
      name: 'Nano Banana Sweatshirt',
      price: 56.0,
      badge: 'NEW',
      badgeClass: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=700&auto=format&fit=crop&q=80',
      productRef: { ...prodSweatshirt, name: 'Nano Banana Sweatshirt', price: 56.0 },
    },
    {
      id: 'trending-4',
      name: 'Google Gravity Super G Bottle',
      price: 32.0,
      badge: 'BEST SELLER',
      badgeClass: 'bg-red-600 text-white',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80',
      productRef: { ...prodBottle, name: 'Google Gravity Super G Bottle', price: 32.0 },
    },
  ];

  return (
    <section className="py-10 sm:py-12 bg-white border-b border-gray-100" id="trending-now-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Trending Now
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                Live Favorites
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              The season’s most anticipated casual apparel and campus essentials
            </p>
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs sm:text-sm font-bold text-[#4285F4] hover:text-blue-700 flex items-center space-x-1 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4 Product Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item.productRef)}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
              id={`trending-card-${item.id}`}
            >
              {/* Product Image & Badge */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Small Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className={`text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Quick Add Button on Hover / Mobile */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAddToCart(item.productRef);
                  }}
                  className="absolute bottom-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-xs text-gray-800 hover:bg-[#4285F4] hover:text-white shadow-md flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Quick Add to Basket"
                  aria-label={`Quick add ${item.name}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 group-hover:text-[#4285F4] transition-colors leading-snug">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-extrabold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 group-hover:underline">
                    View item →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
