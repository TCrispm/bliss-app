import styles from "./SearchBox.module.css";
import React, { useEffect, useRef } from "react";

export const SearchBox = ({ filter, setFilter, focus }) => {
  const textInput = useRef(null);

  useEffect(() => {
    if (focus) {
      textInput.current.focus();
    }
  }, [focus]);

  return (
    <input
      ref={textInput}
      className={styles.inputContainer}
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search"
    />
  );
};
