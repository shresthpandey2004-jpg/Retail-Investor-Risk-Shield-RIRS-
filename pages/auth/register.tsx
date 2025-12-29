import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const RegisterPage: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    if (!formData.agreeToTerms) {
      return;
    }

    setLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
    } catch (error) {
      // Error is handled in the register function
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const isFormValid = formData.name && formData.email && formData.password && 
                     formData.confirmPassword && passwordsMatch && formData.agreeToTerms;

  const benefits = [
    'Complete portfolio risk analysis',
    'Scam and fraud detection',
    'Emotional trading protection',
    'Smart alerts and notifications',
    'Educational resources',
    '14-day free trial'
  ];

  return (
    <>
      <Head>
        <title>Create Account | RIRS</title>
        <meta name="description" content="Create your RIRS account and start protecting your investments today. Free 14-day trial included." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="text-center lg:text-left">
                <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                  <ShieldCheckIcon className="h-10 w-10 text-primary-600" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    RIRS
                  </span>
                </Link>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Protect Your Investments Today
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Join thousands of smart investors who trust RIRS to guard their portfolios
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-success-600 dark:text-success-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto w-full"
            >
              {/* Mobile header */}
              <div className="text-center lg:hidden mb-8">
                <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    RIRS
                  </span>
                </Link>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create your account
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Start your free trial today
                </p>
              </div>

              <Card className="p-8">
                <div className="hidden lg:block text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create your account
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Start your free trial today
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="label">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="input"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="label">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        className="input pr-10"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Password strength: {formData.password.length >= 8 ? 'Strong' : 'Weak'}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="label">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        className={`input pr-10 ${
                          formData.confirmPassword && !passwordsMatch 
                            ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-500' 
                            : ''
                        }`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword && !passwordsMatch && (
                      <p className="mt-1 text-sm text-danger-600">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="text-gray-700 dark:text-gray-300">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    loading={loading}
                    disabled={!isFormValid}
                  >
                    Create account
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Sign in link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;