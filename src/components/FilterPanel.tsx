import React, { useState } from 'react';
import { Filter, ArrowUpDown, X, Check, RotateCcw } from 'lucide-react';
import { Brand, Category, FilterState, Size } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalProductsCount: number;
  filteredCount: number;
}

const CATEGORIES: Category[] = [
  'T-shirts',
  'Hoodies',
  'Sweatshirts',
  'Mugs',
  'Bottles',
  'Bags',
  'Caps',
  'Stationery',
  'Accessories',
  'Collectibles',
];

const BRANDS: Brand[] = ['Google', 'Android', 'YouTube', 'Gemini', 'Google Cloud'];

const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  totalProductsCount,
  filteredCount,
}) => {
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  const quickChips: { id: FilterState['quickChip']; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'best_sellers', label: '⭐ Best Sellers' },
    { id: 'new', label: '🔥 New In' },
    { id: 'under25', label: '💰 Under $25' },
    { id: 'gifts', label: '🎁 Gifts' },
    { id: 'sale', label: '🏷️ On Sale' },
  ];

  const resetAllFilters = () => {
    onFilterChange({
      category: 'all',
      brand: 'all',
      budget: 'all',
      gender: 'all',
      size: 'all',
      colour: 'all',
      stockOnly: false,
      sustainableOnly: false,
      collection: 'all',
      quickChip: 'all',
      sort: 'featured',
    });
  };

  const hasActiveFilters =
    (filters.category && filters.category !== 'all') ||
    (filters.brand && filters.brand !== 'all') ||
    (filters.budget && filters.budget !== 'all') ||
    (filters.gender && filters.gender !== 'all') ||
    (filters.size && filters.size !== 'all') ||
    filters.stockOnly ||
    filters.sustainableOnly ||
    (filters.quickChip && filters.quickChip !== 'all');

  return (
    <div className="mb-6 space-y-4">
      {/* Quick Filter Chips (Horizontally scrollable on mobile) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {quickChips.map((chip) => {
          const isActive = (filters.quickChip || 'all') === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => {
                onFilterChange({
                  ...filters,
                  quickChip: chip.id,
                  // Auto sync budget or category if relevant
                  budget: chip.id === 'under25' ? 'under25' : filters.budget === 'under25' ? 'all' : filters.budget,
                });
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 min-h-[36px] flex items-center space-x-1 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200/80 text-gray-700'
              }`}
              id={`chip-${chip.id}`}
            >
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Mobile Filter Button, Sort dropdown, and count */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterDrawerOpen(true)}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 shadow-2xs min-h-[40px]"
            id="mobile-filter-open-btn"
          >
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            )}
          </button>

          {/* Clear Filters button if active */}
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600 px-2 py-1"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Showing count */}
          <span className="text-xs text-gray-500 hidden sm:inline-block">
            Showing <strong className="text-gray-900">{filteredCount}</strong> of {totalProductsCount} items
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="product-sort-select" className="text-xs text-gray-500 hidden sm:inline flex items-center space-x-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </label>
          <select
            id="product-sort-select"
            value={filters.sort}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                sort: e.target.value as FilterState['sort'],
              })
            }
            className="px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs min-h-[40px]"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="popular">Popularity & Rating</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Desktop Inline Fast Category Filters */}
      <div className="hidden lg:flex items-center flex-wrap gap-2 text-xs">
        <span className="font-semibold text-gray-500 mr-1">Brand:</span>
        <button
          onClick={() => onFilterChange({ ...filters, brand: 'all' })}
          className={`px-2.5 py-1 rounded-lg ${
            !filters.brand || filters.brand === 'all'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Brands
        </button>
        {BRANDS.map((b) => (
          <button
            key={b}
            onClick={() => onFilterChange({ ...filters, brand: b })}
            className={`px-2.5 py-1 rounded-lg ${
              filters.brand === b
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {b}
          </button>
        ))}

        <span className="mx-2 text-gray-300">|</span>

        <span className="font-semibold text-gray-500 mr-1">Budget:</span>
        {[
          { id: 'all', label: 'All' },
          { id: 'under10', label: '< $10' },
          { id: 'under25', label: '< $25' },
          { id: 'under50', label: '< $50' },
          { id: 'premium', label: '$50+' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() =>
              onFilterChange({
                ...filters,
                budget: item.id as FilterState['budget'],
              })
            }
            className={`px-2 py-0.5 rounded-md ${
              (filters.budget || 'all') === item.id
                ? 'bg-gray-900 text-white font-semibold'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Bottom Sheet / Filter Drawer */}
      {mobileFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterDrawerOpen(false)}
          />

          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 z-50">
            <div>
              {/* Filter Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Filter & Refine</h3>
                  <p className="text-xs text-gray-500">{filteredCount} matching products</p>
                </div>
                <button
                  onClick={() => setMobileFilterDrawerOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                  id="mobile-filter-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Options Sections */}
              <div className="p-4 space-y-6">
                {/* Brand Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Brand
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => onFilterChange({ ...filters, brand: 'all' })}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        !filters.brand || filters.brand === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => onFilterChange({ ...filters, brand: b })}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          filters.brand === b
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onFilterChange({ ...filters, category: 'all' })}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-semibold ${
                        !filters.category || filters.category === 'all'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'bg-gray-50 text-gray-700 border border-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => onFilterChange({ ...filters, category: cat })}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-semibold ${
                          filters.category === cat
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-gray-50 text-gray-700 border border-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price / Budget */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'all', label: 'Any Price' },
                      { id: 'under10', label: 'Under $10' },
                      { id: 'under25', label: 'Under $25' },
                      { id: 'under50', label: 'Under $50' },
                      { id: 'premium', label: 'Premium ($50+)' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() =>
                          onFilterChange({
                            ...filters,
                            budget: p.id as FilterState['budget'],
                          })
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-center ${
                          (filters.budget || 'all') === p.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size selection */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Apparel Size
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onFilterChange({ ...filters, size: 'all' })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                        !filters.size || filters.size === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => onFilterChange({ ...filters, size: s })}
                        className={`w-10 h-10 rounded-xl text-xs font-bold flex items-center justify-center ${
                          filters.size === s
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles: In Stock Only & Sustainability */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-gray-800">In Stock Items Only</span>
                    <input
                      type="checkbox"
                      checked={filters.stockOnly || false}
                      onChange={(e) =>
                        onFilterChange({ ...filters, stockOnly: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-gray-800">🌱 Sustainable Materials Only</span>
                    <input
                      type="checkbox"
                      checked={filters.sustainableOnly || false}
                      onChange={(e) =>
                        onFilterChange({ ...filters, sustainableOnly: e.target.checked })
                      }
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 sticky bottom-0">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterDrawerOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
              >
                Apply ({filteredCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
