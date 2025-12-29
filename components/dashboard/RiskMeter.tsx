import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  type?: 'risk' | 'stability';
  showLabel?: boolean;
}

export const RiskMeter = ({ 
  score, 
  size = 'medium', 
  type = 'risk',
  showLabel = true 
}: RiskMeterProps) => {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'Low', color: 'success', bgColor: 'bg-success-500' };
    if (score <= 70) return { level: 'Medium', color: 'warning', bgColor: 'bg-warning-500' };
    return { level: 'High', color: 'danger', bgColor: 'bg-danger-500' };
  };

  const getStabilityLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'success', bgColor: 'bg-success-500' };
    if (score >= 60) return { level: 'Good', color: 'warning', bgColor: 'bg-warning-500' };
    return { level: 'Needs Work', color: 'danger', bgColor: 'bg-danger-500' };
  };

  const { level, color, bgColor } = type === 'risk' ? getRiskLevel(score) : getStabilityLevel(score);

  const sizeClasses = {
    small: { container: 'w-16 h-16', text: 'text-xs', label: 'text-xs' },
    medium: { container: 'w-24 h-24', text: 'text-sm', label: 'text-sm' },
    large: { container: 'w-32 h-32', text: 'text-lg', label: 'text-base' }
  };

  const { container, text, label } = sizeClasses[size];
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${container}`}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className={`text-${color}-500`}
            style={{
              strokeDasharray,
              strokeDashoffset,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`font-bold text-gray-900 dark:text-white ${text}`}>
              {score}
            </div>
            <div className={`text-gray-500 dark:text-gray-400 ${text === 'text-lg' ? 'text-xs' : 'text-xs'}`}>
              /100
            </div>
          </div>
        </div>
      </div>
      
      {showLabel && (
        <div className="text-center">
          <div className={`font-medium text-gray-900 dark:text-white ${label}`}>
            {level}
          </div>
          <div className={`text-gray-500 dark:text-gray-400 ${label === 'text-base' ? 'text-sm' : 'text-xs'}`}>
            {type === 'risk' ? 'Risk Level' : 'Stability'}
          </div>
        </div>
      )}
    </div>
  );
};