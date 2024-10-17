import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main data-container data-grid className={cn("items-center", "h-svh")}>
      {children}
    </main>
  );
}
