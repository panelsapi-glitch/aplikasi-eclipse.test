import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  Star,
  Zap,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full eclipse-gradient flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <div className="w-6 h-6 rounded-full bg-eclipse-deep transform translate-x-1 -translate-y-1" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">ECLIPSE</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-eclipse-green transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-eclipse-green transition-colors">Collections</a>
            <a href="#" className="hover:text-eclipse-green transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search products..."
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-hidden focus:border-eclipse-green/50 w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/5 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 text-slate-200 group-hover:text-eclipse-green transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-eclipse-green text-eclipse-deep text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square bg-eclipse-green/10 blur-[120px] rounded-full -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                Step into the <span className="text-gradient">Unknown</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                Premium gear for the modern explorer. Designed with precision, 
                inspired by the cosmos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-eclipse-green text-eclipse-deep font-bold rounded-full hover:bg-eclipse-cyan transition-all transform hover:scale-105 shadow-lg shadow-eclipse-green/20">
                  Shop Collection
                </button>
                <button className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
                  View Lookbook
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Zap, title: "Fast Delivery", desc: "Global shipping within 48 hours" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "Encrypted transactions" },
              { icon: Star, title: "Premium Quality", desc: "Hand-selected materials" },
              { icon: Globe, title: "Eco Friendly", desc: "Sustainable production" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-eclipse-green">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Our Products</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat 
                        ? 'bg-eclipse-green text-eclipse-deep' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-slate-500 text-sm">
              Showing {filteredProducts.length} results
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative glass rounded-3xl p-4 transition-all hover:border-eclipse-green/30"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-eclipse-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={() => addToCart(product)}
                      className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-eclipse-green text-eclipse-deep flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{product.name}</h3>
                      <span className="text-eclipse-green font-mono font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <span className="px-2 py-1 rounded-md bg-white/5">{product.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-4 text-eclipse-green hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-eclipse-deep border-t border-white/5 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full eclipse-gradient" />
              <span className="text-xl font-bold tracking-tighter text-white">ECLIPSE</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Redefining the boundaries of style and technology. Join the eclipse 
              and explore the future of premium gear.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'Discord'].map(social => (
                <a key={social} href="#" className="text-slate-500 hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Shop</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-eclipse-green transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-eclipse-green transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-eclipse-green transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-eclipse-green transition-colors">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-eclipse-green transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-eclipse-green transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-eclipse-green transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-eclipse-green transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© 2024 Eclipse Store. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-eclipse-deep border-l border-white/10 z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
                    <p className="text-slate-500">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-eclipse-green font-bold hover:underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-white">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:text-eclipse-green transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-mono">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:text-eclipse-green transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-mono text-eclipse-green font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Shipping</span>
                      <span className="text-eclipse-green">Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/5">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-eclipse-green text-eclipse-deep font-bold rounded-xl hover:bg-eclipse-cyan transition-all flex items-center justify-center gap-2">
                    Checkout <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
