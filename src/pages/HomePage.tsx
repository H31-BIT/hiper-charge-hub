import { useState } from "react";
import { Zap, Battery, Clock, BatteryCharging, Timer, Gauge, Car, Thermometer, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const chargingTypes = [
  { 
    id: "quick",
    name: "Quick Charge", 
    kwh: "120 kWh",
    description: "Balanced speed and efficiency",
    estimatedTime: "25-35 minutes",
    power: "120 kW",
    cost: "₹10/kWh",
    bestFor: "Lunch breaks or shopping"
  },
  { 
    id: "flash", 
    name: "Flash Charge", 
    kwh: "180 kWh",
    description: "Ultra-fast for quick top-ups",
    estimatedTime: "15-20 minutes",
    power: "180 kW",
    cost: "₹12/kWh",
    bestFor: "Highway stops or urgent needs"
  },
  { 
    id: "hiper", 
    name: "HIPER Charge", 
    kwh: "240 kWh",
    description: "Maximum speed charging technology",
    estimatedTime: "10-15 minutes",
    power: "240 kW",
    cost: "₹15/kWh",
    bestFor: "When every minute counts"
  },
];

const quickStats = [
  { icon: Zap, label: "Energy Used", value: "245 kWh", color: "text-primary" },
  { icon: Battery, label: "Sessions", value: "32", color: "text-accent-foreground" },
  { icon: Clock, label: "Total Time", value: "48h 30m", color: "text-primary" },
];


const HomePage = () => {
  const [activeChargeType, setActiveChargeType] = useState("quick");
  const [selectedMode, setSelectedMode] = useState<typeof chargingTypes[0] | null>(null);

  const handleModeClick = (type: typeof chargingTypes[0]) => {
    setActiveChargeType(type.id);
    setSelectedMode(type);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Good Morning!</h2>
        <p className="text-muted-foreground mt-1">Ready to charge your vehicle?</p>
      </div>

      {/* Charging Type Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {chargingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleModeClick(type)}
            className={cn(
              "flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-200 text-center min-w-[90px]",
              activeChargeType === type.id
                ? "gradient-primary text-primary-foreground shadow-card"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            )}
          >
            <p className={cn(
              "text-sm font-semibold whitespace-nowrap",
              activeChargeType === type.id ? "text-primary-foreground" : "text-foreground"
            )}>
              {type.name}
            </p>
            <p className={cn(
              "text-xs mt-0.5",
              activeChargeType === type.id ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {type.kwh}
            </p>
          </button>
        ))}
      </div>

      {/* Charging Mode Details Dialog */}
      <Dialog open={!!selectedMode} onOpenChange={() => setSelectedMode(null)}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Zap className="w-5 h-5 text-primary" />
              {selectedMode?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedMode && (
            <div className="space-y-4 pt-2">
              <p className="text-muted-foreground">{selectedMode.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-muted/50 border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Power Output</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedMode.power}</p>
                </Card>
                
                <Card className="p-3 bg-muted/50 border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Timer className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Charge Time</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedMode.estimatedTime}</p>
                </Card>
                
                <Card className="p-3 bg-muted/50 border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <BatteryCharging className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Max Capacity</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedMode.kwh}</p>
                </Card>
                
                <Card className="p-3 bg-muted/50 border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Cost</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedMode.cost}</p>
                </Card>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-3">
                <p className="text-sm text-primary font-medium">Best for:</p>
                <p className="text-sm text-foreground mt-1">{selectedMode.bestFor}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 shadow-card border-0 bg-card">
              <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Active Charging Card */}
      <Card className="gradient-primary text-primary-foreground p-5 border-0 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">Currently Charging</p>
            <h3 className="text-xl font-bold mt-1">HIPER Station Central</h3>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p className="text-2xl font-bold">67%</p>
                <p className="text-xs text-primary-foreground/70">Battery</p>
              </div>
              <div className="w-px h-8 bg-primary-foreground/30" />
              <div>
                <p className="text-2xl font-bold">22 min</p>
                <p className="text-xs text-primary-foreground/70">Remaining</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center">
              <Zap className="w-8 h-8 fill-current animate-pulse" />
            </div>
          </div>
        </div>
      </Card>

      {/* Vehicle Status */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Status</h3>
        <Card className="p-5 shadow-card border-0 bg-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Tesla Model 3</h4>
              <p className="text-xs text-muted-foreground">MH 01 AB 1234</p>
            </div>
          </div>

          {/* Battery bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">Battery Level</span>
              <span className="text-sm font-bold text-primary">78%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: "78%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">~280 km range remaining</p>
          </div>

          {/* Status grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Thermometer className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-bold text-foreground">32°C</p>
              <p className="text-[10px] text-muted-foreground">Battery Temp</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Activity className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-bold text-foreground">Good</p>
              <p className="text-[10px] text-muted-foreground">Health</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Timer className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-bold text-foreground">12,450</p>
              <p className="text-[10px] text-muted-foreground">Total km</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
