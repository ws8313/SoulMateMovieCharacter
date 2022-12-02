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
    <div id={styles.container}>
      <div className={styles.title}>
        <div>영화 캐릭터 테스트</div>
      </div>

      <div id={styles.subtitle}>
        <div>당신과 똑같은 성향의 영화 캐릭터는?</div>
      </div>

      <div id={styles.img} className={styles.imgwrapper}>
        <img
          className={styles.contentimg}
          src="img/for_test/0.png"
          alt="main logo"
        />
      </div>

      <div className={styles.btn_container}>
        <button id={styles.btn} onClick={openLoginModal}>
          인생캐 알아보기
        </button>
        {showLoginModal && <LoginModal openLoginModal={openLoginModal} />}

        <button id={styles.btn} onClick={openModal}>
          바로 결과 보기
        </button>
        {showModal && <Modal openModal={openModal} />}
      </div>
    </div>
  );
};

export default MainPage;
