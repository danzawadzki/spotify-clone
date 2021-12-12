import { atom } from "recoil";

export const activePlaylistState = atom({
  key: "activePlaylistState",
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: null,
});
