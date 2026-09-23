import React from 'react';

interface ShopByPriceProps {
  onSelectBudget: (budget: 'under10' | 'under25' | 'under50' | 'premium') => void;
}

export const ShopByPrice: React.FC<ShopByPriceProps> = ({ onSelectBudget }) => {
  const tiers: {
    id: 'under10' | 'under25' | 'under50' | 'premium';
    title: string;
    subtitle: string;
    badge: string;
    gradient: string;
  }[] = [
    {
      id: 'under10',
      title: 'Under $10',
      subtitle: 'Sticker packs, keychains & pens',
      badge: 'Stocking Stuffers',
      gradient: 'from-emerald-50 to-teal-50 border-emerald-200/80 hover:border-emerald-400',
    },
    {
      id: 'under25',
      title: 'Under $25',
      subtitle: 'T-shirts, mugs, caps & totes',
      badge: 'Most Popular Gifts',
      gradient: 'from-blue-50 to-indigo-50 border-blue-200/80 hover:border-blue-400',
    },
    {
      id: 'under50',
      title: 'Under $50',
      subtitle: 'Thermal bottles, journals & gear',
      badge: 'Everyday Essentials',
      gradient: 'from-amber-50 to-orange-50 border-amber-200/80 hover:border-amber-400',
    },
    {
      id: 'premium',
      title: 'Premium ($50+)',
      subtitle: 'Heavyweight hoodies & backpacks',
      badge: 'Collector Items',
      gradient: 'from-purple-50 to-rose-50 border-purple-200/80 hover:border-purple-400',
    },
  ];

  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shop by Budget
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find the perfect Google merch gift for every budget
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Gift-shopper optimized
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => onSelectBudget(tier.id)}
              className={`p-4 sm:p-5 rounded-2xl border bg-gradient-to-br ${tier.gradient} text-left transition-all hover:shadow-md active:scale-98 group flex flex-col justify-between min-h-[120px]`}
              id={`budget-btn-${tier.id}`}
            >
              <div>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-700 shadow-2xs mb-2">
                  {tier.badge}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tier.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                  {tier.subtitle}
                </p>
              </div>

              <div className="mt-3 text-xs font-bold text-gray-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Explore items</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
