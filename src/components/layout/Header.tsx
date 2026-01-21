import { Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="gradient-header text-primary-foreground px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-primary-foreground/20 p-2 rounded-xl">
          <Zap className="w-6 h-6 fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">HIPER</h1>
          <p className="text-xs text-primary-foreground/80 font-medium -mt-0.5">charging</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
