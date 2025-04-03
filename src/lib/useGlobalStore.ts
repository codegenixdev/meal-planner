import { createStore } from "@/lib/createStore";

type AlertConfig = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type State = {
  alertOpen: boolean;
  alertConfig: AlertConfig | null;
};

type Actions = {
  updateAlertOpen: (is: State["alertOpen"]) => void;
  showAlert: (config: AlertConfig) => void;
};

type Store = State & Actions;

const useGlobalStore = createStore<Store>(
  (set) => ({
    alertOpen: false,
    alertConfig: null,

    updateAlertOpen: (is) =>
      set((state) => {
        state.alertOpen = is;
        if (!is) state.alertConfig = null;
      }),

    showAlert: (config) =>
      set((state) => {
        state.alertOpen = true;
        state.alertConfig = config;
      }),
  }),
  {
    name: "global-store",
  }
);

const alert = (config: AlertConfig) => {
  useGlobalStore.getState().showAlert(config);
};

export { useGlobalStore, alert };
