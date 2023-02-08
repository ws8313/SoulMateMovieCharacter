import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./Styles.module.css";
import { Header, CharacterList, Button, Loading } from "../components";

const MbtiCompatiblePage = () => {
  const [charList, setCharList] = useState([]);
  const [compatibleMBTI, setCompatibleMBTI] = useState("");
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
    getCompatibleCharacter();
  }, []);

  const getCompatibleCharacter = async () => {
    await axios
      .get(
        // "https://soulmatemoviecharacter-ws8313.koyeb.app/character/1",
        "http://localhost:5000/character/1",
        axiosConfig
      )
      .then((res) => {
        setCharList(res.data.character_info);
        setCompatibleMBTI(res.data.characters_mbti);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshCompatibleCharacter = async () => {
    await axios
      .get(
        // "https://soulmatemoviecharacter-ws8313.koyeb.app/character/refresh/1",
        "http://localhost:5000/character/refresh/1",
        axiosConfig
      )
      .then((res) => {
        setCharList(res.data.character_info);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshHandler = () => {
    setLoading(true);
    refreshCompatibleCharacter();
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

      {loading && <Loading />}
    </div>
  );
};

export default MbtiCompatiblePage;
