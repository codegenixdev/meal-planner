"use client";

import { FoodFiltersDrawer } from "@/app/(admin)/admin/foods-management/foods/_components/food-filters-drawer";
import { FoodFormDialog } from "@/app/(admin)/admin/foods-management/foods/_components/food-form-dialog";
import { useFoodsStore } from "@/app/(admin)/admin/foods-management/foods/_libs/useFoodsStore";
import { useDeleteFood } from "@/app/(admin)/admin/foods-management/foods/_services/useMutations";
import { useFoods } from "@/app/(admin)/admin/foods-management/foods/_services/useQueries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/useGlobalStore";
import { Edit, Trash } from "lucide-react";

const Page = () => {
  const { updateSelectedFoodId, updateFoodDialogOpen } = useFoodsStore();

  const foodsQuery = useFoods();
  const deleteFoodMutation = useDeleteFood();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Foods List</h1>
        <FoodFormDialog />
      </div>
      <FoodFiltersDrawer />
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
    </div>
  );
};

export default Page;
