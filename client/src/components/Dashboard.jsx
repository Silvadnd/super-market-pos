import { useState } from "react";
import { Layout } from "./Layout";
import { ProductTable } from "./ProductTable";
import { DashboardStats } from "./DashboardStats";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardStats />;
      case "products":
        return <ProductTable />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <Layout onNavigate={setCurrentView} currentView={currentView}>
      <div className="p-6">{renderContent()}</div>
    </Layout>
  );
};

export default Dashboard;
