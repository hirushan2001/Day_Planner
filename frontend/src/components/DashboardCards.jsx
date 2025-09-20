import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Target,
  Zap,
  Calendar
} from "lucide-react";
import { motivationalQuotes } from "../data/mock";

const DashboardCards = ({ completedTasks, totalTasks, selectedDate }) => {
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const todayQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {/* Progress Card */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Target className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Daily Progress</h3>
            <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              +2 days
            </Badge>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Current Streak</h3>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-sm opacity-90">Keep it up! 🔥</p>
          </div>
        </CardContent>
      </Card>

      {/* Time Focus Card */}
      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Active
            </Badge>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Focus Time</h3>
            <div className="text-2xl font-bold">2h 30m</div>
            <p className="text-sm opacity-90">Deep work session</p>
          </div>
        </CardContent>
      </Card>

      {/* Productivity Score */}
      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              +15%
            </Badge>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Productivity</h3>
            <div className="text-2xl font-bold">85/100</div>
            <p className="text-sm opacity-90">Above average</p>
          </div>
        </CardContent>
      </Card>

      {/* Motivation Quote - Spans 2 columns */}
      <Card className="sm:col-span-2 lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {isToday ? "Today's Motivation" : "Daily Inspiration"}
              </h3>
              <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                "{todayQuote.quote}"
              </blockquote>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                — {todayQuote.author}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="sm:col-span-2 lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {isToday ? "Today at a Glance" : format(selectedDate, "MMMM d, yyyy")}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalTasks}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totalTasks - completedTasks}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalTasks > 0 ? Math.round(progressPercentage) + '%' : '0%'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;