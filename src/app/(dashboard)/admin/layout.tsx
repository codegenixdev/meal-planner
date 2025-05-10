import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session.user?.role === Role.USER) redirect("/client");
  return <div className="max-w-7xl mx-auto p-6">{children}</div>;
};

export default Layout;
