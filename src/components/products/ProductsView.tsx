import React from 'react';
import { Package } from 'lucide-react';
import ProductsList from './ProductsList';
import { useCraftStore } from '../../store';

export default function ProductsView() {
  const { products, recipes } = useCraftStore();

  const totalValue = products.reduce((total, product) => {
    const recipe = recipes.find((r) => r.id === product.recipeId);
    if (!recipe) return total;
    return total + (recipe.retailPrice * product.quantity);
  }, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Products Inventory</h2>
          <p className="text-gray-600 mt-1">
            Total Inventory Value: ${totalValue.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg">
          <Package size={20} className="mr-2" />
          <span className="font-medium">
            {products.reduce((sum, p) => sum + p.quantity, 0)} Total Items
          </span>
        </div>
      </div>

      <ProductsList />
    </div>
  );
}