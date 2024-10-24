import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn("h-[25svh]", "lg:h-[calc(100svh-7rem)]", "overflow-hidden")}
    >
      {children}
    </div>
  );
}
