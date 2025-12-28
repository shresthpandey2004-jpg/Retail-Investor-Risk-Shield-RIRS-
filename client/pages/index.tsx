import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  BellIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const HomePage: NextPage = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Portfolio Risk Scanner',
      description: 'Comprehensive analysis of your portfolio with risk scoring, concentration analysis, and personalized recommendations.',
      color: 'text-primary-600'
    },
    {
      icon: ExclamationTriangleIcon,
      title: 'Emotional Trading Guard',
      description: 'Detect over-trading patterns, panic behavior, and FOMO buying with AI-powered behavioral analysis.',
      color: 'text-warning-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Scam & Fraud Detector',
      description: 'Identify pump & dump schemes, operator-driven stocks, and suspicious trading patterns before you invest.',
      color: 'text-danger-600'
    },
    {
      icon: BellIcon,
      title: 'Smart Alert System',
      description: 'Receive meaningful, non-spam alerts via email, WhatsApp, and in-app notifications.',
      color: 'text-success-600'
    },
    {
      icon: AcademicCapIcon,
      title: 'Risk Learning Hub',
      description: 'Interactive education with real-world examples, gamified learning, and progressive skill building.',
      color: 'text-purple-600'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'SIP Discipline Engine',
      description: 'Smart SIP planning with discipline tracking, reminders, and long-term projection modeling.',
      color: 'text-indigo-600'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'RIRS saved me from a major loss. The scam detector flagged a suspicious stock that I was about to invest ₹2 lakhs in. Best investment protection tool!'
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'The emotional trading guard helped me realize I was panic selling during market dips. Now I\'m a much more disciplined investor.'
    },
    {
      name: 'Amit Patel',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Portfolio risk analysis is incredibly detailed. It showed me concentration risks I never knew existed. Highly recommended!'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for beginners',
      features: [
        'Basic Risk Score',
        'Limited Portfolio Analysis',
        'Basic Alerts',
        '1 Portfolio',
        'Community Support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '₹2,900',
      period: 'per month',
      description: 'For serious investors',
      features: [
        'Advanced Risk AI',
        'Complete Scam Detection',
        'Emotional Trading Guard',
        'Unlimited Alerts',
        'Priority Support',
        '10 Portfolios',
        'WhatsApp Alerts',
        'Learning Hub Access'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For institutions',
      features: [
        'White-label Solution',
        'Broker Integration',
        'Custom Analytics',
        'Dedicated Support',
        'API Access',
        'Unlimited Everything',
        'Custom Features',
        'SLA Guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <Layout>
      <Head>
        <title>RIRS - Retail Investor Risk Shield | Protect Your Investments</title>
        <meta name="description" content="Professional SaaS platform to protect retail investors from unnecessary losses, risky trades, scams, and emotional mistakes. Built for Indian stock market." />
        <meta name="keywords" content="stock market, risk management, investment protection, portfolio analysis, scam detection, emotional trading" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Protect Your{' '}
                <span className="gradient-text">Investments</span>
                <br />
                From Costly Mistakes
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto text-balance">
                Professional-grade risk management platform that shields retail investors from scams, 
                emotional trading, and unnecessary losses. Built specially for the Indian stock market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                No credit card required • SEBI compliant • 14-day free trial
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Investment Protection Suite
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Six powerful modules working together to make you a smarter, more disciplined investor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-medium transition-shadow duration-300">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by 10,000+ Investors
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how RIRS has helped investors avoid costly mistakes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that fits your investment journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card className={`p-8 h-full ${plan.popular ? 'ring-2 ring-primary-600' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {plan.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-success-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Protect Your Investments?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of smart investors who trust RIRS to guard their portfolios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;