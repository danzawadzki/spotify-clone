import Head from "next/head";
import Center from "../shared/Center/Center";
import Sidebar from "../shared/Sidebar/Sidebar";
import Player from "../shared/Player/Player";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Music player</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
