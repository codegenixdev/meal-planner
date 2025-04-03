"use server";

import { FoodSchema } from "@/app/(admin)/admin/foods/_types/schemas";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const createFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: () =>
      db.food.create({
        data: {
          name: data.name,
          calories: data.calories,
          carbohydrates: data.carbohydrates,
          fat: data.fat,
          fiber: data.fiber,
          sugar: data.sugar,
          protein: data.protein,
        },
      }),
  });
};

const updateFood = async (data: FoodSchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.food.update({
          where: { id: data.id },
          data: {
            name: data.name,
            calories: data.calories,
            carbohydrates: data.carbohydrates,
            fat: data.fat,
            fiber: data.fiber,
            sugar: data.sugar,
            protein: data.protein,
          },
        }),
    });
  }
};

const deleteFood = async (id: number) => {
  await executeAction({
    actionFn: () => db.food.delete({ where: { id } }),
  });
};

const getFoods = async () => {
  return await db.food.findMany();
};

const getFood = async (id: number): Promise<FoodSchema> => {
  const res = await db.food.findFirst({
    where: { id },
    include: {
      foodServingUnits: true,
    },
  });

  return {
    ...res,
    action: "update",
    foodServingUnits:
      res?.foodServingUnits.map((item) => ({
        foodServingUnitId: item.id,
        grams: item.grams ?? 0,
      })) ?? [],
    name: res?.name ?? "",
    id,
  };
};

export { createFood, getFood, getFoods, deleteFood, updateFood };
