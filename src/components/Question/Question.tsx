import { useRouter } from "next/router";
import styles from "./Question.module.css";
import { QuestionType } from "@/types/Question";

export const Question = ({ question }: { question: QuestionType }) => {
  const route = useRouter();
  return (
    <div
      className={styles.question}
      onClick={() => route.push(`questions/${question.id}`)}
    >
      {question.id}: {question.question}
    </div>
  );
};
