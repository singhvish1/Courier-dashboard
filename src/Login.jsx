import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Eye, EyeOff, Package } from 'lucide-react';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Enhanced authentication with user roles and courier IDs
      const validUsers = [
        { username: 'admin', password: 'courier123', displayName: 'Administrator', role: 'admin', courierId: null },
        { username: 'manager', password: 'manager456', displayName: 'Manager', role: 'manager', courierId: null },
        { username: 'supervisor', password: 'super789', displayName: 'Supervisor', role: 'supervisor', courierId: null },
        { username: 'john.doe', password: 'john123', displayName: 'John D.', role: 'courier', courierId: 'JD' },
        { username: 'amanda.l', password: 'amanda456', displayName: 'Amanda L.', role: 'courier', courierId: 'AL' },
        { username: 'mike.smith', password: 'mike789', displayName: 'Mike S.', role: 'courier', courierId: 'MS' },
        { username: 'lisa.h', password: 'lisa456', displayName: 'Lisa H.', role: 'courier', courierId: 'LH' },
        { username: 'tom.r', password: 'tom123', displayName: 'Tom R.', role: 'courier', courierId: 'TR' },
      ];

      // Check if the entered credentials match any valid user
      const authenticatedUser = validUsers.find(
        user => user.username === formData.username && user.password === formData.password
      );

      if (authenticatedUser) {
        // Pass complete user info and remember me preference
        onLogin(authenticatedUser, rememberMe);
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-orange-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* FedEx Header */}
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-2xl">
                <Truck className="w-10 h-10 text-purple-800" />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-2xl">
                <Package className="w-10 h-10 text-orange-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Fed<span className="text-orange-400">Ex</span>
            </h1>
            <h2 className="text-xl font-semibold text-purple-200">
              Courier Operations Portal
            </h2>
            <p className="mt-3 text-sm text-purple-100">
              Secure access to your logistics dashboard
            </p>
          </div>

          {/* Enhanced Login Form */}
          <motion.form
            className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Employee ID / Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all sm:text-sm font-medium"
                  placeholder="Enter your employee ID"
                />
              </div>

              {/* Password Label moved between inputs */}
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 text-center -mt-2">
                Security Password
              </label>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="password-input appearance-none relative block w-full px-4 py-3 pr-12 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all sm:text-sm font-medium"
                    placeholder="Enter your secure password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between mt-3 md:mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">
                  Remember me for today
                </label>
              </div>
              <button 
                onClick={() => {/* Handle forgot password */}} 
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm font-medium"
              >
                <div className="flex items-center">
                  <span className="font-semibold">Authentication Failed:</span>
                  <span className="ml-1">{error}</span>
                </div>
              </motion.div>
            )}

            {/* Enhanced Submit Button */}
            <div className="mt-8 md:mt-10">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Secure Login</span>
                    <Truck className="ml-2 w-5 h-5" />
                  </div>
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                © 2025 FedEx Corporation. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Secure access to FedEx courier operations
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
