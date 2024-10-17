import { providerMap, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { cn } from "@/libs/utils";

export default function Page({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div
      className={cn(
        "col-span-6",
        "lg:col-span-3",
        "lg:col-start-3",
        "aspect-[4/5]",
        "border",
        "rounded-xl",
        "p-3",
      )}
    >
      <ul>
        {Object.values(providerMap).map((item, i) => (
          <li key={i}>
            <form
              action={async () => {
                "use server";
                try {
                  await signIn(item.id, { redirectTo: callbackUrl ?? "" });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <button type="submit" className={cn("text-2xl")}>
                Sign in with <b>{item.name}</b>
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
