import { useState } from "react";
import { MapPin, Navigation, Filter, Search, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const chargingIcon = new L.Icon({
  iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const stations = [
  { id: 1, name: "HIPER Station Central", address: "123 Main Street, Mumbai", distance: "0.5 km", available: 4, total: 6, type: "Quick", lat: 19.076, lng: 72.8777 },
  { id: 2, name: "HIPER Hub Mall", address: "456 Shopping Ave, Delhi", distance: "1.2 km", available: 2, total: 4, type: "Flash", lat: 28.6139, lng: 77.209 },
  { id: 3, name: "HIPER Express Park", address: "789 Park Road, Bangalore", distance: "2.8 km", available: 6, total: 8, type: "HIPER", lat: 12.9716, lng: 77.5946 },
  { id: 4, name: "HIPER Charge Hub", address: "101 Tech Park, Hyderabad", distance: "5.1 km", available: 3, total: 5, type: "Quick", lat: 17.385, lng: 78.4867 },
  { id: 5, name: "HIPER Power Point", address: "55 Marina Dr, Chennai", distance: "3.4 km", available: 5, total: 8, type: "Flash", lat: 13.0827, lng: 80.2707 },
  { id: 6, name: "HIPER SuperStation", address: "22 Lake Road, Kolkata", distance: "4.0 km", available: 1, total: 4, type: "HIPER", lat: 22.5726, lng: 88.3639 },
];

const MapPage = () => {
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null);

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
          <Button variant="outline" size="sm" className="text-xs">Quick charging</Button>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="flex-1 relative mx-4 rounded-2xl overflow-hidden mb-4 min-h-[300px]">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full rounded-2xl z-0"
          style={{ minHeight: "300px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              icon={chargingIcon}
              eventHandlers={{
                click: () => setSelectedStation(station),
              }}
            >
              <Popup>
                <div className="text-sm space-y-1 min-w-[160px]">
                  <p className="font-bold">{station.name}</p>
                  <p className="text-xs text-gray-500">{station.address}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium">{station.type}</span>
                    <span className="text-xs ml-auto font-semibold text-green-600">
                      {station.available}/{station.total} free
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Station List */}
      <div className="px-4 pb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Nearby Stations</h3>
        <div className="space-y-2">
          {stations.map((station) => (
            <Card
              key={station.id}
              className={`p-3 shadow-card border-0 bg-card cursor-pointer transition-all ${
                selectedStation?.id === station.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedStation(station)}
            >
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
                  <p className="text-sm font-semibold text-primary">
                    {station.available}/{station.total}
                  </p>
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
