"use client";

import { mutate } from "swr";
import { unstable_serialize } from "swr/infinite";

import { TenantStatus } from "@prisma/client";

import { API_TENANTS, NEXT_PUBLIC_HOST } from "@/libs/constants";
import { fetcher } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import { useGetKey } from "@/components/Tenants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UpdateStatus({
  value,
  slug,
}: {
  value: string;
  slug: string;
}) {
  const getKey = useGetKey();
  return (
    <Select
      value={value}
      onValueChange={async (e) => {
        const transform = e.toUpperCase() as TenantStatus;
        const endpoint = new URL(`${API_TENANTS}/${slug}`, NEXT_PUBLIC_HOST);
        try {
          await fetcher(endpoint.href, {
            method: "PATCH",
            body: JSON.stringify({ status: transform }),
          });
          await mutate(unstable_serialize(getKey));
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <SelectTrigger className={cn("h-9", "lg:h-7")}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {Object.keys(TenantStatus)
            .sort((a, b) => a.localeCompare(b))
            .map((item, i) => (
              <SelectItem key={i} value={item.toLowerCase()}>
                {item}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
