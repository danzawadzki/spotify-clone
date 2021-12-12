import React, { FunctionComponent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../../hooks/useSpotify";
import { activePlaylistState, playlistIdState } from "../../atoms/playlistAtom";

const colors = [
  "indigo",
  "blue",
  "green",
  "red",
  "yellow",
  "pink",
  "purple",
  "coolGray",
];

type CenterProps = {};

const Center: FunctionComponent<CenterProps> = ({}) => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const activePlaylistId = useRecoilValue(playlistIdState);
  const [activePlaylist, setActivePlaylist] =
    useRecoilState(activePlaylistState);

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [activePlaylistId]);

  useEffect(() => {
    if (activePlaylistId)
      spotifyApi
        .getPlaylist(activePlaylistId)
        .then((response) => setActivePlaylist(response.body))
        .catch((e) => console.log("Error: ", e));
  }, [activePlaylistId]);

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            src={session?.user.image}
            alt={`${session?.user.name} avatar`}
            className="rounded-full w-10 h-10"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5  w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-${color}-500 h-80`}
      >
        {activePlaylist.name}
        <img src="" alt="" />
      </section>
    </div>
  );
};

export default Center;
