"use client";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const FoodCardsSkeleton = () => {
  const skeletonCards = Array(12).fill(null);

  return (
    <div className="grid grid-cols-4 gap-2">
      {skeletonCards.map((_, index) => (
        <div
          className="shadow-md rounded-lg flex flex-col p-7 gap-3"
          key={index}
        >
          <div className="flex justify-between">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-1">
              <Skeleton className="size-6" />
              <Skeleton className="size-6" />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { FoodCardsSkeleton };
