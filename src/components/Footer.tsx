import React from 'react';
import { Country, NavigationPage } from '../types';
import { ShieldCheck, Truck, RotateCcw, Globe, Heart } from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface FooterProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  onNavigate: (page: NavigationPage) => void;
  onOpenGa4: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  selectedCountry,
  onSelectCountry,
  onNavigate,
  onOpenGa4,
}) => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs border-t border-gray-800">
      {/* Reassurance Bar */}
      <div className="border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white text-xs">Global Tracked Delivery</strong>
                <span className="text-[11px] text-gray-400">Direct from Mountain View</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-emerald-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white text-xs">Easy 30-Day Returns</strong>
                <span className="text-[11px] text-gray-400">Hassle-free guarantee</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white text-xs">100% Authentic Merch</strong>
                <span className="text-[11px] text-gray-400">Certified Google licensed</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-purple-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white text-xs">Zero Currency Fees</strong>
                <span className="text-[11px] text-gray-400">Local checkout methods</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand & Country Selector */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white font-extrabold text-base tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
              <span className="text-gray-200 ml-1">Merchandise Store</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Mobile-first conversion redesign engineered to solve critical drop-offs discovered in Google Analytics 4 user behavior research.
            </p>

            {/* Region picker */}
            <div className="pt-2">
              <label htmlFor="footer-region-select" className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Shipping Destination
              </label>
              <select
                id="footer-region-select"
                value={selectedCountry.code}
                onChange={(e) => {
                  const c = COUNTRIES.find((item) => item.code === e.target.value);
                  if (c) onSelectCountry(c);
                }}
                className="bg-gray-800 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} (Free shipping over ${c.freeShippingThreshold})
                  </option>
                ))}
              </select>
            </div>

            {/* GA4 Case Study trigger */}
            <div className="pt-2">
              <button
                onClick={onOpenGa4}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline flex items-center space-x-1"
                id="footer-ga4-insights-btn"
              >
                <span>View GA4 Analytics &amp; UX Conversion Report</span>
              </button>
            </div>
          </div>

          {/* Col 2: Shop Catalog */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Shop</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('shop_all')} className="hover:text-white">
                  Shop All
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('new_arrivals')} className="hover:text-white">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('best_sellers')} className="hover:text-white">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brands')} className="hover:text-white">
                  Shop by Brand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white">
                  Shop by Category
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#help" className="hover:text-white">
                  Track My Order
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white">
                  Shipping &amp; Customs
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white">
                  30-Day Returns Policy
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white">
                  Sizing Guide
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Brands */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Google Brands</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('brands')}>
                  Google Core
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('brands')}>
                  Android
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('brands')}>
                  YouTube
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('brands')}>
                  Gemini AI
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('brands')}>
                  Google Cloud
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and payment methods */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Google Merchandise Store UX Redesign Prototype. For demonstration and conversion rate evaluation purposes.
          </p>

          <div className="flex items-center space-x-2 text-[10px] text-gray-400">
            <span className="px-2 py-1 rounded bg-gray-800 font-semibold text-gray-300">Google Pay</span>
            <span className="px-2 py-1 rounded bg-gray-800 font-semibold text-gray-300">UPI</span>
            <span className="px-2 py-1 rounded bg-gray-800 font-semibold text-gray-300">Visa</span>
            <span className="px-2 py-1 rounded bg-gray-800 font-semibold text-gray-300">Mastercard</span>
            <span className="px-2 py-1 rounded bg-gray-800 font-semibold text-gray-300">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
