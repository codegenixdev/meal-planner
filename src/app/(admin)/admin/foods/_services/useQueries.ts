import { useFoodsStore } from "@/app/(admin)/admin/foods/_libs/useFoodsStore";
import {
  getFood,
  getFoods,
} from "@/app/(admin)/admin/foods/_services/services";
import { useQuery } from "@tanstack/react-query";

const useFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
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
