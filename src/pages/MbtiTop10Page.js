import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./MbtiTop10Page.module.css";

const MbtiTop10Page = () => {
  const [top10, setTop10] = useState([]);

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
    async function getTop10() {
      try {
        const res = await axios.get(
          "https://soulmatemoviecharacter-ws8313.koyeb.app/result/top10",
          // "http://localhost:5000/result/top10",
          axiosConfig
        );
        setTop10(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTop10();
  }, []);

  const clickHandler = (items) => {
    const movieInfos = {
      id: items[0],
      kor_title: items[1],
      eng_title: items[2],
      image_link: items[3],
      pub_year: items[4],
      director: items[5],
      rating: items[6],
      story: items[7],
      run_time: items[8],
      genres: items[9],
    };

    history.push({
      pathname: "/MovieInfoPage",
      state: {
        movieInfos: movieInfos,
      },
    });
  };

  const logout = () => {
    axios
      .get(
        "https://soulmatemoviecharacter-ws8313.koyeb.app/user/logout",
        // "http://localhost:5000/user/logout",
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

      <div className={styles.subtitle}>네이버 인기있는 영화 TOP 10</div>

      <div className={styles.movie_list_container}>
        {top10.top10_in_naver &&
          top10.top10_in_naver.map((items, idx) => {
            return (
              <div className={styles.movie_list} key={idx}>
                <img
                  className={styles.movie_img}
                  src={items[3]}
                  alt={items[1] + " 포스터"}
                  onClick={() => clickHandler(items)}
                />

                <div>
                  <div className={styles.movie_title}>{items[1]}</div>
                  <div className={styles.movie_info}>
                    <div className={styles.movie_genre_container}>
                      <div className={styles.movie_info_content}>장르</div>
                      <div className={styles.movie_genre}>
                        {items[9].join(", ")}
                      </div>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>개봉</span>
                      <span>{items[4]}년</span>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>런타임</span>
                      <span>{items[8]}분</span>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>평점</span>
                      <span>{items[6]}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className={styles.subtitle}>같은 유형에게 인기있는 영화 TOP 10</div>

      <div className={styles.movie_list_container}>
        {top10.top10_for_same_mbti_users &&
          top10.top10_for_same_mbti_users.map((items, idx) => {
            return (
              <div className={styles.movie_list} key={idx}>
                <img
                  className={styles.movie_img}
                  src={items[3]}
                  alt={items[1] + " 포스터"}
                  onClick={() => clickHandler(items)}
                />

                <div>
                  <div className={styles.movie_title}>{items[1]}</div>
                  <div className={styles.movie_info}>
                    <div className={styles.movie_genre_container}>
                      <div className={styles.movie_info_content}>장르</div>
                      <div className={styles.movie_genre}>
                        {items[9].join(", ")}
                      </div>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>개봉</span>
                      <span>{items[4]}년</span>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>런타임</span>
                      <span>{items[8]}분</span>
                    </div>
                    <div>
                      <span className={styles.movie_info_content}>평점</span>
                      <span>{items[6]}</span>
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

export default MbtiTop10Page;
