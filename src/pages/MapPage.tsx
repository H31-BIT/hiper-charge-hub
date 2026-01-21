import { MapPin, Navigation, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const stations = [
  { id: 1, name: "HIPER Station Central", distance: "0.5 km", available: 4, total: 6, type: "Fast" },
  { id: 2, name: "HIPER Hub Mall", distance: "1.2 km", available: 2, total: 4, type: "Super Fast" },
  { id: 3, name: "HIPER Express Park", distance: "2.8 km", available: 6, total: 8, type: "Standard" },
];

const MapPage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="px-4 py-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search charging stations..." 
            className="pl-10 bg-card border-0 shadow-card"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Filter className="w-3 h-3" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Navigation className="w-3 h-3" /> Near me
          </Button>
          <Button variant="outline" size="sm" className="text-xs">Fast charging</Button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="flex-1 relative bg-accent mx-4 rounded-2xl overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Interactive map view</p>
            <p className="text-xs text-muted-foreground mt-1">Showing stations near you</p>
          </div>
        </div>
        
        {/* Map Markers */}
        <div className="absolute top-1/4 left-1/3">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <div className="absolute top-1/2 right-1/4">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/2">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Station List */}
      <div className="px-4 pb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Nearby Stations</h3>
        <div className="space-y-2">
          {stations.map((station) => (
            <Card key={station.id} className="p-3 shadow-card border-0 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{station.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{station.distance}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                        {station.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{station.available}/{station.total}</p>
                  <p className="text-xs text-muted-foreground">available</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
