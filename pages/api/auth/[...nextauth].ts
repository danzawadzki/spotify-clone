import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { SPOTIFY_LOGIN_URL, spotifyApi } from "../../../lib/spotify";
import check from "check-types";

const refreshAccessToken = async (token: JWT) => {
  try {
    if (
      check.string(token?.access_token) &&
      check.string(token?.refresh_token)
    ) {
      spotifyApi.setAccessToken(token.access_token);
      spotifyApi.setRefreshToken(token.refresh_token);

      const { body: refreshedAccessToken } =
        await spotifyApi.refreshAccessToken();

      console.log("REFRESHED ACCESS TOKEN: ", refreshedAccessToken);

      return {
        ...token,
        accessToken: refreshedAccessToken.access_token,
        accessTokenExpires: Date.now() + refreshedAccessToken.expires_in * 1000,
        refresh_token:
          refreshedAccessToken.refresh_token ?? token.refresh_token,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

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
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        console.log("INITIAL SIGN IN");
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + Number(account.expires_in) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING TOKEN IS OKAY");
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
