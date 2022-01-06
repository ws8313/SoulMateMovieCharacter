import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";


const MbtiCompatiblePage = () => {
    const [userMBTI, setUserMBTI] = useState("");
    const [charList, setCharList] = useState([]);
    const [compatibleMBTI, setCompatibleMBTI] = useState("");

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
        async function getCompatibleCharacter() {
            try {
                const res = await axios.get("/character/1")
                setCharList(res.data.character_info)
                setCompatibleMBTI(res.data.characters_mbti)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getCompatibleCharacter();
    }, [userMBTI]);

    console.log(charList)
    console.log(compatibleMBTI)


    const mouseOverHandler = (e) => {

    }

    const clickHandler = () => {
        history.push({
            pathname: "/MbtiCompatibleMovieListPage",
            state: {compatibleMBTI: compatibleMBTI}
        })
    }

    
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
                <p>나와 궁합이 잘 맞는 캐릭터</p>
            </div>

            <div>
                { charList && charList.map((item, idx) => {
                    return (
                        <div key={ idx }>
                            <img src={ item[2] } alt={ item[1] + " 사진" } onClick={ clickHandler } />
                            <p>{ item[1] }</p>
                        </div>
                    )
                }) }
            </div>

        </div>
    )
}

export default MbtiCompatiblePage;