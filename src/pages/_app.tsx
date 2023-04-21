import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useNetwork } from "../utils/checkConnection";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  typeof window !== "undefined" && router.asPath !== "/offline"
    ? localStorage.setItem("lastScreen", router.asPath)
    : null;
  const screen =
    typeof window !== "undefined" ? localStorage.getItem("lastScreen") : null;
  const status = useNetwork();

  useEffect(() => {
    if (status === true) {
      router.push(screen as string);
    } else {
      router.push("/offline");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return <Component {...pageProps} />;
}
