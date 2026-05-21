'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
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
        <h1 className="text-2xl font-bold text-[#111827] mb-4">Settings</h1>
        <p className="text-[#6B7280] mb-6">Configure your application preferences.</p>
        
        {/* Settings content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Application Settings</h2>
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
              <div className="flex items-center space-x-3">
                <button className="w-11 h-6 bg-white rounded-full relative">
                  <div className="inline-block h-4 w-4 rounded-full bg-[#FF6A00] transform translate-x-0 transition-transform"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}