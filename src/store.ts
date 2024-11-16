import { create } from 'zustand';
import { Material, Recipe, Product } from './types';

interface CraftStore {
  materials: Material[];
  recipes: Recipe[];
  products: Product[];
  addMaterial: (material: Material) => void;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (id: string) => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  produceProduct: (recipeId: string, quantity: number) => void;
}

export const useCraftStore = create<CraftStore>((set) => ({
  materials: [],
  recipes: [],
  products: [],
  
  addMaterial: (material) =>
    set((state) => ({
      materials: [...state.materials, material],
    })),
    
  updateMaterial: (material) =>
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === material.id ? material : m
      ),
    })),

  deleteMaterial: (id) =>
    set((state) => ({
      materials: state.materials.filter((m) => m.id !== id),
    })),
    
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  updateRecipe: (recipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === recipe.id ? recipe : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),
    
  produceProduct: (recipeId, quantity) =>
    set((state) => {
      const recipe = state.recipes.find((r) => r.id === recipeId);
      if (!recipe) return state;

      const updatedMaterials = state.materials.map((material) => {
        const recipeRequirement = recipe.materials.find(
          (m) => m.materialId === material.id
        );
        if (!recipeRequirement) return material;

        return {
          ...material,
          quantity: material.quantity - recipeRequirement.quantity * quantity,
        };
      });

      let updatedProducts = [...state.products];
      const existingProduct = state.products.find((p) => p.recipeId === recipeId);
      
      if (existingProduct) {
        updatedProducts = state.products.map((p) =>
          p.recipeId === recipeId
            ? { ...p, quantity: p.quantity + quantity, lastProduced: new Date() }
            : p
        );
      } else {
        updatedProducts.push({
          id: crypto.randomUUID(),
          recipeId,
          quantity,
          lastProduced: new Date(),
        });
      }

      return {
        materials: updatedMaterials,
        products: updatedProducts,
      };
    }),
}));