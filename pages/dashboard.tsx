import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  BellIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { RiskMeter } from '@/components/dashboard/RiskMeter';
import { PortfolioOverview } from '@/components/dashboard/PortfolioOverview';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

const DashboardPage: NextPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    portfolios: [
      {
        id: '1',
        name: 'Main Portfolio',
        totalValue: 850000,
        totalInvestment: 750000,
        gainLoss: 100000,
        gainLossPercentage: 13.33,
        riskScore: 65,
        holdings: 12
      }
    ],
    overallRiskScore: 65,
    emotionalStability: 78,
    alerts: [
      {
        id: '1',
        type: 'risk',
        title: 'High Concentration Risk Detected',
        message: 'Your portfolio has 45% allocation in Technology sector. Consider diversifying.',
        severity: 'medium',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'fraud',
        title: 'Suspicious Stock Activity',
        message: 'ABCLTD shows unusual volume patterns. Review before investing more.',
        severity: 'high',
        timestamp: new Date().toISOString()
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'scan',
        title: 'Portfolio Risk Scan Completed',
        description: 'Main Portfolio analyzed - Risk score: 65/100',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'alert',
        title: 'New Risk Alert Generated',
        description: 'High concentration risk detected in Technology sector',
        timestamp: new Date().toISOString()
      }
    ]
  });

  const stats = [
    {
      name: 'Total Portfolio Value',
      value: '₹8,50,000',
      change: '+13.33%',
      changeType: 'positive',
      icon: TrendingUpIcon,
    },
    {
      name: 'Overall Risk Score',
      value: '65/100',
      change: 'Medium Risk',
      changeType: 'neutral',
      icon: ChartBarIcon,
    },
    {
      name: 'Active Alerts',
      value: '2',
      change: '1 High Priority',
      changeType: 'negative',
      icon: BellIcon,
    },
    {
      name: 'Emotional Stability',
      value: '78/100',
      change: 'Good',
      changeType: 'positive',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <Layout title="Dashboard">
      <Head>
        <title>Dashboard | RIRS</title>
        <meta name="description" content="Your investment protection dashboard - monitor risk, track alerts, and manage your portfolios." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Here's your investment protection overview for today.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${
                        stat.changeType === 'positive' 
                          ? 'text-success-600' 
                          : stat.changeType === 'negative' 
                          ? 'text-danger-600' 
                          : 'text-gray-500'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Risk Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Risk Analysis
                    </h2>
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                        Overall Risk Score
                      </h3>
                      <RiskMeter score={dashboardData.overallRiskScore} size="large" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                        Emotional Stability
                      </h3>
                      <RiskMeter score={dashboardData.emotionalStability} size="large" type="stability" />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Key Recommendations
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Reduce Technology sector allocation from 45% to 30%</li>
                      <li>• Consider adding defensive stocks to balance risk</li>
                      <li>• Review stop-loss levels for high-beta stocks</li>
                    </ul>
                  </div>
                </Card>
              </motion.div>

              {/* Portfolio Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <PortfolioOverview portfolios={dashboardData.portfolios} />
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <RecentActivity activities={dashboardData.recentActivity} />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add New Portfolio
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ChartBarIcon className="h-4 w-4 mr-2" />
                      Run Risk Scan
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                      Check for Scams
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Alerts Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <AlertsPanel alerts={dashboardData.alerts} />
              </motion.div>

              {/* Plan Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Your Plan
                  </h2>
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 mb-3">
                      {user?.plan?.toUpperCase() || 'FREE'} PLAN
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {user?.plan === 'free' 
                        ? 'Upgrade to unlock advanced features'
                        : 'Enjoying full protection features'
                      }
                    </p>
                    {user?.plan === 'free' && (
                      <Button className="w-full">
                        Upgrade to Pro
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;