import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { SectionCard } from '@/components/ui';

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4000 },
  { month: 'May', revenue: 5000 },
  { month: 'Jun', revenue: 6000 },
  { month: 'Jul', revenue: 7000 },
  { month: 'Aug', revenue: 6000 },
  { month: 'Sep', revenue: 8000 },
  { month: 'Oct', revenue: 9000 },
  { month: 'Nov', revenue: 10000 },
  { month: 'Dec', revenue: 12000 },
];

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SectionCard title="Monthly Revenue">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--brand))" fill="hsl(var(--secondary))" />
        </AreaChart>
      </ResponsiveContainer>
      </SectionCard>
    </motion.div>
  );
}
