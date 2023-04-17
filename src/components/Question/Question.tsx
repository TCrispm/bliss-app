import styles from "./Question.module.css";
import Image from "next/image";

export const Question = ({ question, questionNumber }) => {
  console.log(question);

  return (
    <div className={styles.question}>
      {questionNumber}: {question.question}
    </div>
  );
};
