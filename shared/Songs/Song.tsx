import { FunctionComponent } from "react";

type SongProps = {
  track: SpotifyApi.PlaylistTrackObject;
  order: number;
};

const Song: FunctionComponent<SongProps> = ({ track, order }) => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img
          src={track.track.album.images[0].url}
          alt={track.track.name}
          className="w-10 h-10"
        />
        <div>
          <p>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
        <div className="flex inline-center justify-between ml-auto md:ml-0">
          <p className="hidden: md:inline">{track.track.album.name}</p>
          <p>duration</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
