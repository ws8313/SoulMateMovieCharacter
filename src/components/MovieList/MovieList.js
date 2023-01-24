import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movieList }) => {
  const history = useHistory();
  
  const clickHandler = (items) => {
    history.push({
      pathname: "/MovieInfoPage",
      state: {
        movieInfos: items,
      },
    });
  };

  return (
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
  );
};

export default MovieList;
