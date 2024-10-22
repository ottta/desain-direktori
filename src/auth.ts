import { prisma } from "./prisma";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { Provider } from "next-auth/providers";
import ProviderGitHub from "next-auth/providers/github";
import ProviderGoogle from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      role?: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const providers: Provider[] = [
  ProviderGitHub({
    allowDangerousEmailAccountLinking: true,
    profile(profile) {
      return {
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
        role:
          (profile.role as keyof typeof UserRole | undefined) ?? UserRole.USER,
      };
    },
  }),
  ProviderGoogle({
    allowDangerousEmailAccountLinking: true,
    profile(profile) {
      return {
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role:
          (profile.role as keyof typeof UserRole | undefined) ?? UserRole.USER,
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
  debug: process.env.NODE_ENV !== "production",
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/studio") {
        if (auth && auth.user && auth.user.role === "USER") {
          return false;
        }
        return !!auth;
      }

      if (pathname === "/submission") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, user }) {
      if (trigger === "update") token.name = session.user.name;
      if (user) token.id = user.id;
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      session.user.id = token.id as string;
      session.user.role = token.role as UserRole;
      return session;
    },
  },
});
