import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NavigationPage } from '../types';
import heroLifestyleImg from '../assets/images/google_merch_lifestyle_1789822080893.jpg';

interface HeroSectionProps {
  onNavigate?: (page: NavigationPage) => void;
  onShopBestSellers?: () => void;
  onExploreNew?: () => void;
  onShopAll?: () => void;
  onExploreBestSellers?: () => void;
  onOpenInsights?: () => void;
  onOpenAI?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onShopBestSellers,
  onExploreNew,
  onShopAll,
  onExploreBestSellers,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(heroLifestyleImg);

  const handleShopBestSellers = () => {
    if (onShopBestSellers) onShopBestSellers();
    else if (onExploreBestSellers) onExploreBestSellers();
    else if (onNavigate) onNavigate('best_sellers');
  };

  const handleExploreNew = () => {
    if (onExploreNew) onExploreNew();
    else if (onShopAll) onShopAll();
    else if (onNavigate) onNavigate('new_arrivals');
  };

  return (
    <section
      className="relative overflow-hidden bg-white border-b border-gray-100 pt-6 pb-10 sm:py-12 lg:py-14"
      id="homepage-hero-section"
    >
      {/* Subtle Google-inspired ambient accents (clean, not overused) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-50/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* LEFT COLUMN: Text, Badge, and CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left">
            {/* Small Campaign Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200/80 text-gray-700 text-xs font-bold uppercase tracking-wider w-fit mb-4">
              <span className="flex space-x-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              </span>
              <span className="text-[11px] font-extrabold tracking-wide text-gray-800">
                GOOGLE IT. WEAR IT.
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-3 sm:mb-4">
              Find Your <span className="text-[#4285F4]">Google</span>.
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mb-6 sm:mb-8 font-normal">
              Tech, culture and Google favourites — made for everyday life.
            </p>

            {/* Primary and Secondary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              <button
                onClick={handleShopBestSellers}
                className="px-6 sm:px-7 py-3.5 bg-[#4285F4] hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-full text-sm sm:text-base transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2 min-h-[48px]"
                id="hero-shop-bestsellers-btn"
              >
                <span>Shop Best Sellers →</span>
              </button>

              <button
                onClick={handleExploreNew}
                className="px-6 sm:px-7 py-3.5 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800 font-bold rounded-full text-sm sm:text-base border border-gray-300 transition-all flex items-center justify-center space-x-2 min-h-[48px]"
                id="hero-explore-new-btn"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Explore New</span>
              </button>
            </div>

            {/* Subtle mobile note indicator */}
            <div className="mt-4 hidden sm:flex items-center space-x-2 text-xs text-gray-400">
              <span>Official campus merchandise • Worldwide tracked delivery</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Lifestyle Merchandise Image (takes ~50-55% width) */}
          <div className="lg:col-span-7 xl:col-span-7 mt-2 sm:mt-4 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-md border border-gray-200/80 group">
              {/* Image skeleton / placeholder during load */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}

              <img
                src={imgSrc}
                alt="Google modern lifestyle merchandise campaign with friends in casual apparel"
                className={`w-full h-auto max-h-[380px] sm:max-h-[460px] lg:max-h-[520px] xl:max-h-[560px] object-cover object-center transition-all duration-700 group-hover:scale-[1.015] ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  // Resilient fallback in case of loading error
                  setImgSrc('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80');
                  setImageLoaded(true);
                }}
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Subtle top-right Google accent pill tag */}
              <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gray-800 shadow-xs border border-white/60 flex items-center space-x-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                <span>Lifestyle Edition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
