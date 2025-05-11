"use client";
import { MealCardsSkeleton } from "@/app/(dashboard)/client/_components/meal-cards-skeleton";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import { useDeleteMeal } from "@/app/(dashboard)/client/_services/use-meal-mutations";
import { useMeals } from "@/app/(dashboard)/client/_services/use-meal-queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/useGlobalStore";
import { format } from "date-fns";
import {
  CalendarX,
  Edit,
  Flame,
  LineChart,
  PieChart,
  Trash,
  Utensils,
} from "lucide-react";

const MealCards = () => {
  const { updateSelectedMealId, updateMealDialogOpen, mealFilters } =
    useMealsStore();

  const mealsQuery = useMeals();

  const deleteMealMutation = useDeleteMeal();

  const calculateTotalCalories = (mealFoods) => {
    return mealFoods.reduce((total, mealFood) => {
      const foodCalories = mealFood.food.calories * mealFood.amount || 0;
      return total + foodCalories;
    }, 0);
  };

  const calculateNutritionTotals = (meals) => {
    return (
      meals?.reduce(
        (totals, meal) => {
          meal.mealFoods.forEach((mealFood) => {
            const multiplier = mealFood.amount || 1;
            totals.calories += (mealFood.food.calories || 0) * multiplier;
            totals.protein += (mealFood.food.protein || 0) * multiplier;
            totals.carbs += (mealFood.food.carbohydrates || 0) * multiplier;
            totals.fat += (mealFood.food.fat || 0) * multiplier;
            totals.sugar += (mealFood.food.sugar || 0) * multiplier;
            totals.fiber += (mealFood.food.fiber || 0) * multiplier;
          });
          return totals;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 },
      ) || { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 }
    );
  };

  const nutritionTotals = calculateNutritionTotals(mealsQuery.data);

  const displayDate = mealFilters.dateTime
    ? format(new Date(mealFilters.dateTime), "EEEE, MMMM d, yyyy")
    : "Today";

  if (mealsQuery.isLoading) {
    return <MealCardsSkeleton />;
  }

  if (mealsQuery.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarX className="text-primary mb-2" />
        <h3 className="text-lg font-medium">No meals found</h3>
        <p className="text-foreground/60 mt-1 text-sm">
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
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">{displayDate}</h2>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Calories Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <Flame className="text-primary mr-2 h-4 w-4" />
                Total Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nutritionTotals.calories} kcal
              </div>
            </CardContent>
          </Card>

          {/* Macronutrients Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <PieChart className="text-primary mr-2 h-4 w-4" />
                Macronutrients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-muted-foreground text-xs">Protein</p>
                  <p className="font-medium">{nutritionTotals.protein}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Carbs</p>
                  <p className="font-medium">{nutritionTotals.carbs}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Fat</p>
                  <p className="font-medium">{nutritionTotals.fat}g</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <Utensils className="text-primary mr-2 h-4 w-4" />
                Meal Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Total Meals</span>
                  <span className="font-medium">
                    {mealsQuery.data?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Food Items</span>
                  <span className="font-medium">
                    {mealsQuery.data?.reduce(
                      (total, meal) => total + meal.mealFoods.length,
                      0,
                    ) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Meal</span>
                  <span className="font-medium">
                    {mealsQuery.data?.length
                      ? format(new Date(mealsQuery.data[0].dateTime), "h:mm a")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Nutrients Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <LineChart className="text-primary mr-2 h-4 w-4" />
                Additional Nutrients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-muted-foreground text-xs">Fiber</p>
                  <p className="font-medium">{nutritionTotals.fiber}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Sugar</p>
                  <p className="font-medium">{nutritionTotals.sugar}g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meal Cards Section */}
      <div>
        <h3 className="mb-4 text-lg font-medium">Meals</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mealsQuery.data?.map((meal) => {
            const totalCalories = calculateTotalCalories(meal.mealFoods);

            return (
              <div
                className="border-border/40 hover:border-border/80 flex flex-col gap-3 rounded-lg border p-6 transition-colors"
                key={meal.id}
              >
                <div className="flex items-start justify-between">
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
                    <Utensils className="text-primary size-4" />
                    <p className="text-foreground/70 text-sm font-medium">
                      {meal.mealFoods.length}{" "}
                      {meal.mealFoods.length === 1 ? "item" : "items"}
                    </p>
                  </div>

                  {meal.mealFoods.length === 0 ? (
                    <p className="text-foreground/60 text-sm italic">
                      No foods added
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {meal.mealFoods.map((mealFood) => (
                        <div
                          key={mealFood.id}
                          className="bg-muted/40 rounded-md p-3"
                        >
                          <div className="flex items-start justify-between">
                            <p className="font-medium">{mealFood.food.name}</p>
                            <Badge variant="secondary">
                              {(mealFood.food.calories ?? 0) *
                                (mealFood.amount || 1)}{" "}
                              kcal
                            </Badge>
                          </div>

                          <div className="text-foreground/70 mt-2 flex justify-between text-sm">
                            <div>
                              <span>Serving: </span>
                              <span className="font-medium">
                                {mealFood.amount > 0
                                  ? mealFood.amount
                                  : "Not specified"}{" "}
                                {mealFood.servingUnit?.name || "units"}
                              </span>
                            </div>

                            <div className="space-x-1 text-xs">
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
      </div>
    </div>
  );
};

export { MealCards };
