"use client";

import { useFoodsStore } from "@/app/(admin)/admin/foods/_libs/useFoodsStore";
import { getFoods } from "@/app/(admin)/admin/foods/_services/services";
import { useDeleteFood } from "@/app/(admin)/admin/foods/_services/useMutations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { alert } from "@/lib/useGlobalStore";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type FoodRow = Awaited<ReturnType<typeof getFoods>>[number];

const useFoodsColumns = () => {
  const { updateSelectedFoodId, updateFoodDialogOpen } = useFoodsStore();
  const deleteFoodMutation = useDeleteFood();
  const foodsColumns: ColumnDef<FoodRow>[] = [
    {
      accessorKey: "name",
      header: "Food Name",
    },
    {
      accessorKey: "calories",
      header: "Calories",
    },
    {
      accessorKey: "protein",
      header: "Protein (g)",
    },
    {
      accessorKey: "fat",
      header: "Fat (g)",
    },
    {
      accessorKey: "carbohydrates",
      header: "Carbs (g)",
    },
    {
      accessorKey: "fiber",
      header: "Fiber (g)",
    },
    {
      accessorKey: "sugar",
      header: "Sugar (g)",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = row.getValue<Date>("createdAt");
        return date ? new Date(date).toLocaleDateString() : "-";
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        const date = row.getValue<Date>("updatedAt");
        return date ? new Date(date).toLocaleDateString() : "-";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  updateSelectedFoodId(row.original.id);
                  updateFoodDialogOpen(true);
                }}
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  alert({
                    onConfirm: () => deleteFoodMutation.mutate(row.original.id),
                  });
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return { foodsColumns };
};

export { useFoodsColumns };
