"use client";

import { useCategoriesStore } from "@/app/(admin)/admin/foods-management/categories/_libs/useCategoriesStore";
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/app/(admin)/admin/foods-management/categories/_services/useMutations";
import {
  useCategories,
  useCategory,
} from "@/app/(admin)/admin/foods-management/categories/_services/useQueries";
import {
  categoryDefaultValues,
  categorySchema,
  CategorySchema,
} from "@/app/(admin)/admin/foods-management/categories/_types/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { alert } from "@/lib/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<CategorySchema>({
    defaultValues: categoryDefaultValues,
    resolver: zodResolver(categorySchema),
  });

  const {
    selectedCategoryId,
    updateSelectedCategoryId,
    categoryDialogOpen,
    updateCategoryDialogOpen,
  } = useCategoriesStore();

  const categoriesQuery = useCategories();
  const categoryQuery = useCategory();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  useEffect(() => {
    if (!!selectedCategoryId && categoryQuery.data) {
      form.reset(categoryQuery.data);
    }
  }, [categoryQuery.data, form, selectedCategoryId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateCategoryDialogOpen(open);

    if (!open) {
      updateSelectedCategoryId(null);
      form.reset(categoryDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<CategorySchema> = (data) => {
    if (data.action === "create") {
      createCategoryMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateCategoryMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  const isPending =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedCategoryId ? "Edit Category" : "Create a New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormProvider {...form}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input<CategorySchema>
                      name="name"
                      label="Name"
                      placeholder="Enter category name"
                    />
                  </div>
                </div>
              </FormProvider>
              <DialogFooter>
                <Button type="submit" isLoading={isPending}>
                  {!!selectedCategoryId ? "Edit" : "Create"} Category
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {categoriesQuery.data?.map((item) => (
          <div
            className="flex justify-between shadow-md rounded-lg flex-col p-6 gap-3"
            key={item.id}
          >
            <p className="truncate">{item.name}</p>
            <div className="flex gap-1">
              <Button
                className="size-6"
                variant="ghost"
                size="icon"
                onClick={() => {
                  updateSelectedCategoryId(item.id);
                  updateCategoryDialogOpen(true);
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
                    onConfirm: () => deleteCategoryMutation.mutate(item.id),
                  });
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
