import {
  LayoutGrid,
  LogOut,
  Package,
  Scissors,
  ShoppingCart,
  Box,
  Settings,
} from "lucide-react";
import { UserButton, SignOutButton } from "@clerk/clerk-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
    { id: "materials", icon: ShoppingCart, label: "Materials" },
    { id: "recipes", icon: Scissors, label: "Recipes" },
    { id: "products", icon: Package, label: "Products" },
    { id: "supplies", icon: Box, label: "Supplies" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">CraftBookz</h1>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "2.5rem",
                height: "2.5rem",
              },
            },
          }}
        />
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeView === item.id
                  ? "bg-indigo-800"
                  : "hover:bg-indigo-800/50"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
        <div className="mt-auto">
          <SignOutButton>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors hover:bg-indigo-800/50">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </SignOutButton>
        </div>
      </nav>
    </div>
  );
}
