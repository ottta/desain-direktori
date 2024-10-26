"use client";

import Boundary from "../Boundary";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";

import { cn } from "@/libs/utils";

import { Input } from "@/components/ui/input";

export default function TenantSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() ?? "",
  );

  const refInput = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const sParams = new URLSearchParams(searchParams);
    const stateSearch = !!search;
    const hasQuerySearch = sParams.has("search");

    if (stateSearch) {
      if (search.length < 1) return; // Only run if input more than 1 character
      if (search === sParams.get("search")?.toString()) return; // Nilainya sama
      if (hasQuerySearch) {
        sParams.set("search", search);
      } else {
        sParams.append("search", search);
      }
    } else if (!stateSearch && hasQuerySearch) {
      sParams.delete("search");
    } else {
      return;
    }

    return router.push(
      sParams.size > 0 ? pathname + "?" + sParams.toString() : pathname,
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!refInput.current) return;
    if (e.key === "Enter") {
      refInput.current.blur();
      return handleSearch();
    }
  };

  return (
    <div className={cn("relative", "col-span-full", "lg:col-span-2")}>
      {/* <div
        className={cn(
          "absolute",
          "top-0",
          "left-1",
          "-translate-y-1/2",
          "bg-red-100",
          "text-neutral-900",
          "px-2",
          "rounded-full",
          "select-none",
          "border",
          "text-sm",
          "lg:text-[11px]",
          "leading-[1.2]",
        )}
      >
        Name
      </div> */}
      <Boundary labels={["Name"]}>
        <Input
          ref={refInput}
          type="text"
          placeholder="Search Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={handleSearch}
          onKeyDown={handleKeyDown}
          className={cn(
            "h-14",
            "lg:h-9",
            "text-xl",
            "md:text-base",
            "border-none",
          )}
        />
      </Boundary>
    </div>
  );
}
