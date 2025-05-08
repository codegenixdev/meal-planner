import { z } from "zod";

const mealFiltersSchema = z.object({
  dateTime: z.coerce.date(),
  page: z.number(),
  pageSize: z.number().max(100),
});

type MealFiltersSchema = z.infer<typeof mealFiltersSchema>;

const mealFiltersDefaultValues: MealFiltersSchema = {
  dateTime: new Date(),
  pageSize: 12,
  page: 1,
};

export { mealFiltersDefaultValues, mealFiltersSchema, type MealFiltersSchema };
