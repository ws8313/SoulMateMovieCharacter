import React, {} from "react";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";

const TestExPage = () => { 
    // usehistory 훅 사용
    const history = useHistory();
    return (
        <div id="container">
            <div className="title">
                <p>일리스</p>
            </div>

            <div id="btnbox" onClick={ () => { history.goBack() }}>
                <img className="prevbtn" src={prevbtn} alt="prevbtn" />
            </div>

            <div id="divider"></div>

            <div id="img">
                <div>이미지</div>
            </div>

            <div id="testtext">
                <p>으, 오랜만에 좋은 아침이에요! 늘어지게 자고 일어났더니</p>
                <p>삐 - 언제단 다름없이 재난문자가 울리네요.. 휴</p>
                <p>아무래도 오늘도 집에 있어야 겠어요..</p>
            </div>
            
            <div>
                <button id="ansA" onClick={ () => { history.push("/TestPage") }}>다음</button>
            </div>
        </div>
    )
}

export default TestExPage;