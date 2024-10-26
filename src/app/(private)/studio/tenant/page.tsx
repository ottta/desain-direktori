import { ResponseTenants } from "@/types/tenants";

import { API_TENANTS, NEXT_PUBLIC_HOST } from "@/libs/constants";
import { fetcher, getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";
import Tenants from "@/components/Tenants";
import FilterTenantStatus from "@/components/Tenants/FilterTenantStatus";
import TenantSearch from "@/components/Tenants/TenantSearch";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const query = await searchParams;
  const endpoint = new URL(API_TENANTS, NEXT_PUBLIC_HOST);
  Object.entries(query).forEach((item) => {
    const [key, value] = item;
    if (key === "search") {
      endpoint.searchParams.append(key, value || "");
    } else {
      endpoint.searchParams.append(key, value || "all");
    }
  });

  const [disciplines, cities, tenants] = await Promise.all([
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
    <div className={cn("col-span-4", "containers")}>
      <HeaderProfile
        className={cn("sticky", "top-22", "z-20", "flex", "gap-1", "px-0")}
      >
        <TenantSearch />
        <FilterTenantStatus />
      </HeaderProfile>
      <Tenants init={tenants} callbackUrl="/studio/tenant" />
    </div>
  );
}
