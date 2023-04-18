import { useRouter } from "next/router";
import styles from "./Question.module.css";
import Image from "next/image";

export const Question = ({ question }) => {
  const route = useRouter();
  console.log(question);

  return (
    <div
      className={styles.question}
      onClick={() => route.push(`questions/${question.id}`)}
    >
      {question.id}: {question.question}
    </div>
  );
};
