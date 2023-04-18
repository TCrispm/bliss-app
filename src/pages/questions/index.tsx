import { useCallback, useEffect, useState } from "react";
import { getQuestions, shareScreen } from "../api";
import { Question } from "@/components/Question/Question";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { useRouter } from "next/router";

import { Button } from "@/components/Button/Button";
import { Spinner } from "@/components/Spinner/Spinner";
import styles from "@/styles/Questions.module.css";

const Questions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | undefined>();
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [questions, setQuestions] = useState([]);

  const route = useRouter();
  console.log("params", route.query);

  useEffect(() => {
    setFilter(route.query.filter);
  }, [route.query]);

  const listQuestions = useCallback(
    async (offsetValue = 0) => {
      const params = {
        limit,
        offset: offsetValue,
        filter,
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
    [filter, limit, questions]
  );

  useEffect(() => {
    listQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, limit, offset]);

  const loadMore = () => {
    listQuestions(offset + 10);
  };

  return (
    <>
      <div className={styles.header}>
        <SearchBox
          filter={filter}
          setFilter={setFilter}
          focus={route.query.filter?.length === 0}
        />
        <Button
          text={"Share screen"}
          onClick={async () => await shareScreen("test", "test")}
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
