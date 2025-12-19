import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  BarChart3,
  PieChart,
  Activity,
  Zap
} from "lucide-react";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock analytics data
  const weeklyData = {
    totalTasks: 42,
    completedTasks: 35,
    completionRate: 83,
    streak: 12,
    mostProductiveDay: 'Wednesday',
    averageTasksPerDay: 6,
    categories: {
      work: 18,
      personal: 12,
      health: 8,
      learning: 4
    }
  };

  const monthlyData = {
    totalTasks: 186,
    completedTasks: 151,
    completionRate: 81,
    streak: 12,
    mostProductiveWeek: 'Week 3',
    averageTasksPerWeek: 31,
    categories: {
      work: 78,
      personal: 52,
      health: 34,
      learning: 22
    }
  };

  const yearlyData = {
    totalTasks: 2284,
    completedTasks: 1847,
    completionRate: 81,
    streak: 45,
    mostProductiveMonth: 'March',
    averageTasksPerMonth: 152,
    categories: {
      work: 912,
      personal: 684,
      health: 456,
      learning: 232
    }
  };

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      case 'year': return yearlyData;
      default: return weeklyData;
    }
  };

  const data = getCurrentData();

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Period Selector */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl">
            <TabsTrigger value="week" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              This Week
            </TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              This Month
            </TabsTrigger>
            <TabsTrigger value="year" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              This Year
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="h-8 w-8 opacity-80" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      +{selectedPeriod === 'week' ? '12%' : selectedPeriod === 'month' ? '8%' : '15%'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm opacity-90">Completion Rate</p>
                    <div className="text-3xl font-bold">{data.completionRate}%</div>
                    <Progress value={data.completionRate} className="h-2 bg-white/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="h-8 w-8 opacity-80" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm opacity-90">Current Streak</p>
                    <div className="text-3xl font-bold">{data.streak} days</div>
                    <p className="text-sm opacity-90">Keep it up! 🔥</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="h-8 w-8 opacity-80" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Total
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm opacity-90">Tasks Completed</p>
                    <div className="text-3xl font-bold">{data.completedTasks}</div>
                    <p className="text-sm opacity-90">of {data.totalTasks} total</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="h-8 w-8 opacity-80" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Best
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm opacity-90">Most Productive</p>
                    <div className="text-lg font-bold">
                      {selectedPeriod === 'week' ? data.mostProductiveDay :
                       selectedPeriod === 'month' ? data.mostProductiveWeek :
                       data.mostProductiveMonth}
                    </div>
                    <p className="text-sm opacity-90">
                      {selectedPeriod === 'week' ? `${data.averageTasksPerDay} tasks/day` :
                       selectedPeriod === 'month' ? `${data.averageTasksPerWeek} tasks/week` :
                       `${data.averageTasksPerMonth} tasks/month`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Category Breakdown */}
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Task Categories
                  </CardTitle>
                  <CardDescription>
                    Breakdown of tasks by category this {selectedPeriod}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Work</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{data.categories.work}</span>
                        <div className="w-20">
                          <Progress value={(data.categories.work / data.totalTasks) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Personal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{data.categories.personal}</span>
                        <div className="w-20">
                          <Progress value={(data.categories.personal / data.totalTasks) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">Health</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{data.categories.health}</span>
                        <div className="w-20">
                          <Progress value={(data.categories.health / data.totalTasks) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Learning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{data.categories.learning}</span>
                        <div className="w-20">
                          <Progress value={(data.categories.learning / data.totalTasks) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Performance Insights
                  </CardTitle>
                  <CardDescription>
                    Key insights about your productivity patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-green-800 dark:text-green-200">Productivity Up</span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your completion rate improved by {selectedPeriod === 'week' ? '12%' : selectedPeriod === 'month' ? '8%' : '15%'} compared to last {selectedPeriod}.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-800 dark:text-blue-200">Consistent Schedule</span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        You've been most productive on {selectedPeriod === 'week' ? 'weekdays' : 'weekends'} this {selectedPeriod}.
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium text-purple-800 dark:text-purple-200">Goal Achievement</span>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        You're on track to exceed your monthly goal by {selectedPeriod === 'year' ? '23%' : '15%'}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;