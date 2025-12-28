import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  EyeIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskMeter } from './RiskMeter';

interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  totalInvestment: number;
  gainLoss: number;
  gainLossPercentage: number;
  riskScore: number;
  holdings: number;
}

interface PortfolioOverviewProps {
  portfolios: Portfolio[];
}

export const PortfolioOverview = ({ portfolios }: PortfolioOverviewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Portfolio Overview
        </h2>
        <Button variant="outline" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Portfolio
        </Button>
      </div>

      {portfolios.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <PlusIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No portfolios yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first portfolio to start tracking your investments
          </p>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Portfolio
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {portfolio.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {portfolio.holdings} holdings
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <RiskMeter score={portfolio.riskScore} size="small" showLabel={false} />
                  <Link href={`/portfolio/${portfolio.id}`}>
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(portfolio.totalValue)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investment</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(portfolio.totalInvestment)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gain/Loss</p>
                  <div className="flex items-center space-x-2">
                    <p className={`text-xl font-semibold ${
                      portfolio.gainLoss >= 0 
                        ? 'text-success-600 dark:text-success-400' 
                        : 'text-danger-600 dark:text-danger-400'
                    }`}>
                      {formatCurrency(portfolio.gainLoss)}
                    </p>
                    <div className={`flex items-center text-sm ${
                      portfolio.gainLossPercentage >= 0 
                        ? 'text-success-600 dark:text-success-400' 
                        : 'text-danger-600 dark:text-danger-400'
                    }`}>
                      {portfolio.gainLossPercentage >= 0 ? (
                        <TrendingUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {formatPercentage(portfolio.gainLossPercentage)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk indicator bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Risk Level</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {portfolio.riskScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      portfolio.riskScore <= 30 
                        ? 'bg-success-500' 
                        : portfolio.riskScore <= 70 
                        ? 'bg-warning-500' 
                        : 'bg-danger-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${portfolio.riskScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
};