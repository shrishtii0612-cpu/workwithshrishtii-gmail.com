import React from 'react';
import { Sparkles, TrendingUp, Shirt, Gift, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../types';

interface QuickShoppingCardsProps {
  onNavigate: (page: NavigationPage, params?: { category?: string }) => void;
}

export const QuickShoppingCards: React.FC<QuickShoppingCardsProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: 'quick-new',
      title: 'New Arrivals',
      subtitle: 'Just dropped tech & apparel',
      tag: 'Fresh',
      icon: Sparkles,
      color: 'from-blue-600 to-indigo-600',
      bgLight: 'bg-blue-50/60 hover:bg-blue-50',
      border: 'border-blue-100 hover:border-blue-300',
      textColor: 'text-blue-700',
      action: () => onNavigate('new_arrivals'),
    },
    {
      id: 'quick-bestsellers',
      title: 'Best Sellers',
      subtitle: 'Community top-rated gear',
      tag: 'Popular',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
      bgLight: 'bg-emerald-50/60 hover:bg-emerald-50',
      border: 'border-emerald-100 hover:border-emerald-300',
      textColor: 'text-emerald-700',
      action: () => onNavigate('best_sellers'),
    },
    {
      id: 'quick-apparel',
      title: 'Apparel',
      subtitle: 'Hoodies, tees & crewnecks',
      tag: 'Wardrobe',
      icon: Shirt,
      color: 'from-amber-600 to-orange-600',
      bgLight: 'bg-amber-50/60 hover:bg-amber-50',
      border: 'border-amber-100 hover:border-amber-300',
      textColor: 'text-amber-700',
      action: () => onNavigate('shop_all', { category: 'T-shirts' }),
    },
    {
      id: 'quick-gifts',
      title: 'Gifts & Accessories',
      subtitle: 'Mugs, tumblers & pins',
      tag: 'Under $25',
      icon: Gift,
      color: 'from-rose-600 to-pink-600',
      bgLight: 'bg-rose-50/60 hover:bg-rose-50',
      border: 'border-rose-100 hover:border-rose-300',
      textColor: 'text-rose-700',
      action: () => onNavigate('categories'),
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              What are you looking for?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Tap a shortcut below to jump straight to curated collections
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs font-medium text-blue-600">
            Mobile-optimized discovery
          </span>
        </div>

        {/* 4 Large cards: 2-column on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={card.action}
                className={`group relative p-4 sm:p-5 rounded-2xl border ${card.border} ${card.bgLight} text-left transition-all duration-200 hover:shadow-md active:scale-[0.98] min-h-[120px] sm:min-h-[140px] flex flex-col justify-between`}
                id={`quick-card-${card.id}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-xs flex items-center justify-center ${card.textColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200/50">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {card.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/40 text-xs font-semibold text-gray-700 group-hover:text-blue-600">
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
