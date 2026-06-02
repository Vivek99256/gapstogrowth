import { motion } from 'framer-motion';
import { Users, DollarSign, Check, AlertTriangle, Clock } from 'lucide-react';
import { Avatar, AvatarImage, Button, SectionCard } from '@/components/ui';

const activities = [
  {
    id: 1,
    type: 'sale',
    icon: DollarSign,
    color: 'bg-accent text-accent-foreground',
    title: 'New Sale Closed',
    description: 'Enterprise deal worth $24,500 closed with Acme Corp',
    time: '2 min ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    type: 'task',
    icon: Check,
    color: 'bg-success/15 text-success',
    title: 'Task Completed',
    description: 'Q3 financial report finalized by Sarah Chen',
    time: '15 min ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    type: 'meeting',
    icon: Users,
    color: 'bg-secondary text-secondary-foreground',
    title: 'Team Meeting',
    description: 'Weekly sync with marketing team started',
    time: '30 min ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 4,
    type: 'alert',
    icon: AlertTriangle,
    color: 'bg-danger/15 text-danger',
    title: 'System Alert',
    description: 'Server response time increased by 15%',
    time: '1 hour ago',
    avatar: null,
  },
  {
    id: 5,
    type: 'login',
    icon: Clock,
    color: 'bg-muted text-muted-foreground',
    title: 'User Login',
    description: 'John Doe logged in from New York',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
];

export default function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SectionCard title="Recent Activity" action={<Button variant="ghost" size="sm">View All</Button>}>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            {activity.avatar && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt="" />
              </Avatar>
            )}
            {!activity.avatar && (
              <div className={`${activity.color} h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center`}>
                <activity.icon className="h-4 w-4" />
              </div>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{activity.title}</h4>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      </SectionCard>
    </motion.div>
  );
}
