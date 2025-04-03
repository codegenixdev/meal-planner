import { createStore } from "@/lib/createStore";

type State = {
  selectedFoodId: number | null;
  foodDialogOpen: boolean;
};

type Actions = {
  updateSelectedFoodId: (id: State["selectedFoodId"]) => void;
  updateFoodDialogOpen: (is: State["foodDialogOpen"]) => void;
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
  }),
  {
    name: "foods-store",
  }
);

export { useFoodsStore };
