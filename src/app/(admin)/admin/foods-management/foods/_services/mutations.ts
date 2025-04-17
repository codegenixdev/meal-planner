"use server";

import {
  FoodSchema,
  foodSchema,
} from "@/app/(admin)/admin/foods-management/foods/_types/foodSchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { toNumberSafe } from "@/lib/utils";

const createFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = foodSchema.parse(data);
      await db.food.create({
        data: {
          name: validatedData.name.trim(),
          calories: toNumberSafe(validatedData.calories),
          carbohydrates: toNumberSafe(validatedData.carbohydrates),
          fat: toNumberSafe(validatedData.fat),
          fiber: toNumberSafe(validatedData.fiber),
          sugar: toNumberSafe(validatedData.sugar),
          protein: toNumberSafe(validatedData.protein),
        },
      });
    },
  });
};

const updateFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = foodSchema.parse(data);
      if (validatedData.action === "update") {
        await db.food.update({
          where: { id: validatedData.id },
          data: {
            name: validatedData.name,
            calories: toNumberSafe(validatedData.calories),
            carbohydrates: toNumberSafe(validatedData.carbohydrates),
            fat: toNumberSafe(validatedData.fat),
            fiber: toNumberSafe(validatedData.fiber),
            sugar: toNumberSafe(validatedData.sugar),
            protein: toNumberSafe(validatedData.protein),
          },
        });
      }
    },
  });
};

const deleteFood = async (id: number) => {
  await executeAction({
    actionFn: () => db.food.delete({ where: { id } }),
  });
};

export { createFood, deleteFood, updateFood };
