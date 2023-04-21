import styles from "./SearchBox.module.css";
import React, { useEffect, useRef } from "react";

export const SearchBox = ({
  filter,
  setFilter,
  focus,
}: {
  filter?: string | string[];
  setFilter: (arg: string) => void;
  focus: boolean;
}) => {
  const textInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) {
      textInput.current?.focus();
    }
  }, [focus]);

  return (
    <input
      ref={textInput}
      className={styles.inputContainer}
      type="text"
      value={filter ? filter : ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search"
    />
  );
};
