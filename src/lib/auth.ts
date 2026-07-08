
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "./users";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const username = credentials?.username?.toString() ?? "";
                const password = credentials?.password?.toString() ?? "";

                const user = users.find(
                    (e) => e.username === username && e.password === password
                );
                if (!user) return null;
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

