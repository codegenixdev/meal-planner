import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default Layout;
