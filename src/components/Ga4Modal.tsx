import React, { useState, useEffect } from 'react';
import {
  X,
  BarChart3,
  CheckCircle2,
  TrendingDown,
  Lightbulb,
  Smartphone,
  Monitor,
  Globe2,
  Table,
  Activity,
  ArrowRight,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import {
  GA4_FUNNEL_STATS,
  GA4_DECISIONS_MATRIX,
  GA4_GEO_AUDIENCE,
  analytics,
} from '../services/analytics';
import { AnalyticsEvent } from '../types';

interface Ga4ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'funnel' | 'decisions' | 'problems' | 'solutions' | 'geo' | 'live';
}

export const Ga4Modal: React.FC<Ga4ModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'decisions',
}) => {
  const [activeTab, setActiveTab] = useState<'funnel' | 'decisions' | 'problems' | 'solutions' | 'geo' | 'live'>(initialTab);
  const [liveEvents, setLiveEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setLiveEvents(analytics.getRecentEvents());
    const unsubscribe = analytics.subscribe((event) => {
      setLiveEvents((prev) => [event, ...prev].slice(0, 30));
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight truncate">
                  GA4 Data &amp; Business Decision Framework
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600/30 text-blue-300 border border-blue-400/30">
                  Data-Driven Redesign
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">
                Google Merchandise Store — Funnel Friction, Behavior Analytics &amp; Strategic Solutions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors shrink-0"
            id="ga4-modal-close-btn"
            aria-label="Close analytics modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-4 sm:px-6 pt-2 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('decisions')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'decisions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Business Decisions Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('funnel')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'funnel'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Funnel Comparison</span>
          </button>

          <button
            onClick={() => setActiveTab('problems')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'problems'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Identified UX Drop-Offs</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'solutions'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Interventions Applied</span>
          </button>

          <button
            onClick={() => setActiveTab('geo')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'geo'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Audience &amp; Geo</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center space-x-1.5 ${
              activeTab === 'live'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live GA4 Stream</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-gray-800">
          {/* TAB 1: BUSINESS DECISIONS MATRIX */}
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-extrabold text-blue-950">
                    Direct Translation: GA4 Behavioral Data → Strategic Business Decisions
                  </h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Every major layout, payment, and interaction pattern in this prototype maps back to empirical user analytics.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0 shadow-xs">
                  6 Core Decisions
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {GA4_DECISIONS_MATRIX.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <h5 className="text-sm font-extrabold text-gray-900">
                          {item.ga4Finding}
                        </h5>
                      </div>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full self-start sm:self-auto">
                        {item.metricEvidence}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Column 1: Root cause */}
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="block font-bold text-gray-600 text-[10px] uppercase tracking-wider mb-1">
                          Behavioral Root Cause
                        </span>
                        <p className="text-gray-700 leading-relaxed">{item.rootCause}</p>
                      </div>

                      {/* Column 2: Business Decision & Implementation */}
                      <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                        <span className="block font-bold text-blue-900 text-[10px] uppercase tracking-wider mb-1">
                          Business &amp; UX Decision
                        </span>
                        <p className="text-blue-950 font-medium leading-relaxed">{item.businessDecision}</p>
                      </div>

                      {/* Column 3: Expected Outcome */}
                      <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="block font-bold text-emerald-900 text-[10px] uppercase tracking-wider mb-1 flex items-center space-x-1">
                          <Percent className="w-3 h-3 text-emerald-700" />
                          <span>Expected ROI / Target KPI</span>
                        </span>
                        <p className="text-emerald-900 font-semibold leading-relaxed">{item.expectedOutcome}</p>
                      </div>
                    </div>

                    <div className="pt-1 text-[11px] text-gray-500 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Prototype Implementation:</strong> {item.uxImplementation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FUNNEL COMPARISON */}
          {activeTab === 'funnel' && (
            <div className="space-y-6">
              {/* Traffic Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 flex items-center space-x-1">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop Baseline</span>
                    </span>
                    <div className="text-2xl font-extrabold text-blue-900 mt-1">3,099 users</div>
                    <span className="text-[11px] text-blue-700">Higher conversion baseline (81.3% payment transition)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center space-x-1">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile Audience</span>
                    </span>
                    <div className="text-2xl font-extrabold text-amber-900 mt-1">1,327 users</div>
                    <span className="text-[11px] text-amber-700">Severely hindered by friction (41.8% payment transition)</span>
                  </div>
                </div>
              </div>

              {/* Conversion Step-by-Step Funnel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Checkout Funnel: Desktop vs. Mobile Conversion Steps
                  </h4>
                  <span className="text-[11px] text-gray-500">Source: GA4 E-Commerce Exploration Report</span>
                </div>

                <div className="space-y-3">
                  {GA4_FUNNEL_STATS.map((step, idx) => {
                    const isSevereDrop = step.mobileDropOff > 50;
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isSevereDrop
                            ? 'border-red-300 bg-red-50/40 ring-2 ring-red-200'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                            <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span>{step.step}</span>
                            {isSevereDrop && (
                              <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-full ml-1">
                                CRITICAL: 58.2% Mobile Drop!
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500">
                            Desktop: <strong className="text-gray-900">{step.desktopRate}%</strong> vs Mobile:{' '}
                            <strong className={isSevereDrop ? 'text-red-600 font-extrabold' : 'text-gray-900'}>
                              {step.mobileRate}%
                            </strong>
                          </span>
                        </div>

                        {/* Dual Bar comparison */}
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center space-x-2">
                            <span className="w-16 text-gray-500 font-medium">Desktop</span>
                            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${step.desktopRate}%` }}
                              />
                            </div>
                            <span className="w-10 text-right font-bold text-gray-700">{step.desktopRate}%</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="w-16 text-gray-500 font-medium">Mobile</span>
                            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isSevereDrop ? 'bg-red-600' : 'bg-amber-500'}`}
                                style={{ width: `${step.mobileRate}%` }}
                              />
                            </div>
                            <span className={`w-10 text-right font-bold ${isSevereDrop ? 'text-red-600' : 'text-gray-700'}`}>
                              {step.mobileRate}%
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-[11px] text-gray-600 bg-white/70 p-2 rounded-xl border border-gray-100">
                          <strong>UX Diagnostic:</strong> {step.interpretation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IDENTIFIED UX PROBLEMS */}
          {activeTab === 'problems' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-red-900">
                    1. 58.2% Mobile Cliff: Delivery → Payment
                  </h4>
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    Highest Leak
                  </span>
                </div>
                <p className="text-xs text-red-800 leading-relaxed">
                  371 mobile users entered full address details, but only 155 proceeded to payment. In the legacy store, payment forms were buried in collapsed accordion sections, credit card inputs lacked numeric keypads, and users were uncertain if additional charges or taxes would be slapped on after entering card details.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-900">
                    2. 12.4% Mobile Add-to-Basket Conversion
                  </h4>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    -55% vs Desktop
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Mobile shoppers on small touchscreens (360px–430px) scrolled through multiple hero product photos and dense feature lists, pushing the primary &quot;Add to Basket&quot; and size picker well off-screen. Users abandoned without ever adding items.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">
                    3. International Shipping Cost Surprises
                  </h4>
                  <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2.5 py-0.5 rounded-full">
                    38% of Traffic
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  38% of store sessions come from outside the US (India, UK, Germany, Canada, Japan, Taiwan). In the old store, shipping fees and duty requirements remained hidden until the final submission step, prompting instant sticker shock and 64.2% cart abandonment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">
                    4. Zero-Result Intent Searches
                  </h4>
                  <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2.5 py-0.5 rounded-full">
                    19.4% of Searches
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Users typing conversational or intent-based queries (&quot;gifts under 25&quot;, &quot;hoodies for engineers&quot;, &quot;stickers for laptop&quot;) met empty blank screens because legacy search only indexed literal exact product SKUs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: INTERVENTIONS APPLIED */}
          {activeTab === 'solutions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Uncollapsed Large 1-Tap Payment Cards (Google Pay / UPI)</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Eliminated collapsed accordion tabs. Step 2 shows 3 prominent visual cards with Google Pay &amp; UPI front and center. Real-time cost breakdown (Subtotal, Shipping, Total) is explicitly confirmed before payment authorization.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Persistent Mobile Sticky &quot;Add to Basket&quot; Bar</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Implemented a fixed bottom bar formatted as <code>$Price | Size | ADD TO BASKET</code> that stays locked to the bottom of the viewport as the user scrolls, allowing immediate purchase at any stage of browsing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Upfront Regional Shipping Transparency &amp; Free Shipping Meter</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Added a global country selector in header and footer with local free-shipping thresholds (e.g. Free shipping over $50 for US, ₹3,500 for India) and estimated transit days. Live basket progress bar shows how much is needed to unlock free shipping.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Non-Destructive Payment Authorization Recovery</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  When a card authorization or 3D-Secure check fails, customer data is never erased. The user is provided an informative recovery screen keeping all delivery information intact, with instant options to try another card or use 1-tap Google Pay.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Google AI Shopping Assistant for Intent Queries</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Natural language assistant that understands gifting goals, technical categories, and price caps, presenting direct interactive product cards with 1-tap Add to Basket.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: AUDIENCE & GEO */}
          {activeTab === 'geo' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <h4 className="text-sm font-extrabold text-purple-950">
                  Global Audience Distribution &amp; Regional Conversion Friction
                </h4>
                <p className="text-xs text-purple-800 mt-0.5">
                  Over 48% of total visitors originate outside the United States, representing huge untapped revenue if checkout friction and shipping opacity are removed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GA4_GEO_AUDIENCE.map((g) => (
                  <div
                    key={g.country}
                    className="p-3.5 rounded-2xl border border-gray-200 bg-white flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{g.flag}</span>
                      <div>
                        <strong className="block text-xs text-gray-900 font-bold">{g.country}</strong>
                        <span className="text-[11px] text-gray-500">
                          {g.users} users ({g.share}% traffic)
                        </span>
                      </div>
                    </div>
                    <div className="text-right max-w-[150px]">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Friction Solved</span>
                      <span className="text-[11px] text-blue-700 font-medium">{g.primaryFriction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LIVE GA4 EVENT STREAM */}
          {activeTab === 'live' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time GA4 Event Stream</span>
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Live client-side tracking logging standard e-commerce events as you interact with the prototype.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white">
                  {liveEvents.length} Events Logged
                </span>
              </div>

              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-900 text-gray-200 font-mono text-xs max-h-72 overflow-y-auto p-3 space-y-2">
                {liveEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">No events captured yet. Navigate products, add to cart, or proceed to checkout to generate events.</p>
                ) : (
                  liveEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-2 rounded-lg bg-gray-800/80 border border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-400 font-bold">[{evt.name}]</span>
                        <span className="text-gray-400 text-[10px]">{evt.timestamp}</span>
                      </div>
                      <div className="text-gray-300 truncate max-w-md">
                        {JSON.stringify(evt.params)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>GA4 Measurement Protocol compliant event taxonomy</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Close Insights
          </button>
        </div>
      </div>
    </div>
  );
};
