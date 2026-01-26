import { ArrowLeft, User, Moon, Sun, Car, Plus, LogIn, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName] = useState("John Doe");

  useEffect(() => {
    // Check if dark mode is enabled on mount
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-header text-primary-foreground px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* User Profile Section */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">{userName}</h2>
                <p className="text-sm text-muted-foreground">Manage your account</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/profile')}
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">APPEARANCE</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
                  </p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Section */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">VEHICLES</h3>
            
            <div 
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
              onClick={() => navigate('/vehicle')}
            >
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">My Vehicles</p>
                  <p className="text-sm text-muted-foreground">View and manage vehicles</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <Separator className="my-3" />

            <div 
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
              onClick={() => navigate('/vehicle')}
            >
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Add New Vehicle</p>
                  <p className="text-sm text-muted-foreground">Register another vehicle</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Login / Sign In Section */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">ACCOUNT</h3>
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 mb-3"
              onClick={() => {/* TODO: Implement Google Sign In */}}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12"
              onClick={() => {/* TODO: Implement Phone Sign In */}}
            >
              <LogIn className="w-5 h-5" />
              <span>Sign in with Phone Number</span>
            </Button>
          </CardContent>
        </Card>

        {/* About Us Section */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">ABOUT</h3>
            
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">About Us</p>
                  <p className="text-sm text-muted-foreground">Learn more about HIPER</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <Separator className="my-3" />

            <div className="text-center py-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-foreground">HIPER</span>
              </div>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-1">© 2024 HIPER Charging. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
