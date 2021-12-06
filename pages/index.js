import Head from "next/head";
import Sidebar from "../shared/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Music player</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <main>
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
