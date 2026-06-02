import { motion } from 'framer-motion';
import { Button, SectionCard, StatusBadge } from '@/components/ui';
import { EnterpriseDataTable, type DataTableColumn, type DataTableFilter } from '@/components/data-table';

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

type Transaction = (typeof transactions)[number];

const transactionColumns: DataTableColumn<Transaction>[] = [
  { id: 'date', header: 'Date', cell: (transaction) => transaction.date, sortValue: (transaction) => transaction.date },
  { id: 'description', header: 'Description', cell: (transaction) => transaction.description, sortValue: (transaction) => transaction.description },
  { id: 'category', header: 'Category', cell: (transaction) => transaction.category, sortValue: (transaction) => transaction.category },
  { id: 'amount', header: 'Amount', cell: (transaction) => <span className="font-black">{transaction.amount}</span>, sortValue: (transaction) => transaction.amount },
  { id: 'status', header: 'Status', cell: (transaction) => <StatusBadge status={transaction.status} />, sortValue: (transaction) => transaction.status },
];

const transactionFilters: DataTableFilter<Transaction>[] = [
  {
    id: 'category',
    label: 'categories',
    options: [
      { label: 'Income', value: 'Income' },
      { label: 'Expense', value: 'Expense' },
    ],
    predicate: (transaction, value) => transaction.category === value,
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
        <EnterpriseDataTable
          columns={transactionColumns}
          data={transactions}
          getRowId={(transaction) => String(transaction.id)}
          getSearchText={(transaction) => Object.values(transaction).join(' ')}
          filters={transactionFilters}
        />
      </SectionCard>
    </motion.div>
  );
}
