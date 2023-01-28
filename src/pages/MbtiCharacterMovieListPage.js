import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./MbtiCharacterMovieListPage.module.css";
import { Header, MovieList, Button, Loading } from "../components";

const MbtiCharacterMovieListPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const idx = location.state.idx;
  const charList = location.state.charList;

  const character_id = charList[idx][0];
  const character_name = charList[idx][1];

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
    getMovieList();
  }, [character_id, character_name]);

  const getMovieList = async () => {
    await axios
      .get(
        `http://localhost:5000/character/character_movie_list?character_id=${character_id}&character_name=${encodeURIComponent(
          character_name
        )}`,
        // `https://soulmatemoviecharacter-ws8313.koyeb.app/character/character_movie_list?character_id=${character_id}&character_name=${encodeURIComponent(
        //   character_name
        // )}`,
        axiosConfig
      )
      .then((res) => {
        setMovieList(res.data.character_movies);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    axios
      .get(
        // "https://soulmatemoviecharacter-ws8313.koyeb.app/user/logout",
        "http://localhost:5000/user/logout",
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
      <Header
        subtitle={"맘에 드는 영화 포스터를 클릭해 보세요"}
        description={character_name + " 등장한 영화"}
      />

      <MovieList movieList={movieList} />

      <Button
        content={"뒤로 가기"}
        onClick={() => {
          history.goBack();
        }}
      />

      <Button content={"테스트 다시 하기"} onClick={logout} />

      {loading && <Loading />}
    </div>
  );
};

export default MbtiCharacterMovieListPage;
