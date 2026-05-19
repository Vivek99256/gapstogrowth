import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, Plus } from 'lucide-react';

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

export default function TaskOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task Overview</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          View All Tasks
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            <div className="flex-shrink-0">
              {task.status === 'completed' && (
                <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
              {task.status === 'in_progress' && (
                <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4" />
                </div>
              )}
              {task.status === 'pending' && (
                <div className="h-8 w-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                <span>Due: {task.dueDate}</span>
                <span>•</span>
                <span>Assignee: {task.assignee}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  className={`bg-navy-600 h-2.5 rounded-full transition-all duration-500`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {task.progress}%
              </div>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-navy-600 bg-navy-50 hover:bg-navy-100 rounded-md transition-colors dark:bg-gray-700 dark:text-navy-400 dark:hover:bg-gray-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </button>
        </div>
      </div>
    </motion.div>
  );
}