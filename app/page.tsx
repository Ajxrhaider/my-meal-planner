'use client';

import React, { useEffect, useState } from 'react';
import { useMealStore } from '@/store/mealStore';
import { Loader2, Trash2, Calendar, Sparkles, ChefHat } from 'lucide-react';

// Using a standard function declaration for the default export to satisfy Next.js
export default function MealGenPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { ingredients, setIngredients, generatePlan, plan, isLoading, error, reset } = useMealStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Guard against hydration mismatch
  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Navbar matching Hizaki Labs aesthetic */}
      <nav className="border-b border-slate-800 bg-[#1e293b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ChefHat className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold font-space tracking-tight text-white">
              Hizaki <span className="text-indigo-400">Labs</span>
            </h1>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            System Active
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <header className="text-center mb-16">
          <h2 className="text-5xl font-bold font-space text-white mb-6 leading-tight">
            AI Meal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Gen</span>erator
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Leveraging Groq Llama-3 to transform your pantry items into a professional 7-day nutritional plan.
          </p>
        </header>

        {/* Input Terminal */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles size={40} className="text-indigo-400" />
          </div>
          
          <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Input Ingredients</label>
          <textarea
            className="w-full h-44 p-6 rounded-2xl bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none font-medium text-lg placeholder:text-slate-600"
            placeholder="Chicken, spinach, eggs, greek yogurt, rice..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={generatePlan}
              disabled={isLoading || !ingredients.trim()}
              className="flex-[3] bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 disabled:opacity-50 active:scale-95"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              {isLoading ? 'Processing Neural Model...' : 'Initialize Generation'}
            </button>
            <button 
              onClick={reset} 
              className="flex-1 p-5 bg-slate-800 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-2xl transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              <span className="sm:hidden lg:inline">Clear</span>
            </button>
          </div>
          {error && <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-pulse">⚠️ {error}</div>}
        </div>

        {/* Plan Display */}
        {plan?.schedule && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {plan.schedule.map((day: any, i: number) => (
              <div key={i} className="bg-[#1e293b] border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/40 transition-all group">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                  <h3 className="font-bold text-2xl text-white font-space uppercase tracking-tighter italic">{day.day}</h3>
                  <Calendar size={20} className="text-indigo-500 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="space-y-8">
                  <MealSlot label="Breakfast" meal={day.breakfast} />
                  <MealSlot label="Lunch" meal={day.lunch} />
                  <MealSlot label="Dinner" meal={day.dinner} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-slate-800 mt-20 text-center opacity-50">
        <p className="text-sm font-space">© {new Date().getFullYear()} Hizaki Labs. Built for efficiency.</p>
      </footer>
    </div>
  );
}

function MealSlot({ label, meal }: { label: string; meal: any }) {
  return (
    <div className="relative pl-6 border-l-2 border-slate-700 hover:border-indigo-500 transition-colors">
      <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em] mb-2">{label}</p>
      <h4 className="font-bold text-slate-100 text-lg mb-1 leading-tight">{meal?.name}</h4>
      <p className="text-sm text-slate-500 leading-relaxed italic">{meal?.description}</p>
    </div>
  );
}