import { getErrorMessage } from "@/lib/getErrorMessage";

type Options<T> = {
  actionFn: () => Promise<T>;
};
const executeAction = async <T>({ actionFn }: Options<T>) => {
  try {
    await actionFn();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { executeAction };
