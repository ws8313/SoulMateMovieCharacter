import React from "react";

const TestPage = ({ history }) => {

    return (
        <div>
            <div>
                <button onClick={ () => { history.goBack() }}>뒤로가기</button>
            </div>

            <div>
                <p>일리스</p>
            </div>

            <div>
                <div>1 / 12</div>
            </div>

            <div>
                <div>이미지</div>
            </div>

            <div>
                <p>Q1. 질문?</p>
            </div>
            
            <div>
                <button>답변 1</button>
            </div>

            <div>
                <button>답변 2</button>
            </div>
        </div>
    )
}

export default TestPage;