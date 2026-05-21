'use client';

import DashboardShell from '@/app/Maindashboard/components/layout/DashboardShell';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
        <h1 className="text-2xl font-bold text-[#111827] mb-4">User Profile</h1>
        <p className="text-[#6B7280] mb-6">View and edit your profile information.</p>
        
        {/* Profile content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-[#111827] mb-4">Profile Information</h2>
              <p className="text-[#6B7280]">
                This is where you would display and edit user profile details.
                You can add form fields for name, email, contact information, etc.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#111827] mb-4">Account Settings</h2>
              <p className="text-[#6B7280]">
                Manage account preferences, notification settings, and security options.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}