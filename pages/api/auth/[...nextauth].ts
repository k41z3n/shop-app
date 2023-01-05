import NextAuth, { DefaultSession } from "next-auth";
import { dbUsers } from "../../../database";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      _id: string
    } & DefaultSession["user"]
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "customLogin",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        return await dbUsers.checkUserMailAndPassword(credentials!.email, credentials!.password)
      }
    }),
    GithubProvider({
      clientId: process?.env.GITHUB_ID || '',
      clientSecret: process.env?.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',

  },
  jwt: {},
  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400 // 1d
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        account.accessToken = account.access_token
        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthDBUser(user?.email || '', user?.name || '')
            break;
          case 'credentials':
            token.user = user
            break;
        }
      }
      // console.log({ token });
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user = token.user as any
      // console.log({ session });
      return session
    }
  }
});
