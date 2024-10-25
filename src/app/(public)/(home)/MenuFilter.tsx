"use client";

import FilterMobile from "./FilterMobile";
import FilterSearch from "./FilterSearch";

import { IDiscipline } from "@/types/discipline";

import { useScrollInfo } from "@faceless-ui/scroll-info";
import { CaretSortIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

import { MEDIA_MAX_MD } from "@/libs/constants";
import { cn } from "@/libs/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        scroll={true}
        className={cn(
          "flex",
          "items-center",
          "gap-x-1",
          "lg:text-xs",
          "bg-neutral-300",
          !active && "hover:bg-neutral-300/80",
          "dark:bg-neutral-800",
          !active && "dark:hover:bg-neutral-800/80",
          "rounded-full",
          "pr-2",
          "pl-2",
          "h-7",
          "lg:h-6",
          "leading-none",
          active && "bg-neutral-900",
          active && "text-neutral-100",
          "before:content-['']",
          "before:w-2",
          "before:aspect-square",
          "before:rounded-full",
          "before:bg-neutral-400",
          active && "before:bg-red-500",
          "whitespace-nowrap",
          "border",
        )}
      >
        {label}
      </NextLink>
    </li>
  );
}

function CustomButton({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <PopoverTrigger asChild className={cn("col-span-3", "lg:col-span-2")}>
      <Button
        variant="secondary"
        className={cn(
          "relative",
          "justify-between",
          "w-full",
          "h-10",
          "lg:h-8",
        )}
      >
        <div
          className={cn(
            "absolute",
            "top-0",
            "left-1",
            "-translate-y-1/2",
            "bg-red-100",
            "text-neutral-900",
            "px-2",
            "rounded-full",
            "text-[11px]",
            "leading-[1.2]",
            "select-none",
            "border",
          )}
        >
          {label}
        </div>
        <div
          className={cn(
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
            "font-bold",
          )}
        >
          {children}
        </div>

        <CaretSortIcon />
      </Button>
    </PopoverTrigger>
  );
}

export type FilterProps = {
  cities: IDiscipline[];
  disciplines: IDiscipline[];
};

function FilterDesktop(props: FilterProps) {
  const { cities, disciplines } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const refParams = useRef(searchParams.toString());
  const ref = useRef<HTMLElement>(null);
  const scrollInfo = useScrollInfo();

  useEffect(() => {
    if (!ref.current) return;
    if (refParams.current === searchParams.toString()) return;
    const current = ref.current;
    const isIntersect = current.getBoundingClientRect().y - 1 > scrollInfo.y;
    current.scrollIntoView({
      behavior: !isIntersect ? "instant" : "smooth",
    });

    refParams.current = searchParams.toString();
  }, [searchParams, ref, scrollInfo]);

  return (
    <menu
      ref={ref}
      className={cn(
        "sticky",
        // "top-[calc(33.33svh+4rem)]",
        "top-0",
        "pt-[calc(33.33svh+0.75rem)]",
        // "h-[calc(100svh-0.75rem)],"
        "lg:pt-14",
        "-mt-[33.33svh]",
        "lg:-mt-14",
        "bg-neutral-100",
        "dark:bg-neutral-950",
        // "bg-red-500",
        "flex",
        "z-10",
        "scroll-mt-0",
        "overflow-hidden",
      )}
    >
      <div
        className={cn(
          "grid",
          "grid-cols-6",
          "h-24",
          "lg:h-14",
          "items-center",
          "gap-1",
          "w-full",
          "border-b",
          "px-3",
          "lg:px-0",
        )}
      >
        <FilterSearch />
        <Popover>
          <CustomButton label="City">
            {cities.find((item) => item.slug === searchParams.get("city"))
              ?.name ?? "All"}
          </CustomButton>

          <PopoverContent align="start">
            <ul
              className={cn(
                "flex",
                "flex-wrap",
                "gap-1",
                "my-1",
                "max-lg:px-4",
              )}
            >
              {cities.map((item, i) => {
                const isActive = item.slug === searchParams.get("city");

                const search = new URLSearchParams(searchParams.toString());
                if (item.slug === "all" && !!searchParams.get("city")) {
                  search.delete("city");
                } else {
                  search.set("city", item.slug);
                }

                const href =
                  search.size > 0
                    ? pathname + "?" + search.toString()
                    : pathname;
                return (
                  <Chip
                    key={i}
                    href={href}
                    label={item.name}
                    active={
                      item.slug === "all" && !searchParams.get("city")
                        ? true
                        : isActive
                    }
                  />
                );
              })}
            </ul>
          </PopoverContent>
        </Popover>

        <Popover>
          <CustomButton label="Discipline">
            {disciplines.find(
              (item) => item.slug === searchParams.get("discipline"),
            )?.name ?? "All"}
          </CustomButton>

          <PopoverContent align="start">
            <ul
              className={cn(
                "flex",
                "flex-wrap",
                "gap-1",
                "my-1",
                "max-lg:px-4",
              )}
            >
              {disciplines.map((item, i) => {
                const isActive = item.slug === searchParams.get("discipline");

                const search = new URLSearchParams(searchParams.toString());
                if (item.slug === "all" && !!searchParams.get("discipline")) {
                  search.delete("discipline");
                } else {
                  search.set("discipline", item.slug);
                }

                const href =
                  search.size > 0
                    ? pathname + "?" + search.toString()
                    : pathname;

                return (
                  <Chip
                    key={i}
                    href={href}
                    label={item.name}
                    active={
                      item.slug === "all" && !searchParams.get("discipline")
                        ? true
                        : isActive
                    }
                  />
                );
              })}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </menu>
  );
}

export default function MenuFilter(props: FilterProps) {
  const MAX_MD = useMediaQuery(MEDIA_MAX_MD, {
    defaultValue: true,
    initializeWithValue: false,
  });

  if (MAX_MD) return <FilterMobile {...props} />;
  return <FilterDesktop {...props} />;
}
