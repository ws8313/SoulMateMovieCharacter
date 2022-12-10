import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";
import styles from "./TestPage.module.css";

const TestPage = () => {
  const [index, setIndex] = useState(1);
  const [anslist, setAnsList] = useState([]);
  const [question, setQuestion] = useState([]);
  const [img, setImg] = useState([]);
  const [option, setOption] = useState([]);
  const QUESTION_EX_INDEX = 1;
  const QUESTION_LAST_INDEX = 13;

  const history = useHistory();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      // "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  };

  useEffect(() => {
    async function getQuestion() {
      try {
        const res = await axios.get(
          `https://soulmatemoviecharacter-ws8313.koyeb.app/test/${index}`,
          { withCredentials: true }
        );
        setQuestion(res.data.question);
        setImg(res.data.img_url);
        setOption(res.data.options);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestion();
  }, [index]);

  const clickHandler = (e) => {
    if (index === QUESTION_LAST_INDEX) {
      const ans = [...anslist];
      ans.push(e.target.value);
      setAnsList(ans);
      axios
        .post(
          "https://soulmatemoviecharacter-ws8313.koyeb.app/result/",
          {
            answers: [...anslist, e.target.value],
          },
          axiosConfig
        )
        .then(() => {
          history.push("/TestCompletedPage");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (index === QUESTION_EX_INDEX) {
      setIndex(index + 1);
    } else {
      const ans = [...anslist];
      ans.push(e.target.value);
      setAnsList(ans);
    }
    setIndex(index + 1);
  };

  const prevClick = () => {
    if (index === QUESTION_EX_INDEX) {
      history.goBack();
    } else {
      anslist.pop();
      setIndex(index - 1);
    }
  };

  const percent = ((index - 1) / 12) * 100;

  return (
    <div id={styles.container}>
      <div className={styles.title}>
        <p>영화 캐릭터 테스트</p>
      </div>

      {index === QUESTION_EX_INDEX ? (
        <div className={styles.progress_container}>
          <div id={styles.btnbox} onClick={prevClick}>
            <img className={styles.prevbtn} src={prevbtn} alt="prevbtn" />
          </div>
          <div className={styles.progress_bar_container}>
            <div
              className={styles.progress_bar}
              style={{ width: "8.333%" }}
            ></div>
          </div>
          <div id={styles.progress}>
            <div>1/12</div>
          </div>
        </div>
      ) : (
        <div className={styles.progress_container}>
          <div id={styles.btnbox} onClick={prevClick}>
            <img className={styles.prevbtn} src={prevbtn} alt="prevbtn" />
          </div>
          <div className={styles.progress_bar_container}>
            <div
              className={styles.progress_bar}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <div id={styles.progress}>
            <div>{index - 1}/12</div>
          </div>
        </div>
      )}

      <div className={styles.img_wrapper}>
        <img className={styles.content_img} src={img} alt="test img" />
      </div>

      <div id={styles.testtext}>
        <p>{question}</p>
      </div>

      {index === QUESTION_EX_INDEX ? (
        <div className={styles.btn_container}>
          <button id={styles.btn} onClick={clickHandler}>
            다음
          </button>
        </div>
      ) : (
        <div>
          <button id={styles.btn} value="a" onClick={clickHandler}>
            {option[0]}
          </button>
          <button id={styles.btn} value="b" onClick={clickHandler}>
            {option[1]}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
