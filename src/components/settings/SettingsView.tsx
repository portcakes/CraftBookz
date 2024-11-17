import React from "react";
import { Save } from "lucide-react";
import { useCraftStore } from "../../store";
import toast from "react-hot-toast";

export default function SettingsView() {
  const { settings, updateSettings } = useCraftStore();
  const [form, setForm] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    toast.success("Settings updated successfully");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-lg shadow-md p-6"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Shop Settings</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              value={form.shopName}
              onChange={(e) => setForm({ ...form, shopName: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="input"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Tax Rate (%)
            </label>
            <input
              type="number"
              value={form.defaultTaxRate}
              onChange={(e) =>
                setForm({ ...form, defaultTaxRate: Number(e.target.value) })
              }
              className="input"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Sales Channels
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Shop URL
            </label>
            <input
              type="url"
              value={form.shopUrl || ""}
              onChange={(e) => setForm({ ...form, shopUrl: e.target.value })}
              className="input"
              placeholder="https://your-shop.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Etsy Shop URL
            </label>
            <input
              type="url"
              value={form.etsyUrl || ""}
              onChange={(e) => setForm({ ...form, etsyUrl: e.target.value })}
              className="input"
              placeholder="https://etsy.com/shop/your-shop"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amazon Handmade URL
            </label>
            <input
              type="url"
              value={form.amazonUrl || ""}
              onChange={(e) => setForm({ ...form, amazonUrl: e.target.value })}
              className="input"
              placeholder="https://amazon.com/handmade/your-shop"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <Save size={20} className="mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
