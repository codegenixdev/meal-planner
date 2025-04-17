"use client";
import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { customErrorMap } from "@/lib/customErrorMap";
import * as Collapsible from "@radix-ui/react-collapsible";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Apple, ChevronDown, ChevronLeft, Home, Menu } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

z.setErrorMap(customErrorMap);

type RouteGroup = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};
const routeGroups: RouteGroup[] = [
  {
    group: "General",
    items: [
      {
        href: "/home",
        label: "Home",
        icon: <Home />,
      },
    ],
  },
  {
    group: "Ingredients",
    items: [
      {
        href: "/admin/foods-management",
        label: "Foods",
        icon: <Apple />,
      },
    ],
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        toast.error(e.message);
      },
      onSuccess: () => {
        toast.error("Operation was successful.");
      },
    },
  },
});

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="w-screen shadow-sm fixed h-13" />
      <Collapsible.Root
        className="fixed h-dvh top-0 left-0"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Trigger className="m-2" asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content forceMount>
          <div
            className={`w-64 bg-gray-50 h-screen shadow-lg fixed top-0 left-0 p-4 transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center">
              <h1>Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <div className="flex flex-col">
              {routeGroups.map((routeGroup) => (
                <RouteGroup {...routeGroup} key={routeGroup.group} />
              ))}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`mt-13 flex-1 p-4 transition-margin duration-300 ${
          open ? "ml-64" : "ml-0"
        }`}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster />
        <AlertDialogProvider />
      </main>
    </div>
  );
};

type RouteGroupProps = RouteGroup;
const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="w-full flex justify-between text-foreground/80 font-normal"
          variant="ghost"
        >
          {group}
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown />
          </motion.div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={!open ? "pointer-events-none" : ""}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className="font-normal"
              variant="link"
              asChild
              key={item.href}
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Layout;
