"use client";
import { useSignOut } from "@/app/(auth)/sign-in/_services/use-mutations";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { customErrorMap } from "@/lib/customErrorMap";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronLeft,
  LogOut,
  Menu,
  Ruler,
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
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
    group: "Foods Management",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
];

type DashboardLayoutProps = { children: ReactNode; session: Session };
const DashboardLayout = ({ children, session }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  const signOutMutation = useSignOut();

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="flex">
      <div className="w-screen shadow-sm fixed h-13 bg-background z-10 flex items-center justify-between px-2">
        <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger className="m-2" asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </Collapsible.Trigger>
        </Collapsible.Root>
        <div className="flex">
          <ThemeToggle />
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-9 px-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{session.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} variant="destructive">
                  <LogOut className="size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <Collapsible.Root
        className="fixed h-dvh top-0 left-0 z-20"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`w-64 bg-gray-50 h-screen shadow-lg fixed top-0 left-0 p-4 transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col mt-4">
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
        {children}
      </main>
    </div>
  );
};

type RouteGroupProps = RouteGroup;
const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          className={`flex flex-col gap-2 ${
            !open ? "pointer-events-none" : ""
          }`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className="font-normal justify-start w-full"
              variant="link"
              asChild
              key={item.href}
            >
              <Link
                href={item.href}
                className={`flex items-center px-5  rounded-md py-1 transition-all ${
                  pathname === item.href
                    ? "bg-primary/50 hover:bg-primary/60"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export { DashboardLayout };
