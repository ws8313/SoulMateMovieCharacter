import React from "react";
import styles from "./ProgressBar.module.css";
import prevbtn from "../../img/prevbtn.png";

const ProgressBar = ({ index, prevClick }) => {
  const percent = ((index - 1) / 12) * 100;

  return (
    <div>
      {index === 1 ? (
        <div className={styles.progress_container}>
          <div className={styles.btnbox} onClick={prevClick}>
            <img className={styles.prevbtn} src={prevbtn} alt="prevbtn" />
          </div>
          <div className={styles.progress_bar_container}>
            <div
              className={styles.progress_bar}
              style={{ width: "8.333%" }}
            ></div>
          </div>
          <div className={styles.progress}>1 / 12</div>
        </div>
      ) : (
        <div className={styles.progress_container}>
          <div className={styles.btnbox} onClick={prevClick}>
            <img className={styles.prevbtn} src={prevbtn} alt="prevbtn" />
          </div>
          <div className={styles.progress_bar_container}>
            <div
              className={styles.progress_bar}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <div className={styles.progress}>{index - 1} / 12</div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
