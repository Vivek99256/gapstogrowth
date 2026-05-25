'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
import { motion } from 'framer-motion';
import OrganizationInfoScreen from './OrganizationInfoScreen';

export default function OrganizationProfileManagementPage() {
  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="px-0 py-2 sm:px-1 lg:px-2"
      >
        <OrganizationInfoScreen />
      </motion.div>
    </DashboardShell>
  );
}
