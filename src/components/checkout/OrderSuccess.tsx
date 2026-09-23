import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Download, Share2 } from 'lucide-react';
import { Order } from '../../types';

interface OrderSuccessProps {
  order: Order;
  onContinueShopping: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ order, onContinueShopping }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-md space-y-6">
        {/* Celebration & Checkmark */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider">
            Payment Authorized
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            We&apos;ve sent an order confirmation and tracking link to{' '}
            <strong className="text-gray-800">{order.deliveryDetails.email}</strong>.
          </p>
        </div>

        {/* Order Details Highlight Bar */}
        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
              Order Number
            </span>
            <span className="text-sm font-mono font-bold text-blue-700">{order.id}</span>
          </div>

          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
              Estimated Delivery
            </span>
            <span className="text-sm font-bold text-gray-900 flex items-center space-x-1">
              <Truck className="w-4 h-4 text-blue-600 inline" />
              <span>{order.estimatedDelivery}</span>
            </span>
          </div>

          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
              Total Charged
            </span>
            <span className="text-sm font-extrabold text-emerald-700">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delivery Address Summary */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-xs">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center space-x-1.5">
            <Package className="w-4 h-4 text-gray-600" />
            <span>Shipping To</span>
          </h4>
          <p className="text-gray-700">{order.deliveryDetails.fullName}</p>
          <p className="text-gray-600">{order.deliveryDetails.address}</p>
          <p className="text-gray-600">
            {order.deliveryDetails.city}, {order.deliveryDetails.state} {order.deliveryDetails.postalCode}
          </p>
          <p className="text-gray-500 mt-1">Country: {order.deliveryDetails.countryCode}</p>
        </div>

        {/* Products Purchased List */}
        <div>
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Items in this order ({order.items.reduce((s, i) => s + i.quantity, 0)})
          </h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 line-clamp-1">{item.product.name}</h5>
                    <p className="text-[11px] text-gray-500">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onContinueShopping}
            className="flex-1 py-3.5 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 min-h-[48px]"
            id="order-success-continue-shopping-btn"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
