import { ResponseTenants } from "@/types/tenants";

import { auth } from "@/auth";
import { TenantStatus } from "@prisma/client";
import moment from "moment";
import NextLink from "next/link";

import { API_TENANTS, NEXT_PUBLIC_HOST } from "@/libs/constants";
import { fetcher } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function StatusBadge({ label }: { label: TenantStatus }) {
  switch (label) {
    case "PENDING":
      return <Badge variant="secondary">{label}</Badge>;
    case "DECLINE":
      return <Badge variant="destructive">{label}</Badge>;
    default:
      return <Badge variant="outline">{label}</Badge>;
  }
}

export default async function Page() {
  const session = await auth();
  if (!session) return <div>Hmmmm</div>;
  const endpoint = new URL(API_TENANTS, NEXT_PUBLIC_HOST);
  endpoint.searchParams.append("author_id", String(session.user.id));

  const mySubmission = await fetcher<ResponseTenants>(endpoint.href, {
    next: { tags: ["tenants"] },
  });
  if (mySubmission.data.length <= 0) return <div>No Submissions</div>;
  return (
    <div className={cn("col-span-6", "lg:col-span-6", "space-y-4")}>
      <HeaderProfile className={cn("sticky", "top-22")}>
        Your Submission
      </HeaderProfile>
      <Table>
        <TableCaption>A list of your recent submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Established At</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mySubmission.data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <NextLink
                  href={`/profile/${item.slug}?callback_url=/submission`}
                >
                  {item.name}
                </NextLink>
              </TableCell>
              <TableCell>{moment(item.established_at).fromNow()}</TableCell>
              <TableCell>{moment(item.created_at).fromNow()}</TableCell>
              <TableCell>{moment(item.updated_at).fromNow()}</TableCell>
              <TableCell>
                <StatusBadge label={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
