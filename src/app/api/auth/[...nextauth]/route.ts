import NextAuth from "next-auth/next";
import { Account, User as AuthUser, NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs"
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials" as string,
            name: "Credentials" as string,
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connect();
                try {
                const user = await User.findOne({ email: credentials.email });
                if (user) {
                    const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                    );
                    if (isPasswordCorrect) {
                    return user;
                    }
                }
                } catch (err: any) {
                throw new Error(err);
                }
            },
        }),
        Github({
          clientId: process.env.GITHUB_ID ?? "",
          clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        // ...add more providers here
    ],
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };