import { patterns } from "@/lib/constants";
import { z } from "zod";

const foodFiltersSchema = z.object({
  name: z.string(),
  minCalories: z.string().regex(patterns.zeroTo99999),
  maxCalories: z.string().regex(patterns.zeroTo99999),
  minProtein: z.string().regex(patterns.zeroTo99999),
  maxProtein: z.string().regex(patterns.zeroTo99999),
  categoryId: z.string(),
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
  minCalories: "",
  maxCalories: "",
  minProtein: "",
  maxProtein: "",
  categoryId: "",
  sortBy: "name",
  sortOrder: "desc",
  pageSize: 10,
  page: 1,
};

export { foodFiltersSchema, type FoodFiltersSchema, foodFiltersDefaultValues };
