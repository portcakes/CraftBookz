export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
  reorderPoint: number;
}

export interface CraftingStep {
  id: string;
  description: string;
  estimatedTime: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  materials: {
    materialId: string;
    quantity: number;
  }[];
  steps: CraftingStep[];
  estimatedTime: number;
  retailPrice: number;
  imageUrl?: string;
}

export interface Product {
  id: string;
  recipeId: string;
  quantity: number;
  lastProduced: Date;
}