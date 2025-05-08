"use client";
import { Skeleton } from "@/components/ui/skeleton";

const MealCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          className="shadow-md rounded-lg flex flex-col p-6 gap-3"
          key={index}
        >
          <div className="flex justify-between">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
          <Skeleton className="h-px w-full my-2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { MealCardsSkeleton };
