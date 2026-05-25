'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
import { PageHeader, SectionCard, Switch } from '@/components/ui';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
        <PageHeader title="Settings" description="Configure your application preferences." />

        <SectionCard title="Application Settings">
          <p className="text-[#6B7280]">
            Customize your experience with various settings options.
            You can add toggles, selectors, and other form elements here.
          </p>
          
          {/* Example settings items */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F4F7FB] rounded-lg">
              <div>
                <h3 className="font-medium text-[#111827]">Notifications</h3>
                <p className="text-sm text-[#6B7280]">Get notified about updates and activities</p>
              </div>
              <Switch aria-label="Enable notifications" />
            </div>
          </div>
        </SectionCard>
      </motion.div>
    </DashboardShell>
  );
}
