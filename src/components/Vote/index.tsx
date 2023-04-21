import { Button } from "../Button/Button";

export const Vote = ({ choice }) => {
  return (
    <div>
      {choice.votes} - {choice.choice} <Button text={`vote`} />
    </div>
  );
};
