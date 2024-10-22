import MenuFilter from "./MenuFilter";

import { fetcher, getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import Tenants, { ResponseTenant } from "@/components/Tenants";

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

type SearchParams = Promise<{ [key: string]: string }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const nSearch = await searchParams;
  const [disciplines, cities, data] = await Promise.all([
    getDisciplines(),
    getCities(),
    await fetcher<ResponseTenant>(
      `${NEXT_PUBLIC_HOST}/api/tenants?city=${nSearch.city ?? "all"}&discipline=${nSearch.discipline ?? "all"}&category=${nSearch.category ?? "all"}&limit=${nSearch.limit ?? 24}`,
      { next: { tags: ["tenants"], revalidate: 5 } },
    ),
  ]);

  // Add `All` to the first of list
  disciplines
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all", author_id: "" });

  // Add `All` to the first of list
  cities
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all", author_id: "" });

  return (
    <div className={cn("pb-24", "min-h-svh", "col-span-6")}>
      <MenuFilter cities={cities} disciplines={disciplines} />
      <Tenants init={data} />
    </div>
  );
}
