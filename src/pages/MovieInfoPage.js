import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./MovieInfoPage.module.css";
import send from "../img/send.png";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const MovieInfoModal = () => {
  const [curValue, setCurValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [satisfactionList, setSatisfactionList] = useState([]);

  const [movieId, setMovieId] = useState("");
  const [rating, setRating] = useState("");

  const history = useHistory();
  const location = useLocation();

  const idx = location.state.idx;
  const movieList = location.state.movieList;
  const selectedMovie = movieList[idx];

  const stars = Array(5).fill(0);

  const accessToken = sessionStorage.getItem("token");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const handleClick = () => {
    let list = [movieId, rating];

    setSatisfactionList(list);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
    setCurValue(value);
    setMovieId(selectedMovie.id);
    setRating(value * 2);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const sendReview = () => {
    axios
      .post(
        "http://127.0.0.1:5000/character/movie_list",
        {
          satisfaction_list: satisfactionList,
        },
        axiosConfig
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    axios
      .get("http://127.0.0.1:5000/user/logout", axiosConfig)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>영화 캐릭터 테스트</div>
      </div>

      <div className={styles.description}>영화의 평점을 남겨보세요</div>

      <div className={styles.movie_container}>
        <div className={styles.movie_info_container}>
          <img
            className={styles.movie_img}
            src={selectedMovie.image_link}
            alt={selectedMovie.kor_title + " 포스터"}
          />

          <div>
            <div className={styles.movie_title}>
              <div>{selectedMovie.kor_title}</div>
            </div>

            <div className={styles.movie_info}>
              <div>
                <span className={styles.movie_info_content}>감독</span>
                <span>{selectedMovie.director}</span>
              </div>
              <div className={styles.movie_genre_container}>
                <div className={styles.movie_info_content}>장르</div>
                <div className={styles.movie_genre}>
                  {selectedMovie.genres.join(", ")}
                </div>
              </div>
              <div>
                <span className={styles.movie_info_content}>개봉</span>
                <span>{selectedMovie.pub_year}년</span>
              </div>
              <div>
                <span className={styles.movie_info_content}>런타임</span>
                <span>{selectedMovie.run_time}분</span>
              </div>
              <div>
                <span className={styles.movie_info_content}>평점</span>
                <span>{selectedMovie.rating}</span>
              </div>
            </div>

            <div className={styles.RatingContainer}>
              <div className={styles.stars}>
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      style={{
                        marginRight: 5,
                        cursor: "pointer",
                      }}
                      color={
                        (hoverValue || curValue) > index
                          ? colors.orange
                          : colors.grey
                      }
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </div>
              <img
                className={styles.submit_btn}
                src={send}
                alt="ratingsend"
                onClick={() => sendReview()}
              />
            </div>
          </div>
        </div>

        <div className={styles.movie_story_container}>
          <div className={styles.movie_title}>줄거리</div>
          <div className={styles.movie_story}>{selectedMovie.story}</div>
        </div>
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

export default MovieInfoModal;
