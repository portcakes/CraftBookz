import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Supply } from "../../types";

interface SupplyFormProps {
  supply?: Supply;
  onSubmit: (supply: Supply) => void;
  onClose: () => void;
}

export default function SupplyForm({
  supply,
  onSubmit,
  onClose,
}: SupplyFormProps) {
  const [form, setForm] = useState<Omit<Supply, "id">>({
    name: "",
    description: "",
    type: "PACKAGING" as const,
    quantity: 0,
    unit: "EACH" as const,
    cost: 0,
    reorderPoint: 0,
  });

  useEffect(() => {
    if (supply) {
      setForm({
        name: supply.name,
        description: supply.description || "",
        type: supply.type,
        quantity: supply.quantity,
        unit: supply.unit,
        cost: supply.cost,
        reorderPoint: supply.reorderPoint,
      });
    }
  }, [supply]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: supply?.id || crypto.randomUUID(),
      ...form,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {supply ? "Edit Supply" : "Add New Supply"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
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
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="input"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as Supply["type"] })
              }
              className="input"
              required
            >
              <option value="PACKAGING">Packaging</option>
              <option value="LABEL">Label</option>
              <option value="TAG">Tag</option>
              <option value="RIBBON">Ribbon</option>
              <option value="TOOL">Tool</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className="input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={form.unit}
                onChange={(e) =>
                  setForm({ ...form, unit: e.target.value as Supply["unit"] })
                }
                className="input"
                required
              >
                <option value="EACH">Each</option>
                <option value="PACK">Pack</option>
                <option value="BOX">Box</option>
                <option value="ROLL">Roll</option>
                <option value="BAG">Bag</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost per Unit
              </label>
              <input
                type="number"
                value={form.cost}
                onChange={(e) =>
                  setForm({ ...form, cost: Number(e.target.value) })
                }
                className="input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Point
              </label>
              <input
                type="number"
                value={form.reorderPoint}
                onChange={(e) =>
                  setForm({ ...form, reorderPoint: Number(e.target.value) })
                }
                className="input"
                min="0"
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
            <button type="submit" className="btn btn-primary">
              {supply ? "Update" : "Add"} Supply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
