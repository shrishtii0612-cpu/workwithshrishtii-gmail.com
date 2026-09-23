import React from 'react';
import { AlertTriangle, RefreshCw, CreditCard, ShieldCheck } from 'lucide-react';

interface PaymentErrorProps {
  onRetry: () => void;
  onChangePaymentMethod: () => void;
  errorMessage?: string;
}

export const PaymentError: React.FC<PaymentErrorProps> = ({
  onRetry,
  onChangePaymentMethod,
  errorMessage = 'The banking network could not process the authorization transaction. No funds were debited.',
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-red-200 shadow-lg text-center space-y-5">
        {/* Error Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-2xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Payment didn&apos;t go through.
          </h2>
          <p className="text-sm font-semibold text-emerald-700 mt-1 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Your order and delivery information is completely safe.</span>
          </p>
          <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
            {errorMessage}
          </p>
        </div>

        {/* Action Buttons: Try Again vs Change Payment Method */}
        <div className="pt-3 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3.5 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 min-h-[48px]"
            id="payment-error-retry-btn"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onChangePaymentMethod}
            className="flex-1 py-3.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl text-sm transition-all flex items-center justify-center space-x-2 min-h-[48px]"
            id="payment-error-change-method-btn"
          >
            <CreditCard className="w-4 h-4" />
            <span>Change Payment Method</span>
          </button>
        </div>

        <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-100">
          Need immediate support? Contact Google Merchandise customer care or try Google Pay 1-tap checkout.
        </div>
      </div>
    </div>
  );
};
