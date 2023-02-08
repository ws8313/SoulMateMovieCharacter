import React, { useState } from "react";
import styles from "./Styles.module.css";
import { Header, Main, Button, Modal, LoginModal } from "../components";

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
        <Header subtitle={"당신과 똑같은 성향의 영화 캐릭터는?"} />

        <Main src={"img/for_test/0.webp"} alt={"main logo"} />

        <Button content={"인생캐 알아보기"} onClick={openLoginModal} />
        <Button content={"바로 결과 보기"} onClick={openModal} />
      </div>

      {showModal && <Modal openModal={openModal} />}
      {showLoginModal && <LoginModal openLoginModal={openLoginModal} />}
    </div>
  );
};

export default MainPage;
