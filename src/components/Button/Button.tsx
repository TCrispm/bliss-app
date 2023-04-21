import styles from "./Button.module.css";

export const Button = ({
  text,
  onClick,
  small,
}: {
  text: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  small?: boolean;
}) => {
  return (
    <button
      className={small ? styles.buttonSmall : styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
