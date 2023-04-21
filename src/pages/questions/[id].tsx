/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuestion, shareScreen } from "../api";
import Image from "next/image";
import styles from "./Question.module.css";
import { Vote } from "@/components/Vote";
import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/Button/Button";
import { QuestionType } from "@/types/Question";

const Question = () => {
  const [question, setQuestion] = useState<QuestionType>();
  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const questionId = useMemo(() => {
    if (router.query?.id) {
      return router.query.id;
    }
  }, [router.query]);

  const retieveQuestion = useCallback(async () => {
    setIsLoading(true);
    if (questionId) {
      const question = await getQuestion(questionId as string);
      setQuestion(question);
      setIsLoading(false);
    }
  }, [questionId]);

  useEffect(() => {
    if (questionId) {
      retieveQuestion();
    }
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
      <h2>{question?.question}</h2>
      <div className={styles.choices}>
        {question?.choices.map((choice) => (
          <Vote
            key={choice.choice}
            choice={choice}
            questionId={questionId as string}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <Button text={"Go back"} onClick={() => router.push("/questions")} />
        <Button
          text={"Share Screen"}
          onClick={async () => {
            await shareScreen("test@test.com", window.location.href);
            alert(`Share screen: ${window.location.href}`);
          }}
        />{" "}
      </div>
    </div>
  );
};

export default Question;
