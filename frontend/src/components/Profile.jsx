import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Target, 
  Zap,
  Settings,
  Bell,
  Shield,
  Palette
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const achievements = [
    { title: "Early Bird", description: "Complete 10 morning tasks", icon: "🌅", earned: true },
    { title: "Streak Master", description: "Maintain 7-day streak", icon: "🔥", earned: true },
    { title: "Goal Crusher", description: "Complete 100 tasks", icon: "🎯", earned: true },
    { title: "Night Owl", description: "Complete 5 evening tasks", icon: "🌙", earned: false },
    { title: "Productivity Pro", description: "85% completion rate for a month", icon: "⚡", earned: false },
    { title: "Category Master", description: "Complete tasks in all categories", icon: "🏆", earned: true },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 ring-4 ring-white/30">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-2xl bg-white/20 text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{user?.name}</h1>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Pro User
                  </Badge>
                </div>
                <p className="text-white/90 text-lg">{user?.email}</p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user?.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>{user?.completedTasks || 0} tasks completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>{user?.streakDays || 0} day streak</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {editing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm">
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-200/50 dark:bg-gray-700/50" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Preferences
                </CardTitle>
                <CardDescription>
                  Customize your Day Planner experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive task reminders and updates</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <Separator className="bg-gray-200/50 dark:bg-gray-700/50" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Theme</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred appearance</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Customize</Button>
                  </div>
                  
                  <Separator className="bg-gray-200/50 dark:bg-gray-700/50" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Privacy</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage your data and privacy settings</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-4 lg:space-y-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your productivity milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-all ${
                        achievement.earned
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{achievement.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${
                            achievement.earned 
                              ? 'text-green-800 dark:text-green-200' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {achievement.title}
                          </p>
                          <p className={`text-xs ${
                            achievement.earned 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-gray-500 dark:text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-0 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;