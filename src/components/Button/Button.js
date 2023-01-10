import React from "react";
import styles from "./Button.module.css";

const Button = ({ content, onClick, value }) => {
  return (
    <button className={styles.btn} value={value} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
