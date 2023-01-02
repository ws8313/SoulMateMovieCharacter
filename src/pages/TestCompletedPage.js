import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./TestCompletedPage.module.css";

const TestCompletedPage = () => {
  const [userMBTI, setUserMBTI] = useState("");
  const [wordCloud, setWordCloud] = useState([]);

  const history = useHistory();

  const accessToken = sessionStorage.getItem("token");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    async function getMBTI() {
      try {
        const res = await axios.get(
          "https://soulmatemoviecharacter-ws8313.koyeb.app/result/",
          // "http://127.0.0.1:5000/result/",
          axiosConfig
        );
        setUserMBTI(res.data.user_mbti);
      } catch (error) {
        console.log(error);
      }
    }

    async function getWordCloud() {
      try {
        const res = await axios.get(
          "https://soulmatemoviecharacter-ws8313.koyeb.app/result/top10",
          // "http://127.0.0.1:5000/result/top10",
          axiosConfig
        );
        setWordCloud(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMBTI();
    getWordCloud();
  }, [userMBTI]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>영화 캐릭터 테스트</div>

      <div className={styles.subtitle}>테스트가 완료되었습니다</div>

      <div className={styles.img_container}>
        <img
          className={styles.word_cloud}
          src={wordCloud.word_cloud_src}
          alt={wordCloud.word_cloud_src}
        />
        <div className={styles.text}>{userMBTI} 유형의 워드 클라우드</div>
      </div>

      <button
        className={styles.btn}
        onClick={() => {
          history.push("/MbtiCharacterPage");
        }}
      >
        나와 같은 유형인 캐릭터 확인하기
      </button>

      <button
        className={styles.btn}
        onClick={() => {
          history.push("/MbtiCompatiblePage");
        }}
      >
        나와 궁합이 잘 맞는 캐릭터 확인하기
      </button>

      <button
        className={styles.btn}
        onClick={() => {
          history.push("/MbtiTop10Page");
        }}
      >
        같은 {userMBTI} 유형에게 인기있는 영화 확인하기
      </button>

      <button
        className={styles.btn}
        onClick={() => {
          history.push("/");
        }}
      >
        테스트 다시 하기
      </button>
    </div>
  );
};

export default TestCompletedPage;
