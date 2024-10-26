import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";

export default function Page() {
  return (
    <div>
      <HeaderProfile>User</HeaderProfile>
      <div className={cn("p-3")}>/studio/user/@profile</div>
    </div>
  );
}
