"use client";
import { useFoodsColumns } from "@/app/(admin)/admin/foods/_libs/useFoodsColumns";
import { useFoodsStore } from "@/app/(admin)/admin/foods/_libs/useFoodsStore";
import {
  useCreateFood,
  useUpdateFood,
} from "@/app/(admin)/admin/foods/_services/useMutations";
import {
  useFood,
  useFoods,
} from "@/app/(admin)/admin/foods/_services/useQueries";
import {
  foodDefaultValues,
  foodSchema,
  FoodSchema,
} from "@/app/(admin)/admin/foods/_types/schemas";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

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
  } = useFoodsStore();

  const foodsQuery = useFoods();
  const foodQuery = useFood();
  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const { foodsColumns } = useFoodsColumns();

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
    <div className="max-w-7xl mx-auto p-6">
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
                    <Input<FoodSchema>
                      name="name"
                      label="Name"
                      placeholder="Enter food name"
                    />
                  </div>
                  <div>
                    <Input<FoodSchema>
                      name="calories"
                      label="Calories"
                      type="number"
                      placeholder="kcal"
                    />
                  </div>
                  <div>
                    <Input<FoodSchema>
                      name="protein"
                      label="Protein"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <Input<FoodSchema>
                      name="carbohydrates"
                      label="Carbohydrates"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <Input<FoodSchema>
                      name="fat"
                      label="Fat"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <Input<FoodSchema>
                      name="fiber"
                      label="Fiber"
                      type="number"
                      placeholder="grams"
                    />
                  </div>
                  <div>
                    <Input<FoodSchema>
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

      <div className="mt-4 border rounded-md">
        <DataTable columns={foodsColumns} data={foodsQuery.data ?? []} />
      </div>
    </div>
  );
};

export default Page;
