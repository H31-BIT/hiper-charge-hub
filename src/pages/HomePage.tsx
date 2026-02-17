import { useState } from "react";
import { Zap, Battery, Clock, ChevronRight, BatteryCharging, Timer, Gauge } from "lucide-react";
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

const nearbyStations = [
  { id: 1, name: "HIPER Station Central", address: "123 Main Street", distance: "0.5 km", available: 4, total: 6 },
  { id: 2, name: "HIPER Hub Mall", address: "456 Shopping Ave", distance: "1.2 km", available: 2, total: 4 },
  { id: 3, name: "HIPER Express Park", address: "789 Park Road", distance: "2.8 km", available: 6, total: 8 },
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

      {/* Nearby Stations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Nearby Stations</h3>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {nearbyStations.map((station) => (
            <Card key={station.id} className="p-4 shadow-card border-0 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{station.name}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{station.address}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{station.distance}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                      {station.available}/{station.total} available
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
