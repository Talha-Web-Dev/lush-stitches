import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <Heart size={48} strokeWidth={1} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-light text-[#1a1a1a] dark:text-white mb-3">Your wishlist is empty</h2>
          <p className="text-gray-400 text-sm mb-8 font-light">Save pieces you love to find them again later.</p>
          <Link to="/shop" className="inline-block px-8 py-3 bg-[#c9a96e] text-white text-xs tracking-widest uppercase rounded hover:bg-[#9a7a4a] transition-colors">
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Saved</span>
        <h1 className="mt-1 text-3xl font-serif font-light text-[#1a1a1a] dark:text-white">Wishlist ({items.length})</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        <AnimatePresence>
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-50 dark:bg-white/5">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/70 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                >
                  <X size={13} strokeWidth={1.5} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <div className="mt-3 px-0.5">
                <Link to={`/product/${product.id}`} className="text-sm font-medium text-[#1a1a1a] dark:text-white hover:text-[#c9a96e] transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-[#1a1a1a] dark:text-white">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                    className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#c9a96e] hover:opacity-70 transition-opacity"
                  >
                    <ShoppingBag size={11} strokeWidth={2} />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}