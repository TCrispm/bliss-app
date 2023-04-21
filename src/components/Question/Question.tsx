import { useRouter } from "next/router";
import styles from "./Question.module.css";

export const Question = ({ question }) => {
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
