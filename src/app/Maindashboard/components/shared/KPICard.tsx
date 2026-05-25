import { DollarSign, Users, TrendingUp, PieChart } from 'lucide-react';
import { MetricCard } from '@/components/ui';

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
  const progress = Math.round((sparkline[sparkline.length - 1] / Math.max(...sparkline)) * 100);

  return (
    <MetricCard
      title={title}
      value={value}
      change={change}
      changeType={changeType}
      icon={Icon}
      iconClassName={`${iconBg} ${iconColor}`}
      progress={progress}
    />
  );
}
