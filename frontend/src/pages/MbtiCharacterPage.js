import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";


const MbtiCharacterPage = () => {
    const [userMBTI, setUserMBTI] = useState("");
    const [charList, setCharList] = useState([]);
    const [selectedChar, setSelectedChar] = useState("");

    const history = useHistory();

    useEffect(() => {
        async function getMbti() {
            try {
                const mbti = await axios.get("/result/")
                setUserMBTI(mbti.data.user_mbti)
                console.log(mbti.data.user_mbti)
                console.log(userMBTI)
            } catch (error) {
                console.log(error)
            }
        }
        getMbti();
    }, [userMBTI]);

    useEffect(() => {
        async function getMbtiCharacter() {
            try {
                const res = await axios.get(`/character/0`)
                setCharList(res.data.character_info)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getMbtiCharacter();
    }, [userMBTI, selectedChar]);

    console.log(charList)

    const mouseOverHandler = (e) => {
        setSelectedChar(e.target.alt)
        console.log(selectedChar)
    }

    const clickHandler = () => {
        history.push({
            pathname: "/MbtiCharacterMovieListPage",
            state: {selectedChar: selectedChar}
        })
    }

    console.log(selectedChar)
    
    const prevClick = () => {
    }
    
    return (
        <div id="container">
            <div id="btnbox" onClick={  () => { history.goBack() } }>
                <img className="prevbtn" src={ prevbtn } alt="prevbtn" />
            </div>

            <div className="title">
                <p>일리스</p>
            </div>

            <div id="divider"></div>

            <div>
                <p>나와 같은 유형의 영화 속 캐릭터</p>
            </div>

            <div>
                { charList && charList.map((item) => {
                    return (
                        <div key={item}>
                            <img src={ item[2] } alt={ item[1] + "사진" } onMouseOver={ mouseOverHandler } onClick={ clickHandler } />
                            <p>{ item[1] }</p>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default MbtiCharacterPage;