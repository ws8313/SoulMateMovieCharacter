import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./LoginModal.module.css";
import closebtn from "../img/closebtn.png";

const LoginModal = ({ openLoginModal }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [register, setRegister] = useState(false);

  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  const history = useHistory();

  const onSubmit = () => {
    axios
      .post(
        `/${PROXY}/user/login`,
        {
          login_id: userId,
          login_pw: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status && res.status === 202) {
          alert("이미 사용 중인 아이디입니다.");
        } else {
          history.push("/TestPage");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSignUp = () => {
    axios
      .post(
        `${PROXY}/user/register`,
        {
          id: userId,
          pw: password,
          pw2: passwordCheck,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status && res.status === 202) {
          alert("이미 사용 중인 아이디입니다.");
        } else {
          setRegister(!register);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = () => {
    setRegister(!register);
  };

  const clickHandler = (openLoginModal) => {
    setRegister(false);
    openLoginModal();
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {register === false ? (
          <div className={styles.input_container}>
            <img
              src={closebtn}
              alt="closebtn"
              onClick={openLoginModal}
              className={styles.modal_button}
            />
            <input
              value={userId}
              className={styles.login_input}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력해주세요"
            />
            <input
              type="password"
              value={password}
              className={styles.login_input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <button className={styles.btn} onClick={onSubmit}>
              로그인
            </button>
            <button className={styles.btn} onClick={signUp}>
              회원가입
            </button>
          </div>
        ) : (
          <div className={styles.input_container}>
            <img
              src={closebtn}
              alt="closebtn"
              onClick={() => clickHandler(openLoginModal)}
              className={styles.modal_button}
            />
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={styles.signup_input}
              placeholder="아이디를 입력해주세요"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.signup_input}
              placeholder="비밀번호를 입력해주세요"
            />
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className={styles.signup_input}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <button className={styles.btn} onClick={onSignUp}>
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
