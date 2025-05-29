import { DashboardLayout } from "@/app/(dashboard)/_components/dashboard-layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return <DashboardLayout session={session}>{children}</DashboardLayout>;
};

export default Layout;
