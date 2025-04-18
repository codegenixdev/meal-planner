"use client";
import { FoodCardsSkeleton } from "@/app/(dashboard)/admin/foods-management/foods/_components/food-cards-skeleton";
import { useFoodsStore } from "@/app/(dashboard)/admin/foods-management/foods/_libs/use-food-store";
import { useDeleteFood } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-mutations";
import { useFoods } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-queries";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/useGlobalStore";
import { BeanOff, Edit, Trash } from "lucide-react";

const FoodCards = () => {
  const {
    updateSelectedFoodId,
    updateFoodDialogOpen,
    foodFilters,
    updateFoodFiltersPage,
  } = useFoodsStore();

  const foodsQuery = useFoods();

  const deleteFoodMutation = useDeleteFood();
  const totalPages = foodsQuery.data?.totalPages;

  if (totalPages === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BeanOff className="text-primary mb-2" />
        <h3 className="text-lg font-medium">No foods found</h3>
        <p className="text-sm text-foreground/60 mt-1">
          Try adjusting your filters or add new foods
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            updateFoodDialogOpen(true);
          }}
        >
          Add new food
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {foodsQuery.isLoading ? (
        <FoodCardsSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {foodsQuery.data?.data.map((item) => (
            <div
              className="shadow-md rounded-lg flex flex-col p-6 gap-3"
              key={item.id}
            >
              <div className="flex justify-between">
                <p className="truncate">{item.name}</p>
                <div className="flex gap-1">
                  <Button
                    className="size-6"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      updateSelectedFoodId(item.id);
                      updateFoodDialogOpen(true);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    className="size-6"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      alert({
                        onConfirm: () => deleteFoodMutation.mutate(item.id),
                      });
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-foreground/60 font-normal text-sm">
                    Calories
                  </p>
                  <p className="text-sm font-medium">{item.calories} kcal</p>
                </div>
                <div>
                  <p className="text-foreground/60 font-normal text-sm">
                    Carbohydrates
                  </p>
                  <p className="text-sm font-medium">{item.carbohydrates} g</p>
                </div>
                <div>
                  <p className="text-foreground/60 font-normal text-sm">
                    Protein
                  </p>
                  <p className="text-sm font-medium">{item.protein} g</p>
                </div>
                <div>
                  <p className="text-foreground/60 font-normal text-sm">Fat</p>
                  <p className="text-sm font-medium">{item.fat} g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={foodFilters.page}
        totalPages={totalPages}
        updatePage={updateFoodFiltersPage}
      />
    </div>
  );
};

export { FoodCards };
