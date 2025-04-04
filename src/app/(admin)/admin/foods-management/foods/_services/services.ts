"use server";

import { FoodSchema } from "@/app/(admin)/admin/foods-management/foods/_types/schema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { Prisma } from "@prisma/client";

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

type FoodFilter = {
  name?: string;
  minCalories?: number;
  maxCalories?: number;
  minProtein?: number;
  maxProtein?: number;
  sortBy?: "name" | "calories" | "protein" | "carbohydrates" | "fat";
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};
const getFoods = async (filters?: FoodFilter) => {
  const {
    name,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    pageSize = 10,
  } = filters || {};

  const where: Prisma.FoodWhereInput = {};

  if (name) {
    where.name = { contains: name };
  }

  if (minCalories !== undefined || maxCalories !== undefined) {
    where.calories = {};

    if (minCalories !== undefined) {
      where.calories.gte = minCalories;
    }

    if (maxCalories !== undefined) {
      where.calories.lte = maxCalories;
    }
  }

  if (minProtein !== undefined || maxProtein !== undefined) {
    where.protein = {};

    if (minProtein !== undefined) {
      where.protein.gte = minProtein;
    }

    if (maxProtein !== undefined) {
      where.protein.lte = maxProtein;
    }
  }

  const skip = (page - 1) * pageSize;

  return await db.food.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip,
    take: pageSize,
    include: {
      foodServingUnits: true,
    },
  });
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

export { createFood, deleteFood, getFood, getFoods, updateFood };
