import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginModal: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(
        formData.email.trim().toLowerCase(),
        formData.password,
        isAdminMode ? 'admin' : undefined
      );
      navigate(isAdminMode ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    setError(null);
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-8">
          <div
            className={`mx-auto w-16 h-16 bg-gradient-to-br ${
              isAdminMode ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600'
            } rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
          >
            {isAdminMode ? <Shield className="w-8 h-8 text-white" /> : <User className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{isAdminMode ? 'Admin Portal' : 'Welcome Back'}</h2>
          <p className="mt-2 text-gray-600">{isAdminMode ? 'Admin-only access' : 'Sign in to your ICSTMN account'}</p>
        </div>

        <div className="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-sm focus:ring-2 ${
                    isAdminMode ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-green-500 focus:border-green-500'
                  } focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  placeholder={isAdminMode ? 'admin@icstmn.org.ng' : 'your.email@example.com'}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-sm focus:ring-2 ${
                    isAdminMode ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-green-500 focus:border-green-500'
                  } focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 text-white rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg ${
                isAdminMode
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-400'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-400'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                isAdminMode ? 'Login as Admin' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            {!isAdminMode ? (
              <button
                onClick={toggleAdminMode}
                className="text-xs text-gray-400 hover:text-gray-500 transition-colors underline"
                disabled={isLoading}
              >
                Login as Admin
              </button>
            ) : (
              <button
                onClick={() => setIsAdminMode(false)}
                className="text-sm text-gray-600 hover:text-gray-700 transition-colors flex items-center justify-center mx-auto"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to User Login
              </button>
            )}
          </div>

          {!isAdminMode && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline"
                >
                  Create Account
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="block text-sm text-gray-500 hover:text-gray-600 transition-colors hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;