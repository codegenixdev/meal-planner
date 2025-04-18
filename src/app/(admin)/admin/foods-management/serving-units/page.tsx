"use client";

import { ServingUnitFormDialog } from "@/app/(admin)/admin/foods-management/serving-units/_components/serving-unit-form-dialog";
import { useServingUnitsStore } from "@/app/(admin)/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import { useDeleteServingUnit } from "@/app/(admin)/admin/foods-management/serving-units/_services/useMutations";
import { useServingUnits } from "@/app/(admin)/admin/foods-management/serving-units/_services/useQueries";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/useGlobalStore";
import { Edit, Trash } from "lucide-react";

const Page = () => {
  const { updateSelectedServingUnitId, updateServingUnitDialogOpen } =
    useServingUnitsStore();

  const servingUnitsQuery = useServingUnits();
  const deleteServingUnitMutation = useDeleteServingUnit();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Serving Units List</h1>
        <ServingUnitFormDialog />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {servingUnitsQuery.data?.map((item) => (
          <div
            className="flex justify-between shadow-md rounded-lg flex-col p-6 gap-3"
            key={item.id}
          >
            <p className="truncate">{item.name}</p>
            <div className="flex gap-1">
              <Button
                className="size-6"
                variant="ghost"
                size="icon"
                onClick={() => {
                  updateSelectedServingUnitId(item.id);
                  updateServingUnitDialogOpen(true);
                }}
              >
                <Edit />
              </Button>
              <Button
                className="size-6"
                variant="ghost"
                size="icon"
                onClick={() => {
                  alert({
                    onConfirm: () => deleteServingUnitMutation.mutate(item.id),
                  });
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
