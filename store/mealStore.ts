import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useMealStore = create<any>()(
  persist(
    (set, get) => ({
      ingredients: '',
      plan: null,
      isLoading: false,
      error: null,
      setIngredients: (ingredients: string) => set({ ingredients }),
      generatePlan: async () => {
        const { ingredients } = get();
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/meal-plan', {
            method: 'POST',
            body: JSON.stringify({ ingredients }),
          });
          if (!res.ok) throw new Error('Failed to generate');
          const data = await res.json();
          set({ plan: data });
        } catch (err) {
          set({ error: "AI failed to respond. Check your API key." });
        } finally {
          set({ isLoading: false });
        }
      },
      reset: () => set({ plan: null, error: null }),
    }),
    {
      name: 'meal-planner-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);