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

export type SupplyType = 'PACKAGING' | 'LABEL' | 'TAG' | 'RIBBON' | 'TOOL' | 'OTHER';

export type Unit =
  | "PCS"
  | "KG"
  | "G"
  | "L"
  | "ML"
  | "M"
  | "CM"
  | "EACH"
  | "BOX"
  | "ROLL"
  | "SET"
  | "PAIR"
  | "PACKAGE";

export interface Supply {
  id: string;
  name: string;
  description?: string;
  type: SupplyType;
  quantity: number;
  unit: Unit;
  cost: number;
  reorderPoint: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  details?: string;
  createdAt: Date;
}