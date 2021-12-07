import SpotifyWebApi from "spotify-web-api-node";

const SCOPES = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const queryParams = new URLSearchParams({
  scope: SCOPES,
});

export const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPORIFY_SECRET,
});
