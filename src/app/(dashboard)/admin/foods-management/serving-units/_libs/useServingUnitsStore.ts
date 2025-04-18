import { createStore } from "@/lib/createStore";

type State = {
  selectedServingUnitId: number | null;
  servingUnitDialogOpen: boolean;
};

type Actions = {
  updateSelectedServingUnitId: (id: State["selectedServingUnitId"]) => void;
  updateServingUnitDialogOpen: (is: State["servingUnitDialogOpen"]) => void;
};

type Store = State & Actions;

const useServingUnitsStore = createStore<Store>(
  (set) => ({
    selectedServingUnitId: null,
    updateSelectedServingUnitId: (id) =>
      set((state) => {
        state.selectedServingUnitId = id;
      }),
    servingUnitDialogOpen: false,
    updateServingUnitDialogOpen: (is) =>
      set((state) => {
        state.servingUnitDialogOpen = is;
      }),
  }),
  {
    name: "serving-units-store",
  }
);

export { useServingUnitsStore };
