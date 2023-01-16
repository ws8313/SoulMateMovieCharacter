import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./TestPage.module.css";
import { Header, ProgressBar, Main, Button, Loading } from "../components";

const TestPage = () => {
  const [index, setIndex] = useState(1);
  const [anslist, setAnsList] = useState([]);
  const [question, setQuestion] = useState([]);
  const [img, setImg] = useState([]);
  const [option, setOption] = useState([]);
  const [questionList, setQuestionList] = useState();
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
    // const dataArr = [];
    // for (let i = 1; i < 14; i++) {
    //   axios
    //     .all([
    //       axios.get(
    //         // `https://soulmatemoviecharacter-ws8313.koyeb.app/test/${i}`, axiosConfig
    //         `http://localhost:5000/test/${i}`,
    //         axiosConfig
    //       ),
    //     ])
    //     .then(
    //       axios.spread((res) => {
    //         const id = res.data.id;
    //         const img = res.data.img_url;
    //         const options = res.data.options;
    //         const question = res.data.question;
    //         dataArr.push({ id, img, options, question });
    //         dataArr.sort((a, b) => a.id - b.id);
    //         setQuestionList(dataArr);
    //       })
    //     )
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }, []);

  const getQuestionList = async () => {
    const dataArr = [];
    for (let i = 1; i < 14; i++) {
      axios
        .all([
          axios.get(
            // `https://soulmatemoviecharacter-ws8313.koyeb.app/test/${i}`, axiosConfig
            `http://localhost:5000/test/${i}`,
            axiosConfig
          ),
        ])
        .then(
          axios.spread((res) => {
            const id = res.data.id;
            const img = res.data.img_url;
            const options = res.data.options;
            const question = res.data.question;
            dataArr.push({ id, img, options, question });
            dataArr.sort((a, b) => a.id - b.id);
            setQuestionList(dataArr);
            setLoading(false);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // useEffect(() => {
  //   async function getQuestion() {
  //     try {
  //       const res = await axios.get(
  //         // `https://soulmatemoviecharacter-ws8313.koyeb.app/test/${index}`,
  //         `http://localhost:3000/test/${index}`,
  //         axiosConfig
  //       );
  //       setQuestion(res.data.question);
  //       setImg(res.data.img_url);
  //       setOption(res.data.options);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getQuestion();
  // }, [index]);

  const clickHandler = (e) => {
    if (index === QUESTION_LAST_INDEX) {
      const ans = [...anslist];
      ans.push(e.target.value);
      setAnsList(ans);
      axios
        .post(
          "http://localhost:5000/result/",
          // "https://soulmatemoviecharacter-ws8313.koyeb.app/result/",
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

      {questionList && (
        <Main
          src={questionList[index - 1].img}
          alt={"test image"}
          description={questionList[index - 1].question}
        />
      )}

      {index === QUESTION_EX_INDEX ? (
        <Button content={"다음"} onClick={clickHandler} />
      ) : (
        <div>
          <Button
            content={questionList[index - 1].options[0]}
            value={"a"}
            onClick={clickHandler}
          />

          <Button
            content={questionList[index - 1].options[1]}
            value={"b"}
            onClick={clickHandler}
          />
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default TestPage;
