
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "./users";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const user = users.find(
                    (e) =>
                        e.username === credentials.username &&
                        e.password === credentials.password
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