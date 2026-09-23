import React from 'react';
import { Brand } from '../types';

interface ShopByBrandProps {
  onSelectBrand: (brand: Brand) => void;
}

export const ShopByBrand: React.FC<ShopByBrandProps> = ({ onSelectBrand }) => {
  const brands: {
    brand: Brand;
    tagline: string;
    badgeColor: string;
    iconBg: string;
    borderHover: string;
  }[] = [
    {
      brand: 'Google',
      tagline: 'Core campus heritage & tools',
      badgeColor: 'text-[#4285F4] bg-blue-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      borderHover: 'hover:border-blue-400',
    },
    {
      brand: 'Android',
      tagline: 'Bugdroid dev & open source gear',
      badgeColor: 'text-[#34A853] bg-emerald-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
      borderHover: 'hover:border-emerald-400',
    },
    {
      brand: 'Gemini',
      tagline: 'Generative AI & neural apparel',
      badgeColor: 'text-indigo-600 bg-indigo-50',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      borderHover: 'hover:border-indigo-400',
    },
    {
      brand: 'YouTube',
      tagline: 'Creator studio & stream essentials',
      badgeColor: 'text-[#EA4335] bg-red-50',
      iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
      borderHover: 'hover:border-red-400',
    },
    {
      brand: 'Google Cloud',
      tagline: 'Kubernetes & infra architecture',
      badgeColor: 'text-sky-600 bg-sky-50',
      iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
      borderHover: 'hover:border-sky-400',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gray-50/70 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shop Your Favourite Brand
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Curated gear from your favorite Google technologies
            </p>
          </div>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {brands.map((item) => (
            <button
              key={item.brand}
              onClick={() => onSelectBrand(item.brand)}
              className={`p-4 bg-white rounded-2xl border border-gray-200/80 ${item.borderHover} hover:shadow-md transition-all text-left flex flex-col justify-between group min-h-[130px]`}
              id={`brand-card-${item.brand.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl ${item.iconBg} text-white font-bold flex items-center justify-center text-xs shadow-xs`}>
                    {item.brand.charAt(0)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    Official
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                  {item.brand}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="mt-3 text-[11px] font-semibold text-blue-600 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Collection →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
