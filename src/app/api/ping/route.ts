import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return Response.json({
    success: true,
    message: "Helo",
    url: req.nextUrl,
  });
}
