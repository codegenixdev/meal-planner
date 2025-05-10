"use client";
import { CategoryCardsSkeleton } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-cards-skeleton";
import { useCategoriesStore } from "@/app/(dashboard)/admin/foods-management/categories/_libs/useCategoriesStore";
import { useDeleteCategory } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-mutations";
import { useCategories } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-queries";
import { NoItemsFound } from "@/components/no-items-found";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/useGlobalStore";
import { Edit, Trash } from "lucide-react";

const CategoryCards = () => {
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

  const categoriesQuery = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  if (categoriesQuery.data?.length === 0) {
    return <NoItemsFound onClick={() => updateCategoryDialogOpen(true)} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {categoriesQuery.isLoading ? (
        <CategoryCardsSkeleton />
      ) : (
        <>
          {categoriesQuery.data?.map((item) => (
            <div
              className="flex justify-between border rounded-lg flex-col p-6 gap-3"
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
        </>
      )}
    </div>
  );
};

export { CategoryCards };
