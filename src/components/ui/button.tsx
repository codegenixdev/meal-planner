import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "absolute rounded-full flex items-center justify-center text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-white",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border bg-background text-foreground",
      },
      size: {
        default: "size-4 -top-1 -right-1",
        sm: "size-3 -top-0.5 -right-0.5 text-[0.6rem]",
        lg: "size-5 -top-1 -right-1",
        icon: "size-5 -top-1 -right-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  badge?: boolean;
  badgeVariant?: VariantProps<typeof badgeVariants>["variant"];
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingText,
  children,
  disabled,
  badge,
  badgeVariant = "default",
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className={cn(badgeVariants({ variant: badgeVariant, size }))} />
    );
  };

  const content = (
    <>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
      {renderBadge()}
    </>
  );

  if (asChild) {
    return <Comp {...props}>{content}</Comp>;
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </Comp>
  );
};

export { Button, buttonVariants };
export type { ButtonProps };
