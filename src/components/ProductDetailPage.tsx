import React, { useState } from 'react';
import {
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ShoppingBag,
  Heart,
  Globe,
  ChevronRight,
  ZoomIn,
  Leaf,
  ArrowLeft,
} from 'lucide-react';
import { Country, Product, Size } from '../types';
import { COUNTRIES } from '../data/countries';

interface ProductDetailPageProps {
  product: Product;
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  onAddToCart: (product: Product, size: Size, colour: string, quantity: number) => void;
  onBack: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  selectedCountry,
  onSelectCountry,
  onAddToCart,
  onBack,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0] || 'M');
  const [selectedColour, setSelectedColour] = useState<string>(product.colours[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleAddToCart = () => {
    if (product.stock === 'out_of_stock') return;
    onAddToCart(product, selectedSize, selectedColour, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const isFreeShippingEligible = product.price * quantity >= selectedCountry.freeShippingThreshold;

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-16">
      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          id="pdp-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery & Mobile Carousel */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-2xs group">
              <img
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Zoom pill indicator */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-gray-700 hover:bg-white text-xs flex items-center space-x-1"
                aria-label="Toggle Image Zoom"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="text-[11px] font-semibold pr-1">
                  {isZoomed ? 'Reset' : 'Zoom'}
                </span>
              </button>

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-xs border border-gray-200/50">
                  {product.brand}
                </span>
                {product.onSale && (
                  <span className="bg-[#EA4335] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-xs">
                    SALE
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600'
                      : 'bg-white/85 text-gray-500 hover:text-red-500 hover:bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>

            {/* Thumbnail selector gallery */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-blue-600 shadow-sm'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information & Purchasing Flow */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Reviews & Stock Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-1.5 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviewsCount} verified reviews)</span>
                </div>

                {/* Stock status - NEVER HIDDEN as per requirements */}
                {product.stock === 'in_stock' && (
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>In Stock</span>
                  </span>
                )}
                {product.stock === 'low_stock' && (
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                    <span>Only a few left</span>
                  </span>
                )}
                {product.stock === 'out_of_stock' && (
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    <span>Out of Stock</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Colour selection */}
            {product.colours && product.colours.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Colour: <span className="text-blue-600 font-semibold">{selectedColour}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colours.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColour(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedColour === c
                          ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-2xs'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection with large tap buttons XS - XL */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Select Size
                </label>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {(['XS', 'S', 'M', 'L', 'XL'] as Size[]).map((s) => {
                  const isAvailable = product.sizes.includes(s);
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center min-h-[48px] ${
                        !isAvailable
                          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-gray-900 text-white shadow-md ring-2 ring-gray-900 ring-offset-2'
                          : 'bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-500 hover:bg-blue-50/30'
                      }`}
                      id={`pdp-size-${s}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm min-w-[36px]"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm min-w-[36px]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Desktop Add to Basket CTA */}
            <div className="hidden lg:block pt-2">
              <button
                disabled={product.stock === 'out_of_stock'}
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-2xl text-base font-bold transition-all shadow-lg flex items-center justify-center space-x-2.5 min-h-[54px] ${
                  product.stock === 'out_of_stock'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : addedAnimation
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/25'
                }`}
                id="pdp-desktop-add-basket-btn"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD TO BASKET — ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Delivery & Country Transparency Card */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-800">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Deliver to:</span>
                </div>

                {/* Country dropdown button */}
                <div className="relative">
                  <button
                    onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-800 hover:border-blue-500 shadow-2xs"
                    id="pdp-country-picker-btn"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span>{selectedCountry.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {countryPickerOpen && (
                    <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-30">
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            onSelectCountry(c);
                            setCountryPickerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-blue-50 ${
                            c.code === selectedCountry.code ? 'font-bold text-blue-600 bg-blue-50/50' : ''
                          }`}
                        >
                          <span className="flex items-center space-x-2">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </span>
                          <span className="text-[11px] text-gray-500">${c.shippingCost}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500 block text-[11px]">Estimated delivery:</span>
                  <strong className="text-gray-900">{selectedCountry.estimatedDays}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">Standard Shipping:</span>
                  <strong className="text-gray-900">
                    {isFreeShippingEligible ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      `$${selectedCountry.shippingCost.toFixed(2)}`
                    )}
                  </strong>
                </div>
              </div>

              {/* Reassurance perks */}
              <div className="pt-2 border-t border-gray-200/60 space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Easy 30-Day Returns:</strong> Free drop-off at official partner hubs.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>
                    <strong>100% Authentic Google Gear:</strong> Directly from Mountain View.
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Materials Accordions */}
            <div className="space-y-3 pt-2 text-xs leading-relaxed text-gray-600">
              <div>
                <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Product Details
                </h4>
                <p>{product.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Materials & Craftsmanship
                </h4>
                <p>{product.materials}</p>
              </div>

              {product.sustainability && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-2 text-emerald-800">
                  <Leaf className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <strong className="block text-emerald-900 font-semibold">
                      Sustainability Impact
                    </strong>
                    <span>{product.sustainability}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 
        CRITICAL CONVERSION FEATURE REQUIRED BY PROMPT:
        "On mobile create a STICKY BOTTOM ADD TO BASKET BAR:
        -------------------------------------
        $XX.XX | Size       ADD TO BASKET
        -------------------------------------
        This button should remain visible while the user scrolls."
      */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 lg:hidden shadow-2xl safe-area-bottom">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="leading-tight">
            <div className="text-base font-extrabold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </div>
            <div className="text-[11px] text-gray-500 font-medium flex items-center space-x-1">
              <span>Size: {selectedSize}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">In Stock</span>
            </div>
          </div>

          <button
            disabled={product.stock === 'out_of_stock'}
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 min-h-[48px] ${
              product.stock === 'out_of_stock'
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 active:bg-blue-700 text-white shadow-blue-500/20'
            }`}
            id="pdp-sticky-mobile-add-btn"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BASKET</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
