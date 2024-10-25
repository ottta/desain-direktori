import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "h-[33.33svh]",
        "lg:h-[calc(100svh-0.75rem)]",
        "overflow-hidden",
      )}
    >
      {children}
    </div>
  );
}
