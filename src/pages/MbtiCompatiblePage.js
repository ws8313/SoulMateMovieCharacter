import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./MbtiCompatiblePage.module.css";
import { Header, CharacterList, Button } from "../components";

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
          "https://soulmatemoviecharacter-ws8313.koyeb.app/result/",
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
          "https://soulmatemoviecharacter-ws8313.koyeb.app/character/1",
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
          "https://soulmatemoviecharacter-ws8313.koyeb.app/character/refresh/1",
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
      <Header
        subtitle={"맘에 드는 캐릭터를 클릭해 보세요"}
        description={
          "나와 잘 맞는 " + compatibleMBTI + " 유형의 영화 속 캐릭터"
        }
      />

      <CharacterList characterList={charList} />

      <Button
        content={"나와 잘 맞는 유형의 다른 캐릭터 보기"}
        onClick={refreshHandler}
      />

      <Button
        content={"뒤로 가기"}
        onClick={() => {
          history.goBack();
        }}
      />
    </div>
  );
};

export default MbtiCompatiblePage;
