import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      className={cn(
        "h-[33.33svh]",
        "lg:h-[calc(100svh-7rem)]",
        "overflow-hidden",
      )}
    >
      <HeaderProfile>
        <Skeleton className={cn("h-4", "w-48", "border")} />
        <Skeleton className={cn("h-7", "w-20", "rounded-full", "border")} />
      </HeaderProfile>
      <div className={cn("p-3")}>Loading...</div>
    </div>
  );
}
