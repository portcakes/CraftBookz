import { create } from 'zustand';
import { Material, Recipe, Product, Supply, ActivityLog } from './types';

interface UserSettings {
  currency: string;
  shopName: string;
  shopUrl?: string;
  etsyUrl?: string;
  amazonUrl?: string;
  defaultTaxRate: number;
}

interface CraftStore {
  materials: Material[];
  recipes: Recipe[];
  products: Product[];
  supplies: Supply[];
  activityLogs: ActivityLog[];
  settings: UserSettings;
  addMaterial: (material: Material) => void;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (id: string) => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  produceProduct: (recipeId: string, quantity: number) => void;
  addSupply: (supply: Supply) => void;
  updateSupply: (supply: Supply) => void;
  deleteSupply: (id: string) => void;
  logActivity: (activity: Omit<ActivityLog, 'id' | 'createdAt'>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useCraftStore = create<CraftStore>((set) => ({
  materials: [],
  recipes: [],
  products: [],
  supplies: [],
  activityLogs: [],
  settings: {
    currency: 'USD',
    shopName: 'My Craft Shop',
    defaultTaxRate: 0,
  },
  
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
    
  addSupply: (supply) =>
    set((state) => {
      state.logActivity({
        action: 'Added',
        entityType: 'Supply',
        entityId: supply.id,
        entityName: supply.name,
      });
      return { supplies: [...state.supplies, supply] };
    }),
    
  updateSupply: (supply) =>
    set((state) => {
      state.logActivity({
        action: 'Updated',
        entityType: 'Supply',
        entityId: supply.id,
        entityName: supply.name,
      });
      return {
        supplies: state.supplies.map((s) => (s.id === supply.id ? supply : s)),
      };
    }),
    
  deleteSupply: (id) =>
    set((state) => ({
      supplies: state.supplies.filter((s) => s.id !== id),
    })),
    
  logActivity: (activity) =>
    set((state) => ({
      activityLogs: [
        { id: crypto.randomUUID(), createdAt: new Date(), ...activity },
        ...state.activityLogs,
      ].slice(0, 100), // Keep only last 100 activities
    })),
    
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),
}));