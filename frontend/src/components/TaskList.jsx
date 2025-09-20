import React, { useState } from "react";
import { Plus, Edit2, Trash2, Clock, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

const TaskList = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Generate time slots from 6 AM to 10 PM
  const timeSlots = [];
  for (let hour = 6; hour <= 22; hour++) {
    const time12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const timeString = `${time12}:00 ${ampm}`;
    const hourString = hour.toString().padStart(2, '0') + ':00';
    timeSlots.push({ display: timeString, value: hourString });
  }

  const getTasksForTimeSlot = (timeSlot) => {
    return tasks.filter(task => task.time === timeSlot);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-gradient-to-r from-red-50 to-red-50/30 dark:from-red-900/20 dark:to-red-900/5';
      case 'medium': return 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-50/30 dark:from-orange-900/20 dark:to-orange-900/5';
      case 'low': return 'border-l-green-500 bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-900/20 dark:to-green-900/5';
      default: return 'border-l-gray-500 bg-gradient-to-r from-gray-50 to-gray-50/30 dark:from-gray-800/20 dark:to-gray-800/5';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim() && selectedTimeSlot) {
      onAddTask(selectedTimeSlot, newTask);
      setNewTask({ title: "", description: "", priority: "medium" });
      setSelectedTimeSlot(null);
      setIsAddDialogOpen(false); // Close dialog after adding task
    }
  };

  const handleEditTask = (task) => {
    setEditingTask({...task});
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      onUpdateTask(editingTask.id, editingTask);
      setEditingTask(null);
    }
  };

  const handleToggleComplete = (task) => {
    onUpdateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="space-y-1">
        {timeSlots.map((slot) => {
          const tasksInSlot = getTasksForTimeSlot(slot.value);
          
          return (
            <div key={slot.value} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 py-4 border-b border-gray-100/50 dark:border-gray-700/30 last:border-b-0 group hover:bg-gray-50/30 dark:hover:bg-gray-800/20 rounded-lg transition-all duration-200">
              {/* Time Label */}
              <div className="w-full sm:w-24 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {slot.display}
                  </span>
                </div>
              </div>
              
              {/* Tasks Column */}
              <div className="flex-1 space-y-3">
                {tasksInSlot.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-4 rounded-xl border-l-4 ${getPriorityColor(task.priority)} backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group/task`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleComplete(task)}
                          className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className={`font-medium transition-all duration-200 ${
                            task.completed 
                              ? 'line-through text-gray-500 dark:text-gray-500' 
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className={`text-sm transition-all duration-200 ${
                              task.completed 
                                ? 'line-through text-gray-400 dark:text-gray-500' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`text-xs ${getPriorityBadgeColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            {task.assignee && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <User className="h-3 w-3" />
                                {task.assignee}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover/task:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTask(task)}
                          className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteTask(task.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Task Button */}
                <Dialog open={isAddDialogOpen && selectedTimeSlot === slot.value} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTimeSlot(slot.value);
                        setIsAddDialogOpen(true);
                      }}
                      className="w-full justify-start text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add task at {slot.display}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle>Add Task for {slot.display}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Task Title</label>
                        <Input
                          placeholder="What needs to be done?"
                          value={newTask.title}
                          onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                          className="bg-white/50 dark:bg-gray-700/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</label>
                        <Textarea
                          placeholder="Add more details..."
                          value={newTask.description}
                          onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                          className="bg-white/50 dark:bg-gray-700/50 resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                        <Select value={newTask.priority} onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger className="bg-white/50 dark:bg-gray-700/50">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">🟢 Low Priority</SelectItem>
                            <SelectItem value="medium">🟠 Medium Priority</SelectItem>
                            <SelectItem value="high">🔴 High Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button 
                          onClick={handleAddTask} 
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Task Dialog */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Task Title</label>
                <Input
                  placeholder="Task title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/50 dark:bg-gray-700/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</label>
                <Textarea
                  placeholder="Add more details..."
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/50 dark:bg-gray-700/50 resize-none"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                <Select value={editingTask.priority} onValueChange={(value) => setEditingTask(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-700/50">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Low Priority</SelectItem>
                    <SelectItem value="medium">🟠 Medium Priority</SelectItem>
                    <SelectItem value="high">🔴 High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleUpdateTask} 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Update Task
                </Button>
                <Button variant="outline" onClick={() => setEditingTask(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TaskList;