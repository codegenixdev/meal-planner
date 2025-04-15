"use server";

import { FoodFiltersSchema } from "@/app/(admin)/admin/foods-management/foods/_types/foodFilterSchema";
import { FoodSchema } from "@/app/(admin)/admin/foods-management/foods/_types/foodSchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import { toNumberSafe, toStringSafe } from "@/lib/utils";
import { Prisma } from "@prisma/client";

const createFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: () =>
      db.food.create({
        data: {
          name: data.name.trim(),
          calories: toNumberSafe(data.calories),
          carbohydrates: toNumberSafe(data.carbohydrates),
          fat: toNumberSafe(data.fat),
          fiber: toNumberSafe(data.fiber),
          sugar: toNumberSafe(data.sugar),
          protein: toNumberSafe(data.protein),
        },
        select: {},
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
            calories: toNumberSafe(data.calories),
            carbohydrates: toNumberSafe(data.carbohydrates),
            fat: toNumberSafe(data.fat),
            fiber: toNumberSafe(data.fiber),
            sugar: toNumberSafe(data.sugar),
            protein: toNumberSafe(data.protein),
          },
          select: {},
        }),
    });
  }
};

const deleteFood = async (id: number) => {
  await executeAction({
    actionFn: () => db.food.delete({ where: { id }, select: {} }),
  });
};

type FoodWithServingUnits = Prisma.FoodGetPayload<{
  include: {
    foodServingUnits: true;
  };
}>;

const getFoods = async (
  filters?: FoodFiltersSchema
): Promise<PaginatedResult<FoodWithServingUnits>> => {
  const {
    name,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    categoryId,
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    pageSize = 10,
  } = filters || {};

  const where: Prisma.FoodWhereInput = {};

  if (name) {
    where.name = { contains: name };
  }

  const numericMinCalories = minCalories ? Number(minCalories) : undefined;
  const numericMaxCalories = maxCalories ? Number(maxCalories) : undefined;
  const numericMinProtein = minProtein ? Number(minProtein) : undefined;
  const numericMaxProtein = maxProtein ? Number(maxProtein) : undefined;
  const numericCategoryId = categoryId ? Number(categoryId) : undefined;

  if (numericMinCalories !== undefined || numericMaxCalories !== undefined) {
    where.calories = {};
    if (numericMinCalories !== undefined)
      where.calories.gte = numericMinCalories;
    if (numericMaxCalories !== undefined)
      where.calories.lte = numericMaxCalories;
  }

  if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
    where.protein = {};
    if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
    if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
  }

  if (numericCategoryId !== undefined && numericCategoryId !== 0) {
    where.categories = {
      some: {
        categoryId: numericCategoryId,
      },
    };
  }

  const skip = (page - 1) * pageSize;

  const [total, data] = await Promise.all([
    db.food.count({ where }),
    db.food.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize,
      include: { foodServingUnits: true },
    }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

const getFood = async (id: number) => {
  const res = await db.food.findFirst({
    where: { id },
    include: {
      foodServingUnits: true,
    },
  });

  if (!res) return null;

  return {
    action: "update" as const,
    id,
    name: toStringSafe(res.name),
    calories: toStringSafe(res.calories),
    carbohydrates: toStringSafe(res.carbohydrates),
    fat: toStringSafe(res.fat),
    fiber: toStringSafe(res.fiber),
    protein: toStringSafe(res.protein),
    sugar: toStringSafe(res.sugar),
    foodServingUnits:
      res.foodServingUnits.map((item) => ({
        foodServingUnitId: item.id,
        grams: toNumberSafe(item.grams),
      })) ?? [],
  };
};

export { createFood, deleteFood, getFood, getFoods, updateFood };
