import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';

interface Activity {
  id: string;
  type: 'scan' | 'alert' | 'analysis' | 'report' | 'update';
  title: string;
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'scan':
        return ChartBarIcon;
      case 'alert':
        return BellIcon;
      case 'analysis':
        return ShieldCheckIcon;
      case 'report':
        return DocumentTextIcon;
      default:
        return ClockIcon;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'scan':
        return 'text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-400';
      case 'alert':
        return 'text-warning-600 bg-warning-100 dark:bg-warning-900 dark:text-warning-400';
      case 'analysis':
        return 'text-success-600 bg-success-100 dark:bg-success-900 dark:text-success-400';
      case 'report':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <button className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
          View All
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            No recent activity to show
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Timeline indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <ClockIcon className="h-4 w-4 mr-2" />
          Last updated: {formatTimestamp(new Date().toISOString())}
        </div>
      </div>
    </Card>
  );
};