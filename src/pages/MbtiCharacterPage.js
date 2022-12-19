import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./MbtiCharacterPage.module.css";

const MbtiCharacterPage = () => {
  const [userMBTI, setUserMBTI] = useState("");
  const [charList, setCharList] = useState([]);

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
          "http://127.0.0.1:5000/result/",
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
    async function getMbtiCharacter() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/character/0",
          axiosConfig
        );
        setCharList(res.data.character_info);
      } catch (error) {
        console.log(error);
      }
    }
    getMbtiCharacter();
  }, [userMBTI]);

  const refreshHandler = () => {
    async function getMbtiCharacterRefresh() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/character/refresh/0",
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
      pathname: "/MbtiCharacterMovieListPage",
      state: {
        idx: idx,
        mbti: userMBTI,
        charList: charList,
      },
    });
  };

  return (
    <div id={styles.container}>
      <div className={styles.title}>
        <div>영화 캐릭터 테스트</div>
      </div>

      <div>
        <div className={styles.subtitle}>
          나와 같은 {userMBTI} 유형의 영화 속 캐릭터
        </div>
      </div>

      <div>
        <div className={styles.description}>
          맘에 드는 캐릭터를 클릭해 보세요
        </div>
      </div>

      <div>
        <div className={styles.charlist}>
          {charList &&
            charList.map((item, idx) => {
              return (
                <div key={idx}>
                  <img
                    className={styles.char_img}
                    src={item[2]}
                    alt={item[1] + " 사진"}
                    onClick={() => clickHandler(idx)}
                  />
                  <div className={styles.char_name}>{item[1]}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <button className={styles.btn} onClick={refreshHandler}>
          같은 유형의 다른 캐릭터 보기
        </button>
      </div>

      <div>
        <button
          className={styles.btn}
          onClick={() => {
            history.goBack();
          }}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
};

export default MbtiCharacterPage;
