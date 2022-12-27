import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./MbtiCompatiblePage.module.css";

const MbtiCompatiblePage = () => {
  const [userMBTI, setUserMBTI] = useState("");
  const [charList, setCharList] = useState([]);
  const [compatibleMBTI, setCompatibleMBTI] = useState("");

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
    async function getMbti() {
      try {
        const mbti = await axios.get(
          "http://localhost:5000/result/",
          axiosConfig
        );
        setUserMBTI(mbti.data.user_mbti);
      } catch (error) {
        console.log(error);
      }
    }
    getMbti();
  }, [userMBTI]);

  useEffect(() => {
    async function getCompatibleCharacter() {
      try {
        const res = await axios.get(
          "http://localhost:5000/character/1",
          axiosConfig
        );
        setCharList(res.data.character_info);
        setCompatibleMBTI(res.data.characters_mbti);
      } catch (error) {
        console.log(error);
      }
    }
    getCompatibleCharacter();
  }, [userMBTI]);

  const refreshHandler = () => {
    async function getMbtiCharacterRefresh() {
      try {
        const res = await axios.get(
          "http://localhost:5000/character/refresh/1",
          axiosConfig
        );
        setCharList(res.data.character_info);
      } catch (error) {
        console.log(error);
      }
    }
    getMbtiCharacterRefresh();
  };

  const clickHandler = (idx) => {
    history.push({
      pathname: "/MbtiCompatibleMovieListPage",
      state: {
        idx: idx,
        charList: charList,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>영화 캐릭터 테스트</div>

      <div className={styles.description}>맘에 드는 캐릭터를 클릭해 보세요</div>

      <div className={styles.subtitle}>
        나와 잘 맞는 {compatibleMBTI} 유형의 영화 속 캐릭터
      </div>

      <div className={styles.character_list}>
        {charList &&
          charList.map((item, idx) => {
            return (
              <div key={idx}>
                <img
                  className={styles.character_img}
                  src={item[2]}
                  alt={item[1] + " 사진"}
                  onClick={() => clickHandler(idx)}
                />
                <div className={styles.character_name}>{item[1]}</div>
              </div>
            );
          })}
      </div>

      <button className={styles.btn} onClick={refreshHandler}>
        나와 잘 맞는 유형의 다른 캐릭터 보기
      </button>

      <button
        className={styles.btn}
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default MbtiCompatiblePage;
