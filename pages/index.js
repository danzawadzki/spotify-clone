import Head from "next/head";
import Sidebar from "../shared/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
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
