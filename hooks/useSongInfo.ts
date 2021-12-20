import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { activeTrackIdState } from "../atoms/song.atom";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const activeTrackId = useRecoilValue(activeTrackIdState);
  const [songInfo, setSongInfo] =
    useState<SpotifyApi.SingleTrackResponse>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (activeTrackId) {
        const responseSongInfo = await spotifyApi.getTrack(activeTrackId);

        setSongInfo(responseSongInfo.body);
      }
    };

    fetchSongInfo();
  }, [activeTrackId]);

  return songInfo;
};

export default useSongInfo;
