"use client";

import { IDiscipline } from "@/types/discipline";

import { useScrollInfo } from "@faceless-ui/scroll-info";
import { CaretSortIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

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
    <PopoverTrigger asChild className={cn("col-span-2")}>
      <Button
        variant="secondary"
        className={cn("relative", "justify-between", "w-full")}
      >
        <div
          className={cn(
            "absolute",
            "top-0",
            "left-1",
            "-translate-y-1/2",
            "bg-neutral-950",
            "text-neutral-100",
            "px-2",
            "rounded-full",
            "text-xs",
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

export default function MenuFilter(props: {
  cities: IDiscipline[];
  disciplines: IDiscipline[];
}) {
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
        "top-0",
        "pt-16",
        "lg:pt-14",
        "-mt-14",
        "bg-neutral-100",
        "dark:bg-neutral-900",
        "flex",
        "max-lg:-mx-4",
        "z-10",
      )}
    >
      <div
        className={cn(
          "grid",
          "grid-cols-6",
          "h-20",
          "lg:h-14",
          // "overflow-hidden",
          // "flex",
          "items-center",
          "gap-1",
          // "px-2",
          // "text-sm",
          "w-full",
          "border-b",
        )}
      >
        {/* <div className={cn("col-span-2")}>Filter: </div> */}
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

      {/* <div className={cn("h-20", "lg:h-14", "overflow-hidden")}>
        <ul
          className={cn(
            "scroll-hidden",
            "flex",
            "gap-1",
            "my-1",
            "overflow-x-scroll",
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
              search.size > 0 ? pathname + "?" + search.toString() : pathname;
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

        <ul
          className={cn(
            "scroll-hidden",
            "flex",
            "gap-1",
            "my-1",
            "overflow-x-scroll",
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
              search.size > 0 ? pathname + "?" + search.toString() : pathname;

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
      </div> */}
    </menu>
  );
}
