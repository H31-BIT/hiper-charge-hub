import { TrendingUp, Zap, Wallet, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  { icon: Zap, label: "Total Energy", value: "1,245 kWh", trend: "+12%", color: "bg-primary" },
  { icon: Wallet, label: "Total Spent", value: "$186.50", trend: "+8%", color: "bg-accent-foreground" },
  { icon: Leaf, label: "CO₂ Saved", value: "523 kg", trend: "+15%", color: "bg-green-500" },
  { icon: TrendingUp, label: "Avg Session", value: "38 kWh", trend: "+5%", color: "bg-primary" },
];

const usageData = [
  { month: "Jan", value: 180 },
  { month: "Feb", value: 220 },
  { month: "Mar", value: 195 },
  { month: "Apr", value: 280 },
  { month: "May", value: 320 },
  { month: "Jun", value: 245 },
];

const DashboardPage = () => {
  const maxValue = Math.max(...usageData.map(d => d.value));

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Your charging statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 shadow-card border-0 bg-card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                stat.label === "CO₂ Saved" ? "bg-accent" : "bg-primary"
              }`}>
                <Icon className={`w-5 h-5 ${
                  stat.label === "CO₂ Saved" ? "text-accent-foreground" : "text-primary-foreground"
                }`} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <span className="text-xs text-green-500 font-medium">{stat.trend}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Usage Chart */}
      <Card className="p-5 shadow-card border-0 bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Usage</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {usageData.map((data) => (
            <div key={data.month} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-2">{data.value}</span>
                <div
                  className="w-full max-w-[40px] gradient-primary rounded-t-lg transition-all duration-300"
                  style={{ height: `${(data.value / maxValue) * 100}px` }}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Membership Card */}
      <Card className="gradient-primary text-primary-foreground p-5 border-0 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">HIPER Member</p>
            <h3 className="text-xl font-bold mt-1">Premium Plan</h3>
            <p className="text-sm text-primary-foreground/70 mt-2">15% discount on all sessions</p>
          </div>
          <div className="text-right">
            <Zap className="w-12 h-12 opacity-30" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
