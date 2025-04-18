"use server";

import { ServingUnitSchema } from "@/app/(dashboard)/admin/foods-management/serving-units/_types/schema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const createServingUnit = async (data: ServingUnitSchema) => {
  await executeAction({
    actionFn: () =>
      db.servingUnit.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateServingUnit = async (data: ServingUnitSchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.servingUnit.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

const deleteServingUnit = async (id: number) => {
  await executeAction({
    actionFn: () => db.servingUnit.delete({ where: { id } }),
  });
};

const getServingUnits = async () => {
  return await db.servingUnit.findMany();
};

const getServingUnit = async (id: number): Promise<ServingUnitSchema> => {
  const res = await db.servingUnit.findFirst({
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
  createServingUnit,
  getServingUnit,
  getServingUnits,
  deleteServingUnit,
  updateServingUnit,
};
