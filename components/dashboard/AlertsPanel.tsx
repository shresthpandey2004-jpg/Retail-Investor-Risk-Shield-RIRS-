import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Alert {
  id: string;
  type: 'risk' | 'fraud' | 'concentration' | 'volatility' | 'info';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'fraud':
        return ShieldExclamationIcon;
      case 'risk':
      case 'concentration':
      case 'volatility':
        return ExclamationTriangleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-danger-50 dark:bg-danger-900/20',
          border: 'border-danger-200 dark:border-danger-800',
          icon: 'text-danger-600 dark:text-danger-400',
          title: 'text-danger-900 dark:text-danger-100'
        };
      case 'high':
        return {
          bg: 'bg-warning-50 dark:bg-warning-900/20',
          border: 'border-warning-200 dark:border-warning-800',
          icon: 'text-warning-600 dark:text-warning-400',
          title: 'text-warning-900 dark:text-warning-100'
        };
      case 'medium':
        return {
          bg: 'bg-primary-50 dark:bg-primary-900/20',
          border: 'border-primary-200 dark:border-primary-800',
          icon: 'text-primary-600 dark:text-primary-400',
          title: 'text-primary-900 dark:text-primary-100'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700',
          icon: 'text-gray-600 dark:text-gray-400',
          title: 'text-gray-900 dark:text-gray-100'
        };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Active Alerts
        </h2>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-200">
            {alerts.filter(alert => alert.severity === 'high' || alert.severity === 'critical').length} High Priority
          </span>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <ShieldExclamationIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            No active alerts. Your investments are looking good!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {alerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            const colors = getAlertColor(alert.severity);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${colors.title}`}>
                        {alert.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'critical' 
                            ? 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-200'
                            : alert.severity === 'high'
                            ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                            : alert.severity === 'medium'
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {alert.type} Alert
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" className="w-full">
            View All Alerts
          </Button>
        </div>
      )}
    </Card>
  );
};