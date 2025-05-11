"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useFoodsStore } from "@/app/(dashboard)/admin/foods-management/foods/_libs/use-food-store";
import {
  useCreateFood,
  useUpdateFood,
} from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-mutations";
import { useFood } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-queries";
import {
  foodDefaultValues,
  foodSchema,
  FoodSchema,
} from "@/app/(dashboard)/admin/foods-management/foods/_types/foodSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { useCategories } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-queries";
import { SpecifyFoodServingUnits } from "@/app/(dashboard)/admin/foods-management/foods/_components/specify-food-serving-units";
import { CategoryFormDialog } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-form-dialog";
import { useCategoriesStore } from "@/app/(dashboard)/admin/foods-management/categories/_libs/useCategoriesStore";
import { useServingUnitsStore } from "@/app/(dashboard)/admin/foods-management/serving-units/_libs/useServingUnitsStore";

const FoodFormDialog = () => {
  const form = useForm<FoodSchema>({
    defaultValues: foodDefaultValues,
    resolver: zodResolver(foodSchema),
  });

  const foodQuery = useFood();
  const categoriesQuery = useCategories();

  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const isPending =
    createFoodMutation.isPending || updateFoodMutation.isPending;

  const {
    selectedFoodId,
    updateSelectedFoodId,
    foodDialogOpen,
    updateFoodDialogOpen,
  } = useFoodsStore();

  const { categoryDialogOpen } = useCategoriesStore();
  const { servingUnitDialogOpen } = useServingUnitsStore();

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

  const disabledSubmit = servingUnitDialogOpen || categoryDialogOpen;

  const onSubmit: SubmitHandler<FoodSchema> = (data) => {
    if (data.action === "create") {
      createFoodMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateFoodMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  return (
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
        <form
          onSubmit={disabledSubmit ? undefined : form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 grid">
                <ControlledInput<FoodSchema>
                  name="name"
                  label="Name"
                  placeholder="Enter food name"
                />
              </div>

              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchema>
                  label="Category"
                  name="categoryId"
                  options={categoriesQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
                <CategoryFormDialog smallTrigger />
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
              <div className="col-span-2">
                <SpecifyFoodServingUnits />
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
  );
};

export { FoodFormDialog };
