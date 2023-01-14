import React from "react";
import styles from "./Header.module.css";

const Header = ({ subtitle, description }) => {
  return (
    <div>
      <div className={styles.title}>
        <div>영화 캐릭터 테스트</div>
      </div>

      {subtitle && (
        <div className={styles.subtitle}>
          <div>{subtitle}</div>
        </div>
      )}

      {description && (
        <div className={styles.description}>
          <div>{description}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
