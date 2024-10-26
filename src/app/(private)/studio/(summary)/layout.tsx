import NextLink from "next/link";
import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import Boundary from "@/components/Boundary";
import HeaderProfile from "@/components/HeaderProfile";

export default function Layout({
  children,
  tenant,
  user,
}: {
  children: ReactNode;
  tenant: ReactNode;
  user: ReactNode;
}) {
  return (
    <div data-grid className={cn("items-start")}>
      {children}
      <div className={cn("col-span-8")}>{tenant}</div>
      <div className={cn("col-span-4")}>
        <HeaderProfile>Users</HeaderProfile>
        <Boundary className={cn("shadow-md", "-mt-px", "rounded-t-none")}>
          <div
            className={cn("relative", "max-h-56", "overflow-hidden", "group")}
          >
            {user}
            <div
              className={cn(
                "absolute",
                "inset-0",
                "z-10",
                "bg-neutral-100/80",
                "dark:bg-neutral-900/80",
                "flex",
                "items-center",
                "justify-center",
                "opacity-0",
                "group-hover:opacity-100",
                "transition-[opacity]",
              )}
            >
              <NextLink
                href="/studio/user"
                className={cn(
                  "border",
                  "px-2",
                  "rounded",
                  "bg-neutral-200",
                  "dark:bg-neutral-800",
                )}
              >
                Show All
              </NextLink>
            </div>

            <div
              className={cn(
                "absolute",
                "bottom-0",
                "right-0",
                "left-0",
                "shadow-[0rem_0rem_2rem_0.35rem_#000000]",
                "z-10",
              )}
            />
          </div>
        </Boundary>
      </div>
    </div>
  );
}
