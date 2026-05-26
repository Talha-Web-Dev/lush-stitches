import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { products, categories } from '../data/products';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const PRICE_RANGES = [
  { label: 'Under $200', min: 0, max: 200 },
  { label: '$200 – $500', min: 200, max: 500 },
  { label: '$500 – $1000', min: 500, max: 1000 },
  { label: 'Over $1000', min: 1000, max: Infinity },
];

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(t => t.includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (selectedPrice) {
      list = list.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
    }

    if (searchParams.get('filter') === 'sale') {
      list = list.filter(p => p.originalPrice);
    }

    switch (sort) {
      case 'new': list = list.filter(p => p.badge === 'New').concat(list.filter(p => p.badge !== 'New')); break;
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
    }

    return list;
  }, [search, selectedCategory, selectedPrice, sort, searchParams]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedPrice(null);
    setSort('featured');
    setPage(1);
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    !!selectedPrice,
    !!search,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Discover</span>
        <h1 className="mt-1 text-3xl lg:text-4xl font-serif font-light text-[#1a1a1a] dark:text-white">
          {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-400">{filtered.length} products</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-full text-sm bg-transparent outline-none focus:border-[#c9a96e] transition-colors dark:placeholder:text-gray-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Filters toggle */}
        <button
          onClick={() => setFiltersOpen(s => !s)}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase rounded-full border transition-colors ${filtersOpen ? 'bg-[#c9a96e] border-[#c9a96e] text-white' : 'border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white hover:border-[#c9a96e]'}`}
        >
          <SlidersHorizontal size={13} />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="appearance-none pl-4 pr-8 py-2.5 border border-gray-200 dark:border-white/10 rounded-full text-xs tracking-widest uppercase bg-transparent outline-none cursor-pointer text-[#1a1a1a] dark:text-white"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
        </div>

        {/* Clear filters */}
        {activeFiltersCount > 0 && (
          <button onClick={clearFilters} className="text-xs text-[#c9a96e] hover:opacity-70 transition-opacity tracking-wider uppercase">
            Clear All
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-gray-50 dark:bg-white/3 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3 font-medium">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
                      className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-colors border ${selectedCategory === cat.id ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] border-[#1a1a1a] dark:border-white' : 'border-gray-200 dark:border-white/10 hover:border-[#c9a96e] text-[#1a1a1a] dark:text-white'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3 font-medium">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedPrice(selectedPrice?.label === range.label ? null : range); setPage(1); }}
                      className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-colors border ${selectedPrice?.label === range.label ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] border-[#1a1a1a] dark:border-white' : 'border-gray-200 dark:border-white/10 hover:border-[#c9a96e] text-[#1a1a1a] dark:text-white'}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">◈</div>
          <h3 className="text-lg font-serif text-[#1a1a1a] dark:text-white mb-2">No products found</h3>
          <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="px-6 py-2.5 bg-[#c9a96e] text-white text-xs tracking-widest uppercase rounded hover:bg-[#9a7a4a] transition-colors">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {paginated.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center disabled:opacity-30 hover:border-[#c9a96e] transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-full text-xs font-medium transition-colors ${page === i + 1 ? 'bg-[#c9a96e] text-white border-[#c9a96e]' : 'border border-gray-200 dark:border-white/10 hover:border-[#c9a96e]'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center disabled:opacity-30 hover:border-[#c9a96e] transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}