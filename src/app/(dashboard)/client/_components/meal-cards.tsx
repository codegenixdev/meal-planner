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
        { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 }
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">{displayDate}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Calories Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Flame className="mr-2 h-4 w-4 text-primary" />
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
              <CardTitle className="text-sm font-medium flex items-center">
                <PieChart className="mr-2 h-4 w-4 text-primary" />
                Macronutrients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Protein</p>
                  <p className="font-medium">{nutritionTotals.protein}g</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                  <p className="font-medium">{nutritionTotals.carbs}g</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fat</p>
                  <p className="font-medium">{nutritionTotals.fat}g</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Utensils className="mr-2 h-4 w-4 text-primary" />
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
                      0
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
              <CardTitle className="text-sm font-medium flex items-center">
                <LineChart className="mr-2 h-4 w-4 text-primary" />
                Additional Nutrients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div>
                  <p className="text-xs text-muted-foreground">Fiber</p>
                  <p className="font-medium">{nutritionTotals.fiber}g</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sugar</p>
                  <p className="font-medium">{nutritionTotals.sugar}g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meal Cards Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Meals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mealsQuery.data?.map((meal) => {
            const totalCalories = calculateTotalCalories(meal.mealFoods);

            return (
              <div
                className="border rounded-lg flex flex-col p-6 gap-3 border border-border/40 hover:border-border/80 transition-colors"
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
      </div>
    </div>
  );
};

export { MealCards };
