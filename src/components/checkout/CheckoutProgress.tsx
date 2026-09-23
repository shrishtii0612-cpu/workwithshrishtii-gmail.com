import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: 'delivery' | 'payment' | 'review';
  onNavigateStep?: (step: 'delivery' | 'payment' | 'review') => void;
}

export const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep, onNavigateStep }) => {
  const steps: { id: 'delivery' | 'payment' | 'review'; label: string; number: number }[] = [
    { id: 'delivery', label: 'DELIVERY', number: 1 },
    { id: 'payment', label: 'PAYMENT', number: 2 },
    { id: 'review', label: 'REVIEW', number: 3 },
  ];

  const getStepStatus = (stepId: 'delivery' | 'payment' | 'review') => {
    if (stepId === currentStep) return 'current';
    if (stepId === 'delivery' && (currentStep === 'payment' || currentStep === 'review')) return 'completed';
    if (stepId === 'payment' && currentStep === 'review') return 'completed';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between relative">
        {/* Connector Line behind steps */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-gray-200 -z-0" />

        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          return (
            <button
              key={step.id}
              disabled={status === 'upcoming'}
              onClick={() => onNavigateStep && isCompleted && onNavigateStep(step.id)}
              className={`relative z-10 flex flex-col items-center group focus:outline-hidden ${
                isCompleted ? 'cursor-pointer' : 'cursor-default'
              }`}
              id={`checkout-step-indicator-${step.id}`}
            >
              {/* Step Circle */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step.number}
              </div>

              {/* Step Label */}
              <span
                className={`text-[11px] sm:text-xs font-bold tracking-wider mt-1.5 transition-colors ${
                  isCurrent
                    ? 'text-blue-600'
                    : isCompleted
                    ? 'text-gray-800 group-hover:text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
