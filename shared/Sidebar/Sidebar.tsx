import React, { FunctionComponent, useEffect, useState } from "react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  PlusIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";

const NAV_BUTTONS = [
  { label: "Home", icon: HomeIcon },
  { label: "Search", icon: SearchIcon },
  { label: "Your library", icon: LibraryIcon },
];

const YOUR_BUTTONS = [
  { label: "Create Playlist", icon: PlusIcon },
  { label: "Liked Songs", icon: HeartIcon },
  { label: "Your Episode", icon: RssIcon },
];

type SidebarProps = {};

const Sidebar: FunctionComponent<SidebarProps> = ({}) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);

  return (
    <div className="p-5 text-gray-500 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4">
        {NAV_BUTTONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex items-center space-x-2 hover:text-white"
          >
            <Icon className="w-10 h-5" />
            <p>{label}</p>
          </button>
        ))}
        <hr className="border-t-[0.1px] border-gray-900" />
        {YOUR_BUTTONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex items-center space-x-2 hover:text-white"
          >
            <Icon className="w-10 h-5" />
            <p>{label}</p>
          </button>
        ))}
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <p key={playlist.id} className="cursor-pointer hover:text-white">
            {playlist.name}
          </p>
        ))}
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <LogoutIcon className="w-10 h-5" />
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
