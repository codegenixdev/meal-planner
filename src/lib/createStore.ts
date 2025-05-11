import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StateCreator } from "zustand/vanilla";

type ConfigType<T> = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
  excludeFromPersist?: Array<keyof T>;
};

const createStore = <T extends object>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
  config?: ConfigType<T>,
) => {
  const {
    name,
    storage,
    skipPersist = false,
    excludeFromPersist = [] as Array<keyof T>,
  } = config || {};

  const immerStore = immer(storeCreator);

  if (skipPersist) {
    return create<T>()(immerStore);
  }

  return create<T>()(
    persist(immerStore, {
      name: name || "zustand-store",
      storage: createJSONStorage(() => storage || localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist.includes(key as keyof T),
          ),
        ),
    }),
  );
};

export { createStore };
