import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { spotifyApi } from "../lib/spotify";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      spotifyApi.setAccessToken(String(session?.accessToken));
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
