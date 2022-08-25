import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="m-auto w-full bg-slate-100">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
