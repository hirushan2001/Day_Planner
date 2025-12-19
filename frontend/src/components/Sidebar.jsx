import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Calendar, BarChart3, User, Sparkles } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Today',
      href: '/',
      icon: Calendar,
      description: 'Plan your day'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Track progress'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Account settings'
    }
  ];

  return (
    <div className={`
      fixed lg:relative inset-y-0 left-0 z-50 w-64 
      bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
      border-r border-gray-200/50 dark:border-gray-700/50 
      flex flex-col transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Day Planner</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Productivity Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => onClose && onClose()}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive 
                  ? "text-white" 
                  : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
              )} />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className={cn(
                  "text-xs opacity-75",
                  isActive ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                )}>
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Pro Tip</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Use keyboard shortcuts to navigate faster: Press '/' to search tasks, 'n' to add new task.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;