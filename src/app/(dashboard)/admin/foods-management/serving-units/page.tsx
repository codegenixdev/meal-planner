import { ServingUnitCards } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-cards";
import { ServingUnitFormDialog } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-form-dialog";

const Page = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Serving Units List</h1>
        <ServingUnitFormDialog />
      </div>
      <ServingUnitCards />
    </>
  );
};

export default Page;
