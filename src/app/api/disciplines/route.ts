import { prisma } from "@/prisma";

export async function GET() {
  const data = await prisma.discipline.findMany();
  // const disciplines = DUMMY_DATA.map((item) => item.discipline);
  // const unique = [...new Map(disciplines.map((item) => [item, item])).values()];
  return Response.json({ data });
}
