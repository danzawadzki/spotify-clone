import { FunctionComponent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import {
  FastForwardIcon,
  RefreshIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import useSpotify from "../../hooks/useSpotify";
import { activeTrackIdState, isPlayingState } from "../../atoms/song.atom";
import useSongInfo from "../../hooks/useSongInfo";

function ReIcon(props: { className: string }) {
  return null;
}

const Player: FunctionComponent = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [activeTrackId, setActiveTrackId] = useRecoilState(activeTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState<number>(50);

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((d) => {
      if (d.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const fetchActivePlayingTrack = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setActiveTrackId(data.body.item.id);

        spotifyApi
          .getMyCurrentPlaybackState()
          .then((data) => setIsPlaying(data.body.is_playing));
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !activeTrackId) {
      fetchActivePlayingTrack();
      setVolume(50);
    }
  }, [activeTrackId, spotifyApi, session, fetchActivePlayingTrack]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 border-t border-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images?.[0]?.url}
          alt={songInfo?.name}
          className="hidden md:inline w-10 h-10"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p className="text-xs text-gray-500">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />
        <RefreshIcon className="button" />
      </div>
    </div>
  );
};

export default Player;
