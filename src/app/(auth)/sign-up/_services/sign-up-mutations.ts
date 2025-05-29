"use server";

import {
  signUpSchema,
  SignUpSchema,
} from "@/app/(auth)/sign-up/_types/signUpSchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { hashPassword } from "@/lib/utils";

const signUp = async (data: SignUpSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signUpSchema.parse(data);
      const hashedPassword = await hashPassword(validatedData.password);

      await db.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
        },
      });
    },
  });
};

export { signUp };
