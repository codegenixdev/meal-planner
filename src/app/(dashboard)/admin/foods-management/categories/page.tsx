"use client";

import { CategoryFormDialog } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-form-dialog";
import { useCategoriesStore } from "@/app/(dashboard)/admin/foods-management/categories/_libs/useCategoriesStore";
import { useDeleteCategory } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-mutations";
import { useCategories } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-queries";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/useGlobalStore";
import { Edit, Trash } from "lucide-react";

const Page = () => {
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

  const categoriesQuery = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <CategoryFormDialog />
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
