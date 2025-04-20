import { passwordSchema, requiredStringSchema } from "@/lib/zod-schemas";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: requiredStringSchema,
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const signUpDefaultValues: SignUpSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export { signUpDefaultValues, signUpSchema, type SignUpSchema };
