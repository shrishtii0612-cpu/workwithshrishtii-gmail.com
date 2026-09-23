import React, { useState, useMemo, useEffect } from 'react';
import {
  Brand,
  CartItem,
  Country,
  DeliveryDetails,
  FilterState,
  NavigationPage,
  Order,
  PaymentDetails,
  Product,
  Size,
} from './types';
import { PRODUCTS } from './data/products';
import { COUNTRIES, DEFAULT_COUNTRY } from './data/countries';
import { analytics } from './services/analytics';

// Component Imports
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhatsYourGoogle } from './components/WhatsYourGoogle';
import { TrendingNow } from './components/TrendingNow';
import { ProductGrid } from './components/ProductGrid';
import { ShopByBrand } from './components/ShopByBrand';
import { ShopByPrice } from './components/ShopByPrice';
import { SustainabilitySection } from './components/SustainabilitySection';
import { NewsletterSection } from './components/NewsletterSection';
import { FilterPanel } from './components/FilterPanel';
import { SearchBar } from './components/SearchBar';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutProgress } from './components/checkout/CheckoutProgress';
import { DeliveryStep } from './components/checkout/DeliveryStep';
import { PaymentStep } from './components/checkout/PaymentStep';
import { ReviewStep } from './components/checkout/ReviewStep';
import { PaymentError } from './components/checkout/PaymentError';
import { OrderSuccess } from './components/checkout/OrderSuccess';
import { AiAssistant } from './components/AiAssistant';
import { Ga4Modal } from './components/Ga4Modal';
import { Footer } from './components/Footer';
import { BarChart3 } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Regional Shipping Country
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);

  // Search & Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isGa4ModalOpen, setIsGa4ModalOpen] = useState(false);
  const [ga4InitialTab, setGa4InitialTab] = useState<'funnel' | 'decisions' | 'problems' | 'solutions' | 'geo' | 'live'>('decisions');
  const [mobileViewportMode, setMobileViewportMode] = useState(false);

  // Cart State (Preloaded with 1 popular item so reviewers can immediately experience checkout if desired)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-item-1',
      product: PRODUCTS[0], // Google Everyday Essential Tee
      selectedSize: 'L',
      selectedColour: 'Google Blue',
      quantity: 1,
    },
  ]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(['prod-2']);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    brand: 'all',
    budget: 'all',
    gender: 'all',
    size: 'all',
    colour: 'all',
    stockOnly: false,
    sustainableOnly: false,
    collection: 'all',
    quickChip: 'all',
    sort: 'featured',
  });

  // Promo Code State
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Checkout State
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    fullName: 'Alex Henderson',
    email: 'alex.henderson@example.com',
    phone: '+1 (555) 019-2834',
    countryCode: 'US',
    address: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    state: 'CA',
    postalCode: '94043',
    shippingMethod: 'standard',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    type: 'gpay_upi',
    upiId: 'alex@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'Alex Henderson',
    cardExpiry: '08/28',
    cardCvc: '884',
  });

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Track page view in GA4 abstraction
  useEffect(() => {
    analytics.track('page_view', { page_title: currentPage });
  }, [currentPage]);

  // Total Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const isFreeShipping = cartSubtotal >= selectedCountry.freeShippingThreshold;
  const currentShippingCost = isFreeShipping
    ? 0
    : deliveryDetails.shippingMethod === 'express'
    ? selectedCountry.expressShippingCost
    : selectedCountry.shippingCost;

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by page mode
    if (currentPage === 'new_arrivals') {
      result = result.filter((p) => p.isNew);
    } else if (currentPage === 'best_sellers') {
      result = result.filter((p) => p.isBestSeller);
    } else if (currentPage === 'search' && searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Brand
    if (filters.brand && filters.brand !== 'all') {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // Filter by Category
    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by Budget
    if (filters.budget && filters.budget !== 'all') {
      if (filters.budget === 'under10') result = result.filter((p) => p.price < 10);
      else if (filters.budget === 'under25') result = result.filter((p) => p.price < 25);
      else if (filters.budget === 'under50') result = result.filter((p) => p.price < 50);
      else if (filters.budget === 'premium') result = result.filter((p) => p.price >= 50);
    }

    // Filter by Size
    if (filters.size && filters.size !== 'all') {
      result = result.filter((p) => p.sizes.includes(filters.size as Size));
    }

    // Filter by In Stock
    if (filters.stockOnly) {
      result = result.filter((p) => p.stock !== 'out_of_stock');
    }

    // Filter by Sustainable
    if (filters.sustainableOnly) {
      result = result.filter((p) => Boolean(p.sustainability));
    }

    // Quick Chips
    if (filters.quickChip === 'best_sellers') {
      result = result.filter((p) => p.isBestSeller);
    } else if (filters.quickChip === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (filters.quickChip === 'under25') {
      result = result.filter((p) => p.price < 25);
    } else if (filters.quickChip === 'gifts') {
      result = result.filter((p) => p.tags.includes('gift') || p.price <= 25);
    } else if (filters.quickChip === 'sale') {
      result = result.filter((p) => p.onSale);
    }

    // Sort
    if (filters.sort === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'popular') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [PRODUCTS, currentPage, searchQuery, filters]);

  // Cart Operations
  const handleAddToCart = (product: Product, size: Size, colour: string, quantity: number) => {
    analytics.track('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity,
      size,
    });

    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColour === colour
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          selectedSize: size,
          selectedColour: colour,
          quantity,
        },
      ];
    });
  };

  const handleQuickAddToCart = (product: Product, size: Size) => {
    handleAddToCart(product, size, product.colours[0] || 'Default', 1);
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      analytics.track('remove_from_cart', {
        item_id: item.product.id,
        item_name: item.product.name,
      });
    }
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleApplyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GOOGLE10') {
      const discount = Math.round(cartSubtotal * 0.1 * 100) / 100;
      setDiscountCode('GOOGLE10');
      setDiscountAmount(discount);
      analytics.track('apply_promotion', { coupon_code: 'GOOGLE10', discount });
      return {
        success: true,
        discountAmount: discount,
        message: '10% Google Fan discount applied!',
      };
    }
    return {
      success: false,
      discountAmount: 0,
      message: 'Invalid promo code. Try using GOOGLE10',
    };
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Navigation handlers
  const handleNavigate = (page: NavigationPage, params?: { category?: string; brand?: Brand }) => {
    if (params?.category) {
      setFilters((prev) => ({ ...prev, category: params.category as any }));
    }
    if (params?.brand) {
      setFilters((prev) => ({ ...prev, brand: params.brand }));
    }
    setCurrentPage(page);
  };

  const handleSelectProduct = (product: Product) => {
    analytics.track('view_item', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
    });
    setSelectedProduct(product);
    setCurrentPage('product_detail');
  };

  const handlePerformSearch = (query: string) => {
    analytics.track('search', { search_term: query });
    setSearchQuery(query);
    setCurrentPage('search');
  };

  // Checkout transitions
  const handleDeliverySubmit = (details: DeliveryDetails) => {
    analytics.track('add_shipping_info', {
      shipping_tier: details.shippingMethod,
      country: details.countryCode,
    });
    setDeliveryDetails(details);
    setCurrentPage('checkout_payment');
  };

  const handlePaymentSubmit = (payment: PaymentDetails) => {
    analytics.track('add_payment_info', {
      payment_type: payment.type,
    });
    setPaymentDetails(payment);
    setCurrentPage('checkout_review');
  };

  const handleConfirmOrder = (simulateFailure?: boolean) => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      if (simulateFailure) {
        // Payment Failure UX Flow (Section 16 requirement)
        analytics.track('payment_failed', {
          reason: 'Gateway bank test decline simulation',
        });
        setPaymentErrorMessage(
          'Your bank or card issuer declined the transaction authorization. Please try another card or use 1-tap Google Pay.'
        );
        setCurrentPage('checkout_error');
      } else {
        // Successful Order Completion
        const finalTotal = Math.max(0, cartSubtotal + currentShippingCost - discountAmount);
        const order: Order = {
          id: `GMS-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [...cartItems],
          subtotal: cartSubtotal,
          shippingCost: currentShippingCost,
          discountAmount,
          total: finalTotal,
          deliveryDetails: { ...deliveryDetails },
          paymentDetails: { ...paymentDetails },
          createdAt: new Date().toLocaleDateString(),
          estimatedDelivery: selectedCountry.estimatedDays,
        };

        analytics.track('purchase', {
          transaction_id: order.id,
          value: order.total,
          currency: 'USD',
          items: order.items.map((i) => ({
            item_id: i.product.id,
            item_name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
        });

        setLastOrder(order);
        setCartItems([]);
        setCurrentPage('order_success');
      }
    }, 1200);
  };

  return (
    <div className={
      mobileViewportMode
        ? "bg-neutral-800 min-h-screen py-4 px-2 flex flex-col items-center"
        : "min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900"
    }>
      {/* Top Banner when in Mobile Frame simulation mode */}
      {mobileViewportMode && (
        <div className="w-full max-w-[390px] mb-3 bg-gray-900 text-white text-xs font-semibold py-2 px-3.5 rounded-2xl flex items-center justify-between shadow-xl border border-gray-700">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-base">📱</span>
            <span className="truncate">Mobile Viewport Active (390px)</span>
          </div>
          <button
            onClick={() => setMobileViewportMode(false)}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-xl transition-colors shrink-0"
          >
            Exit Frame
          </button>
        </div>
      )}

      {/* Main viewport container */}
      <div className={
        mobileViewportMode
          ? "w-[390px] bg-white rounded-[38px] shadow-2xl border-[6px] border-gray-900 min-h-[844px] flex flex-col overflow-hidden relative"
          : "flex-1 flex flex-col"
      }>
        {/* Global Header */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAI={() => setIsAiAssistantOpen(true)}
          onOpenInsights={() => {
            setGa4InitialTab('decisions');
            setIsGa4ModalOpen(true);
          }}
          mobileViewportMode={mobileViewportMode}
          onToggleMobileViewport={() => setMobileViewportMode(!mobileViewportMode)}
        />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* HOMEPAGE */}
        {currentPage === 'home' && (
          <div>
            <HeroSection
              onShopBestSellers={() => handleNavigate('best_sellers')}
              onExploreNew={() => handleNavigate('new_arrivals')}
              onShopAll={() => handleNavigate('shop_all')}
              onExploreBestSellers={() => handleNavigate('best_sellers')}
              onOpenInsights={() => setIsGa4ModalOpen(true)}
            />

            <WhatsYourGoogle onNavigate={handleNavigate} />

            <TrendingNow
              onSelectProduct={handleSelectProduct}
              onQuickAddToCart={handleQuickAddToCart}
              onViewAll={() => handleNavigate('shop_all')}
            />

            {/* "Popular Right Now" - 6 products */}
            <section className="py-10 sm:py-14 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Popular Right Now
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Our most sought-after apparel, tech, and everyday essentials
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('shop_all')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View all 32 items →
                  </button>
                </div>

                <ProductGrid
                  products={PRODUCTS.slice(0, 6)}
                  onSelectProduct={handleSelectProduct}
                  onQuickAddToCart={handleQuickAddToCart}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              </div>
            </section>

            <ShopByBrand
              onSelectBrand={(brand) => {
                setFilters((prev) => ({ ...prev, brand }));
                setCurrentPage('shop_all');
              }}
            />

            <ShopByPrice
              onSelectBudget={(budget) => {
                setFilters((prev) => ({ ...prev, budget }));
                setCurrentPage('shop_all');
              }}
            />

            <SustainabilitySection
              sustainableProducts={PRODUCTS.filter((p) => p.sustainability)}
              onSelectProduct={handleSelectProduct}
              onQuickAddToCart={handleQuickAddToCart}
              onViewAllSustainable={() => {
                setFilters((prev) => ({ ...prev, sustainableOnly: true }));
                setCurrentPage('shop_all');
              }}
            />

            <NewsletterSection />
          </div>
        )}

        {/* SHOP ALL / NEW ARRIVALS / BEST SELLERS / CATEGORIES / BRANDS / SEARCH RESULTS */}
        {(currentPage === 'shop_all' ||
          currentPage === 'new_arrivals' ||
          currentPage === 'best_sellers' ||
          currentPage === 'categories' ||
          currentPage === 'brands' ||
          currentPage === 'search') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {currentPage === 'new_arrivals'
                  ? 'New Arrivals'
                  : currentPage === 'best_sellers'
                  ? 'Best Sellers'
                  : currentPage === 'brands'
                  ? 'Shop by Brand'
                  : currentPage === 'categories'
                  ? 'Shop by Category'
                  : currentPage === 'search'
                  ? `Search Results for "${searchQuery}"`
                  : 'Shop All Merchandise'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Authentic Google, Android, YouTube, and Gemini gear with transparent worldwide delivery.
              </p>
            </div>

            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              totalProductsCount={PRODUCTS.length}
              filteredCount={filteredProducts.length}
            />

            <ProductGrid
              products={filteredProducts}
              onSelectProduct={handleSelectProduct}
              onQuickAddToCart={handleQuickAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onResetFilters={() =>
                setFilters({
                  category: 'all',
                  brand: 'all',
                  budget: 'all',
                  gender: 'all',
                  size: 'all',
                  colour: 'all',
                  stockOnly: false,
                  sustainableOnly: false,
                  collection: 'all',
                  quickChip: 'all',
                  sort: 'featured',
                })
              }
              emptyTitle={currentPage === 'search' ? `No results for "${searchQuery}"` : 'No matching products'}
              emptyMessage="Try adjusting your brand, price range, or category filters."
            />
          </div>
        )}

        {/* PRODUCT DETAIL PAGE */}
        {currentPage === 'product_detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentPage('shop_all')}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* CART PAGE */}
        {currentPage === 'cart' && (
          <CartPage
            items={cartItems}
            selectedCountry={selectedCountry}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickAddToCart={handleQuickAddToCart}
            recommendedProducts={PRODUCTS.filter(
              (p) => !cartItems.some((ci) => ci.product.id === p.id)
            )}
            discountCode={discountCode}
            onApplyDiscountCode={handleApplyDiscountCode}
            discountAmount={discountAmount}
          />
        )}

        {/* CHECKOUT STEP 1: DELIVERY */}
        {currentPage === 'checkout_delivery' && (
          <div className="bg-gray-50/60 min-h-screen py-8 sm:py-12">
            <div className="max-w-2xl mx-auto px-4">
              <CheckoutProgress
                currentStep="delivery"
                onNavigateStep={(s) => {
                  if (s === 'delivery') setCurrentPage('checkout_delivery');
                }}
              />
              <DeliveryStep
                initialDetails={deliveryDetails}
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
                cartItems={cartItems}
                subtotal={cartSubtotal}
                discountAmount={discountAmount}
                onSubmitDelivery={handleDeliverySubmit}
                onBackToCart={() => setCurrentPage('cart')}
              />
            </div>
          </div>
        )}

        {/* CHECKOUT STEP 2: PAYMENT (Key UX problem solution) */}
        {currentPage === 'checkout_payment' && (
          <div className="bg-gray-50/60 min-h-screen py-8 sm:py-12">
            <div className="max-w-2xl mx-auto px-4">
              <CheckoutProgress
                currentStep="payment"
                onNavigateStep={(s) => {
                  if (s === 'delivery') setCurrentPage('checkout_delivery');
                  if (s === 'payment') setCurrentPage('checkout_payment');
                }}
              />
              <PaymentStep
                initialPayment={paymentDetails}
                deliveryDetails={deliveryDetails}
                subtotal={cartSubtotal}
                shippingCost={currentShippingCost}
                discountAmount={discountAmount}
                onSubmitPayment={handlePaymentSubmit}
                onBackToDelivery={() => setCurrentPage('checkout_delivery')}
              />
            </div>
          </div>
        )}

        {/* CHECKOUT STEP 3: REVIEW */}
        {currentPage === 'checkout_review' && (
          <div className="bg-gray-50/60 min-h-screen py-8 sm:py-12">
            <div className="max-w-2xl mx-auto px-4">
              <CheckoutProgress
                currentStep="review"
                onNavigateStep={(s) => {
                  if (s === 'delivery') setCurrentPage('checkout_delivery');
                  if (s === 'payment') setCurrentPage('checkout_payment');
                }}
              />
              <ReviewStep
                cartItems={cartItems}
                deliveryDetails={deliveryDetails}
                paymentDetails={paymentDetails}
                selectedCountry={selectedCountry}
                subtotal={cartSubtotal}
                shippingCost={currentShippingCost}
                discountAmount={discountAmount}
                discountCode={discountCode}
                onEditDelivery={() => setCurrentPage('checkout_delivery')}
                onEditPayment={() => setCurrentPage('checkout_payment')}
                onConfirmOrder={handleConfirmOrder}
                isProcessing={isProcessingPayment}
              />
            </div>
          </div>
        )}

        {/* CHECKOUT PAYMENT FAILURE (Non-destructive recovery) */}
        {currentPage === 'checkout_error' && (
          <div className="bg-gray-50/60 min-h-screen py-12">
            <PaymentError
              errorMessage={paymentErrorMessage}
              onRetry={() => handleConfirmOrder(false)}
              onChangePaymentMethod={() => setCurrentPage('checkout_payment')}
            />
          </div>
        )}

        {/* ORDER SUCCESS PAGE */}
        {currentPage === 'order_success' && lastOrder && (
          <div className="bg-gray-50/60 min-h-screen py-10 sm:py-16">
            <OrderSuccess
              order={lastOrder}
              onContinueShopping={() => handleNavigate('shop_all')}
            />
          </div>
        )}
      </main>

      {/* Global Modals & Floaties */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onPerformSearch={handlePerformSearch}
        allProducts={PRODUCTS}
      />

      <AiAssistant
        isOpen={isAiAssistantOpen}
        onToggle={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onQuickAddToCart={handleQuickAddToCart}
      />

      <Ga4Modal
        isOpen={isGa4ModalOpen}
        onClose={() => setIsGa4ModalOpen(false)}
      />

        {/* Global Footer */}
        <Footer
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          onNavigate={handleNavigate}
          onOpenGa4={() => {
            setGa4InitialTab('decisions');
            setIsGa4ModalOpen(true);
          }}
        />
      </div>

      {/* Global Modals & Floaties */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onPerformSearch={handlePerformSearch}
        allProducts={PRODUCTS}
      />

      <AiAssistant
        isOpen={isAiAssistantOpen}
        onToggle={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onQuickAddToCart={handleQuickAddToCart}
      />

      <Ga4Modal
        isOpen={isGa4ModalOpen}
        onClose={() => setIsGa4ModalOpen(false)}
        initialTab={ga4InitialTab}
      />

      {/* Floating GA4 Insights trigger on desktop */}
      <button
        onClick={() => {
          setGa4InitialTab('decisions');
          setIsGa4ModalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-30 hidden lg:flex items-center space-x-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl border border-gray-700 text-xs font-bold transition-all hover:scale-105"
        id="floating-ga4-btn"
        title="View GA4 Analytics & Strategic Decisions"
      >
        <BarChart3 className="w-4 h-4 text-blue-400" />
        <span>GA4 Redesign Rationale</span>
      </button>
    </div>
  );
}
