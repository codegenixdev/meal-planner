import {
  createFood,
  deleteFood,
  updateFood,
} from "@/app/(admin)/admin/foods-management/foods/_services/services";
import { FoodSchema } from "@/app/(admin)/admin/foods-management/foods/_types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FoodSchema) => {
      await createFood(data);
    },
    onSuccess: () => {
      toast.success("Food created successfully.");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

const useUpdateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FoodSchema) => {
      await updateFood(data);
    },
    onSuccess: () => {
      toast.success("Food updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

const useDeleteFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteFood(id);
    },
    onSuccess: () => {
      toast.success("Food deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

export { useCreateFood, useDeleteFood, useUpdateFood };
