import { FoodCards } from "@/app/(dashboard)/admin/foods-management/foods/_components/food-cards";
import { FoodFiltersDrawer } from "@/app/(dashboard)/admin/foods-management/foods/_components/food-filters-drawer";
import { FoodFormDialog } from "@/app/(dashboard)/admin/foods-management/foods/_components/food-form-dialog";

const Page = () => {
  return (
    <div className="space-y-2">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Foods List</h1>
        <FoodFormDialog />
      </div>
      <FoodFiltersDrawer />
      <FoodCards />
    </div>
  );
};

export default Page;
