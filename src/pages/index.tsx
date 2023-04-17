//import styles from "@/styles/Home.module.css";
import { getHealthStatus } from "./api";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button/Button";
import { Spinner } from "@/components/Spinner/Spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<string | undefined>();
  const router = useRouter();

  const getStatus = useCallback(async () => {
    setIsLoading(true);
    const response = await getHealthStatus();
    console.log(response);
    setServerStatus(response.status);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (serverStatus === "OK") {
    router.replace("/questions");
  } else {
    return <Button text="Retry Action" onClick={() => getStatus()} />;
  }
}
