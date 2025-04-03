import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StateCreator } from "zustand/vanilla";

type ConfigType = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
};

const createStore = <T>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
  config?: ConfigType
) => {
  const { name, storage, skipPersist = false } = config || {};

  const immerStore = immer(storeCreator);

  if (skipPersist) {
    return create<T>()(immerStore);
  }

  return create<T>()(
    persist(immerStore, {
      name: name || "zustand-store",
      storage: createJSONStorage(() => storage || localStorage),
    })
  );
};

export { createStore };
