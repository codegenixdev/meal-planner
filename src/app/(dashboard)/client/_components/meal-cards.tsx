"use client";
import { MealCardsSkeleton } from "@/app/(dashboard)/client/_components/meal-cards-skeleton";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import { useDeleteMeal } from "@/app/(dashboard)/client/_services/use-meal-mutations";
import { useMeals } from "@/app/(dashboard)/client/_services/use-meal-queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/useGlobalStore";
import { format } from "date-fns";
import { CalendarX, Edit, Trash, Utensils } from "lucide-react";

const MealCards = () => {
  const { updateSelectedMealId, updateMealDialogOpen } = useMealsStore();

  const mealsQuery = useMeals();

  const deleteMealMutation = useDeleteMeal();
  const totalPages = mealsQuery.data?.totalPages;

  const calculateTotalCalories = (mealFoods) => {
    return mealFoods.reduce((total, mealFood) => {
      const foodCalories = mealFood.food.calories * mealFood.amount || 0;
      return total + foodCalories;
    }, 0);
  };

  if (totalPages === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarX className="text-primary mb-2" />
        <h3 className="text-lg font-medium">No meals found</h3>
        <p className="text-sm text-foreground/60 mt-1">
          Try adjusting your filters or add new meals
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            updateMealDialogOpen(true);
          }}
        >
          Add new meal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mealsQuery.isLoading ? (
        <MealCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mealsQuery.data?.data.map((meal) => {
            const totalCalories = calculateTotalCalories(meal.mealFoods);

            return (
              <div
                className="shadow-md rounded-lg flex flex-col p-6 gap-3 border border-border/40 hover:border-border/80 transition-colors"
                key={meal.id}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {format(new Date(meal.dateTime), "PPp")}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {totalCalories} kcal
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      className="size-8"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        updateSelectedMealId(meal.id);
                        updateMealDialogOpen(true);
                      }}
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      className="size-8"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        alert({
                          title: "Delete Meal",
                          description:
                            "Are you sure you want to delete this meal?",
                          onConfirm: () => deleteMealMutation.mutate(meal.id),
                        });
                      }}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="size-4 text-primary" />
                    <p className="text-foreground/70 font-medium text-sm">
                      {meal.mealFoods.length}{" "}
                      {meal.mealFoods.length === 1 ? "item" : "items"}
                    </p>
                  </div>

                  {meal.mealFoods.length === 0 ? (
                    <p className="text-sm italic text-foreground/60">
                      No foods added
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {meal.mealFoods.map((mealFood) => (
                        <div
                          key={mealFood.id}
                          className="bg-muted/40 rounded-md p-3"
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{mealFood.food.name}</p>
                            <Badge variant="secondary">
                              {(mealFood.food.calories ?? 0) *
                                (mealFood.amount || 1)}{" "}
                              kcal
                            </Badge>
                          </div>

                          <div className="flex justify-between mt-2 text-sm text-foreground/70">
                            <div>
                              <span>Serving: </span>
                              <span className="font-medium">
                                {mealFood.amount > 0
                                  ? mealFood.amount
                                  : "Not specified"}{" "}
                                {mealFood.servingUnit?.name || "units"}
                              </span>
                            </div>

                            <div className="text-xs space-x-1">
                              <span>P: {mealFood.food.protein}g</span>
                              <span>C: {mealFood.food.carbohydrates}g</span>
                              <span>F: {mealFood.food.fat}g</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { MealCards };
