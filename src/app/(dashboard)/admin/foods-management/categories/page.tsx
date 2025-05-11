import { CategoryCards } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-cards";
import { CategoryFormDialog } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-form-dialog";

const Page = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
};

export default Page;
