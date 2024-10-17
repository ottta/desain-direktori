import MenuFilter from "./MenuFilter";

import { IDiscipline } from "@/types/discipline";

import NextLink from "next/link";
import { redirect } from "next/navigation";

import { fetcher, getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

const origin = process.env.NEXT_PUBLIC_HOST;

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
  const [disciplines, cities] = await Promise.all([
    getDisciplines(),
    getCities(),
  ]);

  if (!searchParams?.page)
    redirect(`/?page=1&limit=72&order=asc&city=all&discipline=all`);

  // Add `All` to the first of list
  disciplines.data
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  cities.data
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  const endPoint = new URL("/api/tenants", origin);
  const entry = Object.entries(searchParams);
  entry.forEach(([key, value]) => {
    endPoint.searchParams.append(key, value);
  });
  const data = await fetcher<{
    data: {
      name: string;
      slug: string;
      discipline: IDiscipline;
      city: IDiscipline;
      year: number;
    }[];
  }>(endPoint.href, { next: { revalidate: 5, tags: ["tenants"] } });

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
        <MenuFilter cities={cities.data} disciplines={disciplines.data} />
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
                // "uppercase",
                // "font-semibold",
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
          {data.data
            .concat(
              data.data,
              data.data,
              data.data,
              data.data,
              data.data,
              data.data,
            )
            .map((item, i) => {
              const { name, slug, discipline, city, year } = item;
              const activeDiscipline =
                discipline.slug === searchParams.discipline;
              const activeCity = city.slug === searchParams.city;
              return (
                <li
                  key={i}
                  data-grid
                  style={{ fontFeatureSettings: `"tnum" 1` }}
                  className={cn(
                    "col-span-full",
                    // "grid",
                    // "grid-cols-12",
                    "gap-1",
                  )}
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
