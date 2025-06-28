import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
    setIsLoading(false);
  };

  const demoAccounts = [
    { email: 'student@oxford.edu', role: 'Student' },
    { email: 'faculty@oxford.edu', role: 'Faculty' },
    { email: 'hod@oxford.edu', role: 'HOD' },
    { email: 'principal@oxford.edu', role: 'Principal' },
    { email: 'director@oxford.edu', role: 'Director' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <GraduationCap className="h-12 w-12 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900">Oxford ERP</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your educational portal
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Demo Accounts */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Demo Accounts</h3>
            <p className="text-primary-100 mb-8">
              Use any of these accounts to explore different user roles. Any password will work.
            </p>
            
            <div className="space-y-4">
              {demoAccounts.map((account) => (
                <div 
                  key={account.email}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setEmail(account.email)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{account.role}</p>
                      <p className="text-sm text-primary-100">{account.email}</p>
                    </div>
                    <div className="text-xs bg-gold-500 text-gold-900 px-2 py-1 rounded">
                      Click to use
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}