import React, { useState, useEffect } from "react";
import { Calendar, Plus, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import TaskList from "./TaskList";
import DashboardCards from "./DashboardCards";
import { mockTasks, addTask, updateTask, deleteTask } from "../data/mock";

const DayPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => {
    // Load tasks for selected date
    const tasksForDate = mockTasks.filter(
      task => format(new Date(task.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
    setTasks(tasksForDate);
  }, [selectedDate]);

  const handleAddTask = (timeSlot, taskData) => {
    const newTask = addTask({
      ...taskData,
      time: timeSlot,
      date: format(selectedDate, 'yyyy-MM-dd')
    });
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateTask = (taskId, updates) => {
    const updatedTask = updateTask(taskId, updates);
    if (updatedTask) {
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Dashboard Cards */}
        <DashboardCards 
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          selectedDate={selectedDate}
        />

        {/* Controls Bar */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 lg:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Date Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 border-gray-300/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4" />
                    {format(selectedDate, "EEE, MMM d")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">{completedTasks} completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">{totalTasks - completedTasks} pending</span>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-48 bg-white/50 dark:bg-gray-700/50 border-gray-300/50 dark:border-gray-600/50"
                />
              </div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Schedule for {format(selectedDate, "EEEE, MMMM d")}
            </h2>
          </div>
          <TaskList 
            tasks={filteredTasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default DayPlanner;