import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useNetwork } from "../utils/checkConnection";

export default function App({ Component, pageProps }: AppProps) {
  useNetwork();
  return <Component {...pageProps} />;
}
