import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, Size } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: Size) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [sizePickerOpen, setSizePickerOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent, size: Size) => {
    e.stopPropagation();
    onQuickAddToCart(product, size);
    setSizePickerOpen(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1600);
  };

  const handleTriggerSizePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock === 'out_of_stock') return;
    // If only one size available (like M for mug or L for bag), add directly
    if (product.sizes.length === 1) {
      handleQuickAdd(e, product.sizes[0]);
    } else {
      setSizePickerOpen(true);
    }
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-gray-200/80 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Top Media Area */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.onSale && (
            <span className="bg-[#EA4335] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#1A73E8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              New
            </span>
          )}
          {product.stock === 'low_stock' && (
            <span className="bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Low Stock
            </span>
          )}
          {product.stock === 'out_of_stock' && (
            <span className="bg-gray-700 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-xs z-10 ${
              isWishlisted
                ? 'bg-red-50 text-red-600'
                : 'bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Brand Tag Pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-700 border border-gray-200/60 shadow-2xs">
          {product.brand}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-1.5 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-gray-800 text-[11px] sm:text-xs">{product.rating}</span>
            <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Sustainability note if present */}
          {product.sustainability && (
            <p className="text-[10px] text-emerald-700 font-medium mt-1 truncate">
              🌱 {product.sustainability.split('•')[0]}
            </p>
          )}
        </div>

        {/* Price and Add to Basket Area */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm sm:text-base font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Basket Button */}
          {product.stock === 'out_of_stock' ? (
            <span className="text-[11px] font-medium text-gray-400 py-1.5 px-2 bg-gray-100 rounded-lg">
              Out of stock
            </span>
          ) : (
            <button
              onClick={handleTriggerSizePicker}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl font-semibold text-xs transition-all flex items-center space-x-1.5 min-h-[36px] ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white active:scale-95'
              }`}
              aria-label={`Add ${product.name} to basket`}
              id={`quick-add-${product.id}`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Quick Size Selection Drawer Popover */}
      {sizePickerOpen && (
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-xs p-4 flex flex-col justify-center items-center z-20 animate-in fade-in duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs font-bold text-gray-800 mb-2">Select Size to Add:</div>
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={(e) => handleQuickAdd(e, s)}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 font-bold text-xs text-gray-800 active:scale-95 transition-all flex items-center justify-center"
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSizePickerOpen(false);
            }}
            className="mt-3 text-[11px] text-gray-500 underline hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
