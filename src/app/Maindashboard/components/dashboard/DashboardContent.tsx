'use client';

import { motion } from 'framer-motion';
import KPICardsRow from './KPICardsRow';
import RevenueChart from '../charts/RevenueChart';
import DepartmentChart from '../charts/DepartmentChart';
import ActivityTimeline from '../dashboard/ActivityTimeline';
import TaskOverview from '../dashboard/TaskOverview';
import RecentTransactions from '../tables/RecentTransactions';

export default function DashboardContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* KPI Cards */}
      <KPICardsRow />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <DepartmentChart />
      </div>
      
      {/* Activity and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTimeline />
        <TaskOverview />
      </div>
      
      {/* Recent Transactions */}
      <RecentTransactions />
    </motion.div>
  );
}
