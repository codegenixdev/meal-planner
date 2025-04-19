import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import {
  getMeal,
  getMeals,
} from "@/app/(dashboard)/client/_services/meal-queries";
import { useQuery } from "@tanstack/react-query";

const useMeals = () => {
  const { mealFilters } = useMealsStore();

  return useQuery({
    queryKey: ["meals", mealFilters],
    queryFn: () => getMeals(mealFilters),
  });
};

const useMeal = () => {
  const { selectedMealId } = useMealsStore();

  return useQuery({
    queryKey: ["meals", { selectedMealId }],
    queryFn: () => getMeal(selectedMealId!),
    enabled: !!selectedMealId,
  });
};

export { useMeals, useMeal };
