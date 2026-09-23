import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Get 10% off your first order
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-6">
          Subscribe for early product drops, limited edition Google I/O merch releases, and exclusive seasonal codes.
        </p>

        {submitted ? (
          <div className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-sm font-semibold animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Success! Use promo code <span className="font-mono font-bold">GOOGLE10</span> at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 placeholder-gray-400 shadow-2xs min-h-[46px]"
                id="newsletter-email-input"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-full text-sm transition-all shadow-xs flex items-center justify-center space-x-1.5 min-h-[46px]"
              id="newsletter-submit-btn"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-400 mt-3">
          We respect your inbox. Unsubscribe anytime with a single click.
        </p>
      </div>
    </section>
  );
};
