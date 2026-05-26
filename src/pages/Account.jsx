import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, Edit2, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';

const MOCK_ORDERS = [
  { id: 'LS-2024-0089', date: 'Nov 12, 2024', status: 'Delivered', total: 890, items: 1 },
  { id: 'LS-2024-0072', date: 'Oct 28, 2024', status: 'In Transit', total: 1240, items: 2 },
  { id: 'LS-2024-0055', date: 'Sep 14, 2024', status: 'Delivered', total: 420, items: 1 },
];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  'In Transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  Processing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
};

function TabContent({ tab, user, wishlistItems }) {
  if (tab === 'profile') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#c9a96e]/30">
              {user.avatar
                ? <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-[#c9a96e] flex items-center justify-center text-white text-2xl font-serif">{user.name[0]}</div>
              }
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#c9a96e] text-white flex items-center justify-center">
              <Edit2 size={10} />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-serif font-light text-[#1a1a1a] dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-[11px] tracking-wider uppercase text-[#c9a96e] mt-0.5">Member since 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', value: user.name },
            { label: 'Email Address', value: user.email },
            { label: 'Phone', value: '+1 (555) 234-5678' },
            { label: 'Date of Birth', value: 'January 15, 1990' },
          ].map(field => (
            <div key={field.label}>
              <label className="text-[10px] tracking-[0.3em] uppercase text-gray-400 block mb-1.5">{field.label}</label>
              <input
                defaultValue={field.value}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-white/10 rounded bg-transparent text-sm text-[#1a1a1a] dark:text-white outline-none focus:border-[#c9a96e] transition-colors"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => toast.success('Profile updated')}
          className="btn-press px-8 py-2.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs tracking-widest uppercase rounded hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white transition-colors"
        >
          Save Changes
        </button>
      </div>
    );
  }

  if (tab === 'orders') {
    return (
      <div>
        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-5 font-medium">Order History</h3>
        <div className="space-y-3">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/3 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-medium text-sm text-[#1a1a1a] dark:text-white">{order.id}</span>
                  <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-[#1a1a1a] dark:text-white">${order.total.toLocaleString()}</div>
                <button className="text-[10px] text-[#c9a96e] tracking-wider uppercase mt-1 hover:opacity-70 transition-opacity">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 'wishlist') {
    return (
      <div>
        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-5 font-medium">Saved Items ({wishlistItems.length})</h3>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm mb-4">No saved items yet.</p>
            <Link to="/shop" className="text-xs text-[#c9a96e] tracking-widest uppercase">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wishlistItems.map(item => (
              <Link key={item.id} to={`/product/${item.id}`} className="group">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-50 dark:bg-white/5 mb-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-xs font-medium line-clamp-1 text-[#1a1a1a] dark:text-white">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">${item.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (tab === 'settings') {
    return (
      <div className="space-y-5">
        <h3 className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-5 font-medium">Preferences</h3>
        {[
          { label: 'Email notifications', desc: 'Receive updates about orders and promotions' },
          { label: 'Marketing emails', desc: 'New collections, lookbooks, and exclusive offers' },
          { label: 'SMS alerts', desc: 'Order and shipping notifications via SMS' },
        ].map(pref => (
          <div key={pref.label} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/5">
            <div>
              <div className="text-sm font-medium text-[#1a1a1a] dark:text-white">{pref.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{pref.desc}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a96e]"></div>
            </label>
          </div>
        ))}
        <div className="pt-2">
          <h4 className="text-xs tracking-widest uppercase text-gray-400 mb-4">Danger Zone</h4>
          <button className="text-xs text-red-400 hover:text-red-500 tracking-wider uppercase border border-red-200 dark:border-red-900/30 px-4 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    );
  }
}

export default function Account() {
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [tab, setTab] = useState('profile');

  if (!user) return <Navigate to="/auth/login" replace />;

  const tabs = [
    { id: 'profile', label: 'Profile', Icon: User },
    { id: 'orders', label: 'Orders', Icon: Package },
    { id: 'wishlist', label: 'Wishlist', Icon: Heart },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">My Account</span>
        <h1 className="mt-1 text-3xl font-serif font-light text-[#1a1a1a] dark:text-white">
          Hello, {user.name.split(' ')[0]}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${tab === id ? 'bg-[#c9a96e]/10 text-[#c9a96e] font-medium' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/3 hover:text-[#1a1a1a] dark:hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} strokeWidth={1.5} />
                  {label}
                </div>
                <ChevronRight size={12} className={tab === id ? 'text-[#c9a96e]' : 'text-gray-300'} />
              </button>
            ))}
            <button
              onClick={() => { logout(); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-4"
            >
              <LogOut size={15} strokeWidth={1.5} />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-white/3 rounded-xl p-6 lg:p-8"
          >
            <TabContent tab={tab} user={user} wishlistItems={wishlistItems} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
