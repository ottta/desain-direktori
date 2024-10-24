import { prisma } from "@/prisma";
import NextLink from "next/link";
import { ReactNode } from "react";

import { cn } from "@/libs/utils";

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      className={cn(
        "font-semibold",
        "text-neutral-900",
        "dark:text-neutral-100",
      )}
    >
      {children}
    </span>
  );
}

export default async function Page() {
  const [tenants, disciplines, cities] = await Promise.all([
    prisma.tenant.count(),
    prisma.discipline.count(),
    prisma.city.count(),
  ]);

  return (
    <>
      <div
        className={cn(
          "h-20",
          "lg:h-14",
          "flex",
          "items-center",
          "border-b",
          "bg-neutral-100",
          "dark:bg-neutral-950",
          "max-lg:hidden",
        )}
      >
        <div className={cn("px-3")}>Directus Emeritus</div>
      </div>

      <div
        className={cn(
          "pt-2",
          "pb-4",
          "flex",
          "flex-col",
          "justify-between",
          "h-[25svh]",
          "lg:h-[calc(100svh-7rem)]",
          "overflow-hidden",
        )}
      >
        <p
          className={cn(
            "text-3xl",
            "lg:text-5xl",
            "leading-[0.9]",
            "px-3",
            "max-w-screen-sm",
            "text-neutral-400",
            "dark:text-neutral-600",
          )}
        >
          <Highlight>Desain Direktori</Highlight> is an online repository of{" "}
          <Highlight>{tenants}</Highlight> creatives within{" "}
          <Highlight>{disciplines}</Highlight> disciplines across{" "}
          <Highlight>{cities}</Highlight> cities and growing.
          <br />
          <NextLink
            href="/about"
            className={cn("hover:underline", "text-xl", "font-normal")}
          >
            Read More...
          </NextLink>
        </p>

        <div
          className={cn(
            "px-3",
            "text-sm",
            "leading-[1.2]",
            "max-lg:hidden",
            "text-neutral-500",
          )}
        >
          <div>
            &copy;2024 Unforma Club. Typeface use{" "}
            <NextLink
              href="https://unforma.club/font/nouva"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline")}
            >
              Nouva.
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
}
