import { prisma } from "@/prisma";
import { TenantRole, TenantStatus } from "@prisma/client";

const PER_PAGE = 24;
// const PER_PAGE = 12;

type TenantStatusKey = keyof typeof TenantStatus;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || PER_PAGE;
  const cursor = searchParams.get("cursor") || null;
  const search = searchParams.get("search") || "";

  const qDiscipline = searchParams.get("discipline") || "all";
  const qCity = searchParams.get("city") || "all";
  const qCategory = searchParams.get("category") || "all";
  const qStatus = (
    searchParams.get("status") || "publish"
  ).toUpperCase() as TenantStatusKey;

  const data = await prisma.tenant.findMany({
    take: Number(limit), // Page size
    ...(cursor && {
      skip: 1,
      cursor: {
        cursor: Number(cursor),
      },
    }),
    orderBy: { cursor: "desc" },
    include: {
      address: { select: { city: { select: { name: true, slug: true } } } },
      discipline: { select: { name: true, slug: true } },
      media: { select: { title: true, url: true } },
      author: { select: { id: true, name: true, email: true, image: true } },
    },
    where: {
      ...(!!search ? { name: { contains: search, mode: "insensitive" } } : {}),
      status: qStatus.includes("-")
        ? { not: qStatus.replace(/-/g, "") as TenantStatusKey }
        : qStatus,
      address: {
        some: { city: { slug: qCity && qCity !== "all" ? qCity : undefined } },
      },
      discipline: {
        some: {
          slug: qDiscipline && qDiscipline !== "all" ? qDiscipline : undefined,
        },
      },
      ...(Object.values(TenantRole).includes(
        String(qCategory.toUpperCase()) as keyof typeof TenantRole,
      )
        ? { type: qCategory.toUpperCase() as keyof typeof TenantRole }
        : {}),
    },
  });

  return Response.json({ data });
}

// export async function POST(req: Request) {
//   const body = await req.json();
//   const tenant = await prisma.tenant.create({
//     data: {
//       name: body.name,
//       slug: body.slug,
//       discipline: { connect: { id: body.disciplineId } },
//       address: { create: { city_id: body.cityId } },
//     },
//     include: { discipline: true, address: true },
//   });
//   return Response.json({ success: true, data: tenant });
// }
