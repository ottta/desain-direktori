import MenuFilter from "./MenuFilter";

import { prisma } from "@/prisma";
import { TenantRole } from "@prisma/client";
import NextLink from "next/link";
import { ReactNode } from "react";

import { fetcher, getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import Tenants, { ResponseTenant } from "@/components/Tenants";

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

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
    limit?: string;
    discipline?: string;
    city?: string;
    category?: string;
  };
}) {
  const [disciplines, cities, companies, persons, data] = await Promise.all([
    getDisciplines(),
    getCities(),
    await prisma.tenant.count({ where: { type: TenantRole.COMPANY } }),
    await prisma.tenant.count({ where: { type: TenantRole.PERSONAL } }),
    await fetcher<ResponseTenant>(
      `${NEXT_PUBLIC_HOST}/api/tenants?city=${searchParams?.city ?? "all"}&discipline=${searchParams?.discipline ?? "all"}&category=${searchParams?.category ?? "all"}&limit=${searchParams?.limit ?? 24}`,
      { next: { tags: ["tenants"], revalidate: 5 } },
    ),
  ]);

  // Add `All` to the first of list
  disciplines
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  // Add `All` to the first of list
  cities
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .unshift({ id: "", name: "All", slug: "all" });

  return (
    <>
      <div data-container className={cn("min-h-[25vh]", "z-30", "relative")}>
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
      </div>

      <div data-container className={cn("pb-24", "min-h-svh")}>
        <MenuFilter cities={cities} disciplines={disciplines} />
        <Tenants init={data} />
      </div>
    </>
  );
}
