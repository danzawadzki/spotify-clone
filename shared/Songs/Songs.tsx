import { FunctionComponent } from "react";
import { useRecoilValue } from "recoil";
import { activePlaylistState } from "../../atoms/playlistAtom";
import Song from "./Song";

const Songs: FunctionComponent = () => {
  const activePlaylist = useRecoilValue(activePlaylistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {activePlaylist?.tracks.items.map((item, index) => (
        <Song key={item.track.id} track={item} order={index + 1} />
      ))}
    </div>
  );
};

export default Songs;
