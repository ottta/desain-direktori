import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";

export default function Layout({
  children,
  profile,
}: {
  children: ReactNode;
  profile: ReactNode;
}) {
  return (
    <div data-grid>
      <div className={cn("col-span-8")}>{profile}</div>
      <div className={cn("col-span-4")}>
        <HeaderProfile>Users</HeaderProfile>
        {children}
      </div>
    </div>
  );
}
