"use client";
import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "sonner";

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

type ProvidersProps = {
  children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster />
      <AlertDialogProvider />
    </QueryClientProvider>
  );
};

export { Providers };
