import { z } from "zod";

const categorySchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
    foodIds: z.array(z.string()),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ])
);

const foodSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
    calories: z.number().nullable().optional(),
    protein: z.number().nullable().optional(),
    fat: z.number().nullable().optional(),
    carbohydrates: z.number().nullable().optional(),
    fiber: z.number().nullable().optional(),
    sugar: z.number().nullable().optional(),
    foodServingUnits: z.array(
      z.object({
        foodServingUnitId: z.number().min(1),
        grams: z.number().min(0),
      })
    ),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ])
);

const servingUnitSchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ])
);

export { categorySchema, foodSchema, servingUnitSchema };
