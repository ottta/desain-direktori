import { PlusCircledIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <div data-container data-grid>
        <aside className={cn("col-span-2", "relative")}>
          <div
            className={cn(
              "px-2",
              "space-y-1",
              "flex",
              "flex-col",
              "sticky",
              "top-16",
              "lg:top-14",
            )}
          >
            <NextLink href="/studio">Studio</NextLink>
            <NextLink href="/studio/new">
              New <PlusCircledIcon />
            </NextLink>
          </div>
        </aside>
        {children}
      </div>
    </>
  );
}
