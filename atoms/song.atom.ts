import { atom } from "recoil";

export const activeTrackIdState = atom<string>({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
});
