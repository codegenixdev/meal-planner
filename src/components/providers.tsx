"use client";

import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { toast } from "sonner";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if (e.message === "NEXT_REDIRECT") return;
        toast.error(e.message);
      },
      onSuccess: () => {
        toast.error("Operation was successful.");
      },
    },
  },
});

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <AlertDialogProvider />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export { Providers };
