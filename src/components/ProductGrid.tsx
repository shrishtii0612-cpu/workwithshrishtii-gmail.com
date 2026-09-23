import React from 'react';
import { Product, Size } from '../types';
import { ProductCard } from './ProductCard';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: Size) => void;
  wishlist?: string[];
  onToggleWishlist?: (productId: string) => void;
  onResetFilters?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onQuickAddToCart,
  wishlist = [],
  onToggleWishlist,
  onResetFilters,
  emptyTitle = 'No products found',
  emptyMessage = "We couldn't find any merchandise matching your selected filters.",
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{emptyTitle}</h3>
        <p className="text-sm text-gray-500 mb-6">{emptyMessage}</p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
          onQuickAddToCart={onQuickAddToCart}
          isWishlisted={wishlist.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
};
