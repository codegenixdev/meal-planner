import { useCategoriesStore } from "@/app/(dashboard)/admin/foods-management/categories/_libs/use-category-store";
import {
  getCategories,
  getCategory,
} from "@/app/(dashboard)/admin/foods-management/categories/_services/category-queries";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const useCategory = () => {
  const { selectedCategoryId } = useCategoriesStore();

  return useQuery({
    queryKey: ["categories", { selectedCategoryId }],
    queryFn: () => getCategory(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });
};

export { useCategories, useCategory };
