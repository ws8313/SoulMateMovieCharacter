import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./TestCompletedPage.module.css";
import { Header, Main, Button } from "../components";

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
          "http://localhost:5000/result/",
          // "https://soulmatemoviecharacter-ws8313.koyeb.app/result/",
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
          "http://localhost:5000/result/top10",
          // "https://soulmatemoviecharacter-ws8313.koyeb.app/result/top10",
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
      <Header subtitle={"테스트가 완료되었습니다"} />

      <Main
        src={wordCloud.word_cloud_src}
        alt={wordCloud.word_cloud_src}
        subtitle={userMBTI + " 유형의 워드 클라우드"}
      />

      <Button
        content={"나와 같은 유형인 캐릭터 확인하기"}
        onClick={() => {
          history.push("/MbtiCharacterPage");
        }}
      />

      <Button
        content={"나와 궁합이 잘 맞는 캐릭터 확인하기"}
        onClick={() => {
          history.push("/MbtiCompatiblePage");
        }}
      />

      <Button
        content={"같은 " + userMBTI + " 유형에게 인기있는 영화 확인하기"}
        onClick={() => {
          history.push("/MbtiTop10Page");
        }}
      />

      <Button
        content={"테스트 다시 하기"}
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default TestCompletedPage;
