import MenuFilter from "./MenuFilter";

import { ResponseTenants } from "@/types/tenants";

import { API_TENANTS, NEXT_PUBLIC_HOST } from "@/libs/constants";
import { fetcher, getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import Tenants from "@/components/Tenants";

type SearchParams = Promise<{ [key: string]: string }>;
type PageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  const query = await searchParams;
  const endpoint = new URL(API_TENANTS, NEXT_PUBLIC_HOST);
  Object.entries(query).forEach(([key, value]) =>
    endpoint.searchParams.set(key, value),
  );

  const [disciplines, cities, data] = await Promise.all([
    getDisciplines(),
    getCities(),
    fetcher<ResponseTenants>(endpoint.href, {
      next: { tags: ["tenants"], revalidate: 5 },
    }),
  ]);

  // Add `All` to the first position of the list
  disciplines
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all", author_id: "" });

  // Add `All` to the first position of the list
  cities
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all", author_id: "" });

  return (
    <div className={cn("col-span-6")}>
      <MenuFilter cities={cities} disciplines={disciplines} />
      <Tenants init={data} />
    </div>
  );
}
