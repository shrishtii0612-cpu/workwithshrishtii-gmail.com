export type Brand = 'Google' | 'Android' | 'YouTube' | 'Gemini' | 'Google Cloud';

export type Category =
  | 'T-shirts'
  | 'Hoodies'
  | 'Sweatshirts'
  | 'Mugs'
  | 'Bottles'
  | 'Bags'
  | 'Caps'
  | 'Stationery'
  | 'Accessories'
  | 'Collectibles';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  galleryImages: string[];
  description: string;
  materials: string;
  sizes: Size[];
  colours: string[];
  stock: StockStatus;
  rating: number;
  reviewsCount: number;
  collection: string;
  sustainability?: string;
  tags: string[];
  gender?: 'Unisex' | 'Men' | 'Women';
  isNew?: boolean;
  isBestSeller?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  id: string; // unique item id (product.id + size + colour)
  product: Product;
  selectedSize: Size;
  selectedColour: string;
  quantity: number;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currencySymbol: string;
  exchangeRate: number; // relative to USD
  shippingCost: number;
  expressShippingCost: number;
  estimatedDays: string;
  expressDays: string;
  freeShippingThreshold: number;
  isAvailable: boolean;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
}

export type PaymentType = 'gpay_upi' | 'card' | 'paypal';

export interface PaymentDetails {
  type: PaymentType;
  upiId?: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface Order {
  id: string;
  orderId?: string;
  createdAt: string;
  items: CartItem[];
  deliveryDetails: DeliveryDetails;
  paymentDetails: PaymentDetails;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  discountCode?: string;
  total: number;
  estimatedDelivery: string;
  status?: 'confirmed' | 'processing' | 'shipped';
}

export type NavigationPage =
  | 'home'
  | 'shop_all'
  | 'new_arrivals'
  | 'best_sellers'
  | 'brands'
  | 'categories'
  | 'product_detail'
  | 'search'
  | 'cart'
  | 'checkout_delivery'
  | 'checkout_payment'
  | 'checkout_review'
  | 'checkout_error'
  | 'order_success';


export interface AnalyticsEvent {
  id: string;
  name: string;
  timestamp: string;
  params: Record<string, any>;
}

export interface FilterState {
  category?: Category | 'all';
  brand?: Brand | 'all';
  budget?: 'all' | 'under10' | 'under25' | 'under50' | 'premium';
  gender?: 'all' | 'Unisex' | 'Men' | 'Women';
  size?: 'all' | Size;
  colour?: 'all' | string;
  stockOnly?: boolean;
  sustainableOnly?: boolean;
  collection?: 'all' | string;
  quickChip?: 'all' | 'best_sellers' | 'new' | 'under25' | 'gifts' | 'sale';
  sort: 'featured' | 'popular' | 'newest' | 'price_low' | 'price_high';
}
