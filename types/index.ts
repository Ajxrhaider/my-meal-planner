// types/index.ts

export interface Meal {
  name: string;
  description: string; // Short description of the dish
}

export interface DayPlan {
  day: string; // e.g., "Monday", "Tuesday"
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export interface WeeklyPlan {
  schedule: DayPlan[];
}