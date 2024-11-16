import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Recipe, Material, CraftingStep } from '../../types';
import { useCraftStore } from '../../store';

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (recipe: Recipe) => void;
  onClose: () => void;
}

export default function RecipeForm({ recipe, onSubmit, onClose }: RecipeFormProps) {
  const { materials } = useCraftStore();
  const [form, setForm] = useState<Omit<Recipe, 'id'>>({
    name: '',
    description: '',
    materials: [],
    steps: [],
    estimatedTime: 0,
    retailPrice: 0,
    imageUrl: '',
  });

  useEffect(() => {
    if (recipe) {
      setForm({
        name: recipe.name,
        description: recipe.description,
        materials: recipe.materials,
        steps: recipe.steps,
        estimatedTime: recipe.estimatedTime,
        retailPrice: recipe.retailPrice,
        imageUrl: recipe.imageUrl || '',
      });
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: recipe?.id || crypto.randomUUID(),
      ...form,
    });
  };

  const addMaterial = () => {
    setForm({
      ...form,
      materials: [...form.materials, { materialId: '', quantity: 0 }],
    });
  };

  const removeMaterial = (index: number) => {
    setForm({
      ...form,
      materials: form.materials.filter((_, i) => i !== index),
    });
  };

  const updateMaterial = (index: number, field: string, value: string | number) => {
    const updatedMaterials = [...form.materials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    };
    setForm({ ...form, materials: updatedMaterials });
  };

  const addStep = () => {
    setForm({
      ...form,
      steps: [
        ...form.steps,
        { id: crypto.randomUUID(), description: '', estimatedTime: 0 },
      ],
    });
  };

  const removeStep = (index: number) => {
    setForm({
      ...form,
      steps: form.steps.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index: number, field: string, value: string | number) => {
    const updatedSteps = [...form.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };
    setForm({ ...form, steps: updatedSteps });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">
            {recipe ? 'Edit Recipe' : 'Create New Recipe'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input min-h-[100px]"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Materials Required
              </label>
              <button
                type="button"
                onClick={addMaterial}
                className="btn btn-secondary text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Material
              </button>
            </div>
            
            {form.materials.map((material, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <select
                  value={material.materialId}
                  onChange={(e) => updateMaterial(index, 'materialId', e.target.value)}
                  className="input flex-1"
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (${m.cost}/{m.unit})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={material.quantity}
                  onChange={(e) =>
                    updateMaterial(index, 'quantity', Number(e.target.value))
                  }
                  className="input w-32"
                  min="0"
                  placeholder="Quantity"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  className="btn btn-secondary"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Crafting Steps
              </label>
              <button
                type="button"
                onClick={addStep}
                className="btn btn-secondary text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Step
              </button>
            </div>
            
            {form.steps.map((step, index) => (
              <div key={step.id} className="flex gap-4 mb-2">
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  className="input flex-1"
                  placeholder="Step description"
                  required
                />
                <input
                  type="number"
                  value={step.estimatedTime}
                  onChange={(e) =>
                    updateStep(index, 'estimatedTime', Number(e.target.value))
                  }
                  className="input w-32"
                  min="0"
                  placeholder="Minutes"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="btn btn-secondary"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Time (minutes)
              </label>
              <input
                type="number"
                value={form.estimatedTime}
                onChange={(e) =>
                  setForm({ ...form, estimatedTime: Number(e.target.value) })
                }
                className="input"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retail Price ($)
              </label>
              <input
                type="number"
                value={form.retailPrice}
                onChange={(e) =>
                  setForm({ ...form, retailPrice: Number(e.target.value) })
                }
                className="input"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {recipe ? 'Update' : 'Create'} Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}