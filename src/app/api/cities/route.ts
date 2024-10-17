import { prisma } from "@/prisma";

export async function GET() {
  const cities = await prisma.city.findMany();
  return Response.json({ data: cities });
}
