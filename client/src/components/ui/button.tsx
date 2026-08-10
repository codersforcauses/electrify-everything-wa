import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  {
    variants: {
      variant: {
        default: "bg-black text-white", // default should stay B/W (simple)
        destructive:
          "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost:
          "rounded-xl border border-gray-300 text-gray-600 hover:border-accent",
        link: "text-accent underline-offset-4 hover:underline",

        // Tab variants
        primary:
          "rounded-xl border px-5 py-2 text-sm transition-colors border-primary bg-primary text-gray-900 opacity-100 hover:bg-primary/80",
        secondary:
          "rounded-xl border px-5 py-2 text-sm transition-colors border-secondary bg-white text-gray-700 hover:border-primary hover:bg-secondary",

        // Pagination Variants
        paginationActive:
          "rounded-xl border border-accent bg-accent text-white",
        paginationInactive:
          "rounded-xl border border-gray-300 text-gray-600 hover:border-accent",
        paginationEndpoint:
          "rounded-xl border border-gray-300 text-gray-600 hover:border-accent disabled:cursor-not-allowed disabled:opacity-40",

        // Call to Action (CTA) Variant
        cta: "rounded-full px-5 py-2 border border-accent bg-accent/80 text-accent-foreground font-bold hover:bg-accent transition-colours", // pill shape
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
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
