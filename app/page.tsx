"use client";

import { useState } from "react";
import { Copy, RefreshCw, Trash2, ChefHat, Sparkles, AlertTriangle } from "lucide-react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMealPlan = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setError("");
    setMealPlan(null);

    try {
      const res = await fetch("/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setMealPlan(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="space-y-2 border-l-4 border-indigo-500 pl-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <ChefHat className="w-6 h-6" />
            <span className="uppercase tracking-widest text-xs font-bold">Hizaki Labs System</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-space text-white tracking-tight">
            MealGen AI
          </h1>
          <p className="text-slate-400 max-w-xl">
            Leveraging Groq Llama-3 to transform pantry items into a professional 7-day nutritional plan.
          </p>
        </header>

        {/* INPUT SECTION */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Input Ingredients (comma separated)
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. Rice, Chicken, Eggs, Spinach..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <div className="flex gap-2">
              <button
                onClick={generateMealPlan}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {loading ? "Processing..." : "Initialize"}
              </button>
              <button
                onClick={() => setIngredients("")}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-3 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 text-red-200 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              {error}
            </div>
          )}
        </div>

        {/* RESULTS SECTION */}
        {mealPlan && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white font-space">Generated Protocol</h2>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded">
                STATUS: COMPLETE
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealPlan.schedule?.map((day: any, i: number) => (
                <div key={i} className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-indigo-500/50 transition-colors group">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h3 className="font-bold text-lg text-indigo-300">{day.day}</h3>
                    <ChefHat className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div className="space-y-4 text-sm">
                    {['breakfast', 'lunch', 'dinner'].map((meal) => (
                      <div key={meal}>
                        <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                          {meal}
                        </span>
                        <p className="font-medium text-slate-200">
                          {day[meal]?.name || "Leftovers / Open"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center text-slate-600 text-sm py-8 border-t border-slate-800">
          © {new Date().getFullYear()} Hizaki Labs. Built for efficiency.
        </footer>
      </div>
    </main>
  );
}