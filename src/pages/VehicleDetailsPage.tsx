import { Car, Battery, Calendar, Hash, Gauge, Zap, ArrowLeft, Edit2, Palette, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VehicleDetailsPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    brandName: "Tesla",
    vehicleName: "Model 3",
    modelYear: "2023",
    batteryCapacity: "82 kWh",
    chassisNumber: "5YJ3E1EA1PF123456",
    registrationNumber: "EV-2023-1234",
    color: "Pearl White",
    range: "358 miles",
    motorType: "Dual Motor AWD",
    maxChargingSpeed: "250 kW",
    connectorType: "CCS2",
    purchaseDate: "2023-06-15",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleChange = (field: string, value: string) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  const DetailRow = ({ 
    icon: Icon, 
    label, 
    field, 
    value 
  }: { 
    icon: React.ElementType; 
    label: string; 
    field: string; 
    value: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-4 h-4" />
        {label}
      </Label>
      {isEditing ? (
        <Input
          id={field}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ) : (
        <p className="text-foreground font-medium pl-6">{value}</p>
      )}
    </div>
  );

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

      {/* Vehicle Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20">
          <Car className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{vehicleData.brandName} {vehicleData.vehicleName}</h2>
          <p className="text-sm text-muted-foreground">{vehicleData.modelYear} • {vehicleData.color}</p>
        </div>
      </div>

      {/* Basic Details Card */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Basic Details</CardTitle>
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
          <DetailRow icon={Car} label="Brand Name" field="brandName" value={vehicleData.brandName} />
          <Separator />
          <DetailRow icon={Car} label="Vehicle Name" field="vehicleName" value={vehicleData.vehicleName} />
          <Separator />
          <DetailRow icon={Calendar} label="Model Year" field="modelYear" value={vehicleData.modelYear} />
          <Separator />
          <DetailRow icon={Palette} label="Color" field="color" value={vehicleData.color} />
        </CardContent>
      </Card>

      {/* Battery & Charging Card */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Battery & Charging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DetailRow icon={Battery} label="Battery Capacity" field="batteryCapacity" value={vehicleData.batteryCapacity} />
          <Separator />
          <DetailRow icon={Gauge} label="Range" field="range" value={vehicleData.range} />
          <Separator />
          <DetailRow icon={Zap} label="Max Charging Speed" field="maxChargingSpeed" value={vehicleData.maxChargingSpeed} />
          <Separator />
          <DetailRow icon={Zap} label="Connector Type" field="connectorType" value={vehicleData.connectorType} />
        </CardContent>
      </Card>

      {/* Technical Details Card */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DetailRow icon={Hash} label="Chassis Number" field="chassisNumber" value={vehicleData.chassisNumber} />
          <Separator />
          <DetailRow icon={FileText} label="Registration Number" field="registrationNumber" value={vehicleData.registrationNumber} />
          <Separator />
          <DetailRow icon={Zap} label="Motor Type" field="motorType" value={vehicleData.motorType} />
          <Separator />
          <DetailRow icon={Calendar} label="Purchase Date" field="purchaseDate" value={vehicleData.purchaseDate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleDetailsPage;
