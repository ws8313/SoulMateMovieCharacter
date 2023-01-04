import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./MbtiCompatibleMovieListPage.module.css";

const MbtiCompatibleMovieListPage = () => {
  const [movieList, setMovieList] = useState([]);

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
    async function getCharacterMovieList() {
      try {
        const res = await axios.get(
          `https://soulmatemoviecharacter-ws8313.koyeb.app/character/character_movie_list?character_id=${character_id}&character_name=${encodeURIComponent(
            character_name
          )}`,
          axiosConfig
        );
        setMovieList(res.data.character_movies);
      } catch (error) {
        console.log(error);
      }
    }

    getCharacterMovieList();
  }, [character_id, character_name]);

  const clickHandler = (items) => {
    history.push({
      pathname: "/MovieInfoPage",
      state: {
        movieInfos: items,
      },
    });
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
      <div className={styles.title}>영화 캐릭터 테스트</div>

      <div className={styles.description}>
        맘에 드는 영화 포스터를 클릭해 보세요
      </div>

      <div className={styles.subtitle}>{character_name + " 등장한 영화"}</div>

      <div className={styles.movie_list_container}>
        {movieList &&
          movieList.map((items, idx) => {
            return (
              <div className={styles.movie_list} key={idx}>
                <img
                  className={styles.movie_img}
                  src={items.image_link}
                  alt={items.kor_title + " 포스터"}
                  onClick={() => clickHandler(items)}
                />
                <div>
                  <div className={styles.movie_title}>{items.kor_title}</div>
                  <div className={styles.movie_info}>
                    <div className={styles.movie_genre_container}>
                      <div className={styles.movie_info_content}>장르</div>
                      <div className={styles.movie_genre}>
                        {items.genres.join(", ")}
                      </div>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>개봉</span>
                      <span>{items.pub_year}년</span>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>런타임</span>
                      <span>{items.run_time}분</span>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>평점</span>
                      <span>{items.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <button
        className={styles.btn}
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로 가기
      </button>

      <button className={styles.btn} onClick={logout}>
        테스트 다시 하기
      </button>
    </div>
  );
};

export default MbtiCompatibleMovieListPage;
