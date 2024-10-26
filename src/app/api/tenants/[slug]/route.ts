import { prisma } from "@/prisma";
import { revalidateTag } from "next/cache";

type Params = Promise<{ slug: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { slug } = await params;
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      include: {
        address: { select: { city: { select: { name: true, slug: true } } } },
        discipline: { select: { name: true, slug: true } },
        media: { select: { title: true, url: true } },
        author: {
          select: { name: true, email: true, image: true, createdAt: true },
        },
      },
    });

    return Response.json({ success: true, data: tenant });
  } catch (error) {
    return Response.json({ success: false, data: null, erors: error });
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const body = await req.json();
  try {
    const data = await prisma.tenant.update({ where: { slug }, data: body });
    revalidateTag("tenants");
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, data: null, errors: error });
  }
}
