import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "@libs/client/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="w-full m-auto max-w-3xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
// className="w-full h-full mx-auto bg-slate-100"
