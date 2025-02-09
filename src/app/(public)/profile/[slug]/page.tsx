import UpdateStatus from "./UpdateStatus";

import { ResponseTenant } from "@/types/tenants";

import { auth } from "@/auth";
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
  searchParams: Promise<{ [key: string]: string }>;
};

async function getTenant(slug: string) {
  const endpoint = new URL(`${API_TENANTS}/${slug}`, NEXT_PUBLIC_HOST);
  endpoint.searchParams.append("status", "publish");
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
  await ASYNC_TIMEOUT(1000, null);

  const { slug } = await params;
  const sParams = await searchParams;
  const endpoint = new URL("/", NEXT_PUBLIC_HOST);
  Object.entries(sParams).forEach(([key, value]) => {
    endpoint.searchParams.append(key, value);
  });

  if (sParams.callback_url) {
    endpoint.pathname = sParams.callback_url;
    endpoint.searchParams.delete("callback_url");
  }

  const session = await auth();

  const { success, data } = await getTenant(slug);
  if (!success) notFound();
  if (!data) notFound();
  return (
    <>
      <HeaderProfile>
        <div className={cn("font-bold")}>Profile</div>
        <div className={cn("flex", "gap-1")}>
          {session && session.user && session.user.role !== "USER" && (
            <UpdateStatus slug={data.slug} value={data.status.toLowerCase()} />
          )}
          <NextLink
            href={endpoint.href}
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
        </div>
      </HeaderProfile>

      <div data-grid className={cn("@xs:grid-cols-8", "gap-3")}>
        <div className={cn("col-span-8", "grid", "grid-cols-subgrid", "gap-3")}>
          <div
            className={cn(
              "col-span-6",
              "px-3",
              "py-2",
              // "bg-neutral-200",
              "grid",
              "grid-cols-subgrid",
            )}
          >
            <div
              className={cn(
                "text-3xl",
                "lg:text-5xl",
                "font-bold",
                "col-span-full",
              )}
            >
              {data.name}
            </div>

            <div className={cn("col-span-1")}>
              <div className={cn("text-neutral-400", "text-sm")}>Type</div>
              <div>{data.type}</div>
            </div>
            <div className={cn("col-span-1")}>
              <div className={cn("text-neutral-400", "text-sm")}>
                Disciplines
              </div>
              <ul>
                {data.discipline.map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
              </ul>
            </div>
            <div className={cn("col-span-1")}>
              <div className={cn("text-neutral-400", "text-sm")}>Cities</div>
              <ul>
                {data.address.map((item, i) => (
                  <li key={i}>{item.city.name}</li>
                ))}
              </ul>
            </div>

            <div className={cn("col-span-full")}>
              <div className={cn("text-neutral-400", "text-sm")}>Media</div>
              <ul>
                {[
                  "https://unforma.club",
                  "https://instagram.com",
                  "https://x.com",
                ].map((item, i) => (
                  <li key={i}>
                    <NextLink
                      href={item}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className={cn(
              "relative",
              "aspect-square",
              "overflow-hidden",
              "col-span-2",
              "bg-red-200",
            )}
          >
            <NextImage
              fill
              priority
              alt={data.name}
              src={data.avatar_url}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn("w-full", "h-full", "bg-neutral-200")}
            />
          </div>
          {/* <div className={cn("col-span-5")}>
            <article
              className={cn(
                "*:not-first:mt-[1em]",
                "*:not-last:mb-[1em]",
                "[&_h2]:text-xl",
                "[&_h2]:font-bold",
                "[&_p]:max-w-2xl",
                "[&_p]:leading-[1.5]",
                "px-3",
              )}
              dangerouslySetInnerHTML={{
                __html: [
                  `<h2>What is Lorem Ipsum?</h2>`,
                  `<p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
                ].join(""),
              }}
            />
          </div> */}
        </div>

        {/* <div className={cn("col-span-6", "grid", "grid-cols-subgrid", "gap-3")}>
          <a href={`/profile/${slug}`}>Detail</a>
          <pre className={cn("bg-red-400")}>
            {JSON.stringify({ success, data }, null, 2)}
          </pre>
        </div> */}
      </div>
    </>
  );
}
