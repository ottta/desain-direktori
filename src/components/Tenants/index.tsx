"use client";

import TenantItem from "./TenantItem";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { ResponseTenants } from "@/types/tenants";

import { notFound, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import { API_TENANTS, NEXT_PUBLIC_HOST, PAGE_SIZE } from "@/libs/constants";
import { fetcher } from "@/libs/fetch";
import { cn } from "@/libs/utils";

function useScrolToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const freezeSearchParams = useRef(searchParams.toString());
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!pathname.startsWith("/profile")) return;
    if (searchParams.toString() === freezeSearchParams.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
    freezeSearchParams.current = searchParams.toString();
  }, [ref, searchParams, pathname, freezeSearchParams]);
  return ref;
}

export function useGetKey(): SWRInfiniteKeyLoader {
  const searchParams = useSearchParams();
  return (index: number, prevData: ResponseTenants) => {
    const endpoint = new URL(API_TENANTS, NEXT_PUBLIC_HOST);
    searchParams.forEach((value, key) => endpoint.searchParams.set(key, value));

    if (prevData && !prevData.data) return null;
    if (index === 0) return endpoint.href;
    endpoint.searchParams.append(
      "cursor",
      prevData.data[prevData.data.length - 1].cursor.toString(),
    );
    return endpoint.href;
  };
}

export default function Tenants({
  init,
  callbackUrl = "/",
}: {
  init: ResponseTenants;
  callbackUrl?: string;
}) {
  const getKey = useGetKey();

  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite<ResponseTenants>(getKey, fetcher, {
      fallbackData: [init],
      keepPreviousData: true,
    });

  const tempData: ResponseTenants[] = [];
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

  const refParent = useScrolToTop();

  if (error) return null;
  if (!data) return notFound();
  if (tenants.length <= 0) return <div>No Data</div>;

  return (
    <ul
      ref={refParent}
      className={cn(
        "gap-0",
        "md:gap-1",
        "scroll-mt-[calc(33.33svh)]",
        "md:scroll-mt-28",
        "relative",
        "grid",
        "grid-cols-3",
        "md:block",
        "md:divide-y",
        "max-md:-mt-px",
      )}
    >
      {data.map((item) =>
        item.data.map((item, i) => {
          return (
            <TenantItem
              key={i}
              index={i}
              isLoading={isLoadingMore}
              callbackUrl={callbackUrl}
              {...item}
            />
          );
        }),
      )}
      <li className={cn("col-span-full", "h-16", "mb-16")}>
        <button
          ref={ref}
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className={cn(
            "w-full",
            "h-full",
            "bg-neutral-100",
            "dark:bg-neutral-900",
            "capitalize",
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
      </li>
    </ul>
  );
}
