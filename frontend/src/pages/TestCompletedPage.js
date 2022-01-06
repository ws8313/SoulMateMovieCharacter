import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";

const TestCompletedPage = () => {
    const [userMBTI, setUserMBTI] = useState("")

    const history = useHistory();

    useEffect(() => {
        async function getMBTI() {
            try {
                const res = await axios.get("/result/")
                setUserMBTI(res.data.user_mbti)
                console.log(res)
                console.log(userMBTI)
            } catch (error) {
                console.log(error)
            }
        }
        getMBTI();
    }, [userMBTI]);

    const MbtiCharacterClickHandler = () => {
    }
    
    return (
        <div>
            <div id="btnbox" onClick={ () => { history.goBack() }}>
                <img className="prevbtn" src={prevbtn} alt="prevbtn" />
            </div>

            <div className="title">
                <p>일리스</p>
            </div>

            <div id="divider"></div>

            <div>
                <div>테스트가 완료되었습니다</div>
            </div>
            
            <div>
                <button onClick={ () => { history.push("/MbtiCharacterPage") }}>나와 같은 유형인 캐릭터 확인하기</button>
            </div>

            <div>
                <button onClick={ () => { history.push("/MbtiCompatiblePage") }}>나와 궁합이 잘 맞는 캐릭터 확인하기</button>
            </div>

            <div>
                <button onClick={ () => { history.push("/MbtiTop10Page") }}>같은 유형에게 인기있는 영화 확인하기</button>
            </div>
        </div>
    )
}

export default TestCompletedPage;