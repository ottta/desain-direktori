"use client";

import useSWR from "swr";

import {
  City,
  Discipline,
  Tenant,
  TenantAddress,
  TenantMedia,
  User,
} from "@prisma/client";
import moment from "moment";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { fetcher } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

export type ControlTenantAttr = Tenant & {
  discipline: Discipline[];
  address: (TenantAddress & { city: City })[];
  media: TenantMedia[];
  author: User;
};

export default function ControlTenant2({
  fallback,
}: {
  fallback: { data: ControlTenantAttr[] };
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState<string>("");
  const { data } = useSWR<{ data: ControlTenantAttr[] }>(
    !!search ? `/api/tenants?search=${search}` : `/api/tenants`,
    fetcher,
    { fallbackData: fallback, keepPreviousData: true },
  );
  if (!data || !data.data) return;
  return (
    <div className={cn("col-span-4", "space-y-4")}>
      <div
        className={cn(
          "border-b",
          "sticky",
          "top-16",
          "lg:top-14",
          "bg-neutral-100",
          "dark:bg-neutral-900",
        )}
      >
        <div className={cn("text-4xl", "font-bold")}>Tenants</div>
      </div>
      <div>
        <input
          type="text"
          value={search}
          placeholder="Search name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {!!search && search}
      </div>
      <ScrollArea className={cn("h-[calc(100svh-13.5rem)]")}>
        <ul className={cn("space-y-1")}>
          {data.data.map((item) => {
            const path = `/profile/${item.slug}`;
            const isActive = path === pathname;
            return (
              <li key={item.id}>
                <NextLink
                  href={`/profile/${item.slug}`}
                  className={cn(
                    "flex",
                    "flex-col",
                    "border",
                    "rounded-md",
                    "p-2",
                    "hover:bg-neutral-200",
                    "dark:hover:bg-neutral-950",
                    isActive && "bg-neutral-200",
                    isActive && "dark:bg-neutral-200",
                  )}
                >
                  <div className={cn("flex", "justify-between")}>
                    <div>
                      <div className={cn("text-xl", "font-bold")}>
                        {item.name}
                      </div>
                      <div>
                        {item.discipline.map((item) => item.name).join(", ")}
                      </div>
                    </div>
                    <div>{moment(item.created_at).fromNow()}</div>
                  </div>
                </NextLink>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
