import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Instagram } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, testimonials, collections, instagramImages, categories } from '../data/products';


function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0b09]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0d0b09]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#c9a96e] text-[11px] tracking-[0.5em] uppercase font-medium">
              Autumn / Winter 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.1] tracking-tight"
          >
            Dressed in<br />
            <em className="italic text-[#c9a96e]">Quiet Luxury</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 text-gray-300 text-base font-light leading-relaxed max-w-sm"
          >
            Timeless pieces crafted from the world's finest materials. Explore our new autumn atelier collection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex items-center gap-4"
          >
            <Link
              to="/shop"
              className="btn-press px-8 py-3.5 bg-[#c9a96e] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#9a7a4a] transition-colors rounded"
            >
              Shop Collection
            </Link>
            <Link
              to="/collections"
              className="text-white text-xs tracking-widest uppercase font-light flex items-center gap-2 hover:gap-3 transition-all border-b border-white/30 pb-0.5"
            >
              View Lookbook <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

function MarqueeSection() {
  const items = ['Luxury Craftsmanship', 'Sustainable Materials', 'Timeless Design', 'Italian Atelier', 'Limited Editions', 'Free Returns'];
  return (
    <div className="overflow-hidden py-5 bg-[#c9a96e]">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-12">
            {item} <span className="text-white/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedCollections() {
  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Curated</span>
          <h2 className="mt-1 text-3xl lg:text-4xl font-serif font-light text-[#1a1a1a] dark:text-white">Featured Collections</h2>
        </div>
        <Link to="/shop" className="text-xs tracking-widest uppercase text-[#c9a96e] hover:opacity-70 transition-opacity hidden sm:flex items-center gap-2">
          View All <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'md:row-span-2 aspect-[4/5]' : 'aspect-[4/3]'}`}
          >
            <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase">{col.subtitle}</p>
              <h3 className="text-white text-xl font-serif font-light mt-1">{col.name}</h3>
              <p className="text-white/60 text-xs mt-1">{col.items} pieces</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-16 bg-[#f8f5f0] dark:bg-white/3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Explore</span>
          <h2 className="mt-1 text-3xl font-serif font-light text-[#1a1a1a] dark:text-white">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.filter(c => c.id !== 'all').map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="block text-center py-6 px-4 bg-white dark:bg-white/5 rounded-xl hover:bg-[#c9a96e] hover:text-white transition-all duration-300 group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
                <div className="text-xs tracking-widest uppercase text-[#1a1a1a] dark:text-white group-hover:text-white font-medium">{cat.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Handpicked</span>
          <h2 className="mt-1 text-3xl lg:text-4xl font-serif font-light text-[#1a1a1a] dark:text-white">Featured Products</h2>
        </div>
        <Link to="/shop" className="text-xs tracking-widest uppercase text-[#c9a96e] hover:opacity-70 transition-opacity hidden sm:flex items-center gap-2">
          View All <ArrowRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function BannerSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#c9a96e] text-[11px] tracking-[0.5em] uppercase">Exclusive</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-serif font-light leading-tight">
            The Art of<br /><em className="italic">Effortless Dressing</em>
          </h2>
          <p className="mt-4 text-gray-300 text-sm font-light leading-relaxed max-w-sm mx-auto">
            Discover our curated edit of seasonless pieces designed to be worn for decades, not seasons.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 px-10 py-3.5 border border-white text-white text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all rounded"
          >
            Explore Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-[#f8f5f0] dark:bg-white/3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Words</span>
          <h2 className="mt-1 text-3xl font-serif font-light text-[#1a1a1a] dark:text-white">From Our Clients</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-white/5 rounded-xl p-7 relative"
            >
              <span className="text-5xl font-serif text-[#c9a96e]/30 leading-none block -mt-2 mb-3">"</span>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed italic">
                {t.text}
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-white/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#c9a96e]/30" />
                <div>
                  <div className="text-sm font-semibold text-[#1a1a1a] dark:text-white">{t.name}</div>
                  <div className="text-[11px] text-gray-400">{t.role}</div>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={10} className="fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 bg-[#0d0d0d] text-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Stay Connected</span>
        <h2 className="mt-2 text-3xl font-serif font-light">Join the Atelier</h2>
        <p className="mt-3 text-gray-400 text-sm font-light leading-relaxed">
          Be the first to discover new collections, exclusive offers, and stories from behind the seams.
        </p>
        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-[#c9a96e] font-light text-sm">
            ✓ Welcome to Lush Stitches. Your invitation awaits.
          </motion.div>
        ) : (
          <div className="mt-8 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-3 text-sm outline-none focus:border-[#c9a96e] transition-colors placeholder:text-gray-500"
            />
            <button
              onClick={() => email && setSubmitted(true)}
              className="btn-press px-6 py-3 bg-[#c9a96e] text-white text-xs tracking-widest uppercase font-medium rounded hover:bg-[#9a7a4a] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        )}
        <p className="mt-3 text-gray-600 text-[11px]">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

function InstagramGallery() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-8">
        <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase flex items-center justify-center gap-2">
          <Instagram size={12} /> Follow Along
        </span>
        <h2 className="mt-1 text-3xl font-serif font-light text-[#1a1a1a] dark:text-white">@lushstitches</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {instagramImages.map((img, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative aspect-square overflow-hidden rounded group"
          >
            <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MarqueeSection />
      <FeaturedCollections />
      <CategoriesSection />
      <FeaturedProducts />
      <BannerSection />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </div>
  );
}