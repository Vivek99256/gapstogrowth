import { DollarSign, Users, TrendingUp, PieChart } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: keyof typeof lucideIcons;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
}

const lucideIcons = {
  DollarSign,
  Users,  
  TrendingUp,
  PieChart,
};

export { lucideIcons };

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg,
  iconColor,
  sparkline,
}: KPICardProps) {
  const Icon = lucideIcons[icon];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`${iconBg} ${iconColor} rounded-xl p-3`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
      <div className="flex items-center text-sm">
        <span className={`${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-500'} font-medium`}>
          {change}
        </span>
        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">monthly</span>
      </div>
       {/* Simple sparkline */}
      <div className="h-2 mt-2 w-full bg-gray-200 rounded-dark">
        {sparkline.map((val, idx) => {
          const height = Math.round((val / Math.max(...sparkline)) * 100);
          return (
            <div
              key={idx}
              className="bg-navy-600 h-[2px] w-1 rounded"
              style={{ height: height + '%', marginLeft: idx === 0 ? 0 : 1 }}
            />
          );
        })}
      </div>
    </div>
  );
}