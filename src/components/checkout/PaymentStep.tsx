import React, { useState } from 'react';
import { CreditCard, Smartphone, ShieldCheck, ArrowRight, ArrowLeft, Check, Lock } from 'lucide-react';
import { DeliveryDetails, PaymentDetails, PaymentType } from '../../types';

interface PaymentStepProps {
  initialPayment: PaymentDetails;
  deliveryDetails: DeliveryDetails;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  onSubmitPayment: (payment: PaymentDetails) => void;
  onBackToDelivery: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  initialPayment,
  deliveryDetails,
  subtotal,
  shippingCost,
  discountAmount,
  onSubmitPayment,
  onBackToDelivery,
}) => {
  const [paymentType, setPaymentType] = useState<PaymentType>(initialPayment.type || 'gpay_upi');
  const [upiId, setUpiId] = useState(initialPayment.upiId || 'alex@okhdfcbank');
  const [cardNumber, setCardNumber] = useState(initialPayment.cardNumber || '•••• •••• •••• 4242');
  const [cardName, setCardName] = useState(initialPayment.cardName || deliveryDetails.fullName || 'Alex Henderson');
  const [cardExpiry, setCardExpiry] = useState(initialPayment.cardExpiry || '08/28');
  const [cardCvc, setCardCvc] = useState(initialPayment.cardCvc || '884');

  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitPayment({
      type: paymentType,
      upiId: paymentType === 'gpay_upi' ? upiId : undefined,
      cardNumber: paymentType === 'card' ? cardNumber : undefined,
      cardName: paymentType === 'card' ? cardName : undefined,
      cardExpiry: paymentType === 'card' ? cardExpiry : undefined,
      cardCvc: paymentType === 'card' ? cardCvc : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
              2. Select Payment Method
            </h2>
            <p className="text-xs text-gray-500">
              Zero transaction fees. Instant 256-bit encrypted checkout.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure</span>
          </div>
        </div>

        {/* 
          CRITICAL UX FIX FOR GA4 58.2% DROP OFF:
          Large, immediately selectable payment cards without searching or nested menus!
        */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Choose how to pay:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Option 1: Google Pay & UPI (Fast mobile native 1-tap) */}
            <div
              onClick={() => setPaymentType('gpay_upi')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                paymentType === 'gpay_upi'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-600/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              id="payment-method-gpay"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-2xs">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentType === 'gpay_upi' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}
                >
                  {paymentType === 'gpay_upi' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-extrabold text-gray-900">Google Pay / UPI</div>
                <div className="text-[11px] text-gray-500">1-Tap Fast Mobile Pay</div>
              </div>
            </div>

            {/* Option 2: Credit / Debit Card */}
            <div
              onClick={() => setPaymentType('card')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                paymentType === 'card'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-600/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              id="payment-method-card"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-2xs">
                  <CreditCard className="w-5 h-5 text-gray-800" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentType === 'card' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}
                >
                  {paymentType === 'card' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-extrabold text-gray-900">Credit / Debit Card</div>
                <div className="text-[11px] text-gray-500">Visa, Mastercard, Amex</div>
              </div>
            </div>

            {/* Option 3: PayPal / Net Banking */}
            <div
              onClick={() => setPaymentType('paypal')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                paymentType === 'paypal'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-600/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              id="payment-method-paypal"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-black flex items-center justify-center text-sm shadow-2xs">
                  P
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentType === 'paypal' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}
                >
                  {paymentType === 'paypal' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-extrabold text-gray-900">PayPal / Wallet</div>
                <div className="text-[11px] text-gray-500">Buyer Protection included</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Detail input based on selected method */}
        <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80">
          {paymentType === 'gpay_upi' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs text-blue-700 font-semibold">
                <span>⚡ Instant Android &amp; Google Pay Verification</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Google Pay / UPI ID / Mobile Number
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank or phone number"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]"
                  id="payment-upi-input"
                />
              </div>
              <p className="text-[11px] text-gray-500">
                A verification prompt will appear directly on your Google Pay or UPI mobile application.
              </p>
            </div>
          )}

          {paymentType === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 •••• •••• 4242"
                  className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]"
                  id="payment-card-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Expires (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="08/28"
                    className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="884"
                    className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[46px]"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentType === 'paypal' && (
            <div className="space-y-2 text-xs text-gray-600">
              <p className="font-semibold text-gray-800">
                You will be redirected securely to PayPal to confirm payment for ${total.toFixed(2)}.
              </p>
              <p className="text-[11px] text-gray-500">
                After authorization, you will return directly to review and finalize your order.
              </p>
            </div>
          )}
        </div>

        {/* 
          MANDATORY PROMPT REQUIREMENT:
          "Always display: Subtotal, Shipping, Discount, TOTAL.
          The final amount must be visible before payment."
        */}
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
              <span>Promo Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-base font-extrabold text-gray-900">
            <span>TOTAL TO PAY</span>
            <span className="text-xl text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBackToDelivery}
            className="sm:w-1/3 py-3 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1.5"
            id="payment-back-delivery-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Delivery</span>
          </button>

          <button
            type="submit"
            className="sm:w-2/3 py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl text-base transition-all shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 min-h-[52px]"
            id="payment-continue-review-btn"
          >
            <span>CONTINUE TO REVIEW</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
