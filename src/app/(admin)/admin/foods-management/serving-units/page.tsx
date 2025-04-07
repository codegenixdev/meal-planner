"use client";

import { useServingUnitsStore } from "@/app/(admin)/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import {
  useCreateServingUnit,
  useDeleteServingUnit,
  useUpdateServingUnit,
} from "@/app/(admin)/admin/foods-management/serving-units/_services/useMutations";
import {
  useServingUnits,
  useServingUnit,
} from "@/app/(admin)/admin/foods-management/serving-units/_services/useQueries";
import {
  servingUnitDefaultValues,
  servingUnitSchema,
  ServingUnitSchema,
} from "@/app/(admin)/admin/foods-management/serving-units/_types/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { alert } from "@/lib/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<ServingUnitSchema>({
    defaultValues: servingUnitDefaultValues,
    resolver: zodResolver(servingUnitSchema),
  });

  const {
    selectedServingUnitId,
    updateSelectedServingUnitId,
    servingUnitDialogOpen,
    updateServingUnitDialogOpen,
  } = useServingUnitsStore();

  const servingUnitsQuery = useServingUnits();
  const servingUnitQuery = useServingUnit();
  const createServingUnitMutation = useCreateServingUnit();
  const updateServingUnitMutation = useUpdateServingUnit();
  const deleteServingUnitMutation = useDeleteServingUnit();

  useEffect(() => {
    if (!!selectedServingUnitId && servingUnitQuery.data) {
      form.reset(servingUnitQuery.data);
    }
  }, [servingUnitQuery.data, form, selectedServingUnitId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateServingUnitDialogOpen(open);

    if (!open) {
      updateSelectedServingUnitId(null);
      form.reset(servingUnitDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<ServingUnitSchema> = (data) => {
    if (data.action === "create") {
      createServingUnitMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateServingUnitMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  const isPending =
    createServingUnitMutation.isPending || updateServingUnitMutation.isPending;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Serving Units List</h1>
        <Dialog
          open={servingUnitDialogOpen}
          onOpenChange={handleDialogOpenChange}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              New Serving Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedServingUnitId
                  ? "Edit Serving Unit"
                  : "Create a New Serving Unit"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormProvider {...form}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <ControlledInput<ServingUnitSchema>
                      name="name"
                      label="Name"
                      placeholder="Enter serving unit name"
                    />
                  </div>
                </div>
              </FormProvider>
              <DialogFooter>
                <Button type="submit" isLoading={isPending}>
                  {!!selectedServingUnitId ? "Edit" : "Create"} Serving Unit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
