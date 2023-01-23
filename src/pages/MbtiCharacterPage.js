import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./MbtiCharacterPage.module.css";
import { Header, CharacterList, Button, Loading } from "../components";

const MbtiCharacterPage = () => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const userMBTI = location.state.userMBTI;

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
    getMbtiCharacter();
  }, []);

  const getMbtiCharacter = async () => {
    await axios
      .get(
        "http://localhost:5000/character/0",
        // "https://soulmatemoviecharacter-ws8313.koyeb.app/character/0",
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

  const refreshMbtiCharacter = async () => {
    await axios
      .get(
        "http://localhost:5000/character/refresh/0",
        // "https://soulmatemoviecharacter-ws8313.koyeb.app/character/refresh/0",
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
    refreshMbtiCharacter();
  };

  return (
    <div className={styles.container}>
      <Header
        subtitle={"맘에 드는 캐릭터를 클릭해 보세요"}
        description={"나와 같은 " + userMBTI + " 유형의 영화 속 캐릭터"}
      />

      <CharacterList characterList={charList} />

      <Button
        content={"같은 유형의 다른 캐릭터 보기"}
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

export default MbtiCharacterPage;
