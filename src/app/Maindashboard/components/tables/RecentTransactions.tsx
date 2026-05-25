import { motion } from 'framer-motion';
import { Button, SectionCard, StatusBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

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
    >
      <SectionCard title="Recent Transactions" action={<Button variant="ghost" size="sm">View All</Button>}>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6">Date</TableHead>
              <TableHead className="px-6">Description</TableHead>
              <TableHead className="px-6">Category</TableHead>
              <TableHead className="px-6">Amount</TableHead>
              <TableHead className="px-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
              >
                <TableCell className="whitespace-nowrap px-6 text-sm">
                  {transaction.date}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 text-sm">
                  {transaction.description}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 text-sm">
                  {transaction.category}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 text-sm font-black">
                  {transaction.amount}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6">
                  <StatusBadge status={transaction.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </SectionCard>
    </motion.div>
  );
}
