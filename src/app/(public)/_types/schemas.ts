import { z } from "zod";

const mealSchema = z.object({
  foodIds: z.array(z.number().min(1)),
  userId: z.number().min(1),
});

export { mealSchema };
