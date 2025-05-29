import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return <div className="mx-auto max-w-7xl p-6">{children}</div>;
};

export default Layout;
