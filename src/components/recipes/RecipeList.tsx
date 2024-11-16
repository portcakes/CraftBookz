import React from 'react';
import { useCraftStore } from '../../store';
import { Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { Recipe } from '../../types';

interface RecipeListProps {
  onEdit: (recipe: Recipe) => void;
}

export default function RecipeList({ onEdit }: RecipeListProps) {
  const { recipes, materials } = useCraftStore();

  const getMaterialCost = (recipe: Recipe) => {
    return recipe.materials.reduce((total, material) => {
      const materialData = materials.find(m => m.id === material.materialId);
      if (!materialData) return total;
      return total + (materialData.cost * material.quantity);
    }, 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {recipe.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{recipe.estimatedTime} mins</span>
              </div>
              <div className="flex items-center text-gray-500">
                <DollarSign size={16} className="mr-1" />
                <span className="text-sm">${recipe.retailPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Materials cost: ${getMaterialCost(recipe).toFixed(2)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(recipe)}
                  className="p-2 text-indigo-600 hover:text-indigo-900"
                >
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}