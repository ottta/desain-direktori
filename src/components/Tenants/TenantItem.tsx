"use client";

import { TenantRole } from "@prisma/client";
import NextImage from "next/image";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { forwardRef } from "react";

import { cn } from "@/libs/utils";

type BaseData = {
  name: string;
  slug: string;
};

type TenantItemProps = BaseData & {
  address: { city: BaseData & { id: string } }[];
  discipline: (BaseData & { id: string })[];
  established_at: string;
  type: TenantRole;
  avatar_url: string;
  index: number;
};

const TenantItem = forwardRef<HTMLLIElement, TenantItemProps>((props, ref) => {
  const { name, slug, address, discipline, established_at, type, avatar_url } =
    props;

  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const qCity = newSearchParams.get("city");
  const qDiscipline = newSearchParams.get("discipline");
  const qCategory = newSearchParams.get("category");
  const hasCategory =
    searchParams && qCategory && qCategory.toUpperCase() === type;
  const activeCategory = !!hasCategory;
  if (activeCategory) {
    newSearchParams.delete("category");
  } else {
    newSearchParams.set("category", type.toLowerCase());
  }

  return (
    <li
      ref={ref}
      data-grid
      style={{ fontFeatureSettings: `"tnum" 1` }}
      className={cn(
        "col-span-full",
        "gap-1",
        "hover:bg-neutral-200",
        "items-center",
      )}
    >
      <div className={cn("col-span-1", "px-2")}>
        {new Date(established_at).getFullYear()}
      </div>
      <div className={cn("col-span-2")}>
        <NextLink
          href={`/${slug}`}
          className={cn(
            "px-2",
            "visited:text-red-500",
            "overflow-hidden",
            "whitespace-nowrap",
            "text-ellipsis",
            "flex",
            "items-center",
            "gap-1",
            "overflow-hidden",
            "relative",
          )}
        >
          <div
            className={cn(
              "relative",
              "h-12",
              "aspect-square",
              "overflow-hidden",
              "shrink-0",
            )}
          >
            <NextImage
              alt={name}
              src={avatar_url}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn("object-center", "object-cover")}
            />
          </div>
          <div
            className={cn(
              "overflow-hidden",
              "whitespace-nowrap",
              "text-ellipsis",
            )}
          >
            {name}
          </div>
        </NextLink>
      </div>
      <div
        className={cn(
          "col-span-2",
          "max-lg:hidden",
          "px-2",
          "overflow-hidden",
          "whitespace-nowrap",
          "text-ellipsis",
        )}
      >
        https://{slug}.com
      </div>
      <div className={cn("col-span-2", "px-2")}>
        {discipline.map((item, i) => {
          const activeDiscipline = item.slug === qDiscipline;
          return (
            <NextLink
              key={i}
              href={{
                href: "/",
                // @ts-expect-error IDKW
                query: { ...searchParams, discipline: item.slug },
              }}
              className={cn(
                activeDiscipline && "text-neutral-500",
                activeDiscipline && "pointer-events-none",
                activeDiscipline && "underline",
              )}
            >
              {item.name}
            </NextLink>
          );
        })}
      </div>
      <div>
        <NextLink
          href={{ href: "/", query: newSearchParams.toString() }}
          className={cn(
            activeCategory && "text-neutral-500",
            activeCategory && "underline",
          )}
        >
          {type}
        </NextLink>
      </div>
      <div className={cn("max-lg:hidden", "overflow-hidden")}>
        {address.map((item, i) => {
          const activeCity = item.city.slug === qCity;
          return (
            <NextLink
              key={i}
              href={{
                href: "/",
                // @ts-expect-error IDKW
                query: { ...searchParams, city: item.city.slug },
              }}
              className={cn(
                "block",
                "overflow-hidden",
                "whitespace-nowrap",
                "text-ellipsis",
                activeCity && "text-neutral-500",
                activeCity && "pointer-events-none",
                activeCity && "underline",
                "px-2",
              )}
            >
              {item.city.name}
            </NextLink>
          );
        })}
      </div>
    </li>
  );
});

TenantItem.displayName = "Tenant Item";

export default TenantItem;
