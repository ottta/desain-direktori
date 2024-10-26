import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({
  children,
  profile,
}: {
  children: ReactNode;
  profile: ReactNode;
}) {
  return (
    <div data-grid>
      <div className={cn("col-span-8")}>
        <div className={cn("sticky", "top-22")}>{profile}</div>
      </div>
      <div className={cn("col-span-4")}>{children}</div>
    </div>
  );
}
