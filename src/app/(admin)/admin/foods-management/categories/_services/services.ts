"use server";

import { CategorySchema } from "@/app/(admin)/admin/foods-management/categories/_types/schema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => db.category.delete({ where: { id } }),
  });
};

const getCategories = async () => {
  return await db.category.findMany();
};

const getCategory = async (id: number): Promise<CategorySchema> => {
  const res = await db.category.findFirst({
    where: { id },
  });

  return {
    ...res,
    action: "update",
    name: res?.name ?? "",
    id,
  };
};

export {
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
