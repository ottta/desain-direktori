"use client";

import { IDiscipline } from "@/types/discipline";

import { useScrollInfo } from "@faceless-ui/scroll-info";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { cn } from "@/libs/utils";

function Chip({
  label,
  active,
  href,
}: {
  label: string;
  active: boolean;
  href: string;
}) {
  return (
    <li>
      <NextLink
        href={href}
        className={cn(
          "flex",
          "items-center",
          "gap-x-1",
          // "text-xs",
          "lg:text-xs",
          "bg-neutral-200",
          "rounded-full",
          "pr-2",
          "pl-2",
          // "py-1",
          "h-7",
          "lg:h-6",
          "leading-none",
          active && "bg-neutral-900",
          active && "text-neutral-100",
          "before:content-['']",
          "before:w-2",
          "before:aspect-square",
          "before:rounded-full",
          "before:bg-neutral-300",
          active && "before:bg-red-500",
          "whitespace-nowrap",
        )}
      >
        {label}
      </NextLink>
    </li>
  );
}

export default function MenuFilter(props: {
  cities: IDiscipline[];
  disciplines: (IDiscipline & { length: number })[];
}) {
  const { cities, disciplines } = props;

  const searchParams = useSearchParams();

  const refParams = useRef(searchParams);
  const ref = useRef<HTMLElement>(null);
  const scrollInfo = useScrollInfo();

  useEffect(() => {
    if (!ref.current) return;
    if (refParams.current === searchParams) return;
    const current = ref.current;
    const isIntersect = current.getBoundingClientRect().y - 1 > scrollInfo.y;
    current.scrollIntoView({
      behavior: !isIntersect ? "instant" : "smooth",
    });

    refParams.current = searchParams;
  }, [searchParams, ref, scrollInfo]);

  return (
    <menu
      ref={ref}
      data-grid
      className={cn(
        "sticky",
        "top-0",
        "pt-16",
        "lg:pt-14",
        "bg-neutral-100",
        "flex",
      )}
    >
      {/* <div className={cn("col-span-1", "max-lg:hidden")}>Filter</div> */}
      <div
        className={cn(
          "col-span-10",
          // "flex",
          // "flex-col",
          // "gap-x-1",
          "h-20",
          "lg:h-14",
          "overflow-hidden",
          // "bg-red-200",
        )}
      >
        <ul className={cn("flex", "gap-1", "my-1", "overflow-x-scroll")}>
          {cities.map((item, i) => {
            const isActive = item.slug === searchParams.get("city");
            const search = new URLSearchParams(searchParams.toString());
            search.set("city", item.slug);

            return (
              <Chip
                key={i}
                label={item.name}
                active={isActive}
                href={`/?${search}`}
              />
            );
          })}
        </ul>

        <ul className={cn("flex", "gap-1", "my-1", "overflow-x-scroll")}>
          {disciplines.map((item, i) => {
            const isActive = item.slug === searchParams.get("discipline");

            const search = new URLSearchParams(searchParams.toString());
            search.set("discipline", item.slug);

            return (
              <Chip
                key={i}
                label={item.name}
                active={isActive}
                href={`/?${search}`}
              />
            );
          })}
        </ul>
      </div>
    </menu>
  );
}
