import MenuFilter from "./MenuFilter";

import { prisma } from "@/prisma";
import NextLink from "next/link";
import { redirect } from "next/navigation";

import { getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    order?: string;
    discipline?: string;
    city?: string;
  };
}) {
  const sParams = new URLSearchParams(searchParams);

  if (sParams.size <= 0) {
    redirect(`/?discipline=all&city=all&limit=72`);
  }

  const [disciplines, cities] = await Promise.all([
    getDisciplines(),
    getCities(),
  ]);

  // Add `All` to the first of list
  disciplines
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  cities
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  const qCity = sParams.get("city");
  const qDiscipline = sParams.get("discipline");
  const test = await prisma.tenant.findMany({
    include: { discipline: true, city: true },
    take: Number(sParams.get("limit")) || 72,
    skip: 0,
    where: {
      city: {
        slug: qCity && qCity !== "all" ? qCity : undefined,
      },
      discipline: {
        slug: qDiscipline && qDiscipline !== "all" ? qDiscipline : undefined,
      },
    },
  });

  return (
    <>
      <div data-container className={cn("min-h-[33.33vh]")}>
        <div className={cn("text-6xl", "lg:text-9xl", "max-lg:px-1")}>
          Direktori
        </div>
        <p className={cn("px-2")}>
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
      </div>

      <div data-container className={cn("pb-24")}>
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
          )}
        >
          {["Year", "Name", "Website", "Discipline", "City"].map((item, i) => (
            <li
              key={i}
              className={cn(
                "text-sm",
                "px-2",
                item === "Name" || item === "Discipline" || item === "Website"
                  ? "col-span-2"
                  : "col-span-1",
                item === "Website" && "max-lg:hidden",
              )}
            >
              {item}
            </li>
          ))}
        </ul>

        <ul data-grid className={cn("gap-1")}>
          {test.map((item, i) => {
            const { name, slug, discipline, city, year } = item;
            const activeDiscipline = discipline.slug === qDiscipline;
            const activeCity = city.slug === qCity;
            return (
              <li
                key={i}
                data-grid
                style={{ fontFeatureSettings: `"tnum" 1` }}
                className={cn("col-span-full", "gap-1")}
              >
                <div className={cn("col-span-1", "px-2")}>{year}</div>
                <NextLink
                  href={`/${slug}`}
                  className={cn("col-span-2", "px-2", "visited:text-red-500")}
                >
                  {name}
                </NextLink>
                <div className={cn("col-span-2", "max-lg:hidden", "px-2")}>
                  https://{slug}.com
                </div>
                <div className={cn("col-span-2", "px-2")}>
                  <NextLink
                    href={{
                      href: "/",
                      query: { ...searchParams, discipline: discipline.slug },
                    }}
                    className={cn(
                      activeDiscipline && "text-neutral-500",
                      activeDiscipline && "pointer-events-none",
                      activeDiscipline && "underline",
                    )}
                  >
                    {discipline.name}
                  </NextLink>
                </div>
                <NextLink
                  href={{
                    href: "/",
                    query: { ...searchParams, city: city.slug },
                  }}
                  className={cn(
                    activeCity && "text-neutral-500",
                    activeCity && "pointer-events-none",
                    activeCity && "underline",
                    "px-2",
                  )}
                >
                  {city.name}
                </NextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
