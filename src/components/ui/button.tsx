import { type VariantProps, cva } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 shadow-sm hover:bg-neutral-900/90 dark:bg-neutral-300 dark:hover:bg-neutral-300/90",
        destructive:
          "bg-red-500 text-neutral-50 shadow-xs hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border bg-neutral-200 shadow-xs hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-950 rounded-sm",
        secondary:
          "bg-neutral-100 border shadow-xs hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-950/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-8 px-3 py-2",
        sm: "h-8 rounded-xs px-2 text-xs",
        lg: "h-10 rounded-xs px-2",
        icon: "h-9 w-9",
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
