import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react';
import { Button, Progress, SectionCard, StatusBadge } from '@/components/ui';

const tasks = [
  {
    id: 1,
    title: 'Prepare Q3 Financial Report',
    status: 'in_progress',
    priority: 'high',
    dueDate: 'May 25, 2026',
    assignee: 'Sarah Chen',
    progress: 65,
  },
  {
    id: 2,
    title: 'Update Employee Handbook',
    status: 'pending',
    priority: 'medium',
    dueDate: 'May 30, 2026',
    assignee: 'Michael Ross',
    progress: 0,
  },
  {
    id: 3,
    title: 'Client Onboarding: Acme Corp',
    status: 'completed',
    priority: 'high',
    dueDate: 'May 20, 2026',
    assignee: 'Jessica Lee',
    progress: 100,
  },
  {
    id: 4,
    title: 'Database Optimization',
    status: 'in_progress',
    priority: 'low',
    dueDate: 'Jun 5, 2026',
    assignee: 'David Kim',
    progress: 30,
  },
];

const taskStatusIcon = {
  completed: { icon: CheckCircle, className: 'bg-success/15 text-success' },
  in_progress: { icon: AlertTriangle, className: 'bg-secondary text-secondary-foreground' },
  pending: { icon: Clock, className: 'bg-warning/15 text-warning' },
};

export default function TaskOverview() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <SectionCard title="Task Overview" action={<Button variant="ghost" size="sm">View All Tasks</Button>}>
        <div className="space-y-3">
          {tasks.map((task) => {
            const status = taskStatusIcon[task.status as keyof typeof taskStatusIcon];
            const Icon = status.icon;

            return (
              <div key={task.id} className="flex items-start space-x-3 rounded-lg bg-muted p-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${status.className}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-black text-foreground">{task.title}</h4>
                    <StatusBadge status={task.priority} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                    <span>&bull;</span>
                    <span>Assignee: {task.assignee}</span>
                  </div>
                  <Progress value={task.progress} className="mt-1 h-2.5" />
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{task.progress}%</div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-border pt-3">
            <Button variant="secondary" className="w-full" leftIcon={<Plus className="h-4 w-4" />}>
              Add New Task
            </Button>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}
