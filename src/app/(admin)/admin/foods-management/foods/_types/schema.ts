import { z } from "zod";

const foodSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
    calories: z.coerce.number().nullable().optional(),
    protein: z.coerce.number().nullable().optional(),
    fat: z.coerce.number().nullable().optional(),
    carbohydrates: z.coerce.number().nullable().optional(),
    fiber: z.coerce.number().nullable().optional(),
    sugar: z.coerce.number().nullable().optional(),
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
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  fiber: 0,
  protein: 0,
  sugar: 0,
};

const servingUnitSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ])
);

export { foodSchema, servingUnitSchema, foodDefaultValues, type FoodSchema };
