import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCraftStore } from '../../store';
import { Material } from '../../types';
import MaterialsList from './MaterialsList';
import MaterialForm from './MaterialForm';
import toast from 'react-hot-toast';

export default function MaterialsView() {
  const { addMaterial, updateMaterial } = useCraftStore();
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | undefined>();

  const handleSubmit = (material: Material) => {
    if (editingMaterial) {
      updateMaterial(material);
      toast.success('Material updated successfully');
    } else {
      addMaterial(material);
      toast.success('Material added successfully');
    }
    handleClose();
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingMaterial(undefined);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Materials</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Material
        </button>
      </div>

      <MaterialsList onEdit={handleEdit} />

      {showForm && (
        <MaterialForm
          material={editingMaterial}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}