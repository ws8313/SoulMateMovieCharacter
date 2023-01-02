import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./Modal.module.css";
import closebtn from "../img/closebtn.png";

const Modal = ({ openModal }) => {
  const [selected, setSelected] = useState("ISTJ");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [showResultLoginModal, setShowResultLoginModal] = useState(true);
  const [register, setRegister] = useState(false);

  const history = useHistory();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      // "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  };

  const onSubmit = () => {
    axios
      .post(
        "https://soulmatemoviecharacter-ws8313.koyeb.app/user/login",
        // "/user/login",
        {
          login_id: userId,
          login_pw: password,
        },
        axiosConfig
      )
      .then(() => {
        openResultLoginModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSignUp = () => {
    axios
      .post(
        "https://soulmatemoviecharacter-ws8313.koyeb.app/user/register",
        // "/user/register",
        {
          id: userId,
          pw: password,
          pw2: passwordCheck,
        },
        axiosConfig
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

  const openResultLoginModal = () => {
    setShowResultLoginModal(!showResultLoginModal);
  };

  const changeSelectOptionHandler = (e) => {
    setSelected(e.target.value);
  };

  const clickHandler = () => {
    axios
      .post(
        "/result/",
        {
          user_mbti: selected,
        },
        axiosConfig
      )
      .then(() => {
        history.push("/TestCompletedPage");
      })
      .catch((error) => {
        setShowResultLoginModal(!showResultLoginModal);
        console.log(error);
      });
  };

  const modalClickHandler = () => {
    openModal();
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {showResultLoginModal === false ? (
          <div className={styles.input_container}>
            <img
              src={closebtn}
              alt="closebtn"
              onClick={modalClickHandler}
              className={styles.modal_button}
            />
            <div className={styles.description}>당신의 유형을 선택해주세요</div>
            <select
              className={styles.modal_selectbox}
              onChange={changeSelectOptionHandler}
            >
              <option value="ISTJ">ISTJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ISFP">ISFP</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ESFP">ESFP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
            </select>
            <button className={styles.btn} onClick={clickHandler}>
              확인
            </button>
          </div>
        ) : (
          <div className={styles.modal}>
            {register === false ? (
              <div className={styles.input_container}>
                <img
                  src={closebtn}
                  alt="closebtn"
                  onClick={modalClickHandler}
                  className={styles.modal_button}
                />
                <div className={styles.description}>로그인</div>
                <input
                  value={userId}
                  className={styles.input}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디를 입력해주세요"
                />
                <input
                  type="password"
                  value={password}
                  className={styles.input}
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
                  onClick={modalClickHandler}
                  className={styles.modal_button}
                />
                <div className={styles.description}>회원가입</div>
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={styles.input}
                  placeholder="아이디를 입력해주세요"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="비밀번호를 입력해주세요"
                />
                <input
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  className={styles.input}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <button className={styles.btn} onClick={onSignUp}>
                  회원가입
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
