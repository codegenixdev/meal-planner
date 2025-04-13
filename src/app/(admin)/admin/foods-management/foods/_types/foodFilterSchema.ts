import { z } from "zod";

const foodFiltersSchema = z.object({
  name: z.string().optional(),
  minCalories: z.coerce.number().min(0).max(9999).optional(),
  maxCalories: z.coerce.number().min(0).max(9999).optional(),
  minProtein: z.coerce.number().min(0).max(9999).optional(),
  maxProtein: z.coerce.number().min(0).max(9999).optional(),
  categoryId: z.coerce.number().optional().nullable(),
  sortBy: z
    .enum(["name", "calories", "protein", "carbohydrates", "fat"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number(),
  pageSize: z.number(),
});

type FoodFiltersSchema = z.infer<typeof foodFiltersSchema>;

const foodFiltersDefaultValues: FoodFiltersSchema = {
  name: "",
  minCalories: 0,
  maxCalories: 0,
  minProtein: 0,
  maxProtein: 0,
  categoryId: 0,
  sortBy: "name",
  sortOrder: "desc",
  pageSize: 10,
  page: 1,
};

export { foodFiltersSchema, type FoodFiltersSchema, foodFiltersDefaultValues };
