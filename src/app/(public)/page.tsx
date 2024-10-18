import MenuFilter from "./MenuFilter";

import { prisma } from "@/prisma";
import { TenantRole } from "@prisma/client";
import NextImage from "next/image";
import NextLink from "next/link";
import { ReactNode } from "react";

import { getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

function PaddingTemplate({
  pad,
  children,
}: {
  pad?: string;
  children: ReactNode;
}) {
  return (
    <span>
      {pad && <span className={cn("text-neutral-300")}>{pad}</span>}
      {children}
    </span>
  );
}

function digitPadding(num: number) {
  const sNumber = num.toString();
  return sNumber.length <= 1 ? (
    <PaddingTemplate pad="00">{sNumber}</PaddingTemplate>
  ) : sNumber.length < 3 ? (
    <PaddingTemplate pad="0">{sNumber}</PaddingTemplate>
  ) : (
    <PaddingTemplate>{sNumber}</PaddingTemplate>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    order?: string;
    discipline?: string;
    city?: string;
    category?: string;
  };
}) {
  const sParams = searchParams;

  const [disciplines, cities, companies, persons] = await Promise.all([
    getDisciplines(),
    getCities(),
    await prisma.tenant.count({ where: { type: TenantRole.COMPANY } }),
    await prisma.tenant.count({ where: { type: TenantRole.PERSONAL } }),
  ]);

  // Add `All` to the first of list
  disciplines
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  // Add `All` to the first of list
  cities
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  const qCity = sParams?.city;
  const qDiscipline = sParams?.discipline;
  const qCategory = sParams?.category;

  const data = await prisma.tenant.findMany({
    orderBy: { created_at: "desc" },
    include: {
      discipline: true,
      address: {
        include: { city: true },
      },
    },
    take: Number(sParams?.limit) || 72, // Page size
    where: {
      address: {
        some: { city: { slug: qCity && qCity !== "all" ? qCity : undefined } },
      },
      discipline: {
        some: {
          slug: qDiscipline && qDiscipline !== "all" ? qDiscipline : undefined,
        },
      },
      type: (qCategory?.toUpperCase() as keyof typeof TenantRole) ?? undefined,
    },
  });

  return (
    <>
      <div data-container className={cn("min-h-[25vh]")}>
        <div
          style={{ fontFeatureSettings: `"tnum" 1` }}
          className={cn(
            "text-5xl",
            "lg:text-7xl",
            "max-lg:px-1",
            "!leading-[0.8]",
            "uppercase",
          )}
        >
          {digitPadding(cities.length - 1)} Cities
          <br />
          {digitPadding(disciplines.length - 1)} Disciplines
          <br />
          {digitPadding(companies)} Companies
          <br />
          {digitPadding(persons)} Persons
        </div>
        <p className={cn("px-2", "my-6")}>
          Desain Direktori is inisiative project by{" "}
          <a
            href="https://unforma.club"
            target="_blank"
            rel="noopener noreferrer"
          >
            Taufik Oktama.
          </a>
          <br />
          <NextLink href="/about">Read More...</NextLink>
        </p>
        {/* <form
          action={async (formData: FormData) => {
            "use server";
            const url = formData.get("url");
            if (!url) throw new Error("Must be valid url");
            const req = await fetch(url.toString());
            console.log(req.status);
          }}
        >
          <input name="url" type="url" placeholder="https://" required />
          <button type="submit">Test</button>
        </form> */}
      </div>

      <div data-container className={cn("pb-24", "min-h-svh")}>
        <MenuFilter cities={cities} disciplines={disciplines} />
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

        <ul data-grid className={cn("gap-1")}>
          {data.map((item, i) => {
            const { name, slug, discipline, address, established_at } = item;
            const newSearchParams = new URLSearchParams(searchParams);
            const hasCategory =
              sParams &&
              searchParams.category &&
              searchParams.category.toUpperCase() === item.type;
            const activeCategory = !!hasCategory;
            if (activeCategory) {
              newSearchParams.delete("category");
            } else {
              newSearchParams.set("category", item.type.toLowerCase());
            }

            return (
              <li
                key={i}
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
                  {established_at.getFullYear()}
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
                        src={item.avatar_url}
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
                      // activeCategory && "pointer-events-none",
                      activeCategory && "underline",
                    )}
                  >
                    {item.type}
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
          })}
        </ul>
      </div>
    </>
  );
}
