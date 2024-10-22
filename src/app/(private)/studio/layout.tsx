import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({
  children,
  profile,
}: {
  children: ReactNode;
  profile: ReactNode;
}) {
  return (
    <div className={cn("col-span-10", "grid", "grid-cols-10", "gap-3")}>
      {children}
      <ScrollArea className={cn("col-span-6", "h-[calc(100svh-7rem)]")}>
        {profile}
      </ScrollArea>
    </div>
  );
}
