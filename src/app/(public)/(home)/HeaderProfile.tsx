"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { useParams } from "next/navigation";

import { cn } from "@/libs/utils";

export default function HeaderProfile() {
  const params = useParams();
  return (
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
      {params && !!params.slug ? (
        <NextLink
          href="/"
          scroll={false}
          className={cn(
            "pr-3",
            "pl-2",
            "border",
            "rounded-full",
            "bg-red-100",
            "hover:bg-red-100/80",
            "dark:bg-red-600",
            "dark:hover:bg-red-600/80",
            "flex",
            "items-center",
            "gap-1",
          )}
        >
          <Cross1Icon /> Close
        </NextLink>
      ) : (
        <div className={cn("px-3")}>Directus Emeritus</div>
      )}
    </div>
  );
}
