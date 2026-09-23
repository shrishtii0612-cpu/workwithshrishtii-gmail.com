import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onPerformSearch: (query: string) => void;
  allProducts: Product[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onPerformSearch,
  allProducts,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    'Google hoodie',
    'Android',
    'YouTube',
    'Gemini',
    'T-shirts',
    'Bags',
    'Gifts',
    'Sustainable',
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPreview = query.trim()
    ? allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onPerformSearch(query);
    onClose();
  };

  const handleSuggestionClick = (sug: string) => {
    setQuery(sug);
    onPerformSearch(sug);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-white border-b border-gray-200 shadow-2xl w-full max-w-3xl mx-auto rounded-b-3xl overflow-hidden mt-0 sm:mt-10 animate-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-6 h-6 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full text-base sm:text-lg font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden bg-transparent"
            id="global-search-input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl"
          >
            Esc
          </button>
        </form>

        {/* Content Area */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {/* If query has matches */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Direct Product Matches</span>
                <span>{filteredPreview.length} found</span>
              </div>

              {filteredPreview.length > 0 ? (
                <div className="space-y-2">
                  {filteredPreview.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-colors group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {product.brand}
                          </span>
                          <span className="text-xs font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600">
                          {product.name}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}

                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <span>View all search results for &quot;{query}&quot;</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p className="text-sm font-semibold text-gray-800">No products found for &quot;{query}&quot;</p>
                  <p className="text-xs text-gray-500 mt-1">Try checking for typos or browse our suggested topics below.</p>
                </div>
              )}
            </div>
          ) : (
            /* Suggestions when input is empty */
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSuggestionClick(item)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Quick Assistant Callout in Search */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Need personal recommendations?</h5>
                    <p className="text-[11px] text-gray-600">Tell our AI shopping assistant your budget or favorite tech</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
