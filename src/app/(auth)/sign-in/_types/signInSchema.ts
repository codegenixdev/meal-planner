import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInSchema = z.infer<typeof signInSchema>;

const signInDefaultValues: SignInSchema = {
  email: "",
  password: "",
};

export { signInDefaultValues, signInSchema, type SignInSchema };
