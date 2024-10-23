"use client";

import TenantItem from "./TenantItem";
import useSWRInfinite from "swr/infinite";

import { Tenant } from "@/types/tenants";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import { fetcher } from "@/libs/fetch";
import { cn } from "@/libs/utils";

export type ResponseTenant = {
  data: Tenant[];
  meta: {
    cursor: string | null;
  };
};

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
const PAGE_SIZE = 12;

function Skeleton({ length }: { length: number }) {
  return (
    <ul className={cn("flex", "flex-col", "gap-1")}>
      {Array.from({ length }).map((_, i) => (
        <li key={i} className={cn("h-12")} />
      ))}
    </ul>
  );
}

export default function Tenants({ init }: { init: ResponseTenant }) {
  const searchParams = useSearchParams();
  const getKey = (index: number, prevData: ResponseTenant) => {
    if (prevData && !prevData.data) return null;

    const city = searchParams.get("city") || "all";
    const discipline = searchParams.get("discipline") || "all";
    const category = searchParams.get("category") || "all";
    const endpoint = new URL(`/api/tenants`, NEXT_PUBLIC_HOST);
    endpoint.searchParams.append("city", city);
    endpoint.searchParams.append("discipline", discipline);
    endpoint.searchParams.append("category", category);

    if (searchParams.has("search")) {
      const newKey = searchParams.get("search");
      if (newKey && newKey.length >= 3) {
        endpoint.searchParams.append("search", newKey);
      }
    }

    if (index === 0) return endpoint.href;

    endpoint.searchParams.append(
      "cursor",
      prevData.data[prevData.data.length - 1].cursor.toString(),
    );
    return endpoint.href;
  };

  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite<ResponseTenant>(getKey, fetcher, {
      fallbackData: [init],
      keepPreviousData: true,
    });

  const tempData: ResponseTenant[] = [];
  const tenants = data ? tempData.concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].data.length < PAGE_SIZE);

  const { ref, isIntersecting } = useIntersectionObserver();
  useEffect(() => {
    if (!isIntersecting) return;
    if (isLoadingMore || isReachingEnd) return;
    if (isValidating) return;
    setSize(size + 1);
  }, [
    isIntersecting,
    isValidating,
    size,
    setSize,
    isReachingEnd,
    isLoadingMore,
  ]);

  const freezeSearchParams = useRef(searchParams.toString());
  const refParent = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!refParent.current) return;
    if (searchParams.toString() === freezeSearchParams.current) return;
    refParent.current.scrollIntoView({ behavior: "smooth" });
    freezeSearchParams.current = searchParams.toString();
  }, [refParent, searchParams, freezeSearchParams]);

  if (error) return null;
  if (!data) return <Skeleton length={PAGE_SIZE} />;
  if (tenants.length <= 0) return <div>No Data</div>;

  return (
    <>
      <ul
        ref={refParent}
        className={cn(
          isLoading && "opacity-30",
          "gap-1",
          // "space-y-1",
          "scroll-mt-[calc(25svh+4rem)]",
          "lg:scroll-mt-28",
          "divide-y",
        )}
      >
        {data.map((item) =>
          item.data.map((item, i) => {
            const { cursor } = item;
            return <TenantItem key={i} index={cursor} {...item} />;
          }),
        )}
      </ul>

      <div>
        <button
          ref={ref}
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className={cn(
            "w-full",
            "h-14",
            "bg-neutral-100",
            "dark:bg-neutral-900",
            "capitalize",
            "border-y",
            "disabled:opacity-30",
            "disabled:cursor-not-allowed",
          )}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
              ? "no more result"
              : "load more"}
        </button>
      </div>
    </>
  );
}
