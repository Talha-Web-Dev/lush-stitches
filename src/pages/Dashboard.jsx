import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart2, Settings, TrendingUp, TrendingDown, Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

const stats = [
  { label: 'Total Revenue', value: '$124,580', change: '+12.5%', up: true, icon: BarChart2 },
  { label: 'Orders', value: '1,247', change: '+8.2%', up: true, icon: ShoppingBag },
  { label: 'Products', value: '89', change: '+3', up: true, icon: Package },
  { label: 'Customers', value: '4,321', change: '+22.1%', up: true, icon: Users },
];

const recentOrders = [
  { id: 'LS-2024-0099', customer: 'Alexandra Chen', product: 'Silk Evening Gown', amount: 890, status: 'Delivered' },
  { id: 'LS-2024-0098', customer: 'James Whitmore', product: 'Wool Overcoat', amount: 1240, status: 'Processing' },
  { id: 'LS-2024-0097', customer: 'Isabelle Moreau', product: 'Cashmere Sweater', amount: 420, status: 'In Transit' },
  { id: 'LS-2024-0096', customer: 'Marcus Bell', product: 'Chelsea Boots', amount: 545, status: 'Delivered' },
];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
};

function ProductModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-[#1a1a1a] rounded-xl w-full max-w-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg text-[#1a1a1a] dark:text-white">Add New Product</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Product Name', type: 'text', placeholder: 'e.g. Silk Evening Gown' },
            { label: 'Price ($)', type: 'number', placeholder: '0.00' },
            { label: 'Category', type: 'text', placeholder: 'women, men, accessories...' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} className="w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded text-sm bg-transparent outline-none focus:border-[#c9a96e] transition-colors" />
            </div>
          ))}
          <div>
            <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">Description</label>
            <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded text-sm bg-transparent outline-none focus:border-[#c9a96e] transition-colors resize-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 dark:border-white/10 rounded text-xs tracking-widest uppercase hover:border-gray-300 transition-colors">Cancel</button>
          <button className="flex-1 py-2.5 bg-[#c9a96e] text-white rounded text-xs tracking-widest uppercase hover:bg-[#9a7a4a] transition-colors">Add Product</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  if (!user) return <Navigate to="/auth/login" replace />;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { id: 'products', label: 'Products', Icon: Package },
    { id: 'orders', label: 'Orders', Icon: ShoppingBag },
    { id: 'customers', label: 'Customers', Icon: Users },
    { id: 'analytics', label: 'Analytics', Icon: BarChart2 },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex pt-16">
      {showModal && <ProductModal onClose={() => setShowModal(false)} />}

      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-white dark:bg-[#111] border-r border-gray-100 dark:border-white/5 fixed left-0 top-16 bottom-0 overflow-y-auto hidden md:block">
        <div className="p-4 pt-6">
          <p className="text-[9px] tracking-[0.4em] uppercase text-gray-400 mb-4 px-2">Admin Panel</p>
          <nav className="space-y-0.5">
            {sidebarItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs tracking-wider transition-colors ${activeTab === id ? 'bg-[#c9a96e]/10 text-[#c9a96e] font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <Icon size={14} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 md:ml-56 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-serif font-light text-[#1a1a1a] dark:text-white capitalize">{activeTab}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Lush Stitches Admin · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          {activeTab === 'products' && (
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-white text-xs tracking-widest uppercase rounded hover:bg-[#9a7a4a] transition-colors">
              <Plus size={13} /> Add Product
            </button>
          )}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-white/5 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-widest uppercase text-gray-400">{stat.label}</span>
                    <stat.icon size={14} className="text-[#c9a96e]" strokeWidth={1.5} />
                  </div>
                  <div className="text-2xl font-semibold text-[#1a1a1a] dark:text-white">{stat.value}</div>
                  <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-400'}`}>
                    {stat.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {stat.change} <span className="text-gray-400 font-normal">vs last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revenue chart placeholder */}
            <div className="bg-white dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-xs tracking-widest uppercase text-gray-400 mb-6">Revenue Overview</h3>
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#c9a96e]/20 hover:bg-[#c9a96e]/40 rounded-t transition-colors relative group cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${Math.round(h * 1200)}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m} className="flex-1 text-center text-[9px] text-gray-400">{m}</span>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-xs tracking-widest uppercase text-gray-400 mb-5">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                      {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                        <th key={h} className="text-left py-2 pb-3 text-[10px] tracking-widest uppercase text-gray-400 font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                        <td className="py-3 font-medium text-[#1a1a1a] dark:text-white">{order.id}</td>
                        <td className="py-3 text-gray-500 dark:text-gray-400">{order.customer}</td>
                        <td className="py-3 text-gray-500 dark:text-gray-400">{order.product}</td>
                        <td className="py-3 font-semibold text-[#1a1a1a] dark:text-white">${order.amount}</td>
                        <td className="py-3">
                          <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-white/10 rounded text-xs bg-transparent outline-none focus:border-[#c9a96e] transition-colors"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5">
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                      <th key={h} className="text-left py-2 pb-3 text-[10px] tracking-widest uppercase text-gray-400 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded overflow-hidden flex-shrink-0">
                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-[#1a1a1a] dark:text-white text-xs leading-tight max-w-32 line-clamp-2">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400 text-xs capitalize">{p.category}</td>
                      <td className="py-3 font-semibold text-[#1a1a1a] dark:text-white text-xs">${p.price}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-medium ${p.inStock ? 'text-green-500' : 'text-red-400'}`}>
                          {p.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-gray-500">{p.rating} ★</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded hover:bg-[#c9a96e]/10 text-gray-400 hover:text-[#c9a96e] transition-colors">
                            <Edit2 size={12} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs */}
        {!['dashboard', 'products'].includes(activeTab) && (
          <div className="bg-white dark:bg-white/5 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">◈</div>
            <h3 className="font-serif text-lg text-[#1a1a1a] dark:text-white mb-2 capitalize">{activeTab} Module</h3>
            <p className="text-gray-400 text-sm">This section is ready to be connected to your backend API.</p>
          </div>
        )}
      </main>
    </div>
  );
}
