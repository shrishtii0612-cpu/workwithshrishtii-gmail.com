import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { Product, Size } from '../types';
import { ProductCard } from './ProductCard';

interface SustainabilitySectionProps {
  sustainableProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: Size) => void;
  onViewAllSustainable: () => void;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  sustainableProducts,
  onSelectProduct,
  onQuickAddToCart,
  onViewAllSustainable,
}) => {
  return (
    <section className="py-10 sm:py-14 bg-emerald-50/40 border-t border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Eco-Conscious Merch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Sustainable Picks
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              100% GOTS organic cotton, recycled ocean plastics, and zero-plastic packaging
            </p>
          </div>

          <button
            onClick={onViewAllSustainable}
            className="mt-3 sm:mt-0 inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>View all sustainable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Display 3 sustainable products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {sustainableProducts.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickAddToCart={onQuickAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
