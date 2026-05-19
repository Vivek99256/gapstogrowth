import { motion } from 'framer-motion';
import { Calendar, DollarSign, CheckCircle, X } from 'lucide-react';

const transactions = [
  {
    id: 1,
    date: 'May 18, 2026',
    description: 'Office Supplies Purchase',
    category: 'Expense',
    amount: '$245.50',
    status: 'Completed',
  },
  {
    id: 2,
    date: 'May 17, 2026',
    description: 'Client Payment - Acme Corp',
    category: 'Income',
    amount: '$12,500.00',
    status: 'Completed',
  },
  {
    id: 3,
    date: 'May 16, 2026',
    description: 'Software Subscription',
    category: 'Expense',
    amount: '$89.99',
    status: 'Pending',
  },
  {
    id: 4,
    date: 'May 15, 2026',
    description: 'Marketing Campaign Spend',
    category: 'Expense',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 5,
    date: 'May 14, 2026',
    description: 'Freelance Income',
    category: 'Income',
    amount: '$750.00',
    status: 'Completed',
  },
];

export default function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700">
            {transactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: transaction.id * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}