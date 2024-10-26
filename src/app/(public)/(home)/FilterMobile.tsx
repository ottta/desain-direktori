"use client";

import { FilterProps } from "./MenuFilter";

import { MagnifyingGlassIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { NEXT_PUBLIC_HOST } from "@/libs/constants";
import { cn } from "@/libs/utils";

import TenantSearch from "@/components/Tenants/TenantSearch";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function FilterMobile(props: FilterProps) {
  const { cities, disciplines } = props;
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    return () => {
      if (open) setOpen(false);
    };
  }, [open, searchParams]);
  return (
    <menu
      className={cn(
        "fixed",
        "right-0",
        "bottom-0",
        "left-0",
        "z-50",
        "grid",
        "grid-cols-3",
        "pb-14",
        "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "col-start-3",
          "aspect-square",
          "flex",
          "items-center",
          "justify-center",
        )}
      >
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-16",
                "h-16",
                "rounded-full",
                "shadow",
                "z-50",
                "bg-green-100",
                // "translate-x-1/2",
                "pointer-events-auto",
                // "ml-1",
              )}
            >
              {/* <MagnifyingGlassIcon className={cn("!w-7", "!h-7")} /> */}
              <MixerVerticalIcon className={cn("!w-7", "!h-7")} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={cn("px-3", "space-y-3", "pb-20")}>
            <DrawerHeader className={cn("text-left")}>
              <DrawerTitle>Filter Results</DrawerTitle>
              <DrawerDescription>
                Filter results by city, discipline, or even its name.
              </DrawerDescription>
            </DrawerHeader>
            <div className={cn("grid", "grid-cols-2", "gap-x-1")}>
              <DrawerNested
                label="City"
                value={
                  cities.find((item) => item.slug === searchParams.get("city"))
                    ?.name ?? "All"
                }
              >
                <List query="city" items={cities} />
              </DrawerNested>
              <DrawerNested
                label="Discipline"
                value={
                  disciplines.find(
                    (item) => item.slug === searchParams.get("discipline"),
                  )?.name ?? "All"
                }
              >
                <List query="discipline" items={disciplines} />
              </DrawerNested>
            </div>
            <div className={cn("text-center", "text-sm", "uppercase")}>Or</div>
            <TenantSearch />
          </DrawerContent>
        </Drawer>
      </div>
    </menu>
  );
}

function DrawerNested({
  label,
  children,
  value,
}: {
  label: string;
  children: ReactNode;
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    return () => {
      if (open) setOpen(false);
    };
  }, [open, searchParams]);
  return (
    <Drawer nested open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-14", "text-lg", "overflow-hidden")}
        >
          <MagnifyingGlassIcon className={cn("!h-6", "!w-6")} />{" "}
          <span>
            {label}: {value}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className={cn("px-3", "mx-3", "space-y-3", "pb-20")}>
        <div>
          <DrawerTitle>{label}</DrawerTitle>
          <DrawerDescription>Search tenant by its {label}</DrawerDescription>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

function List({
  query,
  items,
}: {
  query: "city" | "discipline";
  items: { name: string; slug: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <ul className={cn("flex", "flex-wrap", "gap-1")}>
      {items.map((item, i) => {
        const isActive =
          item.slug === "all" && !searchParams.has("city")
            ? true
            : item.slug === searchParams.get(query);

        const endpoint = new URL(pathname, NEXT_PUBLIC_HOST);
        searchParams.forEach((value, key) => {
          endpoint.searchParams.append(key, value);
        });

        endpoint.searchParams.set(query, item.slug);

        return (
          <li key={i}>
            <NextLink
              href={endpoint.href}
              className={cn(
                "flex",
                "items-center",
                "justify-center",
                "border",
                "rounded-full",
                "px-3",
                "text-2xl",
                isActive && "bg-red-500",
              )}
            >
              {item.name}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
