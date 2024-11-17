import { useState } from "react";
import { Plus } from "lucide-react";
import { useCraftStore } from "../../store";
import SuppliesList from "./SuppliesList";
import SupplyForm from "./SupplyForm";
import toast from "react-hot-toast";
import { Supply } from "../../types";

export default function SuppliesView() {
  const { addSupply, updateSupply } = useCraftStore();
  const [showForm, setShowForm] = useState(false);
  const [editingSupply, setEditingSupply] = useState<Supply | undefined>();

  const handleSubmit = (supply: Supply) => {
    if (editingSupply) {
      updateSupply(supply);
      toast.success("Supply updated successfully");
    } else {
      addSupply(supply);
      toast.success("Supply added successfully");
    }
    handleClose();
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingSupply(undefined);
  };

  const handleEdit = (supply: Supply) => {
    setEditingSupply(supply);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Supplies</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Supply
        </button>
      </div>

      <SuppliesList onEdit={handleEdit} />

      {showForm && (
        <SupplyForm
          supply={editingSupply}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
