import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const shipping = total > 500 ? 0 : 15;
  const tax = Math.round(total * 0.08 * 100) / 100;
  const grand = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <ShoppingBag size={48} strokeWidth={1} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-light text-[#1a1a1a] dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-8 font-light">Discover pieces that speak to you and add them to your cart.</p>
          <Link to="/shop" className="inline-block px-8 py-3 bg-[#c9a96e] text-white text-xs tracking-widest uppercase rounded hover:bg-[#9a7a4a] transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Review</span>
        <h1 className="mt-1 text-3xl font-serif font-light text-[#1a1a1a] dark:text-white">Your Cart ({items.length})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-0">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                className="flex gap-5 py-6 border-b border-gray-100 dark:border-white/5"
              >
                {/* Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden bg-gray-50 dark:bg-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.id}`} className="text-sm font-medium text-[#1a1a1a] dark:text-white hover:text-[#c9a96e] transition-colors leading-snug">
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-400">Size: {item.size}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.key)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5">
                      <X size={15} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty */}
                    <div className="flex items-center border border-gray-200 dark:border-white/10 rounded">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Minus size={11} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="font-semibold text-[#1a1a1a] dark:text-white text-sm">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 dark:bg-white/3 rounded-xl p-6 sticky top-24">
            <h3 className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-5 font-medium">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-500 font-medium' : 'font-medium'}>
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            {total < 500 && (
              <p className="mt-4 text-xs text-[#c9a96e] bg-[#c9a96e]/10 px-3 py-2 rounded">
                Add ${(500 - total).toLocaleString()} more for free shipping
              </p>
            )}

            <div className="h-px bg-gray-200 dark:bg-white/5 my-5" />

            <div className="flex justify-between font-semibold text-[#1a1a1a] dark:text-white">
              <span>Total</span>
              <span>${grand.toFixed(2)}</span>
            </div>

            {/* Promo code */}
            <div className="mt-5 flex gap-2">
              <input
                placeholder="Promo code"
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-white/10 rounded text-xs bg-transparent outline-none focus:border-[#c9a96e] transition-colors"
              />
              <button className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded text-xs tracking-wider uppercase hover:border-[#c9a96e] transition-colors">
                Apply
              </button>
            </div>

            <button className="btn-press w-full mt-5 py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-medium rounded flex items-center justify-center gap-2 hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white transition-colors">
              Checkout <ArrowRight size={13} />
            </button>

            <Link to="/shop" className="block text-center mt-4 text-xs text-gray-400 hover:text-[#c9a96e] transition-colors tracking-wider uppercase">
              Continue Shopping
            </Link>

            {/* Trust badges */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/5 grid grid-cols-3 gap-2 text-center">
              {['Free Returns', 'Secure Pay', 'Luxury Box'].map(badge => (
                <div key={badge} className="text-[9px] text-gray-400 tracking-wider uppercase">{badge}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}