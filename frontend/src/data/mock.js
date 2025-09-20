// Mock data for Day Planner application

export const mockTasks = [
  {
    id: "1",
    title: "Morning Workout",
    description: "30-minute cardio session",
    time: "07:00",
    date: new Date().toISOString().split('T')[0],
    priority: "high",
    completed: true
  },
  {
    id: "2",
    title: "Team Standup Meeting",
    description: "Daily sync with development team",
    time: "09:00",
    date: new Date().toISOString().split('T')[0],
    priority: "high",
    completed: true
  },
  {
    id: "3",
    title: "Review Project Proposals",
    description: "Go through Q4 project submissions",
    time: "10:00",
    date: new Date().toISOString().split('T')[0],
    priority: "medium",
    completed: false
  },
  {
    id: "4",
    title: "Lunch with Sarah",
    description: "Catch up at the new Italian restaurant",
    time: "12:00",
    date: new Date().toISOString().split('T')[0],
    priority: "low",
    completed: false
  },
  {
    id: "5",
    title: "Client Presentation",
    description: "Present quarterly results to ABC Corp",
    time: "14:00",
    date: new Date().toISOString().split('T')[0],
    priority: "high",
    completed: false
  },
  {
    id: "6",
    title: "Code Review Session",
    description: "Review pull requests from the team",
    time: "16:00",
    date: new Date().toISOString().split('T')[0],
    priority: "medium",
    completed: false
  },
  {
    id: "7",
    title: "Grocery Shopping",
    description: "Pick up groceries for the weekend",
    time: "18:00",
    date: new Date().toISOString().split('T')[0],
    priority: "low",
    completed: false
  }
];

export const motivationalQuotes = [
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    quote: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    quote: "Whoever is happy will make others happy too.",
    author: "Anne Frank"
  },
  {
    quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  }
];

export const dailyTips = [
  {
    title: "Time Blocking Magic",
    description: "Try dedicating specific time blocks to similar tasks. This reduces context switching and increases focus."
  },
  {
    title: "The 2-Minute Rule",
    description: "If a task takes less than 2 minutes to complete, do it immediately rather than adding it to your task list."
  },
  {
    title: "Priority Matrix Method",
    description: "Categorize tasks as urgent/important, important/not urgent, urgent/not important, or neither. Focus on important tasks first."
  },
  {
    title: "Energy Management",
    description: "Schedule your most challenging tasks during your peak energy hours. Save routine tasks for low-energy periods."
  },
  {
    title: "Break It Down",
    description: "Large, overwhelming tasks become manageable when broken into smaller, actionable steps."
  },
  {
    title: "Review and Reflect",
    description: "End each day by reviewing what you accomplished and planning for tomorrow. This creates momentum."
  },
  {
    title: "Buffer Time",
    description: "Add 15-minute buffers between meetings and important tasks to account for unexpected delays."
  }
];

// Mock functions for CRUD operations
let taskIdCounter = 8;

export const addTask = (taskData) => {
  const newTask = {
    id: taskIdCounter.toString(),
    ...taskData,
    completed: false
  };
  taskIdCounter++;
  mockTasks.push(newTask);
  return newTask;
};

export const updateTask = (taskId, updates) => {
  const taskIndex = mockTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
    return mockTasks[taskIndex];
  }
  return null;
};

export const deleteTask = (taskId) => {
  const taskIndex = mockTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = mockTasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }
  return null;
};

export const getTasksByDate = (date) => {
  return mockTasks.filter(task => task.date === date);
};

export const getTasksByTimeSlot = (date, timeSlot) => {
  return mockTasks.filter(task => task.date === date && task.time === timeSlot);
};