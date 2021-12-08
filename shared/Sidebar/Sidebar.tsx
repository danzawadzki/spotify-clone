import React, { FunctionComponent } from "react";
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
  const x = useSession();

  return (
    <div className="p-5 text-gray-500 text-sm border-r border-gray-900">
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
