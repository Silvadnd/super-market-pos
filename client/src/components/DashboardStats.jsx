import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Daily Revenue",
      value: "$2,456",
      icon: DollarSign,
      trend: "+12.5%",
    },
    {
      title: "Total Orders",
      value: "145",
      icon: ShoppingCart,
      trend: "+5.2%",
    },
    {
      title: "Active Users",
      value: "32",
      icon: Users,
      trend: "+2.4%",
    },
    {
      title: "Sales Growth",
      value: "23.5%",
      icon: TrendingUp,
      trend: "+4.1%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              <p className="text-sm text-green-500 mt-2">{stat.trend}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <stat.icon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
