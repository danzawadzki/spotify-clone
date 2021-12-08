import Head from "next/head";
import Sidebar from "../shared/Sidebar/Sidebar";
import Center from "../shared/Center/Center";

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
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
