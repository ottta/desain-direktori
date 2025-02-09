import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({
  children,
  preview,
}: {
  children: ReactNode;
  preview: ReactNode;
}) {
  return (
    <div data-container data-grid>
      <div
        className={cn(
          "col-span-full",
          "md:col-span-4",
          "lg:col-span-8",
          "bg-red-100",
          "md:order-last",
          "sticky",
          "top-0",
          "md:relative",
        )}
      >
        <div className={cn("sticky", "top-14")}>{preview}</div>
      </div>
      <div
        className={cn(
          "col-span-full",
          "md:col-span-2",
          "lg:col-span-4",
          "md:order-first",
        )}
      >
        {children}
      </div>
    </div>
  );
}
