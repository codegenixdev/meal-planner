import { DashboardLayout } from "@/app/(dashboard)/_components/dashboard-layout";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
