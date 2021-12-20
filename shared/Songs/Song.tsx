import { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { activeTrackIdState, isPlayingState } from "../../atoms/song.atom";
import useSpotify from "../../hooks/useSpotify";
import { msToMins } from "../../lib/time";

type SongProps = {
  track: SpotifyApi.PlaylistTrackObject;
  order: number;
};

const Song: FunctionComponent<SongProps> = ({ track, order }) => {
  const spotifyApi = useSpotify();

  const [activeTrackId, setActiveTrackId] = useRecoilState(activeTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setActiveTrackId(track.track.id);
    setIsPlaying(true);

    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  const stopSong = () => {
    setActiveTrackId(null);
    setIsPlaying(false);
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-2 px-3 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img
          src={track.track.album.images[0].url}
          alt={track.track.name}
          className="w-10 h-10"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40 truncate">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden: md:inline">{track.track.album.name}</p>
        <p>{msToMins(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
