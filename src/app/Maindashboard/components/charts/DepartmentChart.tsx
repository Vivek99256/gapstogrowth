import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const departmentData = [
  { name: 'Sales', value: 400, fill: '#4361ee' },
  { name: 'Marketing', value: 300, fill: '#3f37c9' },
  { name: 'Engineering', value: 500, fill: '#4cc9f0' },
  { name: 'HR', value: 200, fill: '#f8961e' },
  { name: 'Finance', value: 250, fill: '#f3722c' },
];

export default function DepartmentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 dark:bg-gray-800 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Department Budget Allocation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {departmentData.map((entry, index) => (
            <Bar key={index} dataKey="value" fill={entry.fill} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}