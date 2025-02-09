import { HTMLAttributes } from "react";

import { cn } from "@/libs/utils";

export default function HeaderProfile({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "px-3",
        "h-14",
        "flex",
        "items-center",
        "justify-between",
        "lg:border-b",
        "bg-neutral-100",
        "dark:bg-neutral-950",
        "w-full",
        className,
      )}
    />
  );
}
