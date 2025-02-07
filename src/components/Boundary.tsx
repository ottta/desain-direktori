import { HTMLAttributes, forwardRef } from "react";

import { cn } from "@/libs/utils";

interface BoundaryProps extends HTMLAttributes<HTMLDivElement> {
  labels?: string[];
}

const Boundary = forwardRef<HTMLDivElement, BoundaryProps>((props, ref) => {
  const { children, labels = ["children"], ...rest } = props;
  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        "relative",
        "border",
        "rounded-sm",
        "animate-rerender",
        rest.className,
      )}
    >
      <ul
        className={cn(
          "absolute",
          "top-0",
          "left-0",
          "-translate-y-1/2",
          "px-1",
          "z-50",
          "select-none",
          "pointer-events-none",
        )}
      >
        {labels.map((item, i) => (
          <li
            key={i}
            className={cn(
              "border",
              "rounded-full",
              "bg-red-100",
              "dark:bg-red-700",
              "text-neutral-900",
              "dark:text-neutral-200",
              "px-2",
              "text-xs",
              "leading-[1.2]",
              "capitalize",
              "animate-highlight",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
});

Boundary.displayName = "Boundary";

export default Boundary;
