import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { Provider } from "next-auth/providers";
import ProviderGitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const providers: Provider[] = [
  ProviderGitHub({
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
        role: (profile.role as string | undefined) ?? "user",
      };
    },
  }),
];

export const providerMap = providers
  .map((item) => {
    if (typeof item === "function") {
      const providerData = item();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: item.id, name: item.name };
    }
  })
  .filter((item) => item.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/studio") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account, user }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      // @ts-expect-error IDKW
      session.user.role = token.role;
      return session;
    },
  },
});
