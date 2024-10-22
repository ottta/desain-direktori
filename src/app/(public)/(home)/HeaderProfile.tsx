"use client";

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
        "dark:bg-neutral-900",
      )}
    >
      {params && !!params.slug ? (
        <NextLink
          href="/"
          scroll={false}
          className={cn(
            "hover:underline",
            "px-3",
            "border",
            "rounded-full",
            "bg-red-400",
            "dark:bg-red-600",
          )}
        >
          Close
        </NextLink>
      ) : (
        <div className={cn("px-3")}>Directus Emeritus</div>
      )}
    </div>
  );
}
