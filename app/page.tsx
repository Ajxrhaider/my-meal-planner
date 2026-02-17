"use client";

import { useState } from "react";
import { Trash2, Sparkles, AlertTriangle, RefreshCw, ChefHat } from "lucide-react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMealPlan = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setError("");
    
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
      setError(err.message || "Connection to Groq failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* BRANDING HEADER */}
        <div className="border-l-4 border-indigo-500 pl-6 py-2">
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2 italic">
            MEALGEN <span className="text-indigo-500 not-italic">AI</span>
          </h1>
          <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Hizaki Labs System Protocol v1.0</p>
        </div>

        {/* INPUT BOX */}
        <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-indigo-400">Pantry Inventory</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. Chicken breast, brown rice, broccoli..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px] transition-all"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={generateMealPlan}
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {loading ? "PROCESSING PROTOCOL..." : "INITIALIZE GENERATION"}
              </button>
              <button
                onClick={() => { setIngredients(""); setMealPlan(null); }}
                className="px-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all active:scale-95"
              >
                <Trash2 className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-red-200 flex items-center gap-3 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-500" /> {error}
          </div>
        )}

        {/* RESULTS DISPLAY */}
        {mealPlan && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-[1px] flex-1 bg-slate-800"></div>
               <p className="text-indigo-400 font-mono text-xs font-bold tracking-[0.2em]">OUTPUT DATA RECEIVED</p>
               <div className="h-[1px] flex-1 bg-slate-800"></div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {mealPlan.schedule?.map((day: any, i: number) => (
                <div key={i} className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl">
                  <h3 className="text-indigo-400 font-bold mb-4 flex items-center gap-2">
                    <ChefHat className="w-4 h-4" /> {day.day}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 font-bold text-[10px] uppercase">Breakfast</p>
                      <p className="text-slate-200">{day.breakfast?.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold text-[10px] uppercase">Lunch</p>
                      <p className="text-slate-200">{day.lunch?.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold text-[10px] uppercase">Dinner</p>
                      <p className="text-slate-200">{day.dinner?.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center text-slate-600 text-[10px] uppercase tracking-[0.3em] py-12">
          © 2026 Hizaki Labs. All Systems Operational.
        </footer>
      </div>
    </main>
  );
}