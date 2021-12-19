import { atom } from "recoil";

export const activePlaylistState = atom<SpotifyApi.SinglePlaylistResponse>({
  key: "activePlaylistState",
  default: null,
});

export const playlistIdState = atom<string>({
  key: "playlistIdState",
  default: null,
});
