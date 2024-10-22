"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Tenant } from "@/types/tenants";

import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { cn } from "@/libs/utils";

type BaseData = {
  name: string;
  slug: string;
};

type TenantItemProps = BaseData & Tenant & { index: number };

const TenantItem = (props: TenantItemProps) => {
  const { name, slug, discipline, established_at, type, avatar_url } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const qCategory = newSearchParams.get("category");
  const hasCategory =
    searchParams && qCategory && qCategory.toUpperCase() === type;
  const activeCategory = !!hasCategory;
  if (activeCategory) {
    newSearchParams.delete("category");
  } else {
    newSearchParams.set("category", type.toLowerCase());
  }

  const href = `/profile/${slug}${newSearchParams.size > 1 ? `?${searchParams}` : ""}`;
  const isActive = href.split("?")[0] === pathname;

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!isActive) return;
    const timeout = setTimeout(
      () => ref.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
    return () => clearTimeout(timeout);
  }, [isActive, ref]);

  return (
    <li
      ref={ref}
      style={{ fontFeatureSettings: `"tnum" 1` }}
      className={cn(
        "gap-1",
        !isActive && "hover:bg-neutral-300",
        !isActive && "hover:dark:bg-neutral-950/20",
        isActive && "bg-neutral-300",
        isActive && "dark:bg-neutral-950/50",
        "scroll-mt-[calc(7rem-2px)]",
        "py-3",
        "group",
        "px-3",
        "flex",
        "gap-2",
        "justify-between",
      )}
    >
      <div className={cn("col-span-4", "relative", "flex", "gap-2")}>
        <Avatar
          className={cn(
            "h-14",
            "w-14",
            "rounded-none",
            "peer-visited:bg-red-500",
          )}
        >
          <AvatarImage alt="Avatar" src={avatar_url} />
          <AvatarFallback>
            {name
              .split(" ")
              .slice(0, 2)
              .map((item) => item[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div>
          <NextLink
            href={href}
            scroll={true}
            className={cn(
              "peer",
              "px-2",
              "visited:text-neutral-500",
              "visited:line-through",
              "overflow-hidden",
              "whitespace-nowrap",
              "text-ellipsis",
              "flex",
              "items-center",
              "gap-1",
              "overflow-hidden",
              "relative",
              "group-hover:underline",
              isActive && "underline",
            )}
          >
            <div
              className={cn(
                "overflow-hidden",
                "whitespace-nowrap",
                "text-ellipsis",
                "text-2xl",
                "font-bold",
              )}
            >
              {name}
            </div>
          </NextLink>
          <div
            className={cn(
              "max-lg:hidden",
              "px-2",
              "overflow-hidden",
              "whitespace-nowrap",
              "text-ellipsis",
            )}
          >
            {discipline.map((item, i) => (
              <span key={i}>{item.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div>{new Date(established_at).getFullYear()}</div>
    </li>
  );
};

export default TenantItem;
