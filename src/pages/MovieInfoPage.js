import React from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Styles.module.css";
import { Header, MovieInformation, Button } from "../components";

const MovieInfoModal = () => {
  const history = useHistory();
  const location = useLocation();

  const movieInfos = location.state.movieInfos;

  const accessToken = sessionStorage.getItem("token");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const logout = () => {
    axios
      .get(
        "https://soulmatemoviecharacter-ws8313.koyeb.app/user/logout",
        axiosConfig
      )
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <Header subtitle={"영화의 평점을 남겨보세요"} />

      <MovieInformation movieInformation={movieInfos} />

      <Button
        content={"뒤로 가기"}
        onClick={() => {
          history.goBack();
        }}
      />

      <Button content={"테스트 다시 하기"} onClick={logout} />
    </div>
  );
};

export default MovieInfoModal;
