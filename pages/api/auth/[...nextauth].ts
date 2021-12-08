import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { SPOTIFY_LOGIN_URL } from "../../../lib/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: SPOTIFY_LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
