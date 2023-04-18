import { useCallback, useEffect, useState } from "react";
import { getQuestions, shareScreen, BASE_URL } from "../api";
import { Question } from "@/components/Question/Question";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { useRouter } from "next/router";

import { Button } from "@/components/Button/Button";
import { Spinner } from "@/components/Spinner/Spinner";
import styles from "@/styles/Questions.module.css";
import * as qs from "qs";

const Questions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [questions, setQuestions] = useState([]);

  const route = useRouter();

  const listQuestions = useCallback(
    async (offsetValue = 0) => {
      const params = {
        limit,
        offset: offsetValue,
        filter: route.query.filter,
      };
      setIsLoading(true);
      const questionsResponse = await getQuestions(params);
      if (offsetValue) {
        const newQuestions = questions.concat(questionsResponse);
        setQuestions(newQuestions);
      } else {
        setQuestions(questionsResponse);
      }
      setIsLoading(false);
    },
    [limit, questions, route.query.filter]
  );

  useEffect(() => {
    listQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, route.query.filter]);

  const loadMore = () => {
    listQuestions(offset + 10);
  };

  return (
    <>
      <div className={styles.header}>
        <SearchBox
          filter={route.query.filter}
          setFilter={(value: string) =>
            route.replace({
              pathname: location.pathname,
              search: qs.stringify({ filter: value }),
            })
          }
          focus={route.query.filter?.length === 0}
        />
        <Button
          text={"Clean filter"}
          onClick={() =>
            route.replace({
              pathname: location.pathname,
            })
          }
        />
        <Button
          text={"Share screen"}
          onClick={async () =>
            await shareScreen("test@test.com", window.location.href)
          }
        />
      </div>

      {questions.map((question, index) => (
        <Question key={index} question={question} />
      ))}
      <div className={styles.buttonContainer}>
        {isLoading && !questions.length ? (
          <Spinner />
        ) : (
          <Button text="Show more" onClick={() => loadMore()} />
        )}
      </div>
    </>
  );
};

export default Questions;
