"use client";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  return <div className="max-w-7xl mx-auto p-6">{children}</div>;
};

export default Layout;
