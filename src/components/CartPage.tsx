import React, { useState } from 'react';
import { Trash2, ArrowRight, ShieldCheck, Truck, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { CartItem, Country, NavigationPage, Product, Size } from '../types';
import { ProductCard } from './ProductCard';

interface CartPageProps {
  items: CartItem[];
  selectedCountry: Country;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: Size) => void;
  recommendedProducts: Product[];
  discountCode: string;
  onApplyDiscountCode: (code: string) => { success: boolean; discountAmount: number; message: string };
  discountAmount: number;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  selectedCountry,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onSelectProduct,
  onQuickAddToCart,
  recommendedProducts,
  discountCode,
  onApplyDiscountCode,
  discountAmount,
}) => {
  const [promoInput, setPromoInput] = useState(discountCode || '');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= selectedCountry.freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : selectedCountry.shippingCost;
  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  const freeShippingDifference = selectedCountry.freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / selectedCountry.freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = onApplyDiscountCode(promoInput.trim());
    setPromoMessage({
      text: result.message,
      isError: !result.success,
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 shadow-2xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Your basket is empty.
        </h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto mb-8">
          Find something you&apos;ll love from our official Google, Android, and Gemini collections.
        </p>
        <button
          onClick={() => onNavigate('shop_all')}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-full text-sm shadow-md transition-all inline-flex items-center space-x-2"
          id="cart-empty-shop-now-btn"
        >
          <span>CONTINUE SHOPPING</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Recommended Fallback Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 text-left border-t border-gray-100 pt-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular picks to get started:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {recommendedProducts.slice(0, 3).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  onQuickAddToCart={onQuickAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
          Shopping Basket ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h1>

        {/* Free Shipping Progress Indicator (Eliminates hidden shipping surprises) */}
        <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center space-x-1.5 text-gray-800">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>
                {isFreeShipping ? (
                  <strong className="text-emerald-700">Congratulations! You qualify for Free Tracked Shipping to {selectedCountry.name}.</strong>
                ) : (
                  <span>
                    Add <strong>${freeShippingDifference.toFixed(2)}</strong> more to get <strong>FREE SHIPPING</strong> to {selectedCountry.name}
                  </span>
                )}
              </span>
            </span>
            <span className="text-gray-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-emerald-600' : 'bg-blue-600'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Cart Items List */}
          <div className="lg:col-span-8 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex items-center justify-between gap-4"
              >
                {/* Image */}
                <div
                  onClick={() => onSelectProduct(item.product)}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 cursor-pointer border border-gray-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                      {item.product.brand}
                    </span>
                    <span className="text-[11px] text-gray-500">• Size {item.selectedSize}</span>
                    {item.selectedColour && item.selectedColour !== 'Default' && (
                      <span className="text-[11px] text-gray-500 hidden sm:inline">• {item.selectedColour}</span>
                    )}
                  </div>

                  <h3
                    onClick={() => onSelectProduct(item.product)}
                    className="text-xs sm:text-sm font-bold text-gray-900 truncate hover:text-blue-600 cursor-pointer"
                  >
                    {item.product.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm sm:text-base font-extrabold text-gray-900">
                      ${item.product.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 text-xs font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-gray-900 min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 text-xs font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigate('shop_all')}
                className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center space-x-1"
              >
                <span>← Continue Shopping</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Transparent Order Summary & Checkout Trigger */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight border-b border-gray-100 pb-3">
                Order Summary
              </h2>

              {/* Delivery destination transparency */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/60 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-gray-800">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Delivering to:</span>
                  </span>
                  <span>{selectedCountry.flag} {selectedCountry.name}</span>
                </div>
                <div className="text-[11px] text-gray-500 flex justify-between">
                  <span>Estimated delivery:</span>
                  <span className="font-medium text-gray-700">{selectedCountry.estimatedDays}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. GOOGLE10)"
                      className="w-full pl-8 pr-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] font-medium ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping ({selectedCountry.name})</span>
                  <span>
                    {isFreeShipping ? (
                      <strong className="text-emerald-700">FREE</strong>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-base font-extrabold text-gray-900">
                  <span>Estimated Total</span>
                  <span className="text-xl text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* PRIMARY PROMINENT CTA */}
              <button
                onClick={() => onNavigate('checkout_delivery')}
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl text-base transition-all shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 min-h-[52px]"
                id="cart-proceed-checkout-btn"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                <span>SSL Encrypted • Fast 3-Step Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* 
          Recommendations Section:
          Prompt: "Add: 'You might also like' - Only 3 products. Do not distract the customer from checkout."
        */}
        {recommendedProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-gray-200/80">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">You might also like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl">
              {recommendedProducts.slice(0, 3).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  onQuickAddToCart={onQuickAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
