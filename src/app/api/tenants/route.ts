import { prisma } from "@/prisma";
import { TenantRole, TenantStatus } from "@prisma/client";

import { PAGE_SIZE } from "@/libs/constants";

type TenantStatusKey = keyof typeof TenantStatus;
type TenantRoleKey = keyof typeof TenantRole;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams;

  const cursor = query.get("cursor") || null;
  const search = query.get("search") || "";
  const author_id = query.get("author_id") || "";

  const discipline = query.get("discipline") || "all";
  const city = query.get("city") || "all";
  const category = (
    query.get("category") || "all"
  ).toUpperCase() as TenantRoleKey;
  const status = (
    query.get("status") || "publish"
  ).toUpperCase() as TenantStatusKey;

  try {
    const data = await prisma.tenant.findMany({
      take: PAGE_SIZE, // Page size
      orderBy: { cursor: "desc" },
      include: {
        address: { select: { city: { select: { name: true, slug: true } } } },
        discipline: { select: { name: true, slug: true } },
        media: { select: { title: true, url: true } },
        author: { select: { id: true, name: true, email: true, image: true } },
      },
      // Cursor based pagination
      ...(cursor && { skip: 1, cursor: { cursor: Number(cursor) } }),
      where: {
        address: {
          some: { city: { slug: city !== "all" ? city : undefined } },
        },
        discipline: {
          some: { slug: discipline !== "all" ? discipline : undefined },
        },
        // Check for `/?status=-publish`
        status: status.startsWith("-")
          ? { not: status.replace(/-/g, "") as TenantStatusKey }
          : status,
        ...(query.has("author_id") ? { author_id, status: undefined } : {}),
        // If `?search=` exists
        ...(query.has("search")
          ? { name: { contains: search, mode: "insensitive" } }
          : {}),
        ...(Object.values(TenantRole).includes(category)
          ? { type: category }
          : {}),
      },
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, data: [], errors: error });
  }
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
