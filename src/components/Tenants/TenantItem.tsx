"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import highlighter from "search-text-highlight";

import { Tenant } from "@/types/tenants";

import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

import { cn } from "@/libs/utils";

type TenantItemProps = Tenant & {
  isLoading?: boolean;
  index: number;
  callbackUrl: string;
};

const TenantLink = ({
  slug,
  isActive,
  children,
  className,
  callbackUrl,
}: {
  slug: string;
  isActive: boolean;
  children: ReactNode;
  className?: string;
  callbackUrl: string;
}) => {
  const searchParams = useSearchParams();
  const sParams = new URLSearchParams(searchParams);
  if (sParams.has("callback_url")) {
    sParams.set("callback_url", callbackUrl);
  } else {
    sParams.append("callback_url", callbackUrl);
  }

  const href = `/profile/${slug}${sParams.size > 0 ? `?${sParams.toString()}` : ""}`;

  return (
    <NextLink
      href={href}
      className={cn(
        "flex",
        "items-center",
        "gap-1",
        "overflow-hidden",
        "relative",
        "group-hover:underline",
        "visited:text-neutral-400",
        "dark:visited:text-neutral-600",
        isActive && "underline",
        className,
      )}
    >
      {children}
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
    index,
    callbackUrl,
  } = props;

  const pathname = usePathname();
  const sParams = useSearchParams();
  const isActive = pathname === `/profile/${slug}`;
  const query = sParams.has("search")
    ? sParams.get("search")?.toString() || ""
    : "";

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isActive) return;
      if (!ref.current) return;
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [isActive, ref]);

  const classNames = ["", "max-md:border-x", ""];

  return (
    <li
      ref={ref}
      style={{ fontFeatureSettings: `"tnum" 1` }}
      className={cn(
        "gap-1",
        !isActive && "hover:bg-neutral-300",
        !isActive && "dark:hover:bg-neutral-950/20",
        isActive && "bg-neutral-300",
        isActive && "dark:bg-neutral-950/50",
        isLoading && "touch-none",
        isLoading && "pointer-events-none",
        "scroll-mt-[calc(33.33svh-1px)]",
        "md:scroll-mt-[calc(7rem-1px)]",
        "p-0",
        "md:p-3",
        "group",
        "flex",
        "gap-2",
        "justify-between",
        "max-md:border-y",
        "max-md:-mb-px",
        classNames[index % classNames.length],
      )}
    >
      <div
        className={cn(
          "relative",
          "flex",
          "gap-2",
          "overflow-hidden",
          "max-md:w-full",
          "max-md:h-full",
          "max-md:aspect-square",
          isActive && "opacity-30",
        )}
      >
        <TenantLink
          slug={slug}
          isActive={isActive}
          callbackUrl={callbackUrl}
          className={cn(
            "max-md:w-full",
            "max-md:h-full",
            "after:content-['']",
            "after:absolute",
            "after:inset-0",
            "after:bg-red-500",
            "after:opacity-0",
            "visited:after:opacity-50",
            "shrink-0",
          )}
        >
          <Avatar
            className={cn(
              "h-full",
              "md:h-14",
              "w-full",
              "md:w-14",
              "rounded-none",
              "flex",
              "items-center",
              "justify-center",
            )}
          >
            <AvatarImage alt="Avatar" src={avatar_url} />
            <AvatarFallback>
              {name
                .replace(/[^\w ]/, "")
                .trim()
                .split(" ")
                .slice(0, 2)
                .map((item) => item[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </TenantLink>

        <div className={cn("overflow-hidden", "max-md:hidden")}>
          <TenantLink slug={slug} isActive={isActive} callbackUrl={callbackUrl}>
            <div
              dangerouslySetInnerHTML={{
                __html: highlighter.highlight(name, query, {
                  hlClass: cn("text-red-600", "underline"),
                }),
              }}
              className={cn(
                "px-2",
                "overflow-hidden",
                "whitespace-nowrap",
                "text-ellipsis",
                "text-2xl",
                "font-bold",
              )}
            />
          </TenantLink>

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
      <div className={cn("max-md:hidden")}>
        {new Date(established_at).getFullYear()}
      </div>
    </li>
  );
}
