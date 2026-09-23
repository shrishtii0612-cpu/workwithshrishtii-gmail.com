import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { Product, Size } from '../types';

interface AiAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: Size) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: Product[];
  quickReplies?: string[];
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  isOpen,
  onToggle,
  products,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hi there! I'm your Google Merch shopping assistant. How can I help you find the right gear today?",
      quickReplies: [
        'Find a gift under $25',
        'Show me Google hoodies',
        'What are your best sellers?',
        'Suggest gifts for a software engineer',
        'Eco-friendly merch',
        'Do you ship to India?',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Logic processing against catalog
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = '';
      let matchedProducts: Product[] = [];
      let nextReplies: string[] = [];

      if (lower.includes('under $25') || lower.includes('under 25') || lower.includes('budget') || lower.includes('cheap')) {
        matchedProducts = products.filter((p) => p.price <= 25).slice(0, 3);
        responseText = `Here are some top-rated gifts under $25 from Google, Android, and Gemini:`;
        nextReplies = ['Show me Google hoodies', 'What are your best sellers?'];
      } else if (lower.includes('hoodie') || lower.includes('jacket') || lower.includes('sweatshirt')) {
        matchedProducts = products.filter((p) => p.category === 'Hoodies' || p.category === 'Sweatshirts').slice(0, 3);
        responseText = `Here are our best-selling heavyweight hoodies and fleece sweatshirts:`;
        nextReplies = ['What size should I get?', 'Find a gift under $25'];
      } else if (lower.includes('best seller') || lower.includes('popular') || lower.includes('top rated')) {
        matchedProducts = products.filter((p) => p.isBestSeller).slice(0, 3);
        responseText = `These are currently the community's highest-rated items:`;
        nextReplies = ['Suggest gifts for a software engineer', 'Eco-friendly merch'];
      } else if (lower.includes('engineer') || lower.includes('developer') || lower.includes('coder') || lower.includes('software')) {
        matchedProducts = products.filter((p) => p.tags.includes('developer') || p.tags.includes('tech') || p.brand === 'Gemini' || p.brand === 'Android').slice(0, 3);
        responseText = `Engineers love these dev-focused items—from the Gemini neural hoodie to Android Bugdroid tumblers:`;
        nextReplies = ['What are your best sellers?', 'Find a gift under $25'];
      } else if (lower.includes('eco') || lower.includes('sustainable') || lower.includes('organic') || lower.includes('green')) {
        matchedProducts = products.filter((p) => p.sustainability !== undefined).slice(0, 3);
        responseText = `Here are our certified eco-conscious picks made with organic cotton & recycled plastics:`;
        nextReplies = ['Show me Google hoodies', 'Do you ship to India?'];
      } else if (lower.includes('india') || lower.includes('ship') || lower.includes('delivery')) {
        responseText = `Yes! We ship worldwide, including India (🇮🇳 estimated 5-7 business days, free shipping on orders over $50). We also support fast Google Pay and local UPI payments at checkout!`;
        nextReplies = ['What are your best sellers?', 'Find a gift under $25'];
      } else if (lower.includes('size') || lower.includes('fit') || lower.includes('measure')) {
        responseText = `Our apparel runs true to standard unisex US sizing. If you prefer a relaxed, oversized streetwear fit (especially for hoodies), we recommend sizing up one size. XS through XL are available!`;
        nextReplies = ['Show me Google hoodies', 'What are your best sellers?'];
      } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('promo')) {
        responseText = `You can use promo code GOOGLE10 at checkout for 10% off your entire order! Free shipping also applies automatically once your cart reaches your region's threshold.`;
        nextReplies = ['What are your best sellers?', 'Find a gift under $25'];
      } else {
        // Fallback search in catalog
        matchedProducts = products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(lower) ||
              p.brand.toLowerCase().includes(lower) ||
              p.category.toLowerCase().includes(lower) ||
              p.tags.some((t) => lower.includes(t))
          )
          .slice(0, 3);

        if (matchedProducts.length > 0) {
          responseText = `Here are recommendations matching "${text}":`;
        } else {
          matchedProducts = products.slice(0, 3);
          responseText = `I'd love to help! Here are 3 of our most popular Google merchandise picks:`;
        }
        nextReplies = ['Find a gift under $25', 'Show me Google hoodies', 'Do you ship to India?'];
      }

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: responseText,
        products: matchedProducts,
        quickReplies: nextReplies,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 group"
          id="ai-assistant-floating-trigger"
          aria-label="Open AI Shopping Assistant"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            AI Shopping Assistant
          </span>
        </button>
      )}

      {/* Assistant Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl h-[85vh] sm:h-[650px] flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-6 duration-200">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Google AI Shopping Assistant</h3>
                  <p className="text-[11px] text-blue-100">Live recommendations &amp; sizing guidance</p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                id="ai-assistant-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[88%]">
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-xs'
                          : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Render Embedded Product Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-3 space-y-2 pl-9">
                      {msg.products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between gap-3 hover:border-blue-400 transition-all"
                        >
                          <div
                            onClick={() => {
                              onSelectProduct(product);
                              onToggle();
                            }}
                            className="flex items-center space-x-2.5 min-w-0 cursor-pointer flex-1"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-xl object-cover bg-gray-50 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-gray-500 uppercase">
                                {product.brand}
                              </span>
                              <h5 className="text-xs font-bold text-gray-900 truncate">
                                {product.name}
                              </h5>
                              <span className="text-xs font-extrabold text-blue-600">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => onQuickAddToCart(product, product.sizes[0] || 'M')}
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 shrink-0"
                            title="Add to Basket"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Suggestions Chips */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pl-9">
                      {msg.quickReplies.map((qr) => (
                        <button
                          key={qr}
                          onClick={() => handleSend(qr)}
                          className="px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-blue-500 text-[11px] font-medium text-gray-700 hover:text-blue-600 shadow-2xs transition-colors"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-xs text-gray-400 pl-9">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about sizing, gifts, shipping..."
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs text-gray-800 placeholder-gray-400"
                id="ai-assistant-input"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors shadow-2xs"
                id="ai-assistant-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
