"use server";

import {
  mealFiltersSchema,
  MealFiltersSchema,
} from "@/app/(dashboard)/client/_types/mealFilterSchema";
import { MealSchema } from "@/app/(dashboard)/client/_types/mealSchema";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import { toStringSafe } from "@/lib/utils";
import { Prisma } from "@prisma/client";

type MealWithFoods = Prisma.MealGetPayload<{
  include: {
    mealFoods: {
      include: {
        food: true;
        servingUnit: true;
      };
    };
  };
}>;

const getMeals = async (
  filters: MealFiltersSchema
): Promise<PaginatedResult<MealWithFoods>> => {
  const validatedFilters = mealFiltersSchema.parse(filters);

  const session = await auth();

  const { dateTime, page = 1, pageSize = 10 } = validatedFilters || {};

  const where: Prisma.MealWhereInput = {};

  if (dateTime !== undefined) {
    // where.dateTime = dateTime;
  }

  if (session?.user?.id) {
    where.userId = {
      equals: +session.user.id,
    };
  }

  const skip = (page - 1) * pageSize;

  const [total, data] = await Promise.all([
    db.meal.count({ where }),
    db.meal.findMany({
      where,
      orderBy: { dateTime: "desc" },
      skip,
      take: pageSize,
      include: {
        mealFoods: {
          include: {
            food: true,
            servingUnit: true,
          },
        },
      },
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

const getMeal = async (id: number): Promise<MealSchema | null> => {
  const res = await db.meal.findFirst({
    where: { id },
    include: {
      mealFoods: true,
    },
  });

  if (!res) return null;

  return {
    action: "update" as const,
    id,
    dateTime: res.dateTime,
    userId: toStringSafe(res.userId),
    mealFoods:
      res.mealFoods.map((item) => ({
        foodId: toStringSafe(item.foodId),
        amount: toStringSafe(item.amount),
        servingUnitId: toStringSafe(item.servingUnitId),
      })) ?? [],
  };
};

export { getMeal, getMeals };
