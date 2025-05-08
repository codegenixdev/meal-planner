"use client";

import { SpecifyMealFoods } from "@/app/(dashboard)/client/_components/specify-meal-foods";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import {
  useCreateMeal,
  useUpdateMeal,
} from "@/app/(dashboard)/client/_services/use-meal-mutations";
import { useMeal } from "@/app/(dashboard)/client/_services/use-meal-queries";
import {
  mealDefaultValues,
  mealSchema,
  MealSchema,
} from "@/app/(dashboard)/client/_types/mealSchema";
import { Button } from "@/components/ui/button";
import { ControlledDatePicker } from "@/components/ui/controlled/controlled-date-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";

type MealFormDialogProps = {
  smallTrigger?: boolean;
};
const MealFormDialog = ({ smallTrigger }: MealFormDialogProps) => {
  const { data: session } = useSession();

  const form = useForm<MealSchema>({
    defaultValues: mealDefaultValues,
    resolver: zodResolver(mealSchema),
  });

  const userId = useWatch({ control: form.control, name: "userId" });

  const {
    selectedMealId,
    updateSelectedMealId,
    mealDialogOpen,
    updateMealDialogOpen,
  } = useMealsStore();

  const mealQuery = useMeal();
  const createMealMutation = useCreateMeal();
  const updateMealMutation = useUpdateMeal();

  useEffect(() => {
    if (!!selectedMealId && mealQuery.data) {
      form.reset(mealQuery.data);
    }
  }, [mealQuery.data, form, selectedMealId]);

  useEffect(() => {
    if (!userId && session?.user?.id) {
      form.setValue("userId", session.user.id);
    }
  }, [form, session?.user?.id, userId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateMealDialogOpen(open);

    if (!open) {
      updateSelectedMealId(null);
      form.reset(mealDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<MealSchema> = (data) => {
    if (data.action === "create") {
      createMealMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateMealMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  const isPending =
    createMealMutation.isPending || updateMealMutation.isPending;

  return (
    <Dialog open={mealDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Meal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedMealId ? "Edit Meal" : "Create a New Meal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SpecifyMealFoods />
              </div>
              <div className="col-span-2">
                <ControlledDatePicker<MealSchema> name="dateTime" />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedMealId ? "Edit" : "Create"} Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export { MealFormDialog };
