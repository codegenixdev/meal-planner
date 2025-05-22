"use server";
import { ServingUnitSchema } from "@/app/(dashboard)/admin/foods-management/serving-units/_types/serving-unit-schema";
import db from "@/lib/db";

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

export { getServingUnits, getServingUnit };
