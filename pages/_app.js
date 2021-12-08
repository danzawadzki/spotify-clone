import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}
