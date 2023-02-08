import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import send from "../../img/send.png";
import styles from "./MovieInformation.module.css";

const MovieInformation = ({ movieInformation }) => {
  const [curValue, setCurValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [satisfactionList, setSatisfactionList] = useState([]);

  const [movieId, setMovieId] = useState("");
  const [rating, setRating] = useState("");

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

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
    setMovieId(movieInformation.id);
    setRating(value * 2);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const sendReview = () => {
    axios
      .post(
        "https://soulmatemoviecharacter-ws8313.koyeb.app/character/movie_list",
        // "http://localhost:5000/character/movie_list",
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

  return (
    <div className={styles.movie_container}>
      <div className={styles.movie_info_container}>
        <img
          className={styles.movie_img}
          src={movieInformation.image_link}
          alt={movieInformation.kor_title + " 포스터"}
        />

        <div>
          <div className={styles.movie_title}>{movieInformation.kor_title}</div>

          <div className={styles.movie_info}>
            <div>
              <span className={styles.movie_info_content}>감독</span>
              <span>{movieInformation.director}</span>
            </div>
            <div className={styles.movie_genre_container}>
              <div className={styles.movie_info_content}>장르</div>
              <div className={styles.movie_genre}>
                {movieInformation.genres.join(", ")}
              </div>
            </div>
            <div>
              <span className={styles.movie_info_content}>개봉</span>
              <span>{movieInformation.pub_year}년</span>
            </div>
            <div>
              <span className={styles.movie_info_content}>런타임</span>
              <span>{movieInformation.run_time}분</span>
            </div>
            <div>
              <span className={styles.movie_info_content}>평점</span>
              <span>{movieInformation.rating}</span>
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
        <div className={styles.movie_story}>{movieInformation.story}</div>
      </div>
    </div>
  );
};

export default MovieInformation;
