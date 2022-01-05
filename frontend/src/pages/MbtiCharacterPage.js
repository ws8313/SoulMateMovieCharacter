import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";


const MbtiCharacterPage = () => {
    const [userMBTI, setUserMBTI] = useState("");
    const [charImage, setCharImage] = useState([]);
    const [charName, setCharName] = useState([]);
    const [charList, setCharList] = useState([]);

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
                const res = await axios.get(`/character/${userMBTI}`)
                setCharImage(res.data.character_image)
                setCharName(res.data.character_name)
                setCharList(res.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getMbtiCharacter();
    }, [userMBTI]);

    console.log(charImage)
    console.log(charName)
    console.log(charList)


    const clickHandler = () => {
    }
    
    const prevClick = () => {
    }
    
    return (
        <div id="container">
            <div id="btnbox" onClick={ prevClick }>
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
                { charList.character_image && charList.character_image.map((item) => {
                    return (
                        <div key={item}>
                            <img src={ item } onClick={ clickHandler } />
                            <p>{ charList.character_name }</p>
                        </div>
                    )
                }) }
            </div>

        </div>
    )
}

export default MbtiCharacterPage;