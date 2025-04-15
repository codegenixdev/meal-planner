import { patterns } from "@/lib/constants";
import { z } from "zod";

const foodSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255).trim(),
    calories: z.string().regex(patterns.zeroTo99999),
    protein: z.string().regex(patterns.zeroTo99999),
    fat: z.string().regex(patterns.zeroTo99999),
    carbohydrates: z.string().regex(patterns.zeroTo99999),
    fiber: z.string().regex(patterns.zeroTo99999),
    sugar: z.string().regex(patterns.zeroTo99999),
    foodServingUnits: z.array(
      z.object({
        foodServingUnitId: z.number().min(1),
        grams: z.coerce.number().min(0),
      })
    ),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ])
);

type FoodSchema = z.infer<typeof foodSchema>;

const foodDefaultValues: FoodSchema = {
  action: "create",
  foodServingUnits: [],
  name: "",
  calories: "",
  carbohydrates: "",
  fat: "",
  fiber: "",
  protein: "",
  sugar: "",
};

const servingUnitSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255).trim(),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ])
);

export { foodSchema, servingUnitSchema, foodDefaultValues, type FoodSchema };
