import { useCategoriesStore } from "@/app/(admin)/admin/foods-management/categories/_libs/useCategoriesStore";
import {
  getCategory,
  getCategories,
} from "@/app/(admin)/admin/foods-management/categories/_services/services";
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
