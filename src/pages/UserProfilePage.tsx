import { User, Mail, LogIn, Edit2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="w-24 h-24 border-4 border-primary/20">
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {userData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
        </div>
      </div>

      {/* Profile Details Card */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Profile Details</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="text-primary"
          >
            {isEditing ? "Save" : <><Edit2 className="w-4 h-4 mr-1" /> Edit</>}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            ) : (
              <p className="text-foreground font-medium pl-6">{userData.name}</p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            ) : (
              <p className="text-foreground font-medium pl-6">{userData.email}</p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              Phone Number
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            ) : (
              <p className="text-foreground font-medium pl-6">{userData.phone}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full gradient-primary" size="lg">
            <LogIn className="w-4 h-4 mr-2" />
            Login / Sign Up
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Sign in to sync your profile across devices and access exclusive features
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
