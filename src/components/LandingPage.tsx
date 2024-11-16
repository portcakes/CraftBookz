import React from "react";
import { ArrowRight, Package, DollarSign, Scissors } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Scissors className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">
              CraftBookz
            </span>
          </div>
          <SignInButton>
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Craft Business with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track inventory, create recipes, and manage production all in one
            place. Perfect for crafters, makers, and small business owners.
          </p>
          <SignInButton>
            <button className="btn btn-primary text-lg px-8 py-3 flex items-center mx-auto">
              Get Started Now
              <ArrowRight className="ml-2" />
            </button>
          </SignInButton>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            icon={Package}
            title="Inventory Management"
            description="Track materials and finished products with ease. Get alerts when stock is running low."
          />
          <FeatureCard
            icon={Scissors}
            title="Recipe Management"
            description="Create and manage detailed recipes with step-by-step instructions and cost calculations."
          />
          <FeatureCard
            icon={DollarSign}
            title="Cost Tracking"
            description="Calculate production costs and set retail prices to ensure profitability."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
