"use client";
import { Skeleton } from "@/components/ui/skeleton";

const MealCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          className="border rounded-lg flex flex-col p-6 gap-3 border border-border/40"
          key={index}
        >
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-5 w-20 mt-1" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, foodIndex) => (
                <div key={foodIndex} className="bg-muted/40 rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { MealCardsSkeleton };
