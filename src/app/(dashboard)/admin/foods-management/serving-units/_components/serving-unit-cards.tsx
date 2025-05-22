"use client";
import { ServingUnitCardsSkeleton } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-cards-skeleton";
import { useServingUnitsStore } from "@/app/(dashboard)/admin/foods-management/serving-units/_libs/use-serving-unit-store";
import { useDeleteServingUnit } from "@/app/(dashboard)/admin/foods-management/serving-units/_services/use-serving-unit-mutations";
import { useServingUnits } from "@/app/(dashboard)/admin/foods-management/serving-units/_services/use-serving-unit-queries";
import { NoItemsFound } from "@/components/no-items-found";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/use-global-store";
import { Edit, Trash } from "lucide-react";

const ServingUnitCards = () => {
  const { updateSelectedServingUnitId, updateServingUnitDialogOpen } =
    useServingUnitsStore();

  const servingUnitsQuery = useServingUnits();
  const deleteServingUnitMutation = useDeleteServingUnit();

  if (servingUnitsQuery.data?.length === 0) {
    return <NoItemsFound onClick={() => updateServingUnitDialogOpen(true)} />;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {servingUnitsQuery.isLoading ? (
        <ServingUnitCardsSkeleton />
      ) : (
        <>
          {servingUnitsQuery.data?.map((item) => (
            <div
              className="bg-accent hover:bg-background-300 flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md transition-all duration-200 ease-in-out"
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
                      onConfirm: () =>
                        deleteServingUnitMutation.mutate(item.id),
                    });
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export { ServingUnitCards };
