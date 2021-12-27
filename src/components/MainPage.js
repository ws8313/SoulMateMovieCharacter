import React, {} from "react";

const MainPage = ({ history }) => {

    return (
        <div>
            <div>
                <p>일리스</p>
            </div>

            <div>
                <div>이미지</div>
            </div>

            <div>
                <p>코로나 시국에..</p>
                <p>이런게 나의 영화 인생캐 일리가...!!</p>
            </div>
            
            <div>
                <button onClick={ () => { history.push("/TestPage") }}>인생캐 알아보기</button>
            </div>

            <div>
                <button>바로 결과 보기</button>
            </div>
        </div>
    )
}

export default MainPage;