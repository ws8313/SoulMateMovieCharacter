import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./Styles.module.css";
import { Header, MovieList, Button, Loading } from "../components";

const MbtiTop10Page = () => {
  const [naverTop10, setNaverTop10] = useState([]);
  const [sameMbtiTop10, setSameMbtiTop10] = useState([]);
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
    getTop10();
  }, []);

  const getTop10 = async () => {
    await axios
      .get(
        "https://soulmatemoviecharacter-ws8313.koyeb.app/result/top10",
        // "http://localhost:5000/result/top10",
        axiosConfig
      )
      .then((res) => {
        const naverTop10List = listToObject(res.data.top10_in_naver);
        const sameMbtiTop10List = listToObject(
          res.data.top10_for_same_mbti_users
        );

        setNaverTop10(naverTop10List);
        setSameMbtiTop10(sameMbtiTop10List);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listToObject = (list) => {
    const movieList = [];

    list.forEach((item, index) => {
      const movieObject = {
        id: item[0],
        kor_title: item[1],
        eng_title: item[2],
        image_link: item[3],
        pub_year: item[4],
        director: item[5],
        rating: item[6],
        story: item[7],
        run_time: item[8],
        genres: item[9],
      };
      movieList.push(movieObject);
    });

    return movieList;
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
      <Header
        subtitle={"맘에 드는 영화 포스터를 클릭해 보세요"}
        description={"네이버 인기있는 영화 TOP 10"}
      />

      <MovieList movieList={naverTop10} />

      <div className={styles.subtitle}>같은 유형에게 인기있는 영화 TOP 10</div>

      <MovieList movieList={sameMbtiTop10} />

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

export default MbtiTop10Page;
