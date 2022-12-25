import React, { useState } from "react";
import styles from "./MainPage.module.css";
import Modal from "../components/Modal";
import LoginModal from "../components/LoginModal";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const openLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>영화 캐릭터 테스트</div>
        </div>

        <div className={styles.subtitle}>
          <div>당신과 똑같은 성향의 영화 캐릭터는?</div>
        </div>

        <div className={styles.img_wrapper}>
          <img
            className={styles.content_img}
            src="img/for_test/0.png"
            alt="main logo"
          />
        </div>

        <button className={styles.btn} onClick={openLoginModal}>
          인생캐 알아보기
        </button>

        <button className={styles.btn} onClick={openModal}>
          바로 결과 보기
        </button>
      </div>

      {showLoginModal && <LoginModal openLoginModal={openLoginModal} />}
      {showModal && <Modal openModal={openModal} />}
    </div>
  );
};

export default MainPage;
