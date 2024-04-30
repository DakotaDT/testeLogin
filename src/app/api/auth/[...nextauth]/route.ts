import { authOptions } from "@/app/lib/auth";
import { Account, User as AuthUser, NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };