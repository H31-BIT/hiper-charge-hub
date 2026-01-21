import { Zap, Calendar, Clock, MapPin, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface ChargingSession {
  id: number;
  station: string;
  address: string;
  date: string;
  time: string;
  duration: string;
  energy: string;
  cost: string;
  status: string;
}

const historyData: ChargingSession[] = [
  {
    id: 1,
    station: "HIPER Station Central",
    address: "123 Main Street, Downtown",
    date: "Jan 21, 2025",
    time: "10:30 AM",
    duration: "45 min",
    energy: "32 kWh",
    cost: "$8.50",
    status: "completed",
  },
  {
    id: 2,
    station: "HIPER Hub Mall",
    address: "456 Shopping Ave, West Side",
    date: "Jan 20, 2025",
    time: "3:15 PM",
    duration: "1h 20min",
    energy: "58 kWh",
    cost: "$15.40",
    status: "completed",
  },
  {
    id: 3,
    station: "HIPER Express Park",
    address: "789 Park Road, City Center",
    date: "Jan 18, 2025",
    time: "9:00 AM",
    duration: "35 min",
    energy: "28 kWh",
    cost: "$7.20",
    status: "completed",
  },
  {
    id: 4,
    station: "HIPER Downtown",
    address: "321 Business Blvd, Financial District",
    date: "Jan 15, 2025",
    time: "2:45 PM",
    duration: "55 min",
    energy: "42 kWh",
    cost: "$11.00",
    status: "completed",
  },
  {
    id: 5,
    station: "HIPER Airport",
    address: "1 Airport Terminal, Gate A",
    date: "Jan 12, 2025",
    time: "6:30 AM",
    duration: "2h 10min",
    energy: "85 kWh",
    cost: "$22.50",
    status: "completed",
  },
];

const generateReceipt = (session: ChargingSession) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header background
  doc.setFillColor(30, 64, 175); // Primary blue
  doc.rect(0, 0, pageWidth, 50, "F");
  
  // Logo/Brand
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("HIPER", pageWidth / 2, 25, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("charging", pageWidth / 2, 35, { align: "center" });
  
  // Receipt title
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("CHARGING RECEIPT", pageWidth / 2, 70, { align: "center" });
  
  // Divider line
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.5);
  doc.line(20, 78, pageWidth - 20, 78);
  
  // Station details section
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("STATION", 20, 92);
  
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(session.station, 20, 100);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(session.address, 20, 108);
  
  // Details grid
  const detailsY = 130;
  const leftCol = 20;
  const rightCol = pageWidth / 2 + 10;
  
  // Left column
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text("DATE", leftCol, detailsY);
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(session.date, leftCol, detailsY + 8);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("TIME", leftCol, detailsY + 25);
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(session.time, leftCol, detailsY + 33);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("DURATION", leftCol, detailsY + 50);
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(session.duration, leftCol, detailsY + 58);
  
  // Right column
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("ENERGY CHARGED", rightCol, detailsY);
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(session.energy, rightCol, detailsY + 10);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("AMOUNT PAID", rightCol, detailsY + 30);
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(session.cost, rightCol, detailsY + 42);
  
  // Footer divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(20, 220, pageWidth - 20, 220);
  
  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for choosing HIPER Charging!", pageWidth / 2, 235, { align: "center" });
  doc.text("Drive safe and stay charged! ⚡", pageWidth / 2, 245, { align: "center" });
  
  // Receipt ID
  doc.setFontSize(8);
  doc.text(`Receipt ID: HIPER-${session.id}-${Date.now()}`, pageWidth / 2, 260, { align: "center" });
  
  // Save PDF
  doc.save(`HIPER_Receipt_${session.date.replace(/[, ]/g, "_")}.pdf`);

  toast({
    title: "Receipt Downloaded",
    description: `PDF receipt for ${session.station} has been downloaded.`,
  });
};

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
      <div className="space-y-4">
        {historyData.map((session) => (
          <Card key={session.id} className="p-4 shadow-card border-0 bg-card">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{session.station}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                    Completed
                  </span>
                </div>
              </div>
              <p className="text-lg font-bold text-primary">{session.cost}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground truncate">{session.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{session.time} • {session.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{session.energy}</span>
              </div>
            </div>

            {/* Download Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => generateReceipt(session)}
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
