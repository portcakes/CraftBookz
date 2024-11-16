import React from 'react';
import { useCraftStore } from '../../store';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Material } from '../../types';

interface MaterialsListProps {
  onEdit: (material: Material) => void;
}

export default function MaterialsList({ onEdit }: MaterialsListProps) {
  const { materials } = useCraftStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{material.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {material.quantity} {material.unit}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${material.cost.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {material.quantity <= material.reorderPoint ? (
                  <div className="flex items-center text-yellow-600">
                    <AlertTriangle size={16} className="mr-1" />
                    <span className="text-sm">Low Stock</span>
                  </div>
                ) : (
                  <span className="text-sm text-green-600">In Stock</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(material)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}