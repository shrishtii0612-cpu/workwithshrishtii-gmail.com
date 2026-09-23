import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NavigationPage } from '../types';

interface WhatsYourGoogleProps {
  onNavigate: (page: NavigationPage, params?: { category?: string; brand?: string }) => void;
}

export const WhatsYourGoogle: React.FC<WhatsYourGoogleProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'cat-bestsellers',
      title: 'Best Sellers',
      subtitle: 'Top-rated gear',
      badge: 'POPULAR',
      badgeColor: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
      action: () => onNavigate('best_sellers'),
    },
    {
      id: 'cat-new',
      title: 'New',
      subtitle: 'Fresh drops',
      badge: 'FRESH',
      badgeColor: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80',
      action: () => onNavigate('new_arrivals'),
    },
    {
      id: 'cat-retro',
      title: 'Retro',
      subtitle: '1998 Heritage',
      badge: 'VINTAGE',
      badgeColor: 'bg-amber-600 text-white',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80',
      action: () => onNavigate('shop_all', { category: 'Sweatshirts' }),
    },
    {
      id: 'cat-gifts',
      title: 'Gifts',
      subtitle: 'Mugs & stationery',
      badge: 'UNDER $25',
      badgeColor: 'bg-rose-600 text-white',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80',
      action: () => onNavigate('categories'),
    },
    {
      id: 'cat-tech',
      title: 'Tech Accessories',
      subtitle: 'Stands & organizers',
      badge: 'HARDWARE',
      badgeColor: 'bg-purple-600 text-white',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&auto=format&fit=crop&q=80',
      action: () => onNavigate('categories'),
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-gray-50/60 border-b border-gray-100" id="whats-your-google-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                What’s Your Google?
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
                Explore by Vibe
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Jump straight into our most popular collections
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop_all')}
            className="text-xs sm:text-sm font-bold text-[#4285F4] hover:text-blue-700 flex items-center space-x-1 shrink-0"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Visual Category Cards: Horizontal Grid on Desktop, Horizontally Scrollable on Mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-2 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={cat.action}
              className="group relative flex-none w-[175px] sm:w-auto snap-start h-48 sm:h-52 rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-gray-200/80 transition-all duration-300 text-left bg-gray-900"
              id={`cat-card-${cat.id}`}
            >
              {/* Background Image with Zoom on Hover */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-95"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className={`text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 flex flex-col justify-end">
                <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-blue-200 transition-colors leading-tight drop-shadow-xs">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                  {cat.subtitle}
                </p>
                <div className="mt-2 flex items-center space-x-1 text-[11px] font-bold text-blue-300 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
