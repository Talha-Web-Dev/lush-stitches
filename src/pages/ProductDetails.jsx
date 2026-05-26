import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronDown, ArrowLeft, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const related = products.filter(p => p.id !== Number(id) && p.category === product?.category).slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-serif text-[#1a1a1a] dark:text-white mb-4">Product not found</h2>
        <Link to="/shop" className="text-[#c9a96e] hover:opacity-70 text-sm tracking-widest uppercase">← Back to Shop</Link>
      </div>
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      // pick first size
      addToCart(product, product.sizes[0], product.colors[selectedColor], qty);
      return;
    }
    addToCart(product, selectedSize, product.colors[selectedColor], qty);
  };

  const accordionItems = [
    { id: 'description', label: 'Description', content: product.description },
    { id: 'details', label: 'Product Details', content: 'Crafted with the finest materials and attention to detail. Each piece undergoes rigorous quality control before leaving our atelier. Hand-finished seams and custom hardware throughout.' },
    { id: 'shipping', label: 'Shipping & Returns', content: 'Complimentary shipping on all orders. Delivered in 3-5 business days in a signature Lush Stitches box. Free returns within 30 days for unworn items in original condition.' },
    { id: 'care', label: 'Care Instructions', content: 'Dry clean only. Store in the provided garment bag away from direct sunlight. Do not wring or machine wash.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase">
          <Link to="/" className="hover:text-[#c9a96e] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#c9a96e] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#1a1a1a] dark:text-white">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="hidden sm:flex flex-col gap-3 w-20">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-[#c9a96e]' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] bg-gray-50 dark:bg-white/5 rounded-xl overflow-hidden group">
              <motion.img
                key={selectedImage}
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase font-semibold rounded
                  ${product.badge === 'Sale' ? 'bg-red-500 text-white' : product.badge === 'New' ? 'bg-[#c9a96e] text-white' : 'bg-black text-white'}`}>
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-black/60 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Heart size={16} fill={isWishlisted(product.id) ? '#c9a96e' : 'none'} className={isWishlisted(product.id) ? 'text-[#c9a96e]' : 'text-gray-600 dark:text-gray-300'} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="py-2">
            {/* Category */}
            <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">{product.category}</span>

            <h1 className="mt-2 text-3xl lg:text-4xl font-serif font-light text-[#1a1a1a] dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-[#c9a96e] fill-[#c9a96e]' : 'text-gray-300'} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-xs text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-2xl font-semibold text-[#1a1a1a] dark:text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm text-red-500 font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-gray-100 dark:bg-white/5 my-6" />

            {/* Colors */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-widest uppercase text-[#1a1a1a] dark:text-white font-medium">Color</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full transition-all ${selectedColor === i ? 'ring-2 ring-offset-2 ring-[#c9a96e] scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-widest uppercase text-[#1a1a1a] dark:text-white font-medium">Size</span>
                <button className="text-xs text-[#c9a96e] hover:opacity-70 transition-opacity tracking-wider">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase border rounded transition-all ${selectedSize === size ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] border-[#1a1a1a] dark:border-white' : 'border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white hover:border-[#c9a96e]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-widest uppercase text-[#1a1a1a] dark:text-white font-medium">Quantity</span>
              <div className="flex items-center border border-gray-200 dark:border-white/10 rounded">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="btn-press flex-1 py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-medium rounded flex items-center justify-center gap-2 hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white transition-colors"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                Add to Cart
              </motion.button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded border flex items-center justify-center transition-colors ${isWishlisted(product.id) ? 'border-[#c9a96e] bg-[#c9a96e]/10' : 'border-gray-200 dark:border-white/10 hover:border-[#c9a96e]'}`}
              >
                <Heart size={16} fill={isWishlisted(product.id) ? '#c9a96e' : 'none'} className={isWishlisted(product.id) ? 'text-[#c9a96e]' : ''} strokeWidth={1.5} />
              </button>
              <button className="w-12 h-12 rounded border border-gray-200 dark:border-white/10 flex items-center justify-center hover:border-[#c9a96e] transition-colors">
                <Share2 size={14} />
              </button>
            </div>

            <div className="h-px bg-gray-100 dark:bg-white/5 my-6" />

            {/* Accordion */}
            <div className="space-y-0.5">
              {accordionItems.map(item => (
                <div key={item.id} className="border-b border-gray-100 dark:border-white/5">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-xs tracking-widest uppercase font-medium text-[#1a1a1a] dark:text-white">{item.label}</span>
                    <ChevronDown size={14} className={`transition-transform text-gray-400 ${openAccordion === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-4"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.content}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">You May Also Like</span>
              <h2 className="mt-1 text-2xl font-serif font-light text-[#1a1a1a] dark:text-white">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}