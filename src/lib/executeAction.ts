import { getErrorMessage } from "@/lib/getErrorMessage";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
};
const executeAction = async <T>({ actionFn }: Options<T>) => {
  try {
    await actionFn();
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error(getErrorMessage(error));
  }
};

export { executeAction };
