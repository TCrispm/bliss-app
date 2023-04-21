/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuestion } from "../api";
import Image from "next/image";
import styles from "./Question.module.css";
import { Vote } from "@/components/Vote";
import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/Button/Button";

const Question = () => {
  const [question, setQuestion] = useState();
  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const questionId = useMemo(() => {
    if (router.query?.id) {
      return router.query.id;
    }
  }, [router.query]);

  const retieveQuestion = useCallback(async () => {
    setIsLoading(true);
    const question = await getQuestion(questionId);
    setQuestion(question);
    setIsLoading(false);
  }, [questionId]);

  useEffect(() => {
    retieveQuestion();
  }, [questionId, retieveQuestion]);

  if (!question && isloading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionImageContainer}>
        <img
          className={styles.image}
          src={question?.image_url}
          alt={question?.question}
        />
      </div>
      {question?.question}
      <div>
        {question?.choices.map((choice) => (
          <Vote key={choice.choice} choice={choice} />
        ))}
      </div>
      <div>
        <Button text={"Go back"} />
        <Button text={"Share Screen"} />{" "}
      </div>
    </div>
  );
};

export default Question;
