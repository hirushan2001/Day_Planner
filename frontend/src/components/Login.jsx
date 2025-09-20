import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Moon, Sun, Calendar, CheckCircle, BarChart3, User } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } else {
      toast({
        title: "Login failed",
        description: result.error || "Please check your credentials.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const demoLogin = () => {
    setEmail('demo@dayplanner.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-500">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 p-0 hover:bg-white/20 dark:hover:bg-gray-800/50"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-600" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
        </Button>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Day Planner
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
              Your intelligent companion for productivity, planning, and personal growth.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
              <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Smart Planning</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Organize your day efficiently</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
              <BarChart3 className="h-8 w-8 text-violet-600 dark:text-violet-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Analytics</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Track your progress</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Goal Tracking</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Achieve more every day</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
              <User className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Personal</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tailored to your needs</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/50 shadow-2xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                Sign in to access your personalized day planner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={demoLogin}
              >
                Try Demo Account
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Demo credentials: demo@dayplanner.com / demo123
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;