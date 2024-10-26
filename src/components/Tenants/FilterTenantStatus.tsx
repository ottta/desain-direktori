"use client";

import Boundary from "../Boundary";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { TenantStatus } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { NEXT_PUBLIC_HOST } from "@/libs/constants";
import { cn } from "@/libs/utils";

export default function FilterTenantStatus() {
  const key = "status";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const endpoint = new URL(pathname, NEXT_PUBLIC_HOST);
  searchParams.forEach((value, key) => {
    endpoint.searchParams.append(key, value);
  });

  return (
    <Boundary labels={["Status"]} className={cn("w-full")}>
      <Select
        value={searchParams.get(key)?.toString() || "publish"}
        onValueChange={(e) => {
          if (searchParams.has(key)) {
            endpoint.searchParams.set(key, e);
          } else {
            endpoint.searchParams.append(key, e);
          }
          router.push(endpoint.href);
        }}
      >
        <SelectTrigger className={cn("border-none")}>
          <SelectValue
            placeholder="Status"
            className={cn("border-none", "w-max")}
          />
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
    </Boundary>
  );
}
