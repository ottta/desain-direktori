import NewTenant from "../studio/NewTenant";

import { auth } from "@/auth";

import { getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";

export default async function Page() {
  const [cities, disciplines, session] = await Promise.all([
    getCities(),
    getDisciplines(),
    auth(),
  ]);

  if (!session) return <div>Hmmmm</div>;
  // if (session.user.role !== "USER") redirect("/studio");
  return (
    <div className={cn("sticky", "top-22")}>
      <HeaderProfile>New Submission</HeaderProfile>
      <div className={cn("pt-3")}>
        <NewTenant
          session={session}
          cities={cities}
          disciplines={disciplines}
        />
      </div>
    </div>
  );
}
