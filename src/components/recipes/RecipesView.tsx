import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCraftStore } from '../../store';
import { Recipe } from '../../types';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import toast from 'react-hot-toast';

export default function RecipesView() {
  const { addRecipe, updateRecipe } = useCraftStore();
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();

  const handleSubmit = (recipe: Recipe) => {
    if (editingRecipe) {
      updateRecipe(recipe);
      toast.success('Recipe updated successfully');
    } else {
      addRecipe(recipe);
      toast.success('Recipe created successfully');
    }
    handleClose();
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingRecipe(undefined);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recipes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create Recipe
        </button>
      </div>

      <RecipeList onEdit={handleEdit} />

      {showForm && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}