'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
import { PageHeader, SectionCard } from '@/components/ui';
import { motion } from 'framer-motion';

export default function SamplePage() {
  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
        <PageHeader title="Sample Page" description="This is a sample page demonstrating how to use the DashboardShell component." />

        <SectionCard title="Welcome to the Sample Page">
          <p className="text-[#6B7280]">
            This page shows how you can reuse the DashboardShell component with header and sidebar
            while providing your own custom content in the main area.
          </p>
        </SectionCard>
      </motion.div>
    </DashboardShell>
  );
}
