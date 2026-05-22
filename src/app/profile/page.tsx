'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
import { motion } from 'framer-motion';
import ProfileView from './profileView';

export default function ProfilePage() {
  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
    <ProfileView />
      </motion.div>
    </DashboardShell>
  );
}