import { FoodFilter } from "@/app/(admin)/admin/foods-management/foods/_services/services";
import { createStore } from "@/lib/createStore";

type State = {
  selectedFoodId: number | null;
  foodDialogOpen: boolean;
  foodFilters: FoodFilter;
};

type Actions = {
  updateSelectedFoodId: (id: State["selectedFoodId"]) => void;
  updateFoodDialogOpen: (is: State["foodDialogOpen"]) => void;
  updateFoodFilterName: (name: State["foodFilters"]["name"]) => void;
  updateFoodFilterMinCalories: (
    minCalories: State["foodFilters"]["minCalories"]
  ) => void;
  updateFoodFilterMaxCalories: (
    maxCalories: State["foodFilters"]["maxCalories"]
  ) => void;
  updateFoodFilterMinProtein: (
    minProtein: State["foodFilters"]["minProtein"]
  ) => void;
  updateFoodFilterMaxProtein: (
    maxProtein: State["foodFilters"]["maxProtein"]
  ) => void;
  updateFoodFilterCategoryId: (
    categoryId: State["foodFilters"]["categoryId"]
  ) => void;
  updateFoodFilterSortBy: (sortBy: State["foodFilters"]["sortBy"]) => void;
  updateFoodFilterSortOrder: (
    sortOrder: State["foodFilters"]["sortOrder"]
  ) => void;
  updateFoodFilterPage: (page: State["foodFilters"]["page"]) => void;
  updateFoodFilterPageSize: (
    pageSize: State["foodFilters"]["pageSize"]
  ) => void;
  resetFoodFilters: () => void;
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
    foodFilters: {
      categoryId: 0,
      maxCalories: 0,
      maxProtein: 0,
      minCalories: 0,
      minProtein: 0,
      name: "",
      page: 1,
      pageSize: 100,
      sortBy: "name",
      sortOrder: "asc",
    },
    updateFoodFilterName: (name) =>
      set((state) => {
        state.foodFilters.name = name;
      }),
    updateFoodFilterMinCalories: (minCalories) =>
      set((state) => {
        state.foodFilters.minCalories = minCalories;
      }),
    updateFoodFilterMaxCalories: (maxCalories) =>
      set((state) => {
        state.foodFilters.maxCalories = maxCalories;
      }),
    updateFoodFilterMinProtein: (minProtein) =>
      set((state) => {
        state.foodFilters.minProtein = minProtein;
      }),
    updateFoodFilterMaxProtein: (maxProtein) =>
      set((state) => {
        state.foodFilters.maxProtein = maxProtein;
      }),
    updateFoodFilterCategoryId: (categoryId) =>
      set((state) => {
        state.foodFilters.categoryId = categoryId;
      }),
    updateFoodFilterSortBy: (sortBy) =>
      set((state) => {
        state.foodFilters.sortBy = sortBy;
      }),
    updateFoodFilterSortOrder: (sortOrder) =>
      set((state) => {
        state.foodFilters.sortOrder = sortOrder;
      }),
    updateFoodFilterPage: (page) =>
      set((state) => {
        state.foodFilters.page = page;
      }),
    updateFoodFilterPageSize: (pageSize) =>
      set((state) => {
        state.foodFilters.pageSize = pageSize;
      }),
    resetFoodFilters: () =>
      set((state) => {
        state.foodFilters = {};
      }),
  }),
  {
    name: "foods-store",
  }
);

export { useFoodsStore };
