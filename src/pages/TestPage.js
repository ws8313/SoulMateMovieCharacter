import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./Styles.module.css";
import { Header, ProgressBar, Main, Button, Loading } from "../components";

const TestPage = () => {
  const [index, setIndex] = useState(1);
  const [question, setQuestion] = useState();
  const [option, setOption] = useState();
  const [anslist, setAnsList] = useState([]);
  const [loading, setLoading] = useState(null);
  const QUESTION_EX_INDEX = 1;
  const QUESTION_LAST_INDEX = 13;

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
    getQuestionList();
  }, [index]);

  const getQuestionList = async () => {
    try {
      const res = await axios.get(
        `https://soulmatemoviecharacter-ws8313.koyeb.app/test/${index}`,
        // `http://localhost:5000/test/${index}`,
        axiosConfig
      );
      setQuestion(res.data.question);
      setOption(res.data.options);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = (e) => {
    if (index === QUESTION_LAST_INDEX) {
      const ans = [...anslist];
      ans.push(e.target.value);
      setAnsList(ans);
      axios
        .post(
          // "http://localhost:5000/result/",
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
      setIndex(index + 1);
    }
  };

  const prevClick = () => {
    if (index === QUESTION_EX_INDEX) {
      history.goBack();
    } else {
      anslist.pop();
      setIndex(index - 1);
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <ProgressBar index={index} prevClick={prevClick} />

      {!loading && (
        <Main
          src={`img/for_test/${index}.png`}
          alt={"test image"}
          description={question}
        />
      )}

      {index === QUESTION_EX_INDEX ? (
        <Button content={"다음"} onClick={clickHandler} />
      ) : (
        <div>
          <Button content={option[0]} value={"a"} onClick={clickHandler} />

          <Button content={option[1]} value={"b"} onClick={clickHandler} />
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default TestPage;
