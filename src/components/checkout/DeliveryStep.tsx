import React, { useState } from 'react';
import { Truck, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';
import { CartItem, Country, DeliveryDetails } from '../../types';
import { COUNTRIES } from '../../data/countries';

interface DeliveryStepProps {
  initialDetails: DeliveryDetails;
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  onSubmitDelivery: (details: DeliveryDetails) => void;
  onBackToCart: () => void;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({
  initialDetails,
  selectedCountry,
  onSelectCountry,
  cartItems,
  subtotal,
  discountAmount,
  onSubmitDelivery,
  onBackToCart,
}) => {
  const [details, setDetails] = useState<DeliveryDetails>({
    ...initialDetails,
    countryCode: selectedCountry.code,
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const isFreeShipping = subtotal >= selectedCountry.freeShippingThreshold;
  const standardCost = isFreeShipping ? 0 : selectedCountry.shippingCost;
  const expressCost = selectedCountry.expressShippingCost;
  const currentShippingCost = shippingMethod === 'standard' ? standardCost : expressCost;
  const total = Math.max(0, subtotal + currentShippingCost - discountAmount);

  const handleCountryChange = (code: string) => {
    const found = COUNTRIES.find((c) => c.code === code);
    if (found) {
      onSelectCountry(found);
      setDetails((prev) => ({ ...prev, countryCode: code }));
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!details.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!details.email.trim() || !details.email.includes('@')) errors.email = 'Valid email is required for tracking';
    if (!details.phone.trim()) errors.phone = 'Phone number is required for delivery SMS updates';
    if (!details.address.trim()) errors.address = 'Street address is required';
    if (!details.city.trim()) errors.city = 'City is required';
    if (!details.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmitDelivery({ ...details, shippingMethod });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
              1. Delivery Address
            </h2>
            <p className="text-xs text-gray-500">
              Direct shipping to your doorstep with end-to-end Google tracking
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted</span>
          </span>
        </div>

        {/* Form Fields - strictly mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={details.fullName}
              onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
              placeholder="e.g. Alex Henderson"
              className={`w-full px-4 py-3 text-sm rounded-xl border ${
                formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              } focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]`}
              id="delivery-fullname-input"
            />
            {formErrors.fullName && <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Email (for order tracking) *
            </label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              placeholder="alex@example.com"
              className={`w-full px-4 py-3 text-sm rounded-xl border ${
                formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              } focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]`}
              id="delivery-email-input"
            />
            {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Phone Number (for courier SMS) *
            </label>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className={`w-full px-4 py-3 text-sm rounded-xl border ${
                formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              } focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]`}
              id="delivery-phone-input"
            />
            {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
          </div>

          {/* Country Selection */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Country / Destination *
            </label>
            <div className="relative">
              <select
                value={selectedCountry.code}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-4 py-3 text-sm font-semibold rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-h-[46px]"
                id="delivery-country-select"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.estimatedDays})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Street Address */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Street Address *
            </label>
            <input
              type="text"
              autoComplete="street-address"
              value={details.address}
              onChange={(e) => setDetails({ ...details, address: e.target.value })}
              placeholder="1600 Amphitheatre Pkwy or Apt/Suite"
              className={`w-full px-4 py-3 text-sm rounded-xl border ${
                formErrors.address ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              } focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]`}
              id="delivery-address-input"
            />
            {formErrors.address && <p className="text-xs text-red-600 mt-1">{formErrors.address}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              City *
            </label>
            <input
              type="text"
              autoComplete="address-level2"
              value={details.city}
              onChange={(e) => setDetails({ ...details, city: e.target.value })}
              placeholder="Mountain View"
              className={`w-full px-4 py-3 text-sm rounded-xl border ${
                formErrors.city ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              } focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]`}
              id="delivery-city-input"
            />
            {formErrors.city && <p className="text-xs text-red-600 mt-1">{formErrors.city}</p>}
          </div>

          {/* State / Province */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              State / Province
            </label>
            <input
              type="text"
              autoComplete="address-level1"
              value={details.state}
              onChange={(e) => setDetails({ ...details, state: e.target.value })}
              placeholder="California"
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]"
              id="delivery-state-input"
            />
          </div>

          {/* Postal Code with numeric keyboard mode on mobile */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Postal / ZIP Code *
            </label>
            <input
              type="text"
              inputMode="text"
              autoComplete="postal-code"
              value={details.postalCode}
              onChange={(e) => setDetails({ ...details, postalCode: e.target.value })}
              placeholder="94043"
              className={`w-full sm:w-1/2 px-4 py-3 text-sm rounded-xl border ${
                formErrors.postalCode ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              } focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]`}
              id="delivery-postal-input"
            />
            {formErrors.postalCode && <p className="text-xs text-red-600 mt-1">{formErrors.postalCode}</p>}
          </div>
        </div>

        {/* Shipping Method Options */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
            Choose Delivery Speed
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Standard Speed */}
            <div
              onClick={() => setShippingMethod('standard')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                shippingMethod === 'standard'
                  ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    shippingMethod === 'standard' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}
                >
                  {shippingMethod === 'standard' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Standard Delivery</div>
                  <div className="text-[11px] text-gray-500">{selectedCountry.estimatedDays}</div>
                </div>
              </div>
              <div className="text-xs font-extrabold text-gray-900">
                {isFreeShipping ? <span className="text-emerald-700 font-bold">FREE</span> : `$${standardCost.toFixed(2)}`}
              </div>
            </div>

            {/* Express Speed */}
            <div
              onClick={() => setShippingMethod('express')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                shippingMethod === 'express'
                  ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    shippingMethod === 'express' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}
                >
                  {shippingMethod === 'express' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Priority Express</div>
                  <div className="text-[11px] text-gray-500">{selectedCountry.expressDays}</div>
                </div>
              </div>
              <div className="text-xs font-extrabold text-gray-900">
                ${expressCost.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* 
          CRITICAL TRANSPARENCY REQUIREMENT FROM PROMPT:
          "Show: Shipping cost, Estimated delivery, Order total BEFORE continuing."
        */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Items Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping ({shippingMethod === 'standard' ? 'Standard' : 'Express'})</span>
            <span>
              {currentShippingCost === 0 ? (
                <strong className="text-emerald-700">FREE</strong>
              ) : (
                `$${currentShippingCost.toFixed(2)}`
              )}
            </span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Applied Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-sm sm:text-base font-extrabold text-gray-900">
            <span>Total with Delivery</span>
            <span className="text-lg text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl text-base transition-all shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 min-h-[52px]"
            id="delivery-continue-payment-btn"
          >
            <span>CONTINUE TO PAYMENT</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
