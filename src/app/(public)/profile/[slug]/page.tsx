import { ResponseTenant } from "@/types/tenants";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { API_TENANTS, NEXT_PUBLIC_HOST } from "@/libs/constants";
import { fetcher } from "@/libs/fetch";
import { ASYNC_TIMEOUT, cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ modal?: string }>;
};

async function getTenant(slug: string) {
  const endpoint = new URL(`${API_TENANTS}/${slug}`, NEXT_PUBLIC_HOST);
  const req = await fetcher<ResponseTenant>(endpoint.href);
  return req;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { success, data } = await getTenant(slug);
  if (!success) return {};
  if (!data) return {};
  return {
    title: data.name,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  await ASYNC_TIMEOUT(1000, null);

  const { success, data } = await getTenant(slug);
  if (!success) notFound();
  if (!data) notFound();
  const nParams = new URLSearchParams(sParams);
  if (nParams.has("modal")) {
    nParams.delete("modal");
  }
  const href = nParams.size > 0 ? `/?${nParams.toString()}` : "/";
  return (
    <>
      <HeaderProfile>
        <div>{data.name}</div>
        <NextLink
          href={href}
          scroll={false} // Its important prevent scroll juggling
          className={cn(
            "pr-3",
            "pl-2",
            "border",
            "rounded-full",
            "bg-red-100",
            "hover:bg-red-100/80",
            "dark:bg-red-600",
            "dark:hover:bg-red-600/80",
            "flex",
            "items-center",
            "gap-1",
            "h-9",
            "lg:h-7",
          )}
        >
          <Cross1Icon /> Close
        </NextLink>
      </HeaderProfile>

      <div data-grid className={cn("@xs:grid-cols-6", "p-3")}>
        <div className={cn("col-span-6", "flex", "items-start", "gap-2")}>
          <div
            className={cn(
              "relative",
              "aspect-square",
              "overflow-hidden",
              "w-24",
              "shrink-0",
            )}
          >
            <NextImage
              fill
              priority
              alt={data.name}
              src={data.avatar_url}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div>
            <div className={cn("text-3xl", "lg:text-5xl", "font-bold")}>
              {data.name}
            </div>
            <div>{data.type}</div>
            <ul>
              {data.discipline.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn("col-span-6", "py-2")}>
          <a href={`/profile/${slug}`}>Detail</a>
          {/* <pre>{JSON.stringify({ success, data }, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
}
