import { prisma } from "@/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
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
