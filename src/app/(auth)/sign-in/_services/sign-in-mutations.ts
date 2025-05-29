"use server";
import {
  signInSchema,
  SignInSchema,
} from "@/app/(auth)/sign-in/_types/signInSchema";
import { signIn as nextAuthSignIn, signOut as authSignOut } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";

const signIn = async (data: SignInSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signInSchema.parse(data);
      await nextAuthSignIn("credentials", validatedData);
    },
  });
};

const signOut = () => {
  return executeAction({
    actionFn: authSignOut,
  });
};

export { signIn, signOut };
