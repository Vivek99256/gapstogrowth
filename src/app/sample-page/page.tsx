'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
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
        <h1 className="text-2xl font-bold text-[#111827] mb-4">Sample Page</h1>
        <p className="text-[#6B7280] mb-6">This is a sample page demonstrating how to use the DashboardShell component.</p>
        
        {/* Sample content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Welcome to the Sample Page</h2>
          <p className="text-[#6B7280]">
            This page shows how you can reuse the DashboardShell component with header and sidebar
            while providing your own custom content in the main area.
          </p>
        </div>
      </motion.div>
    </DashboardShell>
  );
}