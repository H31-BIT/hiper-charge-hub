import { useState } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import HistoryPage from "@/pages/HistoryPage";
import MapPage from "@/pages/MapPage";

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "dashboard":
        return <DashboardPage />;
      case "history":
        return <HistoryPage />;
      case "map":
        return <MapPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-20 overflow-auto">
        {renderPage()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AppLayout;
