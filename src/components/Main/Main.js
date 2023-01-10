import React from "react";
import styles from "./Main.module.css";

const Main = ({ src, alt, description }) => {
  return (
    <div>
      <div className={styles.img_container}>
        <img className={styles.content_img} src={src} alt={alt} />
      </div>

      {description && (
        <div className={styles.test_description}>{description}</div>
      )}
    </div>
  );
};

export default Main;
