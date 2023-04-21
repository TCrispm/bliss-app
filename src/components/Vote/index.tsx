import { updateQuestion } from "@/pages/api";
import { Button } from "../Button/Button";
import { ChoiceType } from "@/types/Question";
import styles from "./Vote.module.css";

export const Vote = ({
  choice,
  questionId,
}: {
  choice: ChoiceType;
  questionId: string;
}) => {
  return (
    <div className={styles.container}>
      {choice.votes} - {choice.choice}{" "}
      <Button
        small
        text={`vote`}
        onClick={async () => {
          await updateQuestion(questionId);
          alert(`Vote on: ${choice.choice}`);
        }}
      />
    </div>
  );
};
