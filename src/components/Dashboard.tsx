import React from "react";
import { useCraftStore } from "../store";
import {
  AlertTriangle,
  TrendingUp,
  Package,
  Clock,
  Activity,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "../utils/format";

export default function Dashboard() {
  const { materials, recipes, products, activityLogs, settings } =
    useCraftStore();

  const lowStockMaterials = materials.filter(
    (m) => m.quantity <= m.reorderPoint
  );

  const totalInventoryValue = products.reduce((total, product) => {
    const recipe = recipes.find((r) => r.id === product.recipeId);
    if (!recipe) return total;
    return total + recipe.retailPrice * product.quantity;
  }, 0);

  const ActivityFeed = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Activity className="text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>

        <div className="space-y-4">
          {activityLogs.slice(0, 10).map((log) => (
            <div key={log.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {log.action} {log.entityType.toLowerCase()}: {log.entityName}
                </p>
                {log.details && (
                  <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(log.createdAt)} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Products"
          value={products.reduce((sum, p) => sum + p.quantity, 0)}
          icon={Package}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Active Recipes"
          value={recipes.length}
          icon={Clock}
          color="bg-green-500"
        />
        <DashboardCard
          title="Low Stock Items"
          value={lowStockMaterials.length}
          icon={AlertTriangle}
          color="bg-yellow-500"
        />
        <DashboardCard
          title="Inventory Value"
          value={formatCurrency(totalInventoryValue, settings.currency)}
          icon={TrendingUp}
          color="bg-purple-500"
        />
      </div>

      {lowStockMaterials.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold">Low Stock Alert</h3>
          </div>
          <ul className="mt-2 space-y-1">
            {lowStockMaterials.map((material) => (
              <li key={material.id}>
                {material.name}: {material.quantity} {material.unit} remaining
              </li>
            ))}
          </ul>
        </div>
      )}

      <ActivityFeed />
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
}
