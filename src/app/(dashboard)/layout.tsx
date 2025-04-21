"use client";
import { useSignOut } from "@/app/(auth)/sign-in/_services/use-mutations";
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
  ChevronDown,
  ChevronLeft,
  Home,
  LogOut,
  Menu,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
    group: "General",
    items: [
      {
        href: "/home",
        label: "Home",
        icon: <Home className="mr-2 size-4" />,
      },
    ],
  },
  {
    group: "Ingredients",
    items: [
      {
        href: "/admin/foods-management",
        label: "Foods",
        icon: <Apple className="mr-2 size-4" />,
      },
    ],
  },
];

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
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

            {session && (
              <div className="my-4">
                <div className="flex items-center space-x-3 p-2 rounded-md bg-background">
                  <Avatar>
                    <AvatarFallback>
                      <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Separator className="my-2" />

            <div className="flex flex-col mt-4">
              {routeGroups.map((routeGroup) => (
                <RouteGroup {...routeGroup} key={routeGroup.group} />
              ))}
            </div>

            <div className="absolute bottom-4 left-0 w-full px-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
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
              className="font-normal justify-start w-full pl-6"
              variant="link"
              asChild
              key={item.href}
            >
              <Link href={item.href} className="flex items-center">
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
