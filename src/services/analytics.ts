import { AnalyticsEvent } from '../types';

type EventListener = (event: AnalyticsEvent) => void;

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private listeners: Set<EventListener> = new Set();

  public track(name: string, params: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      timestamp: new Date().toLocaleTimeString(),
      params,
    };

    this.events.unshift(event);
    if (this.events.length > 50) {
      this.events.pop();
    }

    // Notify live listeners
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('Analytics listener error', err);
      }
    });

    // Also console log in dev
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[GA4 Event] ${name}`, params);
    }
  }

  public getRecentEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public subscribe(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const analytics = new AnalyticsService();

export interface FunnelStepStat {
  step: string;
  desktopRate: number;
  mobileRate: number;
  mobileDropOff: number;
  interpretation: string;
}

export const GA4_FUNNEL_STATS: FunnelStepStat[] = [
  {
    step: 'Product View → Add to Basket',
    desktopRate: 27.8,
    mobileRate: 12.4,
    mobileDropOff: 87.6,
    interpretation: 'Mobile users scrolled past buried CTA buttons. Fixed with sticky bottom Add to Basket bar.',
  },
  {
    step: 'Add to Basket → Begin Checkout',
    desktopRate: 41.2,
    mobileRate: 35.8,
    mobileDropOff: 64.2,
    interpretation: 'Cart abandonment due to hidden shipping charges. Fixed with upfront shipping calculation and free shipping threshold meter.',
  },
  {
    step: 'Begin Checkout → Add Delivery',
    desktopRate: 84.1,
    mobileRate: 78.4,
    mobileDropOff: 21.6,
    interpretation: 'Simplified address inputs with native mobile input modes and international country selection.',
  },
  {
    step: 'Add Delivery → Add Payment',
    desktopRate: 81.3,
    mobileRate: 41.8,
    mobileDropOff: 58.2,
    interpretation: 'CRITICAL BOTTLENECK: 58.2% mobile drop-off! Solved with large, high-visibility 1-tap Google Pay / UPI & Card selection cards.',
  },
  {
    step: 'Add Payment → Purchase Completion',
    desktopRate: 72.5,
    mobileRate: 54.1,
    mobileDropOff: 45.9,
    interpretation: 'Non-destructive payment failure flow that preserves entered delivery info upon bank rejection.',
  },
];

export interface BusinessDecision {
  id: string;
  ga4Finding: string;
  metricEvidence: string;
  rootCause: string;
  businessDecision: string;
  uxImplementation: string;
  expectedOutcome: string;
}

export const GA4_DECISIONS_MATRIX: BusinessDecision[] = [
  {
    id: 'decision-payment',
    ga4Finding: 'Critical 58.2% Mobile Drop-Off Between Delivery & Payment',
    metricEvidence: '371 mobile users entered address, but only 155 continued to payment (vs 81.3% desktop retention).',
    rootCause: 'Payment options were hidden in collapsed accordion menus; lack of 1-tap mobile payment options; fear of undisclosed hidden fees.',
    businessDecision: 'Replace collapsed accordion with uncollapsed, large visual payment cards featuring 1-tap Google Pay / UPI as the top method, with total cost reassurance.',
    uxImplementation: '3 prominent payment cards on step 2 (Google Pay/UPI, Credit Card, PayPal), instant visual confirmation, and persistent total breakdown showing Subtotal, Free Shipping, and Grand Total before payment.',
    expectedOutcome: 'Lifting mobile Delivery → Payment conversion from 41.8% to 75%+, capturing ~120 additional orders per month.',
  },
  {
    id: 'decision-add-to-basket',
    ga4Finding: 'Mobile Add-to-Basket Conversion Rate Lagging Desktop (12.4% vs 27.8%)',
    metricEvidence: 'Mobile users convert to basket at less than half the desktop rate (12.4% vs 27.8%).',
    rootCause: 'Long product descriptions and image carousels push Size selection and Add to Basket button far below the fold on 360-430px viewports.',
    businessDecision: 'Pin a persistent sticky bottom Add to Basket bar on all mobile viewports, coupled with 1-tap size popovers on collection grids.',
    uxImplementation: 'Sticky bottom bar ($Price | Size | ADD TO BASKET) fixed at bottom of screen with safe area support, plus quick-add buttons directly on category product cards.',
    expectedOutcome: 'Increase mobile Add-to-Basket rate by +80% to 22%+, reducing scroll abandonment.',
  },
  {
    id: 'decision-international',
    ga4Finding: 'High Cart Abandonment Among International Traffic (38% of Audience)',
    metricEvidence: 'Users from India (18%), UK (7%), Germany (5%), Canada (5%), and Japan (4%) exhibited a 64.2% Cart → Checkout drop-off.',
    rootCause: 'Zero upfront information on international delivery days, duties, or local currency conversion until deep in the checkout flow.',
    businessDecision: 'Provide an upfront global shipping & currency selector with regional transit times and dynamic free shipping thresholds.',
    uxImplementation: 'Header and footer country selector with flag indicators, estimated transit days (e.g., 5-7 business days for India), and local free shipping progress bar.',
    expectedOutcome: 'Reduce international cart abandonment by 35% and increase cross-border conversion.',
  },
  {
    id: 'decision-aov-meter',
    ga4Finding: 'Concentration of Cart Values Just Below Free Shipping Threshold ($30-$45)',
    metricEvidence: 'Over 44% of abandoned baskets had values between $30 and $48, where users were paying $6 shipping.',
    rootCause: 'Lack of visual cue of how little extra was needed to unlock free tracked worldwide shipping.',
    businessDecision: 'Implement a gamified dynamic Free Shipping threshold progress bar and 1-tap curated accessory recommendations in the cart.',
    uxImplementation: 'Live progress bar in cart ("Add $12.00 more for Free Delivery!") with 3 curated low-cost items (mugs, stickers, socks) with 1-tap Add buttons.',
    expectedOutcome: 'Increase Average Order Value (AOV) by +$14.20 while reducing cart abandonment by 18%.',
  },
  {
    id: 'decision-payment-error',
    ga4Finding: '100% Exit Rate on Gateway Authorization Failures',
    metricEvidence: 'When bank card 3D-Secure or authorization failed, users wiped out 100% of the time in legacy checkout.',
    rootCause: 'Standard error pages wiped entered delivery addresses, cleared carts, and provided cryptic gateway error codes.',
    businessDecision: 'Create a non-destructive failure recovery screen that preserves all customer data and offers one-click retry or alternate payment.',
    uxImplementation: 'Reassuring error state explaining no funds were debited, keeping delivery details intact, with "Try Again" and "Change Payment Method to Google Pay" buttons.',
    expectedOutcome: 'Recover 60%+ of declined transactions without losing customer goodwill.',
  },
  {
    id: 'decision-ai-search',
    ga4Finding: 'High Rate of Zero-Result Queries on Mobile Search (19.4%)',
    metricEvidence: 'Search queries like "gift for coder", "lightweight jacket", "cute android stuff" failed to match exact catalog keywords.',
    rootCause: 'Exact-match legacy search failed to parse conceptual intent, gifting requirements, or colloquial phrasing.',
    businessDecision: 'Integrate Google AI Shopping Assistant with natural language parsing and instant direct-to-cart product suggestions.',
    uxImplementation: 'Gemini-powered AI shopping assistant drawer available globally in header and floating spark button, responding with curated interactive product cards.',
    expectedOutcome: 'Transform zero-result search exits into high-intent product views with 35% click-through rate.',
  },
];

export interface GeoAudienceStat {
  country: string;
  share: number;
  users: number;
  flag: string;
  primaryFriction: string;
}

export const GA4_GEO_AUDIENCE: GeoAudienceStat[] = [
  { country: 'United States', share: 52, users: 2301, flag: '🇺🇸', primaryFriction: 'Mobile scroll fatigue on PDP' },
  { country: 'India', share: 18, users: 796, flag: '🇮🇳', primaryFriction: 'Lack of UPI & clear delivery timeline' },
  { country: 'United Kingdom', share: 7, users: 310, flag: '🇬🇧', primaryFriction: 'Customs & VAT surprise at checkout' },
  { country: 'Germany', share: 5, users: 221, flag: '🇩🇪', primaryFriction: 'Currency conversion & checkout transparency' },
  { country: 'Canada', share: 5, users: 221, flag: '🇨🇦', primaryFriction: 'Cross-border shipping rates' },
  { country: 'Japan', share: 4, users: 177, flag: '🇯🇵', primaryFriction: 'Sizing standards & payment localization' },
  { country: 'Rest of World', share: 9, users: 400, flag: '🌐', primaryFriction: 'Estimated arrival date obscurity' },
];


