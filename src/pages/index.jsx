import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function AuthLayout({ children, title, subtitle, image }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Image */}
      <div className="hidden lg:block relative">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-12 text-white">
          <div className="text-3xl font-serif font-light tracking-[0.1em]">Lush Stitches</div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-[#c9a96e] mt-1">Luxury Atelier</div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white dark:bg-[#0d0d0d]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <Link to="/" className="text-xl font-serif tracking-[0.1em] text-[#1a1a1a] dark:text-white lg:hidden block mb-8">
              Lush Stitches
            </Link>
            <h1 className="text-2xl font-serif font-light text-[#1a1a1a] dark:text-white">{title}</h1>
            <p className="mt-1 text-sm text-gray-400 font-light">{subtitle}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/account');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      image="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded bg-transparent text-sm outline-none focus:border-[#c9a96e] transition-colors dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 pr-11 border border-gray-200 dark:border-white/10 rounded bg-transparent text-sm outline-none focus:border-[#c9a96e] transition-colors dark:text-white dark:placeholder:text-gray-500"
            />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
            <input type="checkbox" className="rounded accent-[#c9a96e]" />
            Remember me
          </label>
          <Link to="/auth/forgot-password" className="text-[#c9a96e] hover:opacity-70 tracking-wider">Forgot password?</Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-press w-full py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-medium rounded flex items-center justify-center gap-2 hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing In...' : <><span>Sign In</span><ArrowRight size={13} /></>}
        </button>
      </form>

      <div className="relative flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
        <span className="text-xs text-gray-300 dark:text-gray-600">or</span>
        <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
      </div>

      <p className="text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-[#c9a96e] hover:opacity-70 tracking-wider font-medium">Create one</Link>
      </p>
    </AuthLayout>
  );
}

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success('Account created! Welcome to Lush Stitches.');
      navigate('/account');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Lush Stitches atelier"
      image="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Full Name', type: 'text', value: name, setter: setName, placeholder: 'Alexandra Chen' },
          { label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'your@email.com' },
        ].map(field => (
          <div key={field.label}>
            <label className="text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-1.5">{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              placeholder={field.placeholder}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded bg-transparent text-sm outline-none focus:border-[#c9a96e] transition-colors dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        ))}
        <div>
          <label className="text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              minLength={8}
              className="w-full px-4 py-3 pr-11 border border-gray-200 dark:border-white/10 rounded bg-transparent text-sm outline-none focus:border-[#c9a96e] transition-colors dark:text-white dark:placeholder:text-gray-500"
            />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-press w-full py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-medium rounded flex items-center justify-center gap-2 hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : <><span>Create Account</span><ArrowRight size={13} /></>}
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-[#c9a96e] hover:opacity-70 tracking-wider font-medium">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="We'll send you a reset link"
      image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85"
    >
      {sent ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h3 className="font-serif text-lg text-[#1a1a1a] dark:text-white mb-2">Check Your Email</h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            We've sent a password reset link to <strong className="text-[#1a1a1a] dark:text-white">{email}</strong>
          </p>
          <Link to="/auth/login" className="inline-block mt-6 text-xs tracking-widest uppercase text-[#c9a96e] hover:opacity-70">
            ← Back to Sign In
          </Link>
        </motion.div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded bg-transparent text-sm outline-none focus:border-[#c9a96e] transition-colors dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
          <button type="submit" className="btn-press w-full py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-medium rounded flex items-center justify-center gap-2 hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white transition-colors">
            Send Reset Link <ArrowRight size={13} />
          </button>
          <Link to="/auth/login" className="block text-center text-xs text-gray-400 hover:text-[#c9a96e] transition-colors tracking-wider">
            ← Back to Sign In
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
