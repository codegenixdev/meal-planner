"use client";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardsSkeleton = () => {
  const skeletonCards = Array(12).fill(null);

  return (
    <>
      {skeletonCards.map((_, index) => (
        <div
          className="flex justify-between border rounded-lg flex-col p-6 gap-3"
          key={index}
        >
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-1">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="size-6 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

export { CategoryCardsSkeleton };
