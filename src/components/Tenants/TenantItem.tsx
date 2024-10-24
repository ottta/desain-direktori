"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import highlighter from "search-text-highlight";

import { Tenant } from "@/types/tenants";

import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { cn } from "@/libs/utils";

type TenantItemProps = Tenant & { isLoading?: boolean };

const TenantLink = ({
  name,
  slug,
  isActive,
}: {
  name: string;
  slug: string;
  isActive: boolean;
}) => {
  const searchParams = useSearchParams();
  const sParams = new URLSearchParams(searchParams);

  const href = `/profile/${slug}${sParams.size > 0 ? `?${sParams.toString()}` : ""}`;

  const query = sParams.has("search")
    ? sParams.get("search")?.toString() || ""
    : "";

  return (
    <NextLink
      href={href}
      className={cn(
        "px-2",
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
        "visited:text-neutral-400",
        "visited:dark:text-neutral-600",
      )}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: highlighter.highlight(name, query, {
            hlClass: cn("text-red-600", "underline"),
          }),
        }}
        className={cn(
          "overflow-hidden",
          "whitespace-nowrap",
          "text-ellipsis",
          "text-2xl",
          "font-bold",
        )}
      />
    </NextLink>
  );
};

export default function TenantItem(props: TenantItemProps) {
  const {
    name,
    slug,
    discipline,
    address,
    established_at,
    avatar_url,
    isLoading,
  } = props;

  const pathname = usePathname();
  const isActive = pathname === `/profile/${slug}`;

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isActive) return;
      if (!ref.current) return;
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 50);

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
        isLoading && "touch-none",
        isLoading && "pointer-events-none",
        "scroll-mt-[calc(25svh+8rem-1px)]",
        "lg:scroll-mt-[calc(7rem-2px)]",
        "py-3",
        "group",
        "px-3",
        "flex",
        "gap-2",
        "justify-between",
      )}
    >
      <div
        className={cn(
          "col-span-4",
          "relative",
          "flex",
          "gap-2",
          "overflow-hidden",
        )}
      >
        <Avatar className={cn("h-14", "w-14", "rounded-none")}>
          <AvatarImage alt="Avatar" src={avatar_url} />
          <AvatarFallback>
            {name
              .split(" ")
              .slice(0, 2)
              .map((item) => item[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className={cn("overflow-hidden")}>
          <TenantLink name={name} slug={slug} isActive={isActive} />

          <div
            className={cn(
              "px-2",
              "overflow-hidden",
              "whitespace-nowrap",
              "text-ellipsis",
              "text-neutral-400",
              "dark:text-neutral-600",
            )}
          >
            {discipline.map((item, i) => (
              <span key={i} className={cn("font-bold")}>
                {item.name}
              </span>
            ))}{" "}
            in{" "}
            {address.map((item, i) => (
              <span key={i}>{item.city.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div>{new Date(established_at).getFullYear()}</div>
    </li>
  );
}
