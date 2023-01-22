import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./TestCompletedPage.module.css";
import { Header, Main, Button, Loading } from "../components";

const TestCompletedPage = () => {
  const [userMBTI, setUserMBTI] = useState("");
  const [wordCloud, setWordCloud] = useState("");
  const [loading, setLoading] = useState(null);

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
    setLoading(true);
    getWordCloud();
    getUserMBTI();
  }, [wordCloud]);

  const getWordCloud = async () => {
    await axios
      .get(
        "http://localhost:5000/result/top10",
        // "https://soulmatemoviecharacter-ws8313.koyeb.app/result/top10",
        axiosConfig
      )
      .then((res) => {
        setWordCloud(res.data.word_cloud_src);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserMBTI = () => {
    setUserMBTI(wordCloud.slice(-8, -4));
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Header subtitle={"테스트가 완료되었습니다"} />

      <Main
        src={wordCloud}
        alt={userMBTI + " 유형의 워드 클라우드"}
        subtitle={userMBTI + " 유형의 워드 클라우드"}
      />

      <Button
        content={"나와 같은 유형인 캐릭터 확인하기"}
        onClick={() => {
          history.push({
            pathname: "/MbtiCharacterPage",
            state: {
              userMBTI: userMBTI,
            },
          });
        }}
      />

      <Button
        content={"나와 궁합이 잘 맞는 캐릭터 확인하기"}
        onClick={() => {
          history.push({
            pathname: "/MbtiCompatiblePage",
            state: {
              userMBTI: userMBTI,
            },
          });
        }}
      />

      <Button
        content={"같은 " + userMBTI + " 유형에게 인기있는 영화 확인하기"}
        onClick={() => {
          history.push({
            pathname: "/MbtiTop10Page",
            state: {
              userMBTI: userMBTI,
            },
          });
        }}
      />

      <Button
        content={"테스트 다시 하기"}
        onClick={() => {
          history.push("/");
        }}
      />
      {loading && <Loading />}
    </div>
  );
};

export default TestCompletedPage;
