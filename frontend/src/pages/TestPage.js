import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";


const TestPage = () => {
    const [index, setIndex] = useState(1);
    const [anslist, setAnsList] = useState([]);
    const [question, setQuestion] = useState([]);
    const [img, setImg] = useState([]);
    const [option, setOption] = useState([]);
    const QUESTION_EX_INDEX = 1;
    const QUESTION_LAST_INDEX = 13;

    const history = useHistory();

    useEffect(() => {
        async function getQuestion() {
            try {
                const res = await axios.get(`/test/${index}`)
                setQuestion(res.data.question);
                setImg(res.data.img_url)
                setOption(res.data.options);
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getQuestion();
    }, [index, anslist]);
    console.log(question)
    console.log(img)
    console.log(option)

    const clickHandler = (e) => {
        if(index === QUESTION_LAST_INDEX) {
            axios.post("/result/", {
                "answers": anslist
            })
            .then((res) => {
                console.log(res)
                history.push("/TestCompletedPage")
            })
            .catch((error) => {
                console.log(error)
            })
            const ans = [...anslist]
            ans.push(e.target.value)
            setAnsList(ans)
            console.log(ans)
            console.log(anslist)
        } else if (index === QUESTION_EX_INDEX) {
            setIndex(index + 1)
        } else {
            const ans = [...anslist]
            ans.push(e.target.value)
            setAnsList(ans)
            console.log(ans)
            }
            setIndex(index + 1)
        }
    
    const prevClick = () => {
        if(index === QUESTION_EX_INDEX) {
            history.goBack()
        } else {
            anslist.pop();
            console.log(anslist)
            setIndex(index - 1)
        }
    }
    
    console.log(anslist)
    
    return (
        <div id="container">
            <div id="btnbox" onClick={prevClick}>
                <img className="prevbtn" src={prevbtn} alt="prevbtn" />
            </div>

            <div className="title">
                <p>일리스</p>
            </div>

            <div id="divider"></div>

            <div id="img">
                <img className="contentimg" src={img} alt="main logo" />
            </div>

            <div id="testtext">
                <p>{question}</p>
            </div>

            {
                (index === QUESTION_EX_INDEX) ? 
                <div>
                    <div id="progress">
                        <div>1 / 12</div>
                    </div>
                    <div>
                        <button id="ansA" onClick={clickHandler}>다음</button>
                    </div>
                </div> :
                <div>
                    <div id="progress">
                        <div>{index - 1} / 12</div>
                    </div>
                    <div>
                        <button id="ansA" value="a" onClick={clickHandler}>{option[0]}</button>
                    </div>

                    <div>
                        <button id="ansB" value="b" onClick={clickHandler}>{option[1]}</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default TestPage;