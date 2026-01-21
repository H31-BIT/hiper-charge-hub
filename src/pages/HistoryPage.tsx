import { Zap, Calendar, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const historyData = [
  {
    id: 1,
    station: "HIPER Station Central",
    date: "Today, 10:30 AM",
    duration: "45 min",
    energy: "32 kWh",
    cost: "$8.50",
    status: "completed",
  },
  {
    id: 2,
    station: "HIPER Hub Mall",
    date: "Yesterday, 3:15 PM",
    duration: "1h 20min",
    energy: "58 kWh",
    cost: "$15.40",
    status: "completed",
  },
  {
    id: 3,
    station: "HIPER Express Park",
    date: "Jan 18, 2025",
    duration: "35 min",
    energy: "28 kWh",
    cost: "$7.20",
    status: "completed",
  },
  {
    id: 4,
    station: "HIPER Downtown",
    date: "Jan 15, 2025",
    duration: "55 min",
    energy: "42 kWh",
    cost: "$11.00",
    status: "completed",
  },
  {
    id: 5,
    station: "HIPER Airport",
    date: "Jan 12, 2025",
    duration: "2h 10min",
    energy: "85 kWh",
    cost: "$22.50",
    status: "completed",
  },
];

const HistoryPage = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">History</h2>
        <p className="text-muted-foreground mt-1">Your charging sessions</p>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 p-4 bg-accent rounded-xl">
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-foreground">32</p>
          <p className="text-xs text-muted-foreground">Sessions</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-foreground">245 kWh</p>
          <p className="text-xs text-muted-foreground">Total Energy</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-foreground">$64.60</p>
          <p className="text-xs text-muted-foreground">This Month</p>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {historyData.map((session) => (
          <Card key={session.id} className="p-4 shadow-card border-0 bg-card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{session.station}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {session.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session.energy}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{session.cost}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                  Completed
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
