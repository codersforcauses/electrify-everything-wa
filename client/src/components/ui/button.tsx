import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // Tab variants
        primary:
          "rounded-xl border px-5 py-2 text-sm font-semibold transition-colors border-primary bg-primary text-gray-900",
        secondary:
          "rounded-xl border px-5 py-2 text-sm font-semibold transition-colors border-secondary bg-white text-gray-700 hover:border-primary hover:bg-secondary",
        primaryFilter: "rounded-full border border-primary bg-primary",
        secondaryFilter:
          "h-10 w-10 px-1 py-1 rounded-full border border-secondary bg-white hover:bg-secondary hover:border-primary text-gray-900",

        // Pagination Variants
        paginationActive: "border border-accent bg-accent text-white",
        paginationInactive:
          "border border-accent/15 text-gray-600 hover:border-accent hover:accent hover:bg-accent/10",
        paginationEndpoint:
          "border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40",

        // Call to Action (CTA) Variant
        cta: "rounded-full px-5 py-2 border border-accent bg-accent text-white font-bold opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        tab: "h-10 w-10",
        pagination: "h-8 w-8",
        inline: "h-auto w-auto p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
