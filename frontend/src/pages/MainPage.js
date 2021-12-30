import React, {} from "react";
import { useHistory } from "react-router-dom";

const MainPage = () => {
    const history = useHistory();

    return (
        <div id="container">
            <div className="title">
                <div>일리스</div>
            </div>

            <div id="divider"></div>

            <div id="img">
                <div>이미지</div>
            </div>

            <div>
                <div id="maintext1">코로나 시국에..</div>
                <div id="maintext2">이런게 나의 영화 인생캐 일리가...!!</div>
            </div>
            
            <div>
                <button id="leftbtn" onClick={ () => { history.push("/TestExPage") }}>인생캐 알아보기</button>
            </div>

            <div>
                <button id="rightbtn">바로 결과 보기</button>
            </div>
        </div>
    )
}

export default MainPage;