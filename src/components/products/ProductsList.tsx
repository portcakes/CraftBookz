import { useCraftStore } from "../../store";
import { Clock, Package, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "../../utils/format";

export default function ProductsList() {
  const { products, recipes, produceProduct, settings } = useCraftStore();

  const handleProduce = (recipeId: string) => {
    produceProduct(recipeId, 1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const recipe = recipes.find((r) => r.id === product.recipeId);
        if (!recipe) return null;

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center">
                    <Package size={16} className="mr-2" />
                    <span>In Stock:</span>
                  </div>
                  <span className="font-medium">{product.quantity}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>Last Produced:</span>
                  </div>
                  <span>{formatDistanceToNow(product.lastProduced)} ago</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Retail Price:</span>
                  <span className="font-medium">
                    {formatCurrency(recipe.retailPrice, settings.currency)}
                  </span>
                </div>

                <button
                  onClick={() => handleProduce(recipe.id)}
                  className="w-full btn btn-primary flex items-center justify-center mt-4"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Produce One
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {products.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <Package size={48} className="mb-4" />
          <p className="text-lg">No products in inventory</p>
          <p className="text-sm">
            Start producing from your recipes to see them here
          </p>
        </div>
      )}
    </div>
  );
}
