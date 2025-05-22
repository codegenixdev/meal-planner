"use client";
import { CategoryCardsSkeleton } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-cards-skeleton";
import { useCategoriesStore } from "@/app/(dashboard)/admin/foods-management/categories/_libs/use-category-store";
import { useDeleteCategory } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-category-mutations";
import { useCategories } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-category-queries";
import { NoItemsFound } from "@/components/no-items-found";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/use-global-store";
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
    <div className="grid grid-cols-4 gap-2">
      {categoriesQuery.isLoading ? (
        <CategoryCardsSkeleton />
      ) : (
        <>
          {categoriesQuery.data?.map((item) => (
            <div
              className="bg-accent hover:bg-background-300 flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md transition-all duration-200 ease-in-out"
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
