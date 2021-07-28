import { query as q } from "faunadb";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentications providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      scope: "read:user",
    }),
  ],
  jwt: {
    // node-jose-tools - jose newkey -s 256 -t oct -a HS512
    secret: process.env.SIGNIN_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            // condition
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email ?? ""))
              )
            ),
            // condition true
            q.Create(q.Collection("users"), { data: { email } }),
            // else select
            q.Get(q.Match("user_by_email", q.Casefold(user.email ?? "")))
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
