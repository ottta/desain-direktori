import NextLink from "next/link";
import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header
        className={cn("fixed", "top-0", "right-0", "left-0", "bg-neutral-100")}
      >
        <div data-container>
          <NextLink href="/">Index</NextLink>
        </div>
      </header>
      <main className={cn("pt-12")}>{children}</main>
    </>
  );
}
