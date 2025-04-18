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
  updateFoodFiltersPage: (action: "next" | "prev" | number) => void;
  updateFoodFiltersSearchTerm: (
    str: State["foodFilters"]["searchTerm"]
  ) => void;
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
    updateFoodFiltersPage: (action) =>
      set((state) => {
        const currentPage = state.foodFilters.page;
        let newPage = currentPage;

        if (action === "next") {
          newPage = currentPage + 1;
        } else if (action === "prev") {
          newPage = Math.max(currentPage - 1, 1);
        } else if (typeof action === "number") {
          newPage = action;
        }

        return {
          foodFilters: {
            ...state.foodFilters,
            page: newPage,
          },
        };
      }),
    updateFoodFiltersSearchTerm: (searchTerm) =>
      set((state) => {
        state.foodFilters.searchTerm = searchTerm;
      }),
  }),
  {
    name: "foods-store",
    excludeFromPersist: ["foodFilters"],
  }
);

export { useFoodsStore };
