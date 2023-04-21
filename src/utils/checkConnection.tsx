import { useEffect, useState } from "react";

export const useNetwork = () => {
  const [isOnline, setNetwork] = useState(
    typeof window === "undefined" ? undefined : window.navigator.onLine
  );

  const updateNetwork = (value: boolean) => {
    setNetwork(value);
  };

  useEffect(() => {
    window.addEventListener("offline", () => console.log("off"));

    window.addEventListener("online", () => console.log("on"));
    return () => {
      window.removeEventListener("offline", () => console.log("off"));

      window.removeEventListener("online", () => console.log("on"));
    };
  });

  return isOnline;
};
