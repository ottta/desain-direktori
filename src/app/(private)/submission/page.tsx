import NewTenant from "../studio/NewTenant";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

import { getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getMySubmission(user_id: string) {
  const data = await prisma.tenant.findMany({ where: { author_id: user_id } });
  return data;
}

export default async function Page() {
  const [cities, disciplines, session] = await Promise.all([
    getCities(),
    getDisciplines(),
    auth(),
  ]);

  if (!session) return null;
  if (session.user.role !== "USER") redirect("/studio");
  const mySubmission = await getMySubmission(String(session.user.id));
  return (
    <div data-container data-grid>
      <div className={cn("col-span-6", "lg:col-span-2", "px-2")}>
        <div className={cn("text-4xl")}>&rarr;</div>
      </div>
      <div className={cn("col-span-6", "lg:col-span-4", "space-y-8")}>
        <div className={cn("text-4xl", "font-bold")}>New Submission</div>
        <NewTenant
          session={session}
          cities={cities}
          disciplines={disciplines}
        />
      </div>
      {mySubmission.length >= 1 && (
        <div className={cn("col-span-6", "lg:col-span-6", "space-y-4")}>
          <div className={cn("text-4xl", "font-bold")}>Your Submission</div>
          <Table>
            <TableCaption>A list of you recent submissions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mySubmission.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.created_at.toISOString()}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
