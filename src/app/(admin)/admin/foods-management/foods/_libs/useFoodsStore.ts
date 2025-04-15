import {
  foodFiltersDefaultValues,
  FoodFiltersSchema,
} from "@/app/(admin)/admin/foods-management/foods/_types/foodFilterSchema";
import { createStore } from "@/lib/createStore";

type State = {
  selectedFoodId: number | null;
  foodDialogOpen: boolean;
  foodFilters: FoodFiltersSchema;
  foodFiltersDrawerOpen: boolean;
};

type Actions = {
  updateSelectedFoodId: (id: State["selectedFoodId"]) => void;
  updateFoodDialogOpen: (is: State["foodDialogOpen"]) => void;
  updateFoodFilters: (filters: State["foodFilters"]) => void;
  updateFoodFiltersDrawerOpen: (is: State["foodFiltersDrawerOpen"]) => void;
};

type Store = State & Actions;

const useFoodsStore = createStore<Store>(
  (set) => ({
    selectedFoodId: null,
    updateSelectedFoodId: (id) =>
      set((state) => {
        state.selectedFoodId = id;
      }),
    foodDialogOpen: false,
    updateFoodDialogOpen: (is) =>
      set((state) => {
        state.foodDialogOpen = is;
      }),
    foodFilters: foodFiltersDefaultValues,
    updateFoodFilters: (filters) =>
      set((state) => {
        state.foodFilters = filters;
      }),
    foodFiltersDrawerOpen: false,
    updateFoodFiltersDrawerOpen: (is) =>
      set((state) => {
        state.foodFiltersDrawerOpen = is;
      }),
  }),
  {
    name: "foods-store",
    excludeFromPersist: ["foodFilters"],
  }
);

export { useFoodsStore };
