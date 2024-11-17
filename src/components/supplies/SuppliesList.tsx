import { Edit, Trash2, AlertTriangle } from "lucide-react";
import { useCraftStore } from "../../store";
import type { Supply } from "../../types";

interface SuppliesListProps {
  onEdit: (supply: Supply) => void;
}

export default function SuppliesList({ onEdit }: SuppliesListProps) {
  const { supplies, deleteSupply } = useCraftStore();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this supply?")) {
      deleteSupply(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {supplies.map((supply) => (
            <tr key={supply.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {supply.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {supply.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {supply.quantity} {supply.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${supply.cost.toFixed(2)}/{supply.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {supply.quantity <= supply.reorderPoint ? (
                  <div className="flex items-center text-yellow-600">
                    <AlertTriangle size={16} className="mr-1" />
                    <span className="text-sm">Low Stock</span>
                  </div>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    In Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(supply)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(supply.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {supplies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No supplies added yet</p>
        </div>
      )}
    </div>
  );
}
