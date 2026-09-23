import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Smartphone, ArrowRight, Edit2, Lock, AlertCircle } from 'lucide-react';
import { CartItem, Country, DeliveryDetails, PaymentDetails } from '../../types';

interface ReviewStepProps {
  cartItems: CartItem[];
  deliveryDetails: DeliveryDetails;
  paymentDetails: PaymentDetails;
  selectedCountry: Country;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  discountCode?: string;
  onEditDelivery: () => void;
  onEditPayment: () => void;
  onConfirmOrder: (simulateFailure?: boolean) => void;
  isProcessing: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  cartItems,
  deliveryDetails,
  paymentDetails,
  selectedCountry,
  subtotal,
  shippingCost,
  discountAmount,
  discountCode,
  onEditDelivery,
  onEditPayment,
  onConfirmOrder,
  isProcessing,
}) => {
  const [simulateFailure, setSimulateFailure] = useState(false);
  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  const getPaymentSummary = () => {
    if (paymentDetails.type === 'gpay_upi') {
      return {
        title: 'Google Pay / UPI',
        detail: paymentDetails.upiId || 'Verified Mobile UPI',
        icon: Smartphone,
      };
    }
    if (paymentDetails.type === 'paypal') {
      return {
        title: 'PayPal Express',
        detail: 'Connected Account',
        icon: ShieldCheck,
      };
    }
    return {
      title: 'Credit / Debit Card',
      detail: paymentDetails.cardNumber || '•••• •••• •••• 4242',
      icon: CreditCard,
    };
  };

  const paymentMeta = getPaymentSummary();
  const PaymentIcon = paymentMeta.icon;

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
              3. Review &amp; Confirm Order
            </h2>
            <p className="text-xs text-gray-500">
              Please double check your shipping and payment details before finalizing.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
            Step 3 of 3
          </span>
        </div>

        {/* Section: Delivery Details (with Edit button) */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-900">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>DELIVERY ADDRESS &amp; SPEED</span>
            </div>
            <button
              onClick={onEditDelivery}
              className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800"
              id="review-edit-delivery-btn"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="text-xs text-gray-700 space-y-0.5">
            <p className="font-bold text-gray-900">{deliveryDetails.fullName}</p>
            <p>{deliveryDetails.address}</p>
            <p>
              {deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.postalCode}
            </p>
            <p className="font-medium text-gray-600">
              {selectedCountry.flag} {selectedCountry.name} • {deliveryDetails.phone}
            </p>
            <div className="pt-2 text-[11px] text-blue-700 font-semibold">
              Speed: {deliveryDetails.shippingMethod === 'express' ? 'Priority Express' : 'Standard Delivery'} ({selectedCountry.estimatedDays})
            </div>
          </div>
        </div>

        {/* Section: Payment Method (with Edit button) */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-900">
              <PaymentIcon className="w-4 h-4 text-blue-600" />
              <span>PAYMENT METHOD</span>
            </div>
            <button
              onClick={onEditPayment}
              className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800"
              id="review-edit-payment-btn"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="text-xs text-gray-700">
            <p className="font-bold text-gray-900">{paymentMeta.title}</p>
            <p className="text-gray-500 font-mono text-[11px]">{paymentMeta.detail}</p>
          </div>
        </div>

        {/* Section: Items Ordered list */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Items in Order ({cartItems.reduce((s, i) => s + i.quantity, 0)})
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-white"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-50 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[10px] text-gray-500">
                      Qty: {item.quantity} • Size: {item.selectedSize}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-900 shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total calculation breakdown */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>
              {shippingCost === 0 ? (
                <strong className="text-emerald-700">FREE</strong>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Discount ({discountCode || 'PROMO'})</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-base font-extrabold text-gray-900">
            <span>TOTAL CHARGED</span>
            <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* UX Testing Switch: Simulate Payment Failure (Section 16 requirement) */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-amber-900 font-medium">
              UX Test: Simulate payment gateway rejection
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        {/* PRIMARY CTA: PAY NOW */}
        <button
          disabled={isProcessing}
          onClick={() => onConfirmOrder(simulateFailure)}
          className={`w-full py-4 px-6 rounded-2xl text-base font-extrabold transition-all shadow-lg flex items-center justify-center space-x-2 min-h-[54px] ${
            isProcessing
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/25'
          }`}
          id="review-pay-now-btn"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Authorizing Payment...</span>
            </div>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>PAY NOW — ${total.toFixed(2)}</span>
            </>
          )}
        </button>

        <div className="text-center text-[11px] text-gray-400">
          By clicking Pay Now you agree to the Google Merchandise Store Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};
