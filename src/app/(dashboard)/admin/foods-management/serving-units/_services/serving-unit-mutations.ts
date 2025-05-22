"use server";
import { ServingUnitSchema } from "@/app/(dashboard)/admin/foods-management/serving-units/_types/serving-unit-schema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const deleteServingUnit = async (id: number) => {
  await executeAction({
    actionFn: () => db.servingUnit.delete({ where: { id } }),
  });
};

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

export { deleteServingUnit, createServingUnit, updateServingUnit };
