"use client";
import { useCategories } from "@/app/(admin)/admin/foods-management/categories/_services/useQueries";

import { useFoodsStore } from "@/app/(admin)/admin/foods-management/foods/_libs/use-food-store";
import {
  FoodFiltersSchema,
  foodFiltersDefaultValues,
  foodFiltersSchema,
} from "@/app/(admin)/admin/foods-management/foods/_types/foodFilterSchema";
import { Button } from "@/components/ui/button";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { ControlledSlider } from "@/components/ui/controlled/controlled-slider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const FoodFiltersDrawer = () => {
  const form = useForm<FoodFiltersSchema>({
    defaultValues: foodFiltersDefaultValues,
    resolver: zodResolver(foodFiltersSchema),
  });

  const {
    updateFoodFilters,
    foodFiltersDrawerOpen,
    updateFoodFiltersDrawerOpen,
  } = useFoodsStore();

  const categoriesQuery = useCategories();

  const onSubmit: SubmitHandler<FoodFiltersSchema> = (data) => {
    updateFoodFilters(data);
    updateFoodFiltersDrawerOpen(false);
  };

  return (
    <Drawer
      open={foodFiltersDrawerOpen}
      onOpenChange={updateFoodFiltersDrawerOpen}
      direction="right"
      handleOnly
    >
      <DrawerTrigger asChild>
        <Button variant="outline">
          <FilterIcon />
          Filters
        </Button>
      </DrawerTrigger>
      <FormProvider {...form}>
        <form>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>
                Customize your food search criteria
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <ControlledSelect<FoodFiltersSchema>
                  label="Category"
                  name="categoryId"
                  clearable
                  options={categoriesQuery.data?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />

                <ControlledSelect<FoodFiltersSchema>
                  label="Sort By"
                  name="sortBy"
                  options={[
                    { label: "Name", value: "name" },
                    { label: "Calories", value: "calories" },
                    { label: "Carbohydrates", value: "carbohydrates" },
                    { label: "Fat", value: "fat" },
                    { label: "Protein", value: "protein" },
                  ]}
                />

                <ControlledSelect<FoodFiltersSchema>
                  label="Sort Order"
                  name="sortOrder"
                  options={[
                    { label: "Ascending", value: "asc" },
                    { label: "Descending", value: "desc" },
                  ]}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <ControlledSlider<FoodFiltersSchema>
                  name="caloriesRange"
                  label="Calories"
                  min={0}
                  max={9999}
                />
                <ControlledSlider<FoodFiltersSchema>
                  name="proteinRange"
                  label="Protein"
                  min={0}
                  max={9999}
                />
              </div>
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset(foodFiltersDefaultValues);
                }}
              >
                Reset
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Apply Filters
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export { FoodFiltersDrawer };
