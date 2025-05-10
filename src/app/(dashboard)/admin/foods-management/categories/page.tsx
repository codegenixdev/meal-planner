import { CategoryCards } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-cards";
import { CategoryFormDialog } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-form-dialog";

const Page = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
};

export default Page;
