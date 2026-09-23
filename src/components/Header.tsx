import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, X, Globe, BarChart3, Sparkles } from 'lucide-react';
import { Brand, Country, NavigationPage } from '../types';
import { COUNTRIES } from '../data/countries';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage, params?: { brand?: Brand; category?: string; productId?: string }) => void;
  cartCount: number;
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  onOpenSearch: () => void;
  onOpenAI?: () => void;
  onOpenInsights?: () => void;
  onOpenGa4?: () => void;
  mobileViewportMode?: boolean;
  onToggleMobileViewport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  selectedCountry,
  onSelectCountry,
  onOpenSearch,
  onOpenAI = () => {},
  onOpenInsights,
  onOpenGa4,
  mobileViewportMode = false,
  onToggleMobileViewport = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);

  const handleOpenInsights = onOpenInsights || onOpenGa4 || (() => {});

  return (
    <>
      {/* Top Banner: Global shipping & GA4 Data-Driven Badge */}
      <div className="bg-[#202124] text-white text-xs font-medium py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate">
              Free tracked shipping to {selectedCountry.name} on orders over {selectedCountry.currencySymbol}
              {selectedCountry.freeShippingThreshold}.00
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-3 shrink-0">
            {/* Country Selector dropdown trigger */}
            <div className="relative">
              <button
                onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                className="flex items-center space-x-1.5 hover:text-blue-300 transition-colors py-0.5 px-2 rounded hover:bg-white/10"
                aria-label="Select Country"
                id="header-country-select-btn"
              >
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
                <span className="text-[10px] text-gray-400">({selectedCountry.currencySymbol})</span>
              </button>

              {countryPickerOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    Deliver to Country
                  </div>
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onSelectCountry(c);
                        setCountryPickerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-blue-50 transition-colors ${
                        c.code === selectedCountry.code ? 'font-semibold text-blue-600 bg-blue-50/50' : ''
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-gray-500 text-[11px]">{c.estimatedDays}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Viewport simulation toggle for desktop reviewers */}
            <button
              onClick={onToggleMobileViewport}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                mobileViewportMode
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white/15 text-gray-200 hover:bg-white/25'
              }`}
              title="Toggle 390px Mobile View to test mobile-first UX"
              id="header-viewport-toggle-btn"
            >
              <span>📱</span>
              <span>{mobileViewportMode ? 'Exit Mobile Frame' : 'Test Mobile View (390px)'}</span>
            </button>

            {/* GA4 Case Study & Event Inspector button */}
            <button
              onClick={handleOpenInsights}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold hover:opacity-95 shadow-sm"
              id="header-ga4-insights-btn"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>GA4 Redesign Rationale</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Open Navigation Menu"
              id="mobile-menu-trigger-btn"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Google Merch Shop Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 group text-left focus:outline-hidden"
              id="header-logo-btn"
            >
              <div className="flex items-center">
                {/* Authentic 4-color Google G mark */}
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.93 0 12s.45 3.84 1.24 5.41l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
                  />
                </svg>
                <div className="ml-2 leading-none">
                  <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    Google <span className="text-gray-500 font-medium">Merch</span>
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => onNavigate('new_arrivals')}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                currentPage === 'new_arrivals'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
              id="nav-new-btn"
            >
              New
            </button>
            <button
              onClick={() => onNavigate('brands')}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                currentPage === 'brands'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
              id="nav-brands-btn"
            >
              Brands
            </button>
            <button
              onClick={() => onNavigate('shop_all', { category: 'T-shirts' })}
              className="px-3 py-2 text-sm font-medium rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              id="nav-apparel-btn"
            >
              Apparel
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                currentPage === 'categories'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
              id="nav-gifts-btn"
            >
              Gifts & Essentials
            </button>
            <button
              onClick={() => onNavigate('shop_all')}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                currentPage === 'shop_all'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
              id="nav-shop-all-btn"
            >
              Shop All
            </button>
          </nav>

          {/* Right: Actions (Search, AI Assistant, Cart) */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Search Merchandise"
              id="header-search-trigger-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAI}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-blue-700 border border-blue-200/80 hover:border-blue-300 hover:shadow-xs transition-all"
              id="header-ai-assistant-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ask AI Shop</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2.5 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label={`View Shopping Basket (${cartCount} items)`}
              id="header-cart-trigger-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#1A73E8] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    G
                  </div>
                  <span className="font-bold text-gray-900">Google Merch Shop</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                  aria-label="Close menu"
                  id="mobile-menu-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Discovery Shortcuts */}
              <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-1.5">
                  Quick Discovery
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onNavigate('new_arrivals');
                      setMobileMenuOpen(false);
                    }}
                    className="p-2.5 bg-white border border-gray-200 rounded-xl text-left text-xs font-semibold text-gray-800 hover:border-blue-500"
                  >
                    🔥 New Arrivals
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('best_sellers');
                      setMobileMenuOpen(false);
                    }}
                    className="p-2.5 bg-white border border-gray-200 rounded-xl text-left text-xs font-semibold text-gray-800 hover:border-blue-500"
                  >
                    ⭐ Best Sellers
                  </button>
                </div>
              </div>

              {/* Main Links */}
              <div className="p-3 space-y-1">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop_all');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>Shop All Products</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">185+</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('brands');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>Shop by Brand</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('categories');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>Shop by Category</span>
                </button>
              </div>

              {/* Brand Shortcuts in Mobile */}
              <div className="p-3 border-t border-gray-100">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2">
                  Featured Brands
                </div>
                <div className="flex flex-wrap gap-1.5 px-1">
                  {(['Google', 'Android', 'YouTube', 'Gemini', 'Google Cloud'] as Brand[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        onNavigate('shop_all', { brand: b });
                        setMobileMenuOpen(false);
                      }}
                      className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Country selector & AI assistant trigger */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAI();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Shopping Assistant</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenInsights();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gray-900 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-sm"
                id="mobile-drawer-ga4-btn"
              >
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>GA4 Redesign Rationale</span>
              </button>

              <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                <span className="flex items-center space-x-1.5">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span>Ship to: {selectedCountry.name}</span>
                </span>
                <span>{selectedCountry.flag}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
