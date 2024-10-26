"use client";

import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { LINK_PRIVATE } from "@/libs/constants";
import { cn } from "@/libs/utils";

export default function Navigation() {
  const pathname = usePathname();
  const session = useSession();
  if (!session) return null;
  const links =
    session.data?.user.role === "USER"
      ? [{ label: "Submission", href: "/submission" }]
      : LINK_PRIVATE;
  return (
    <nav
      data-container
      className={cn(
        "h-8",
        "bg-neutral-100",
        "dark:bg-neutral-950",
        "sticky",
        "top-14",
        "z-50",
      )}
    >
      <ul
        className={cn(
          "inline-flex",
          "gap-1",
          "bg-neutral-200",
          "dark:bg-neutral-800",
          "p-1",
          "rounded",
          "border",
        )}
      >
        {links.map((item, i) => {
          const splitHref = item.href
            .toString()
            .split("/")
            .filter((item) => item);
          const isActive =
            splitHref.length === 1
              ? pathname === item.href
              : pathname.startsWith(item.href.toString());
          return (
            <li key={i}>
              <NextLink
                {...item}
                className={cn(
                  "px-6",
                  "flex",
                  // "text-lg",
                  "font-bold",
                  "rounded-[0.2rem]",
                  "text-neutral-400",
                  "border",
                  "border-transparent",
                  isActive && "bg-neutral-100",
                  isActive && "shadow",
                  isActive && "text-neutral-900",
                  isActive && "border-neutral-400 dark:border-neutral-900",
                )}
              >
                {item.label === "Studio" ? "Overview" : item.label}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
