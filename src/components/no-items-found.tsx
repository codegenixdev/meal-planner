import { Button } from "@/components/ui/button";
import { CircleOff } from "lucide-react";

type NoItemsFoundProps = {
  onClick: () => void;
};
const NoItemsFound = ({ onClick }: NoItemsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CircleOff className="text-primary mb-2" />
      <h3 className="text-lg font-medium">No items found</h3>
      <p className="text-foreground/60 mt-1 text-sm">Try add new items</p>
      <Button variant="outline" className="mt-4" onClick={onClick}>
        Add new item
      </Button>
    </div>
  );
};

export { NoItemsFound };
