"use client";

import TenantItem from "./TenantItem";
import useSWRInfinite from "swr/infinite";

import { Tenant } from "@/types/tenants";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
    const city = searchParams.get("city") || "all";
    const discipline = searchParams.get("discipline") || "all";
    const category = searchParams.get("category") || "all";
    const endpoint = new URL(`/api/tenants`, NEXT_PUBLIC_HOST);
    endpoint.searchParams.append("city", city);
    endpoint.searchParams.append("discipline", discipline);
    endpoint.searchParams.append("category", category);
    // endpoint.searchParams.append("limit", PAGE_SIZE.toString());

    if (prevData && !prevData.data) return null;
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

  // const tempData: ResponseTenant[] = [];
  // const tenants = data ? tempData.concat(...data) : [];
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

  if (error) return null;
  if (!data) return <Skeleton length={PAGE_SIZE} />;

  return (
    <>
      <ul
        data-grid
        className={cn(
          "sticky",
          "top-36",
          "lg:top-28",
          "h-8",
          "lg:h-6",
          "mb-1",
          "bg-neutral-100",
          "max-lg:-mx-4",
          "max-lg:px-4",
          "z-10",
        )}
      >
        {["Year", "Name", "Website", "Discipline", "Category", "City"].map(
          (item, i) => (
            <li
              key={i}
              className={cn(
                "text-sm",
                "px-2",
                item === "Name" || item === "Discipline" || item === "Website"
                  ? "col-span-2"
                  : "col-span-1",
                item === "Website" && "max-lg:hidden",
                item === "City" && "max-lg:hidden",
              )}
            >
              {item}
            </li>
          ),
        )}
      </ul>

      <ul data-grid className={cn("gap-1", isLoading && "opacity-30")}>
        {data?.map((item) =>
          item.data.map((item, i) => {
            const {
              name,
              slug,
              discipline,
              address,
              established_at,
              avatar_url,
              type,
              cursor,
            } = item;

            return (
              <TenantItem
                key={i}
                index={cursor}
                name={name}
                slug={slug}
                address={address}
                discipline={discipline}
                established_at={established_at}
                avatar_url={avatar_url}
                type={type}
              />
            );
          }),
        )}
      </ul>

      <div>
        <button
          ref={ref}
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className={cn("w-full", "h-14", "bg-neutral-200")}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
              ? "no more tenants"
              : "load more"}
        </button>
      </div>
    </>
  );
}
