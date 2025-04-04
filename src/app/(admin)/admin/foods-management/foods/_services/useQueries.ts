import { useFoodsStore } from "@/app/(admin)/admin/foods-management/foods/_libs/useFoodsStore";
import {
  getFood,
  getFoods,
} from "@/app/(admin)/admin/foods-management/foods/_services/services";
import { useQuery } from "@tanstack/react-query";

const useFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    now add filters in ui in store or somewhere else and pass them here
    queryFn: () => getFoods(),
  });
};

const useFood = () => {
  const { selectedFoodId } = useFoodsStore();

  return useQuery({
    queryKey: ["foods", { selectedFoodId }],
    queryFn: () => getFood(selectedFoodId!),
    enabled: !!selectedFoodId,
  });
};

export { useFoods, useFood };
