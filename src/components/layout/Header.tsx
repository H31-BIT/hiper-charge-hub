import { Zap, User, Car, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="gradient-header text-primary-foreground px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-foreground/20 p-2 rounded-xl">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">HIPER</h1>
            <p className="text-xs text-primary-foreground/80 font-medium -mt-0.5">charging</p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <User className="w-4 h-4" />
              <span>User Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/vehicle')}
            >
              <Car className="w-4 h-4" />
              <span>Vehicle Details</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
