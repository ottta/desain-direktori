import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div data-container className={cn("min-h-[calc(100svh-7rem)]")}>
      <div data-grid>{children}</div>
    </div>
  );
}
