"use client";

import { useCategories } from "@/app/(admin)/admin/foods-management/categories/_services/useQueries";
import { useFoodsStore } from "@/app/(admin)/admin/foods-management/foods/_libs/useFoodsStore";
import {
  useCreateFood,
  useDeleteFood,
  useUpdateFood,
} from "@/app/(admin)/admin/foods-management/foods/_services/useMutations";
import {
  useFood,
  useFoods,
} from "@/app/(admin)/admin/foods-management/foods/_services/useQueries";
import {
  foodDefaultValues,
  foodSchema,
  FoodSchema,
} from "@/app/(admin)/admin/foods-management/foods/_types/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { Separator } from "@/components/ui/separator";
import { UncontrolledSelect } from "@/components/ui/uncontrolled/uncontrolled-select";
import { alert } from "@/lib/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UncontrolledInput } from "@/components/ui/uncontrolled/uncontrolled-input";
import { FoodFilter } from "@/app/(admin)/admin/foods-management/foods/_services/services";

const Page = () => {
  const form = useForm<FoodSchema>({
    defaultValues: foodDefaultValues,
    resolver: zodResolver(foodSchema),
  });

  const {
    selectedFoodId,
    updateSelectedFoodId,
    foodDialogOpen,
    updateFoodDialogOpen,
    updateFoodFilterCategoryId,
    updateFoodFilterMinCalories,
    updateFoodFilterMaxCalories,
    updateFoodFilterMinProtein,
    updateFoodFilterMaxProtein,
    updateFoodFilterSortBy,
    updateFoodFilterSortOrder,
    foodFilters,
  } = useFoodsStore();

  const foodsQuery = useFoods();
  const foodQuery = useFood();
  const categoriesQuery = useCategories();
  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();
  const deleteFoodMutation = useDeleteFood();

  useEffect(() => {
    if (!!selectedFoodId && foodQuery.data) {
      form.reset(foodQuery.data);
    }
  }, [foodQuery.data, form, selectedFoodId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateFoodDialogOpen(open);

    if (!open) {
      updateSelectedFoodId(null);
      form.reset(foodDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<FoodSchema> = (data) => {
    if (data.action === "create") {
      createFoodMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateFoodMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  const isPending =
    createFoodMutation.isPending || updateFoodMutation.isPending;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Foods List</h1>
        <Dialog open={foodDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              New Food
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedFoodId ? "Edit Food" : "Create a New Food"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormProvider {...form}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <ControlledInput<FoodSchema>
                      name="name"
                      label="Name"
                      placeholder="Enter food name"
                    />
                  </div>
                  <div>
                    <ControlledInput<FoodSchema>
                      name="calories"
                      label="Calories"
                      type="number"
                      placeholder="kcal"
                    />
                  </div>
                  <div>
                    <ControlledInput<FoodSchema>
                      name="protein"
                      label="Protein"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <ControlledInput<FoodSchema>
                      name="carbohydrates"
                      label="Carbohydrates"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <ControlledInput<FoodSchema>
                      name="fat"
                      label="Fat"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <ControlledInput<FoodSchema>
                      name="fiber"
                      label="Fiber"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <ControlledInput<FoodSchema>
                      name="sugar"
                      label="Sugar"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                </div>
              </FormProvider>
              <DialogFooter>
                <Button type="submit" isLoading={isPending}>
                  {!!selectedFoodId ? "Edit" : "Create"} Food
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-1">
        <UncontrolledSelect
          label="Category"
          options={[
            { label: "All Categories", value: "0" },
            ...(categoriesQuery.data ?? []).map((item) => ({
              label: item.name,
              value: item.id.toString(),
            })),
          ]}
          onValueChange={(value) => updateFoodFilterCategoryId(+value)}
          value={foodFilters.categoryId?.toString()}
        />

        <UncontrolledSelect
          label="Sort By"
          options={
            [
              { label: "Name", value: "name" },
              { label: "Calories", value: "calories" },
              { label: "carbohydrates", value: "carbohydrates" },
              { label: "Fat", value: "fat" },
              { label: "Protein", value: "protein" },
            ] satisfies {
              label: string;
              value: FoodFilter["sortBy"];
            }[]
          }
          onValueChange={(value) =>
            updateFoodFilterSortBy(value as FoodFilter["sortBy"])
          }
          value={foodFilters.sortBy?.toString()}
        />

        <UncontrolledSelect
          label="Sort Order"
          options={
            [
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "desc" },
            ] satisfies {
              label: string;
              value: FoodFilter["sortOrder"];
            }[]
          }
          onValueChange={(value) =>
            updateFoodFilterSortOrder(value as FoodFilter["sortOrder"])
          }
          value={foodFilters.sortOrder?.toString()}
        />
      </div>

      <div className="flex gap-1">
        <UncontrolledInput
          label="Min Calories"
          value={foodFilters.minCalories}
          onChange={(value) => updateFoodFilterMinCalories(+value)}
        />
        <UncontrolledInput
          label="Max Calories"
          value={foodFilters.maxCalories}
          onChange={(value) => updateFoodFilterMaxCalories(+value)}
        />
        <UncontrolledInput
          label="Min Protein"
          value={foodFilters.minProtein}
          onChange={(value) => updateFoodFilterMinProtein(+value)}
        />
        <UncontrolledInput
          label="Max Protein"
          value={foodFilters.maxProtein}
          onChange={(value) => updateFoodFilterMaxProtein(+value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {foodsQuery.data?.map((item) => (
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
