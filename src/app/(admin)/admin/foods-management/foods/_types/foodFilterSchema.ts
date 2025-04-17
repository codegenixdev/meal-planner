import { patterns } from "@/lib/constants";
import { regexSchema } from "@/lib/zod-schemas";
import { z } from "zod";

const foodFiltersSchema = z.object({
  name: z.string(),
  caloriesRange: z.tuple([
    regexSchema(patterns.zeroTo9999),
    regexSchema(patterns.zeroTo9999),
  ]),
  proteinRange: z.tuple([
    regexSchema(patterns.zeroTo9999),
    regexSchema(patterns.zeroTo9999),
  ]),
  categoryId: z.string(),
  sortBy: z
    .enum(["name", "calories", "protein", "carbohydrates", "fat"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number(),
  pageSize: z.number().max(100),
});

type FoodFiltersSchema = z.infer<typeof foodFiltersSchema>;

const foodFiltersDefaultValues: FoodFiltersSchema = {
  name: "",
  caloriesRange: ["", ""],
  proteinRange: ["", ""],
  categoryId: "",
  sortBy: "name",
  sortOrder: "desc",
  pageSize: 10,
  page: 1,
};

export { foodFiltersSchema, type FoodFiltersSchema, foodFiltersDefaultValues };
