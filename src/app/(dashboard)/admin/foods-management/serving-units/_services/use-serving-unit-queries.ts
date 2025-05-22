import { useServingUnitsStore } from "@/app/(dashboard)/admin/foods-management/serving-units/_libs/use-serving-unit-store";
import {
  getServingUnits,
  getServingUnit,
} from "@/app/(dashboard)/admin/foods-management/serving-units/_services/serving-unit-queries";
import { useQuery } from "@tanstack/react-query";

const useServingUnits = () => {
  return useQuery({
    queryKey: ["servingUnits"],
    queryFn: getServingUnits,
  });
};

const useServingUnit = () => {
  const { selectedServingUnitId } = useServingUnitsStore();

  return useQuery({
    queryKey: ["servingUnits", { selectedServingUnitId }],
    queryFn: () => getServingUnit(selectedServingUnitId!),
    enabled: !!selectedServingUnitId,
  });
};

export { useServingUnits, useServingUnit };
