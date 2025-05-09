"use client";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import {
  mealFiltersDefaultValues,
  mealFiltersSchema,
  MealFiltersSchema,
} from "@/app/(dashboard)/client/_types/mealFilterSchema";
import { Button } from "@/components/ui/button";
import { ControlledDatePicker } from "@/components/ui/controlled/controlled-date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const MealFilters = () => {
  const form = useForm<MealFiltersSchema>({
    defaultValues: mealFiltersDefaultValues,
    resolver: zodResolver(mealFiltersSchema),
  });

  const { updateMealFilters } = useMealsStore();

  const onSubmit: SubmitHandler<MealFiltersSchema> = (data) => {
    updateMealFilters(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-3 mb-4"
      >
        <ControlledDatePicker<MealFiltersSchema>
          name="dateTime"
          label="Filter by date"
        />
        <Button type="submit" size="sm">
          Apply
        </Button>
      </form>
    </FormProvider>
  );
};

export { MealFilters };
