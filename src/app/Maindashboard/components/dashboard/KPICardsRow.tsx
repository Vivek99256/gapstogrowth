import { motion } from 'framer-motion';
import KPICard, { lucideIcons } from '../shared/KPICard';

type KPIIcon = keyof typeof lucideIcons;

const kpiData = [
  {
    title: "Total Revenue",
    value: "$245,680",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: "DollarSign" as KPIIcon,
    iconBg: "bg-accent",
    iconColor: "text-accent-foreground",
    sparkline: [30, 40, 35, 50, 49, 60, 70, 90, 105],
  },
  {
    title: "Active Employees",
    value: "1,248",
    change: "+3.2%",
    changeType: "positive" as const,
    icon: "Users" as KPIIcon,
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
    sparkline: [100, 120, 130, 110, 130, 140, 150, 160, 170],
  },
  {
    title: "Sales Growth",
    value: "24.8%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: "TrendingUp" as KPIIcon,
    iconBg: "bg-accent",
    iconColor: "text-accent-foreground",
    sparkline: [10, 15, 8, 12, 18, 20, 22, 24, 25],
  },
  {
    title: "Client Retention",
    value: "92%",
    change: "-0.5%",
    changeType: "negative" as const,
    icon: "Users" as KPIIcon,
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
    sparkline: [90, 91, 92, 93, 91, 92, 93, 92, 92],
  },
];

export default function KPICardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <KPICard {...kpi} />
        </motion.div>
      ))}
    </div>
  );
}
