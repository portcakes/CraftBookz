import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MaterialsView from "./components/materials/MaterialsView";
import RecipesView from "./components/recipes/RecipesView";
import ProductsView from "./components/products/ProductsView";
import LandingPage from "./components/LandingPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SuppliesView from "./components/supplies/SuppliesView";
import SettingsView from "./components/settings/SettingsView";

function App() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />

          <main className="flex-1 overflow-auto">
            {activeView === "dashboard" && <Dashboard />}
            {activeView === "materials" && <MaterialsView />}
            {activeView === "recipes" && <RecipesView />}
            {activeView === "products" && <ProductsView />}
            {activeView === "supplies" && <SuppliesView />}
            {activeView === "settings" && <SettingsView />}
          </main>

          <Toaster position="top-right" />
        </div>
      </SignedIn>
    </>
  );
}

export default App;
